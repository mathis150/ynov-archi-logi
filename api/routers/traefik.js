const router = require('express').Router();
const { generateTraefikConfig } = require('../controllers/traefik');

// Route pour générer la configuration Traefik
router.get('/config', generateTraefikConfig);

module.exports = router;
