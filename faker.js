import { faker } from "@faker-js/faker";
import mysql from "mysql2";
// const express=require("express");
// const app=express();
const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"YourRootPassword",
    database:"new_delta"
});





let getrandomuser=()=>{
    return[
        faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),

    ]
};


let q="INSERT INTO users (username,email,password)VALUES (?,?,?)";

let data=[];
for(let i=0;i<=900;i++){
   console.log(getrandomuser())
}
