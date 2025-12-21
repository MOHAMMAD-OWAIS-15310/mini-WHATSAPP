const mongoose=require("mongoose");
const Chat = require("./models/chats.js");

main()
    .then(()=>{
    console.log("connection successful");
    })
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chats=[
    {
    from: "owais",
    to: "zakariya",
    message: "hello how are you ",
    created_at : new Date(),
    },
    {
    from: "zakariya",
    to: "owais",
    message: "hello ",
    created_at : new Date(),
    },
    {
    from: "sahil",
    to: "owais",
    message: "how are you ",
    created_at : new Date(),
    },
    {
    from: "yash",
    to: "abdullah",
    message: "hii guys",
    created_at : new Date(),
    }
]
Chat.insertMany(chats);

