/* eslint-disable */
import mongoose from 'mongoose';
// import * as jwt from 'jsonwebtoken'
// import User from '@/models/user.model';

export class MongoHelper {
  /**
   * This function returns either true of false based information present in the database
   * @param req
   */
  // public async validateUser(req: any) {
  //   const token = req.headers.authorization || '';
  //   if (token) {
  //     try {
  //       const payload = <{ email: string, iat: number, _id: string, }>(
  //         jwt.verify(token, <string>serverRuntimeConfig.JWT_SECRET)
  //       );
  //       const id = payload._id;
  //       return await User.findById(id).then((response: any) => {
  //         if (response) {
  //           // return { isUserLogged: true, _id: response._id, email: response.email, queue: feedsQueue, update: updateFeedQueue ,userInfo:response._doc};
  //         }

  //         // return { isUserLogged: false, queue: feedsQueue, update: updateFeedQueue };
  //       });
  //     } catch (error) {
  //       // return { isUserLogged: false, queue: feedsQueue, update: updateFeedQueue };
  //     }
  //   } else {
  //     // return { isUserLogged: false, queue: feedsQueue, update: updateFeedQueue };
  //   }
  // }

  // , {
  //   useUnifiedTopology: true,
  //   useNewUrlParser: true,
  // }

  /**
   * This function will initiate the Mongo Database connection
   */
  
  public async initiateMongoConnection() {
    try {
      await mongoose.connect(process.env.NODE_ENV === "production" ? process.env.MONGO_URL as string : process.env.MONGO_URL as string, {connectTimeoutMS: 1000})
      console.log('Connected to Database')
    } catch (err) {
      console.error('Error connecting to database',err)
      process.exit(1)
    }
  }
}
