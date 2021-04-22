let controller ={};

let models = require('../models');
let sequelize = require('sequelize');
let Op = sequelize.Op;

controller.search=(keyword)=>{
    return models.Recipe.findAll({
        where: {
            [Op.or]:{
                title:{[Op.iLike]: `%${keyword}%`},
                description:{[Op.iLike]: `%${keyword}`}
            }
        }
    });
};

controller.getById=(id)=>{
    return models.Recipe.findOne({
        where: {id:id},
        include:[{
            model: models.Ingredient,
            as: 'Ingredients'
        },
        {
            model: models.Direction,
            as: 'Directions',
            order: ['order']
        }
    ]
    });
};

controller.getAll=()=>{
    return models.Recipe.findAll({
        include:[{
            model: models.Ingredient,
            as: 'Ingredients',
            limit: 3
        }]
    });
};

module.exports = controller;