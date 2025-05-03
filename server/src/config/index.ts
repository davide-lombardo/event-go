import merge from "lodash.merge";
import localConfig from "./local";
import testingConfig from "./testing";
import prodConfig from "./prod";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = (process.env.STAGE || "local") as keyof typeof configMap;

const configMap = {
  production: prodConfig,
  testing: testingConfig,
  local: localConfig,
};

const envConfig = configMap[stage] || localConfig;

const defaultConfig = {
  stage,
  dbUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT,
  logging: false,
};

export default merge(defaultConfig, envConfig);
