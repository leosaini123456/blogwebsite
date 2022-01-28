//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://blog:blog@cluster0.7ntgj.mongodb.net/BlogWebsite?retryWrites=true&w=majority").then(()=>{
  console.log("DataBase Connected");
}).catch((err)=>{
  console.log(err);
})


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

//create schema
const PostSchema = mongoose.Schema({
  Title : {
    type : String,
    required : true
  },
  Desc : {
    type:String,
    required : true
  }
})

const Post = new mongoose.model("Post",PostSchema);


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// let posts = [];
let reqTitle = null;

app.get("/",(req,res)=>{

  Post.find({},function(err,posts){
    res.render("home", {
 
      homecontent : homeStartingContent, 
      postdata : posts
 
      });
  })
})

app.get("/about",(req,res)=>{
  res.render("about", {aboutcontent : aboutContent });
})

app.get("/contact",(req,res)=>{
  res.render("contact", {Contectcontent : contactContent });
})

app.get("/compose",(req,res)=>{
  res.render("compose");
})

app.post("/compose",(req,res)=>
{
  const CreatePost = async ()=>{
    const document = new Post({
      Title : req.body.postTitle,
      Desc : req.body.postDesc

    })
    const result = await Post.insertMany([document]);
    console.log(result);
  }
  CreatePost();
 res.redirect("/");
})

app.get("/posts/:postId",(req,res)=>{
  reqId = req.params.postId; 
  Post.findOne({_id : reqId},function(err, post){
    res.render("post",{
      title : post.Title,
      desc: post.Desc
    })
  })

})


app.listen(8000, function() {
  console.log("Server started on port 8000");
});
