# Stage 1: Build the application
FROM node:18.16.0 AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy (package.json, yarn.lock, and .env) to the container
COPY package.json yarn.lock .env.docker ./

# Install project dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Format the code
RUN yarn format

# Build the Next.js application
RUN yarn build

# Stage 2: Create the final lightweight image
FROM node:18.16.0 AS production

# Change node environment to production
ENV NODE_ENV production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only necessary files from the builder stage
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json
COPY --from=builder /usr/src/app/yarn.lock ./yarn.lock

# Expose the port that Next.js uses (default is 3000)
EXPOSE 3005

# Command to run the application
CMD ["yarn", "start", "--", "-p", "3005"]

# Metadata as defined above
LABEL maintainer="mhassan.malik.1997@gmail.com" \
      version="1.0" \
      description="A Waterpark Management Platform."