var express = require('express');
var router = express.Router();
var userControllers = require('../controllers/userControllers')
const { check, validationResult, body } = require('express-validator');

/* GET users listing. */
router.get('/', function(req, res) {
    res.send('respond with a resource');
});

router.get('/login', userControllers.login);
router.post('/login', [
    check('name').isLength({ min: 3 }).withMessage('El nombre no es valido'),
    check('email').isEmail().withMessage('El email no es valido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 digitos')
], userControllers.processLogin);

router.get('/check', function(req, res) {
    if (req.session.usuarioLogueado == undefined) {
        res.send('NO ESTAS LOGUEADO')
    } else {
        res.send('EL USUARIO LEGUEADO ES: ' + req.session.usuarioLogueado.name);
    }
})

module.exports = router;