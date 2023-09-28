const pokemons = require('../db/mock-pokemon')
const { Pokemon } = require('../db/sequelize')
const {Op} = require('sequelize')


module.exports = (app) => {
    app.get('/api/pokemons', (req, res) =>{
        if (req.query.name) {
            const name = req.query.name
            const limit = parseInt(req.query.limit) || 5
            if (name.length < 2) {
                const message ="La recherche minimun est de 02 elements"
                return res.status(400).json({message})
            }
            return Pokemon.findAndCountAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`  //name est le critère de recherche
                    }
                },
                order: ['name'],
                limit : limit
            }) 
            .then(({count, rows}) => {
                const message =  `Il y'a ${count} pokémons qui correspondent au terme de recherché ${name}`
                res.json({message, data: rows})
            })
        }
        else 
        {
            Pokemon.findAll({order: ['name']})
            .then(pokemons =>{
                const message = 'la liste des pokémons à bien été récupéré.'
                res.json({message, data: pokemons})
            })
            .catch (error => {
                const message = "La liste des pokemons n'a pas pu être récupérée. Réessayez dans quelques instants."
                res.status(500).json({message, data: error})
            })
        }
        
    })
}
