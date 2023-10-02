if (process.env.NODE_ENV === 'production') {
  module.exports = {
    production: {
      dialect: 'postgres',
      host: 'db.solredhrdykcytemkldu.supabase.co',
      username: 'postgres',
      password: process.env.POSTGRES_PW,
      database: 'postgres',
    }
  };
} else {
  module.exports = {
    development: {
      username: 'root',
      password: process.env.MYSQL_PW,
      database: 'task_manager',
      host: '127.0.0.1',
      dialect: 'mysql',
    },
  };
}
