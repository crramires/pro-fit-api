module.exports = {

  development: {
    client:'mysql2',
    connection: {
      host: '127.0.0.1',
      database: 'pro_fit',
      user: 'root',
      password: '1234'
    },
    migrations: {
      tableName: 'migrations',
      directory: 'database/migrations'
    },
    seeds: {
      directory: 'database/seeds'
    }
  }

};