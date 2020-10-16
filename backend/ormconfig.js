const connections = {
    "test": {
    "type": "mysql",
    "host": "127.0.0.1",
    "port": 3306,
    "username": "root",
    "password": "mysql123",
    "database": "app_dev",
    "synchronize": true,
    "logging": false,
    "entities": ["src/entity/*.ts"],
    "migrations": ["src/migration/*.ts"],
    "subscribers": ["src/subscriber/**/*.ts"],
    "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
    }
  },
  "default": {
    "type": "mysql",
    "host": "127.0.0.1",
    "port": 3306,
    "username": "root",
    "password": "mysql123",
    "database": "app_dev",
    "synchronize": true,
    "logging": false,
    "entities": ["build/entity/*.js"],
    "migrations": ["build/migration/*.js"],
    "subscribers": ["build/subscriber/**/*.js"],
    "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
    }
  }
};
module.exports = connections[process.env.NODE_ENV == 'test' ? "test" : "default"];