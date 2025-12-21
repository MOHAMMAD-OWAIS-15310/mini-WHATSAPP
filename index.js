const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat = require("./models/chats.js");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))


app.get("/",(req,res)=>{
    res.send(" root working");
})

app.listen(3000,(req,res)=>{
    console.log("listening to port 3000");
});

//index route
app.get("/chats",async(req,res)=>{
    let chats=await Chat.find();
    console.log(chats);
    // res.send("working");
    res.render("index.ejs",{ chats });
})

// let chat1=new Chat({
//     from: "owais",
//     to: "zakariya",
//     message: "hello how are you ",
//     created_at : new Date(),
// });

// chat1.save()
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     })

main()
    .then(()=>{
    console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}