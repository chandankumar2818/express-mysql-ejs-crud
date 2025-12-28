import mysql from "mysql2";

// connection create karo
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YourRootPassword",
  database: "student"   // jo DB tumne banaya ho
});

// connect
connection.connect((err) => {
  if (err) {
    console.log("❌ MySQL connection error:", err);
    return;
  }
  console.log("✅ MySQL Connected!");
});


const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
connection.query(sql, ["Chandan", "chandan@gmail.com"], (err, result) => {
  if (err) throw err;
  console.log("✅ Data Inserted");
});

connection.query("SELECT * FROM users", (err, results) => {
  if (err) throw err;
  console.log(results);
});
