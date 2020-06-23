function recordameMiddleware(req, res, next) {
    next();

    if (req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined) {
        let usersJson = fs.readFileSync('users.json', 'utf-8');
        let users;
        if (usersJson == "") {
            users = [];
        } else {
            users = JSON.parse(usersJson);
        }
        let usuarioALogearse;
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == req.cookies.email) {
                usuarioALogearse = users[i];
                break;
            }

        }

        req.session.usuarioLogueado = usuarioALogearse;
    }
}


module.exports = recordameMiddleware;