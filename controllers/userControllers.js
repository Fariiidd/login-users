const fs = require('fs');
const { check, validationResult, body } = require('express-validator');

let usersControllers = {
    login: function(req, res) {
        return res.render('login');
    },
    processLogin: function(req, res) {
        let errors = validationResult(req);
        usuarioALogearse = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        if (errors.isEmpty()) {
            let usersJson = fs.readFileSync('users.json', 'utf-8');
            let users;
            if (usersJson == "") {
                users = [];
            } else {
                users = JSON.parse(usersJson);
            }

            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.email) {
                    usuarioALogearse = users[i];
                    break;
                }

            }
            if (usuarioALogearse == undefined) {
                return res.render('login', {
                    errors: [
                        { msg: 'Credenciales invalidas' }
                    ]
                });
            }

            req.session.usuarioLogueado = usuarioALogearse;
            if (req.body.recordame != undefined) {
                res.cookie('recordame', usuarioALogearse.email, { maxAge: 60000 })
            }
            res.send("Hola bienvenido/a");

        } else {
            return res.render('login', { errors: errors.errors });
        }
    }
}

module.exports = usersControllers;