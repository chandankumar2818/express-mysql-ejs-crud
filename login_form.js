import { faker } from "@faker-js/faker";
import mysql from "mysql2";

const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"YourRootPassword",
    database:"new_delta"
});

const user= {
    username:"127_chandan",
    email:"chandan@gmail.com",
    password:"abcde"
}

// ab check hoga 

const checkquer="SELECT * FROM users WHERE email= ?";

connection.query(checkquer,[user.email],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
        console.log("❌ user already registered");
    }
    else{ 
        const insertquery="INSERT INTO users (username,email,password)VALUES (?,?,?)";

        connection.query(insertquery,[user.username,user.email,user.password],(err,result)=>{
            if(err) throw err;
            console.log("✅ user registered seccessfully");
            
        })
    }
});

