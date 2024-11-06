const express = require('express')
const DataBase = require('./services/database.js') // Assurez-vous de nommer correctement cette importation

const app = express()
const database = new DataBase() // Instanciez la classe ici
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, async () => {
  await database.authenticate() // Utilisez await pour la méthode async
  console.log(`Example app listening on port ${port}`)
})