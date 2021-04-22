const express = require('express')
const route = express.Router();
const controller = require('../controllers/recipeController');
route.get('/',(req, res) =>{ 
    //console.log(req.query.keyword);
    let keyword = req.query.keyword;
    //console.log(keyword);
    if(keyword==undefined){
        controller.getAll()
        .then(recipes=>{
            recipes.forEach((item,index)=>{
                item.order = index%2;
            })
            console.log(recipes);
            res.locals.recipes = recipes;
            res.render('recipes');
        });
    } else {
        controller.search(keyword)
        .then(results=>{
            //console.log(results);
            res.locals.recipes = results;
            res.render('recipes');
        });
    }
});

route.get('/:id',(req, res) =>{
    let id = req.params.id;
    controller.getById(id)
    .then(recipe=>{
        console.log(recipe);
        res.locals.recipe = recipe;
        res.render('featured');
    })
    
});

module.exports = route;