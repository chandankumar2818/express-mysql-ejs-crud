import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',       // localhost ke bajaye 127.0.0.1
  user: 'root',
  password: 'YourRootPassword',
  database: 'new_delta'
});
//inserting new data
let q="INSERT INTO users (id,username,email,password)VALUES (?, ?, ?, ?)";
let user=["125","125","mnop@gmail.com","mnop"];


try {
    connection.query(q,user,(err,result)=>{
    if(err) throw err;
    console.log(result);
    console.log(result[0]);

})
} catch (error) {
    console.log(err)
}
