module.exports = {
  development: {
    username: 'root',
    password: 'Eric@123',
    database: 'task_manager',
    host: '127.0.0.1',
    dialect: 'mysql',
    schema: "task_manager"
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    schema: "task_manager"
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
    schema: "task_manager"
  },
};
