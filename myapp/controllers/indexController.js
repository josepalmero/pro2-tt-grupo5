const data = require("../database/models")

const indexController = {
    //home page 
    index: function(req, res){
        //que se ordene de ultimo en prmer lugar 
        let filtro = {
            order: [["createdAt", "DESC"]]
        }

        //ralacion entre producto y usuario 
        let criterio = {
            include: [{association: "usuario"}] 
        }

        //nose si esta bien 
        data.Producto.findByPk(filtro, criterio)
        .then(function(result){
            //tendira que hacer una compariacion entre el id del producto
            //y el id del usuario para saber que usuario publico cada producto
            return res.render("index", {productos: result});
        }).catch(function(error){
            return console.log(error);
        })
    },

    header: function (req, res) {
        data.Producto.findAll()
        .then(function(result) {
            res.render('index', {productos: result});
        }).catch(function(error) {
            return console.log(error);
        })

    },
    
    headerLogueado: function(req, res){
        res.render("headerLogueado");
    },
};

module.exports = indexController;
