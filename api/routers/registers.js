const router = require('express').Router()
const { addRaspberry, getRaspberrys, getRaspberryById, deleteRaspberryById } = require('../controllers/registers')

router.get('/', getRaspberrys)
router.post('/', addRaspberry)
router.delete('/', deleteRaspberryById)
router.get('/:id', getRaspberryById)

module.exports = router
