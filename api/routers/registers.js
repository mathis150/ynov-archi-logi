const router = require('express').Router()
const { addRaspberry, getRaspberrys, getRaspberryById, deleteRaspberryById, pingRaspberry } = require('../controllers/registers')

router.get('/', getRaspberrys)
router.post('/:name', addRaspberry);
router.delete('/:id', deleteRaspberryById)
router.get('/:id', getRaspberryById)
router.get('/ping/:id', pingRaspberry);

module.exports = router