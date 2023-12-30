const Router = require('express')
const userControllers = require('../controllers/user-controller.js')
const router = new Router

console.log('router: ', router)

router.post('/registration', userControllers.registration)
router.post('/login', userControllers.login)
router.post('/lodout', userControllers.lodout)
router.get('/activate/:link', userControllers.activate)
router.get('/refresh', userControllers.refresh)
router.get('/users', userControllers.getUsers)

export default router