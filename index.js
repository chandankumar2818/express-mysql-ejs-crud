import { faker } from "@faker-js/faker";
import mysql from "mysql2";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { count } from "console";
const app=express();
import methodoverride from "method-override"
import { v4 as uuidv4 } from "uuid";


app.use(methodoverride("_method"))
app.use(express.urlencoded({extended:true}))

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"));

const connection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"7295819906",
    database:"new_delta"
});



let getrandomuser=()=>{
    return[
        // faker.string.uuid(),
        faker.internet.username(),
        faker.internet.email(),
        faker.internet.password(),

    ]
};




// home
app.get("/",(req,res)=>{
    let q= `SELECT COUNT(*) FROM users`;
    
try {
    connection.query(q, (err,result)=>{
        if(err) throw err;
        let count= result[0]["COUNT(*)"];
        res.render("home.ejs",{count})
        
    })
} catch (err) {
    console.log(err)
    res.send("some error in db")
}
   
})


//show route
app.get("/user",(req,res)=>{
       let q= `SELECT * FROM users`;
    
try {
    connection.query(q, (err,user)=>{
        if(err) throw err;
        console.log(user);
       res.render("showusers.ejs",{user})
        
        
    })
} catch (err) {
    console.log(err)
    res.send("some error in db")
}
 
})

//Edit Route
app.get("/user/:id/edit",(req,res)=>{
    let {id}=req.params;
    let q=`SELECT * FROM users WHERE id='${id}'`
       
try {
    connection.query(q, (err,result)=>{
        if(err) throw err;
       let user=result[0]
       res.render("edit.ejs",{user})
        
        
    })
} catch (err) {
    console.log(err)
    res.send("some error in db")
}
   

// UPDAT (db) Route
app.patch("/user/:id",(req,res)=>{
     let {id}=req.params;
     let{password:formpass,username:newusername}=req.body;
    let q=`SELECT * FROM users WHERE id='${id}'`
        
try {
    connection.query(q, (err,result)=>{
        if(err) throw err;
       let user=result[0]
       if(formpass!= user.password){
        res.send("wrong password")
       }else{
            let q2=`UPDATE users SET username='${newusername}'WHERE ID='${id}'`;
            connection.query(q2,(err,result)=>{
                if(err) throw err;
                console.log(result);
            console.log("updated!");
                res.redirect("/user");
            })
       } 
    })
} catch (err) {
    console.log(err)
    res.send("some error in db")
}
    
})
})


// NEW User

app.get("/user/new",(req,res)=>{
    res.render("new.ejs")
})
app.post("/user/new",(req,res)=>{
    let {username,email,password}=req.body;
    let id=uuidv4();
    //sql query insert user 
  let q = `
  INSERT INTO users (id, username, email, password)
  VALUES ('${id}', '${username}', '${email}', '${password}')`;


    try {
        connection.query(q,(err,result)=>{
            if(err) throw err;
            console.log("Added new user")
            res.redirect("/user")
        
    })
    } catch (err) {
       console.log(err);
       res.send("some db in error")
       
    }

})



app.listen("3000",()=>{
    console.log("your server is running on port 3000")
});










// Insert new data
// let q="INSERT INTO users (username,email,password)VALUES (?,?,?)";

// let data=[];
// for(let i=0;i<=100;i++){
//    data.push(getrandomuser());

// }


// try {
//     connection.query(q,[data],(err,result)=>{
//         if(err) throw err;
//         console.log(result);
        
//     })
// } catch (err) {
//     console.log(err)
// }
// console.log("100 user inserted");


