const pgp=require("pg-promise")()

require("dotenv").config()


const cn=process.env.DATABASE_URL?{
    connectionString:process.env.DATABASE_URL,
    max:30,
}

:
{   host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,}
const db=pgp(cn)

module.exports=db