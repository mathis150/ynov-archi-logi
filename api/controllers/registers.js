const { addRaspberry, getRaspberrys, getRaspberryById, deleteRaspberryById, pingRaspberry } = require('../services/registers')

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
      const { name, port } = req.params;
      if (!name || !port) {
        return res.status(400).json({
          success: false,
          message: 'Missing raspberry name or port'
        });
      }
      const raspberry = await addRaspberry(name, port);
      res.status(201).json({ success: true, raspberry });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error adding raspberry', error });
    }
  };
  

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

