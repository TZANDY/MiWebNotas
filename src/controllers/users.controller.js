const usersController = {};
const passport = require('passport');
const pattern = new RegExp('^[A-Z]+$', 'i');
const User = require('../Models/User');


usersController.renderSignUpForm = (req, res) => {
    res.render('users/signup');
}
usersController.signup = async(req, res) => {
    const errors = [];
    const { nombre, apellido, email, password, confirmpassword, terminos_condiciones, politicas_privacidad } = req.body;
    if (nombre.length <= 0) {
        errors.push({ text: 'Debe ingresar su nombre' });
    }
    if (apellido.length <= 0) {
        errors.push({ text: 'Debe ingresar su apellido' });
    }
    if (email.length <= 0) {
        errors.push({ text: 'Debe ingresar su correo' });
    }
    if (password != confirmpassword) {
        errors.push({ text: 'Las contraseñas no coinciden' });
    }
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe tener más de 4 caracteres' });
    }
    if (!pattern.test(nombre)) {
        errors.push({ text: 'El nombre debe tener solo letras' });
    }
    if (!pattern.test(apellido)) {
        errors.push({ text: 'El apellido debe tener solo letras' });
    }
    if (errors.length > 0) {
        res.render('users/signup', { errors, nombre, apellido, email });
    } else {
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
            req.flash('error_msg', 'El email ya esta en uso');
            res.redirect('/users/signup');
        } else {
            const newUser = new User({ nombre, apellido, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'Cuenta creada, ya puedes iniciar sesion');
            res.redirect('/users/signin');
        }
    }
}
usersController.renderSignInForm = (req, res) => {
    res.render('users/signin');
}
usersController.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
});
usersController.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Sesion terminada');
    res.redirect('/users/signin');
}

module.exports = usersController;