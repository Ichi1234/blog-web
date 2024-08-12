import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var postData = [];

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("index.ejs", {"data": postData});
});

app.post("/submit", (req, res) => {

    const postTitle = req.body['post-header'];

    if (req.body['post-header'] && typeof postTitle === 'string') {
        postData.push(postTitle);
    }

    console.log(postData)

    res.render("index.ejs", {"data": postData});
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  