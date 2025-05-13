import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const blogs = []; // Store blogs in this array

// GET route for home page
app.get("/", (req, res) => {
  res.render("home.ejs", { blogs: blogs });
});

// POST route to submit a new blog
app.post("/submit", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;

  const blog = {
    title: title,
    content: content,
  };

  blogs.push(blog); // Add blog to the array

  res.redirect("/"); // Redirect back to home page
});

// GET route for the update page (show current blog data)
app.get("/update/:index", (req, res) => {
  const index = req.params.index;
  const blog = blogs[index];

  res.render("update.ejs", { blog: blog, index: index });
});

// POST route for updating the blog
app.post("/update/:index", (req, res) => {
  const index = req.params.index;
  const updatedTitle = req.body.title;
  const updatedContent = req.body.content;

  // Update the blog at the given index
  blogs[index] = { title: updatedTitle, content: updatedContent };

  res.redirect("/"); // Redirect back to home page
});

// POST route for deleting a blog
app.post("/delete/:index", (req, res) => {
  const index = req.params.index;

  // Remove the blog from the array
  blogs.splice(index, 1);

  res.redirect("/"); // Redirect back to home page
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
