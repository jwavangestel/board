const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "280558Hm1*pg",
    database: "takenbord"
})

module.exports = client