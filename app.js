const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 4001

app
    .use(morgan('dev'))
    .use(bodyParser.json())
sequelize.initDb()

// Ici, nous placerons nos futurs points de terminaison.
require('./src/routes/findAllpokemons')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon.js')(app)
require('./src/routes/login')(app)

// on ajoute la gestion de erreurs 404
app.use(({res}) => {
    const message = 'Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})


app.listen(port, ()=>console.log(`Notre Application Node est démarrée sur : http://localhost:${port}`))
