import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
  host: 'localhost',
  user: 'mahmoudehab',
  password: 'admin',
  database: 'globalstore',
});

export default client;
