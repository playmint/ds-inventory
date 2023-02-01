/**
 * @format
 */
 
const isGithubActions = process.env.GITHUB_ACTIONS || false

let assetPrefix = ''
let basePath = ''

if (isGithubActions) {
  // trim off `<owner>/`
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

  assetPrefix = `/${repo}/`
  basePath = `/${repo}`
}


 /**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
    reactStrictMode: false,
    compiler: {
        emotion: true
    }, 
  assetPrefix: assetPrefix,
  basePath: basePath
};

module.exports = nextConfig;
