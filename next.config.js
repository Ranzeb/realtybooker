/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com']
  },
  env: {
    apiFirebase: "apiKeyFirebase",
    authDomain: "authDomainFirebase",
    projectId: "projectIdFirebase",
    storageBucket: "storageBucketFirebase",
    messagingSenderId: "messagingSenderIdFirebase",
    appId: "appIdFirebase",
    measurementId: "measurementIdFirebase"
  }
} 