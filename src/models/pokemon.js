const { Sequelize, DataTypes } = require("sequelize", "Datatypes");
const validTypes = ["Plante ", " Poison", " Feu",  " Eau", " Insecte" , " Vol", " Normal", " Electrik", " Fée"]

module.exports  = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type:DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Ce nom existe déjà."
            },
            validate: {
                notEmpty: {msg: "Utilisez uniquement les chaînes de caractère pour le nom de ce pokemon."},
                notNull: {msg: "Le nom du Pokémon ne peut pas être vide."},
                min: {
                    args: [0],
                    msg: "Le nom de ce pokemon ne doit pas être inferieur à 0 caractère."
                },
                max: {
                    args: [25],
                    msg : "Le nom de ce pokemon ne doit pas être superieur à 25 caractère."
                }
            }
        },
        hp: {
            type:DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt : {msg : "Utilisez uniquement des nombres entiers pour les points de vie."},
                notNull: {msg: "Les points de vie sont une propriété requise."},
                min: {
                    args: [0],
                    msg: "le point de vie ne doit pas être inférieur à 0."
                },
                max:{
                    args: [999],
                    msg: "Le nombre de vie ne doit pas être supérieur à 999."
                }
            }
        },
        cp: {
            type:DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: {msg: "Utilisez uniquement les nombres entiers pour les points de combats."},
                notNull: {msg: "Les points de vie sont une priorité requise."},
                min: {
                    args: [0],
                    msg: "le point de vie ne doit pas être inférieur à 0."
                },
                max:{
                    args: [99],
                    msg: "Le nombre de vie ne doit pas être supérieur à 99."
                }
            }
        },
        picture: {
            type:DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: {msg: "Utilisez uniquement une URL pour l'image du pokemon."},
                notNull: {msg: "l'image est une proprieté requise ."},
            }
        },
        types: {
            type:DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('types').split(',')
            },
            set (types) {
                this.setDataValue('types', types.join())
            }, 
            // validate: {
            //     isTypesValid(value){
            //         if(!value) {
            //             throw new Error('Un pokemon doit au moins avoir un type.')
            //         };
            //         if(value.split(',').length > 3){
            //             throw new Error('Un pokemon ne peux pas avoir plus de trois type.')
            //         };
            //         value.split(',').forEach(type => {
            //             if(!validTypes.includes(type))
            //             {
            //                 throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante: ${validTypes}`)
            //             }
            //         });
            //     }
            // }

        }
        
    },
    {
        timestamps: true,
        createAt: 'created',
        updatedAt: false
    })
}