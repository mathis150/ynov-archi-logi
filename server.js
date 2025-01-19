const express = require('express');
const { sequelize, authenticate } = require('./services/database');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

// Middleware pour parser JSON
app.use(express.json());

// Importer les routes
const raspberrysRouter = require('./api/routers/registers');
app.use('/registers', raspberrysRouter);

// Route par défaut
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Démarrer le serveur
const startServer = async () => {
  try {
    // Authentifiez la base de données
    await authenticate();
    console.log('Database connected successfully.');

    // Synchronisez les modèles
    await sequelize.sync({ alter: true });
    console.log('Database synchronized.');

    // Démarrez le serveur
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1); // Quittez en cas d'erreur critique
  }
};

startServer();
