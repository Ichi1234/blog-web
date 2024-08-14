import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var postData = [];
var curPage = 1;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

//home webpage
app.get("/", (req, res) => {
    res.render("index.ejs", {"data": postData, "page": curPage});
});

//create new post webpage
app.get("/new", (req, res)=> {
    res.render("post.ejs")
});

//about webpage
app.get("/about", (req, res)=> {
    res.render("about.ejs")
});

//user click at post link
app.get("/post", (req, res)=> {
    res.render("curpost.ejs", { "title":req.query.title, "content":req.query.content});
});

// change page number
app.post("/page", (req, res) => {
   
    if (req.body['page-num'] < 0) {
        curPage = 1;
    }

    else {
        curPage = Math.floor(Number(req.body['page-num']));
    }


    res.redirect("/");
});

//create new post
app.post("/submit", (req, res) => {

    const newPost = [`${postData.length + 1}.${req.body['post-title']}`, req.body['post-content']];

    if (req.body['post-title'] && typeof newPost[0] === 'string') {
        postData.push(newPost);
    }

    console.log(postData);

    res.redirect("/");
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  