const { sequelize } = require('../../services/database'); // Importez l'instance Sequelize
const RaspberryModel = require('../models/registers');
const ping = require('ping');
const net = require('net'); // Pour tester les connexions TCP
const Raspberry = RaspberryModel(sequelize); // Passez l'instance Sequelize au modèle

// Ajouter un Raspberry
exports.addRaspberry = async (name, port) => {
  return await Raspberry.create({ name, port });
};

// Récupérer tous les Raspberrys
exports.getRaspberrys = async () => {
  return await Raspberry.findAll();
};

// Récupérer un Raspberry par ID
exports.getRaspberryById = async (id) => {
  return await Raspberry.findByPk(id);
};

// Supprimer un Raspberry par ID
exports.deleteRaspberryById = async (id) => {
  const raspberry = await Raspberry.findByPk(id);
  if (raspberry) {
    await raspberry.destroy();
    return true;
  }
  return false;
};

// Ping un Raspberry par ID
exports.pingRaspberry = async (id) => {
  const raspberry = await Raspberry.findByPk(id);
  if (!raspberry) {
      throw new Error('Raspberry not found');
  }

  const { port } = raspberry; // Exemple: port 8081
  const host = '212.83.130.117'; // Adresse IP de la VM

  return new Promise((resolve, reject) => {
      const socket = new net.Socket();
      socket.setTimeout(2000); // Timeout après 2 secondes

      console.log(`Tentative de connexion à ${host}:${port}...`);

      // Tentative de connexion au port
      socket.connect(port, host, () => {
          socket.end(); // Terminer la connexion
          console.log(`Connexion réussie à ${host}:${port}`);
          resolve({ host, port, alive: true });
      });

      // Gestion des erreurs ou du timeout
      socket.on('error', (err) => {
          socket.destroy();
          console.error(`Erreur de connexion : ${err.message}`);
          resolve({ host, port, alive: false });
      });

      socket.on('timeout', () => {
          socket.destroy();
          console.log(`Timeout lors de la connexion à ${host}:${port}`);
          resolve({ host, port, alive: false });
      });
  });
};