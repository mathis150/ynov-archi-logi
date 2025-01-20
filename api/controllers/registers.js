const { addRaspberry, getRaspberrys, getRaspberryById, deleteRaspberryById, pingRaspberry } = require('../services/registers')

const PORT_RANGE_HTTP = { start: 8100, end: 8199 };

exports.getRaspberrys = async (req, res) => {
  try {
    const raspberrys = await getRaspberrys();
    res.json({
      success: true,
      raspberrys
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving raspberrys', error });
  }
};

exports.getRaspberryById = async (req, res) => {
  try {
    const raspberry = await getRaspberryById(req.params.id);
    if (!raspberry) {
      return res.status(404).json({ success: false, message: 'Raspberry not found' });
    }
    res.json(raspberry);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error retrieving raspberry', error });
  }
};

exports.addRaspberry = async (req, res) => {
  try {
    const { name } = req.params;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Missing raspberry name'
      });
    }

    // Récupérer tous les Raspberry existants depuis la BDD
    const raspberrys = await getRaspberrys(); // Cette fonction interroge la BDD
    const usedHttpPorts = new Set(raspberrys.map(r => r.port)); // Extraire les ports déjà utilisés

    // Trouver un port HTTP disponible dans la plage définie
    const availableHttpPort = findAvailablePort(PORT_RANGE_HTTP, usedHttpPorts);
    if (!availableHttpPort) {
      return res.status(500).json({
        success: false,
        message: 'No available HTTP ports in the defined range'
      });
    }

    // Ajouter le nouveau Raspberry avec le port attribué
    const raspberry = await addRaspberry(name, availableHttpPort); // Sauvegarder dans la BDD
    res.status(201).json({
      success: true,
      raspberry
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding raspberry',
      error
    });
  }
};

// Fonction utilitaire pour trouver un port disponible
function findAvailablePort(range, usedPorts) {
  for (let port = range.start; port <= range.end; port++) {
    if (!usedPorts.has(port)) {
      return port; // Retourne le premier port disponible
    }
  }
  return null; // Aucun port disponible
}


  
exports.deleteRaspberryById = async (req, res) => {
  try {
    const success = await deleteRaspberryById(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Raspberry not found' });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting raspberry', error });
  }
};

exports.pingRaspberry = async (req, res) => {
  try {
    const { id } = req.params; // Récupère l'ID du Raspberry
    const result = await pingRaspberry(id); // Appelle la méthode du service
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    if (error.message === 'Raspberry not found') {
      return res.status(404).json({ success: false, message: error.message });
    }
    res.status(500).json({ success: false, message: 'Error pinging Raspberry', error });
  }
};

