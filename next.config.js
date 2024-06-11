/* eslint-disable */

const environmentVariables = {
  VAPID_KEY: process.env.VAPID_KEY,
  SERVER_KEY: process.env.SERVER_KEY,
  FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  FRONT_END_URL: process.env.FRONT_END_URL,
  MONGO_URL: process.env.MONGO_URL,
  MONGO_URL_DEV: process.env.MONGO_URL_DEV,
  NOTIFICATION_EMAIL: process.env.NOTIFICATION_EMAIL,
  NOTIFICATION_PASS: process.env.NOTIFICATION_PASS,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  GOOGLE_PLACES_KEY: process.env.GOOGLE_PLACES_KEY,
};

/** @type {import('next').NextConfig} */
module.exports = nextConfig = {
  reactStrictMode: true,
  env: environmentVariables,
  serverRuntimeConfig: environmentVariables,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true,
      },
    ];
  },
};
