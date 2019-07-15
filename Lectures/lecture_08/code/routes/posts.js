const express = require("express");
const router = express.Router();
const data = require("../data");
const postData = data.posts;

router.get("/new", (req, res) => {
  res.render("posts/new");
});

router.get("/:id", async (req, res) => {
  const post = await postData.getPostById(req.params.id);
  res.render("posts/single", { post: post });
});

router.get("/tag/:tag", (req, res) => {
  postData.getPostsByTag(req.params.tag).then(postList => {
    res.render("posts/index", { posts: postList });
  });
});

router.get("/", async (req, res) => {
  const postList = await postData.getAllPosts();
  res.render("posts/index", { posts: postList });
});

router.post("/", async (req, res) => {
  let blogPostData = req.body;
  let errors = [];

  if (!blogPostData.title) {
    errors.push("No title provided");
  }

  if (!blogPostData.body) {
    errors.push("No body provided");
  }

  if (!blogPostData.posterId) {
    errors.push("No poster selected");
  }

  if (errors.length > 0) {
    res.render("posts/new", {
      errors: errors,
      hasErrors: true,
      post: blogPostData
    });
    return;
  }

  try {
    const newPost = await postData.addPost(
      blogPostData.title,
      blogPostData.body,
      blogPostData.tags || [],
      blogPostData.posterId
    );

    res.redirect(`/posts/${newPost._id}`);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.put("/:id", (req, res) => {
  let updatedData = req.body;

  let getPost = postData.getPostById(req.params.id);

  getPost
    .then(() => {
      return postData
        .updatePost(req.params.id, updatedData)
        .then(updatedPost => {
          res.json(updatedPost);
        })
        .catch(e => {
          res.status(500).json({ error: e });
        });
    })
    .catch(() => {
      res.status(404).json({ error: "Post not found" });
    });
});

router.delete("/:id", (req, res) => {
  let getPost = postData.getPostById(req.params.id);

  getPost
    .then(() => {
      return postData
        .removePost(req.params.id)
        .then(() => {
          res.sendStatus(200);
        })
        .catch(e => {
          res.status(500).json({ error: e });
        });
    })
    .catch(() => {
      res.status(404).json({ error: "Post not found" });
    });
});

module.exports = router;
