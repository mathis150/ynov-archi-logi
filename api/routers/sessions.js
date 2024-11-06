const router = require('express').Router()
const { connectUser } = require('../services/sessions')

router.post('/', connectUser)

module.exports = router