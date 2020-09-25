'use strict'
const { Client } = require('cassandra-driver');


const client = new Client({
    cloud: { secureConnectBundle: '/Users/bettinaswynnerton/Downloads/creds.zip' },
    credentials: { username: 'KVUser', password: 'KVPassword' }
  });

module.exports = client


