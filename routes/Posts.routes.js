const express= require('express')
const Post = require("./models/Post")
const router = express.Router()
const ObjectId = require('mongoose').Types.ObjectId;

// GET ALL POSTS
router.get("/", async (req, res) => {
    const posts = await Post.find()
    res.send(posts)
})

router.get("/:id", async (req, res) => {
    const postId = req.params.id
    if (ObjectId.isValid(postId)) {
        const post = await Post.find({ _id: postId })
        if (post.length) res.status(200).json(post)
        else res.status(404).json({ error: 'No post found', details: `No record with id ${postId}`})
    } else {
        res.status(500).json({ error: 'Error looking up the post', details: 'Invalid ID provided'})
    }
})

// ADD NEW POSTS
router.post("/", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    })
    await post.save()
    res.status(200).json(post)
})

//DELETE POST
router.delete("/:id", async (req, res) => {
    const postId = req.params.id
    if (ObjectId.isValid(postId)) {
        const post = await Post.deleteOne({ _id: postId })
        if (post.deletedCount) res.status(200).json({ result: `Post with id ${postId} successfuly deleted`})
        else res.status(404).json({ error: 'No post found', details: `No record with id ${postId}`})
    } else {
        res.status(500).json({ error: 'Error looking up the post', details: 'Invalid ID provided'})
    }
})

module.exports = router;