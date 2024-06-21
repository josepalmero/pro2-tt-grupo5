const data = require("../database/models")

const indexController = {
    //home page 
    index: function(req, res){
        let form = req.body;

        //que se ordene de ultimo en prmer lugar 
        let filtro = {
            order: [["createdAt", "DESC"]]
        }

        //ralacion entre producto y usuario 
        let criterio = {
            include: [{association: "usuario"}] 
        }

        let id = req.params.id;
        let userId = req.session.id;

        //nose si esta bien y tampoco si va aca o en el controller prodcto 
        data.Producto.findByPk(filtro, criterio)
        .then(function(result){
            if (userId == id) {
                
            } else {
                
            }
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
