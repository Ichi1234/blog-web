import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var postData = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

//home webpage
app.get("/", (req, res) => {
    res.render("index.ejs", {"data": postData});
});

//create new post webpage
app.get("/new", (req, res)=> {
    res.render("post.ejs")
});

//about webpage
app.get("/about", (req, res)=> {
    res.render("about.ejs")
});

//create new post
app.post("/submit", (req, res) => {

    const postTitle = req.body['post-header'];

    if (req.body['post-header'] && typeof postTitle === 'string') {
        postData.push(postTitle);
    }

    console.log(postData)

    res.redirect("/")
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  