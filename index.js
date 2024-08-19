import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var postData = [];
var curPage = 1;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

//home webpage (req from header.ejs and normal click at website link)
app.get("/", (req, res) => {
    res.render("index.ejs", {"data": postData, "page": curPage});
});

//get new post webpage  (req from header.ejs)
app.get("/new", (req, res)=> {
    res.render("post.ejs")
});

//about webpage 
app.get("/about", (req, res)=> {
    res.render("about.ejs")
});

//user click at post link (req from index.ejs near for loop)
app.get("/post", (req, res)=> {
    const findIndex = req.query.id.toString();

    res.render("curpost.ejs", { "title":req.query.title, "content":req.query.content, "id":findIndex});
});

//user can edit post (req from curpost.ejs)
app.get("/edit", (req, res)=> {
    
    res.render("edit.ejs", { 
        "id": req.query.curID,
        "title": req.query.curTitle,
        "content": req.query.curContent,
    });
});

// change page number (req from index.ejs)
app.post("/page", (req, res) => {
   
    if (req.body['page-num'] < 0) {
        curPage = 1;
    }

    else {
        curPage = Math.floor(Number(req.body['page-num']));
    }

    res.redirect("/");
});

//create new post (req from post.ejs)
app.post("/submit", (req, res) => {

    const newPost = [postData.length + 101 , req.body['post-title'], req.body['post-content']];

    if (req.body['post-title'] && typeof newPost[1] === 'string') {
        postData.push(newPost);
    }

    console.log(postData);

    res.redirect("/");
});

//edit post yes I know I should use PUT right? However, this is my first web project please have mercy.
app.post("/edit", (req, res) => {
    const changeTitle = req.body['editTitle'];
    const changeContent = req.body['editContent'];
    const changeId = req.body['editId'];

    console.log("Received ID:", changeId);
    console.log("Received Title:", changeTitle);
    console.log("Received Content:", changeContent);

    for (let findEdit = 0; findEdit < postData.length; findEdit++) {
        if (postData[findEdit][0] == changeId) {
            postData[findEdit][1] = changeTitle;
            postData[findEdit][2] = changeContent;
            break;
        }
    }

    res.redirect("/");
});

//delete the post (req from edit.ejs)
app.post("/delete", (req, res) => {
    
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  