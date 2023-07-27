import express from 'express';
import User from '../../models/users/userModel.js';
import bcrypt from 'bcryptjs';

const userRouter = express.Router();

//for login user
userRouter.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    //if user exists
    if (user) {
        //hash password
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                fullname: user.fullname,
                username: user.username,
                email: user.email,
                password: user.password,
                isAdmin: user.isAdmin
            });

            return;
        }
    }
    res.status(401).send({ message: "¡.Contraseña O Correo Electrónico NO Válido.!" });
});

// for register user
userRouter.post('/register', async (req, res) => {
    const newUser = new User({
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    });
    const user = await newUser.save();
    res.send({
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
    })
});

//for update user
userRouter.put('/update', async (req, res) => {
    const user = await User.findById(req.body._id);
    //if user exists
    if (user) {
        //if you want to update username or email
        user.fullname = req.body.fullname || user.fullname;
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        //I will just update the password
        if (req.body.password) {
            user.password = bcrypt.hashSync(req.body.password);
        }

        const updatedUser = await user.save();
        res.send({
            _id: updatedUser._id,
            fullname: updatedUser.fullname,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });

    } else {
        res.status(401).send({ message: '¡.Usuario NO Encontrado.!' });
    }
});

// get all users -> for admin panel
userRouter.get('/all', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

//get user by id -> for admin panel
userRouter.get('/find/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({ message: "¡.Usuario NO Encontrado.!" });
    }
});

//count users for admin panel
userRouter.get('/countUsers', async (req, res) => {

    try {
        //i want only non-admin users
        const countUsers = await User.countDocuments({ isAdmin: false });
        res.status(200).json({
            isAdmin: false, count: countUsers
        });

    } catch (err) {
        console.log(err.message);
    }

});

//delete user
userRouter.delete('/delete/:id', async (req, res) => {

    try {

        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('¡.El Usuario Ha Sido Eliminado.!');

    } catch (err) {
        console.log('¡.NO Se Puede Eliminar.!');
    }

});

export default userRouter;