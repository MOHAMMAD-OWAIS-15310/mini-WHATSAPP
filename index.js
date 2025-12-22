const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat = require("./models/chats.js");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));


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

//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

//create route
app.post("/chats",(req,res)=>{
    let {from,to,message}=req.body;
    let newChat=new Chat({
        from: from,
        to : to ,
        message :message,
        created_at :Date(),
    });
    // console.log(newChat);
    newChat.save()
        .then((res)=>{
            console.log("chat saved ");
        })
        .catch((err)=>{
            console.log("error occured here!!!!");
        });

    res.redirect("/chats");
})

//edit route
app.get("/chats/:id/edit",async (req,res)=>{
    // res.send("edit working");
    let {id}=req.params;
    let chat= await Chat.findById(id); //await bc we dont use then here , so put sync upar
    res.render("edit.ejs",{chat});
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