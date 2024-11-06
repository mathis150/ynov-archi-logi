const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

class DataBase {
    constructor() {
        this.sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASS, {
            host: process.env.HOSTNAME,
            dialect: 'mysql'
        })
    }

    async authenticate() {
        try {
            await this.sequelize.authenticate() // Utilisez this.sequelize ici
            console.log('Connection has been established successfully.')
        } catch (error) {
            console.error('Unable to connect to the database:', error)
        }
    }
}

module.exports = DataBase
