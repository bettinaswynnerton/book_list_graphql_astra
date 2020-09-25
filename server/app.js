const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require("./schema/schema")
const { Client } = require('cassandra-driver');
const cors = require('cors')
const client = require('./connect-database')

const app = express()

//allow cors
app.use(cors())

// const client = new Client({
//     cloud: { secureConnectBundle: '/Users/bettinaswynnerton/Downloads/creds.zip' },
//     credentials: { username: 'KVUser', password: 'KVPassword' }
//   });

client.connect()
console.log("client connected")

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, () => {console.log("now listening on port 4000")})