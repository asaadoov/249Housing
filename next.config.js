/** @type {import('next').NextConfig} */
require("dotenv").config()

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['bayut-production.s3.eu-central-1.amazonaws.com']
  }
}

module.exports = {
  env: {
    API_KEY: process.env.API_KEY
  }
}
module.exports = nextConfig
