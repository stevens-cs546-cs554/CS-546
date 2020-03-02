const express = require('express');
const router = express.Router();
const data = require('../data');
const postData = data.posts;

router.get('/:id', async (req, res) => {
	try {
		const post = await postData.getPostById(req.params.id);
		res.json(post);
	} catch (e) {
		res.status(404).json({ error: 'Post not found' });
	}
});

router.get('/tag/:tag', async (req, res) => {
	const postList = await postData.getPostsByTag(req.params.tag);
	res.json(postList);
});

router.get('/', async (req, res) => {
	try {
		const postList = await postData.getAllPosts();
		res.json(postList);
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

router.post('/', async (req, res) => {
	const blogPostData = req.body;
	if (!blogPostData.title) throw 'You must supply a blog title';
	if (!blogPostData.body) throw 'You must supply a blog body';
	if (!blogPostData.posterId) throw 'You must supply a poster ID';
	try {
		const { title, body, tags, posterId } = blogPostData;
		const newPost = await postData.addPost(title, body, tags, posterId);
		res.json(newPost);
	} catch (e) {
		res.status(500).json({ error: e });
	}
});

router.put('/:id', async (req, res) => {
	const updatedData = req.body;
	if (!updatedData.title || !updatedData.body || !updatedData.posterId || !updatedData.tags)
		throw 'All fields need to be supplied';
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

router.patch('/:id', async (req, res) => {
	const requestBody = req.body;
	let updatedObject = {};
	try {
		const oldPost = await postData.getPostById(req.params.id);
		if (requestBody.title && requestBody.title !== oldPost.title) updatedObject.title = requestBody.title;
		if (requestBody.body && requestBody.body !== oldPost.body) updatedObject.body = requestBody.body;
		if (requestBody.tags && requestBody.tags !== oldPost.tags) updatedObject.tags = requestBody.tags;
		if (requestBody.posterId && requestBody.posterId !== oldPost.posterId)
			updatedObject.posterId = requestBody.posterId;
	} catch (e) {
		res.status(404).json({ error: 'Post not found' });
		return;
	}

	try {
		const updatedPost = await postData.updatePost(req.params.id, updatedObject);
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
