import express from 'express';
import Blog from '../../models/blogs/blogModel.js';

const blogRouter = express.Router();

// for add post -> from admin panel
blogRouter.post('/add', async (req, res) => {
    const newBlog = new Blog({
        title: req.body.title,
        image: req.body.image,
        description: req.body.description,
    });
    const blog = await newBlog.save();
    res.send({
        _id: blog._id,
        title: blog.title,
        image: blog.image,
        description: blog.description,
        author: blog.author
    })
});

// get all blogs -> for frontend
blogRouter.get('/all', async (req, res) => {
    const blogs = await Blog.find();
    res.send(blogs);
});

//get blog by id -> for frontend
blogRouter.get('/find/:id', async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
        res.send(blog);
    } else {
        res.status(404).send({ message: "¡.Blog NO Encontrado.!" });
    }
});

//count blogs for admin panel
blogRouter.get('/countBlogs', async (req, res) => {

    try {
        const countBlogs = await Blog.countDocuments({ author: 'Admin' });
        res.status(200).json({
            author: 'Admin', count: countBlogs
        });

    } catch (err) {
        console.log(err.message);
    }

});

//delete blog
blogRouter.delete('/delete/:id', async (req, res) => {

    try {

        await Blog.findByIdAndDelete(req.params.id);
        res.status(200).json('¡.El Blog Ha Sido Eliminado.!');

    } catch (err) {
        console.log('¡.NO Se Puede Eliminar.!');
    }

});

// update blog
blogRouter.put('/update', async (req, res) => {

    const blog = await Blog.findById(req.body._id);

    //if blog exists
    if (blog) {
        blog.title = req.body.title || blog.title;
        blog.image = req.body.image || blog.image;
        blog.description = req.body.description || blog.description;


        const updatedBlog = await blog.save();
        res.send({

            _id: updatedBlog._id,
            title: updatedBlog.title,
            image: updatedBlog.image,
            description: updatedBlog.description,
            author: updatedBlog.author

        });
    } else {

        res.status(401).send({ message: '¡.Blog NO Encontrado.!' });

    }
});

export default blogRouter;