const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat = require("./models/chats.js");
const methodOverride=require("method-override")

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))


app.get("/",(req,res)=>{
    res.send(" root working");
})

app.listen(3000,(req,res)=>{
    console.log("listening to port 3000");
});

//index route
app.get("/chats",async(req,res)=>{
    try{
        let chats=await Chat.find();
    console.log(chats);
    // res.send("working");
    res.render("index.ejs",{ chats });
    }
    catch(err){
        res.status(500).send("error!!");
    }
    
})

//new route
app.get("/chats/new",(req,res)=>{
        res.render("new.ejs");

})

//create route
app.post("/chats",async (req,res)=>{
    try{   // for aync we use try catch to handle error
        let {from,to,message}=req.body;
        if (!from || (!to) || !message) {
                return res.status(400).send("error !! all fields are required");
        }
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
                res.status(400).send("error occured");
            });

        res.redirect("/chats");
    }
    catch(err){
         res.status(500).send("Error in saving ");
    }
})

//edit route
app.get("/chats/:id/edit",async (req,res)=>{
    try{
            // res.send("edit working");
        let {id}=req.params;
        let chat= await Chat.findById(id); //await bc we dont use then here , so put sync upar
        res.render("edit.ejs",{chat});

    }
    catch(err){
        res.status(400).send("error!!! invalid id");
    }

    
})

//update route
app.put("/chats/:id",async(req,res)=>{
    try{

        let {id}=req.params;
        let {message : newMessage}=req.body;
        let updatedChat=await Chat.findByIdAndUpdate(id , {message : newMessage},{runValidators:true, new : true});
        res.redirect("/chats");
    }
    catch(err){
        res.status(400).send("error!!! ");
    }
})

//delete route
app.delete("/chats/:id",async (req,res)=>{
    try{
        let {id}=req.params;
        let deletedChat =await Chat.findByIdAndDelete(id);
        res.redirect("/chats");
    }
    catch(err){
        res.status(400).send("error!!! ");
    }
    
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