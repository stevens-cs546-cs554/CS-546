const express = require('express');
const router = express.Router();
const data = require('../data');
const postData = data.posts;
const userData = data.users;

router.get('/new', async (req, res) => {
  const users = await userData.getAllUsers();
  res.render('posts/new', { users: users });
});

router.get('/:id', async (req, res) => {
  try {
    const post = await postData.getPostById(req.params.id);
    res.render('posts/single', { post: post });
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get('/tag/:tag', async (req, res) => {
  const postList = await postData.getPostsByTag(req.params.tag);
  res.render('posts/index', { posts: postList });
});

router.get('/', async (req, res) => {
  const postList = await postData.getAllPosts();
  res.render('posts/index', { posts: postList });
});

router.post('/', async (req, res) => {
  let blogPostData = req.body;
  let errors = [];

  if (!blogPostData.title) {
    errors.push('No title provided');
  }

  if (!blogPostData.body) {
    errors.push('No body provided');
  }

  if (!blogPostData.posterId) {
    errors.push('No poster selected');
  }

  if (errors.length > 0) {
    const users = await userData.getAllUsers();
    res.render('posts/new', {
      errors: errors,
      hasErrors: true,
      post: blogPostData,
      users: users
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

router.put('/:id', async (req, res) => {
  let updatedData = req.body;
  try {
    await postData.getPostById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }
  try {
    const updatedPost = await postData.updatePost(req.params.id, updatedData);
    res.json(updatedPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await postData.getPostById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  try {
    await postData.removePost(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
