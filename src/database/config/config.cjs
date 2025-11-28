const { config } = require('dotenv');
const { readFileSync } = require('fs');

if (process.env.NODE_ENV !== 'production') {
  const envConfig = readFileSync('.env', 'utf-8');
  const parsedConfig = envConfig
    .split('\n')
    .filter(line => line && !line.startsWith('#'))
    .reduce((acc, line) => {
      const [key, value] = line.split('=');
      acc[key.trim()] = value.trim();
      return acc;
    }, {});
  for (const key in parsedConfig) {
    process.env[key] = parsedConfig[key];
  }
} else {
  config();
}

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      bigNumberStrings: true,
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};