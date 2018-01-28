const express = require('express');
const router = express.Router();

const option_controller = require('../controllers/optionController')
const poll_controller = require('../controllers/pollController')
const user_controller = require('../controllers/userController')

/// POLL ROUTES ///

// GET Home Page
router.get('/', poll_controller.index)

// GET Poll create
router.get('/polls/create', poll_controller.poll_create_get)

// POST Poll create
router.post('/polls/create', poll_controller.poll_create_post)

// GET Poll delete
router.get('/polls/:id/delete', poll_controller.poll_delete_get)

// POST Poll delete
router.post('/polls/:id/delete', poll_controller.poll_delete_post)

// GET Poll update
router.get('/polls/:id/update', poll_controller.poll_update_get)

// POST Poll update
router.post('/polls/:id/update', poll_controller.poll_update_post)

// GET Poll
router.get('/polls/:id', poll_controller.poll_detail)

// GET Polls
router.get('/polls', poll_controller.poll_list)

/// USER ROUTES ///

// GET User create
router.get('/users/create', user_controller.user_create_get)

// POST User create
router.post('/users/create', user_controller.user_create_post)

// GET User delete
router.get('/users/:id/delete', user_controller.user_delete_get)

// POST User delete
router.post('/users/:id/delete', user_controller.user_delete_post)

// GET User update
router.get('/users/:id/update', user_controller.user_update_get)

// POST User update
router.post('/users/:id/update', user_controller.user_update_post)

// GET User
router.get('/users/:id', user_controller.user_detail)

// GET Users
router.get('/users', user_controller.user_list)

/// OPTIONS ROUTES ///

// GET Option create
router.get('/options/create', option_controller.option_create_get)

// POST Option create
router.post('/options/create', option_controller.option_create_post)

// GET Option delete
router.get('/options/:id/delete', option_controller.option_delete_get)

// POST Option delete
router.post('/options/:id/delete', option_controller.option_delete_post)

// GET Option update
router.get('/options/:id/update', option_controller.option_update_get)

// POST Option update
router.post('/options/:id/update', option_controller.option_update_post)

// GET Option
router.get('/options/:id', option_controller.option_detail)


module.exports = router