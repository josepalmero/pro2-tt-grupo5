const data = require("../database/models")
const op = data.Sequelize.Op;

const indexController = {
    header: function (req, res) {
        data.Producto.findAll()
        .then(function(result) {

            //return res.send(result)
            res.render('index', {productos: result});

        }).catch(function(error) {
            return console.log(error);
        })

    },
    
    headerLogueado: function(req, res){
        res.render("headerLogueado");
    },

    search: function(req, res){
        let busqueda = req.query.producto;  
        
        let filtrado = {
            where: {
                nombre: {[op.like]: "%" + busqueda + "%"}
            },
            order: [
                ['id', 'DESC']
              ]
        }

        data.Producto.findOne(filtrado)
        .then(function(result){
            if (result) {
                return res.send(result)
            } else {
                return res.send('No hay resultados para su criterio de busqueda')
            }
        }).catch(function(err){
            return console.log(err);
        });
    },
};

module.exports = indexController;
