const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));

const hbs = require('express-handlebars');
app.engine('hbs',hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts', 
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
}));
app.set('view engine', 'hbs');

app.get('/sync',(req, res) => {
    let models = require('./models');
    models.sequelize.sync().then(() => {
        res.send('tables created');
    })
});

app.get('/',(req, res) => {
    res.render('index');
})
app.use('/recipes',require('./routes/recipeRoute'));

app.set('port',process.env.PORT || 5000);
app.listen(app.get('port'),()=>{
    console.log(`server is running on port ${app.get('port')}`);
})