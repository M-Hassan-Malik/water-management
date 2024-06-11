/* eslint-disable */

import * as bcrypt from "bcryptjs";

import type { Model } from "mongoose";
import mongoose from "mongoose";
import { featureSchema } from "./features.model";
import { LiveLocationSchema } from "./liveLocation.model";
const saltRounds = 10;

const phoneSchema = new mongoose.Schema<IPhone>({
  code: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
});

const companySchema = new mongoose.Schema<ICompany>({
  subAdmin: {
    // if user is Client-Admin, then "true" if Client-Admin's user then "false"
    type: Boolean,
    default: false,
    required: true,
  },
  park: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Parks",
    required: false,
  },
  location: {
    // Park's location which this employee belong, for (Client-Admin's Users) to get the sub-user's location
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ParkLocations",
      },
    ],
  },
  employee: {
    type: Boolean,
    default: false,
  },
  employeeType: {
    type: String,
    enum: ["SUBADMIN", "MANAGER", "LIFEGUARD", "PECTORA", "IMPORTED"],
    require: false,
  },
});

let userSchema = new mongoose.Schema<IUser>(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    rec_email: {
      type: String,
      default: "",
      required: false,
    },
    photo_url: {
      type: String,
      default: "",
    },
    phone: {
      type: phoneSchema,
      require: true,
    },
    scopes: [
      {
        type: String,
        required: true,
      },
    ],
    operations: [
      {
        type: featureSchema,
        default: [],
      },
    ],
    modules: [
      {
        type: featureSchema,
        default: [],
      },
    ],
    company: {
      type: companySchema,
      require: false,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserPackage",
      require: false,
    },
    liveLocation: {
      type: LiveLocationSchema,
      default: {
        lat: 0.0,
        lng: 0.0,
      },
      required: false,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Roles",
      default: null,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      default: null,
    },
    password: {
      type: String,
    },
    deviceToken: {
      type: String,
      default: "",
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    belongsTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    temporary_password: {
      type: Boolean,
      default: false,
    },
    themeId: {
      type: String,
      default: "",
    },

    stripeCustomerId: {
      type: String,
      default: "",
    },
    access: {
      type: String,
      default: null,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Soft delete by ID static method
userSchema.statics.softDeleteById = function(id) {
  return this.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(this.password, salt, (error, hash) => {
      if (error) return next(error);
      this.password = hash;
      next();
    });
  });
});

userSchema.pre("findOneAndUpdate", function (next) {
  const update: any = this.getUpdate();

  if (!update || !update?.password) return next();
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(update.password, salt, (error, hash) => {
      if (error) return next(error);
      update.password = hash;
      next();
    });
  });
});

userSchema.pre("updateOne", function (next) {
  const update: any = this.getUpdate();
  if (!update || !update?.password) return next();
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(update.password, salt, (error, hash) => {
      if (error) return next(error);
      update.password = hash;
      next();
    });
  });
});

userSchema.pre("insertMany", function (next, docs) {
  
  // Hash passwords for all documents in the array
  const hashPasswords = async () => {
    const hashedPasswords = await Promise.all(
      docs.map(async (doc: IUser) => {
        if (doc.password) {
          const salt = await bcrypt.genSalt(saltRounds);
          const hash = await bcrypt.hash(doc.password, salt);
          return hash;
        }
        return doc.password;
      })
    );

    // Update the passwords in the documents
    docs.forEach((doc: IUser, index: number) => {
      if (doc.password) {
        doc.password = hashedPasswords[index];
      }
    });

    next();
  };

  hashPasswords().catch((error) => next(error));
});

function excludeDeletedMiddleware(this: any, next: Function): void {
  this.where({ isDeleted: false });
  next();
}

userSchema.pre('find', excludeDeletedMiddleware);
userSchema.pre('findOne', excludeDeletedMiddleware);
userSchema.pre('count', excludeDeletedMiddleware);
userSchema.pre('findOneAndUpdate', excludeDeletedMiddleware);
userSchema.pre('countDocuments', excludeDeletedMiddleware);
userSchema.pre('aggregate', function (this: any, next: Function) {
  this.pipeline().unshift({ $match: { isDeleted: false } });
  next();
});

const MODEL = "User";
interface IUserModel extends Model<IUser> {
  softDeleteById(id: string): Promise<IUser | null>;
}

export default (mongoose.models[MODEL] ||
  mongoose.model(MODEL, userSchema)) as IUserModel
