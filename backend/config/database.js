if (process.env.NODE_ENV === 'production') {
  module.exports = {
    production: {
      use_env_variable: 'DATABASE_URL', // Use the DATABASE_URL environment variable for PostgreSQL in production
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // Allows connections to PostgreSQL with self-signed certificates
        }
      }
    }
  };
} else {
  module.exports = {
    development: {
      username: 'root',
      password: 'Eric@123',
      database: 'task_manager',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
  };
}
