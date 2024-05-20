let apiRoot = "";
if (process.env.BUILD_MODE === "dev") {
  apiRoot = process.env.API_LOCAL;
}

if (process.env.BUILD_MODE === "production") {
  apiRoot = process.env.API_PRODUCTION;
}

export const API_ROOT = apiRoot;
