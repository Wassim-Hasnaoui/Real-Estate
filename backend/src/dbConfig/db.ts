import mysql from 'mysql2';


const pool = mysql.createPool({
  host: 'localhost',
  user: 'omar',
  password: 'root',
  database: 'real_state'
});


const promisePool = pool.promise();


pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database as ID ' + connection.threadId);
  connection.release(); 
});

export default promisePool;