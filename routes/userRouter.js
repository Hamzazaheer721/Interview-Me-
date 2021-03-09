const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')
const cors = require('./cors')

router.post('/register', userCtrl.register)
router.post('/activation', userCtrl.activateEmail)
router.post('/login', userCtrl.login)
router.post('/refresh_token', userCtrl.getAccessToken)
router.post('/forgot', userCtrl.forgotPassword)
router.post('/reset', auth,  userCtrl.resetPassword)
router.get('/infor', auth, userCtrl.getUserInfor)
router.get('/all_infor',cors.corsWithOptions, auth, authAdmin, userCtrl.getUsersAllInfor)
router.get('/logout', userCtrl.logout)
router.patch('/update', auth, userCtrl.updateUser)
router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)
router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)

// Social Login
router.post('/google_login', userCtrl.googleLogin)
router.post('/facebook_login', userCtrl.facebookLogin)

//test
router.post('/addtest', userCtrl.addtest)
router.post('/gettest', userCtrl.gettest)
router.post('/getresults', userCtrl.getresults)
router.post('/test', userCtrl.testapi)
router.post('/submittest', userCtrl.submittest)

module.exports = router;