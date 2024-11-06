const { Sequelize, DataTypes, Model } = require('sequelize')
const DataBase = require('./services/database.js')

const database = new DataBase()

database.authenticate()

class Sessions extends Model {}
Sessions.init({
  uuid : {
    type: DataTypes.STRING(64),
    primaryKey: true
  },
  author : {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  created_at : {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false
  }
}, { database, modelName: 'sessions', timestamps: false });

exports.connectUser = async (username, password) => {
  //No code actually
  /*let table = {
    informations: {
      statut: 200,
      message: "Le livre a bien était enregistré !"
    }
  };

  if(name.length === 0 || reference.length === 0 || rental_price.length === 0) {
    table.informations.statut = 400;
    table.informations.message = "Merci de remplir les champs suivant pour créer un livre: name, reference, rental_price.";
    return table
  }
  else {
    await sequelize.sync();
    const createBook = await Books.create({
        name: name,
        reference: reference,
        rental_price: rental_price
    });
  }*/
  return table;
}