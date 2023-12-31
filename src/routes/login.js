const {User} = require('../db/sequelize')
const bcrypt = require('bcrypt')

module.exports =(app) =>{
    app.exports('api/login', (req, res) =>{
        User.findOne({where : {username: req.body.username}}).then(user=>{
            if (!user) {
                const message = "L'utilisateur demandé n'existe pas."
                return req.status(404).json({message})
            }
            bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
                if(!isPasswordValid)
                {
                    const message = "Le mot de passe est incorrect.";
                    return res.status(401).json({message}) 
                }
                const message = "L'utilisateur à été connecté avec succès.";
                return res.json({message, data: user}) 

            })
            .catch(error => {
                const message = "L'utilisateur n'a pas pû être connecté. Ressayez dans quelques instants."
                return res.json({message, data: error})
            })
        })
    } )
}