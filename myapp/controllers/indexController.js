const data = require("../database/models")

const indexController = {
    //home page 
    index: function(req, res){
        //que se ordene de ultimo en prmer lugar 
        let filtro = {
            //include: [{association: "usuario"}] ,
            order: [["createdAt", "DESC"]]
        }

        data.Producto.findAll(filtro)
        .then(function(result){
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
