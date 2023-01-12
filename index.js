const express = require("express")
const mongoose = require("mongoose")

mongoose
	.connect("mongodb://localhost:27017/myBlog", { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		const app = express()
        app.use(express.json());

        app.use("/posts", require("./routes/posts.routes"))
        
		app.listen(3000, () => {
			console.log("Server has started!")
		})
	})