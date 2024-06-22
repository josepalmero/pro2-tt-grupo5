module.exports = function (sequelize, dataTypes ) {
    let alias = "Comentario";
    
    let cols = {
        id: {
            autoIncrement : true,
            primaryKey : true,
            type : dataTypes.INTEGER
        },
        idPost: {
            type : dataTypes.INTEGER
        },
        idUsuario: {
            type : dataTypes.INTEGER
        },
        texto: {
            type : dataTypes.STRING
        },
        createdAt: {
            type : dataTypes.DATE
        },
        updatedAt: {
            type : dataTypes.DATE
        },
        deletedAt: {
            type : dataTypes.DATE
        },
  	}

    let config = {
        tableName: "comentarios",
        timestamps: false,
        underscored: false
    }
    
    let Comentario = sequelize.define(alias, cols, config);


    //relaciones
    Comentario.associate = function(models){
        Comentario.belongsTo(models.Producto, {
            as: "comentarioProducto", //alias de la relacion
            foreignKey: "idPost"
        }),
        Comentario.belongsTo(models.Usuario, {
            as: "comentarioUsuario", //alias de la relacion
            foreignKey: "idUsuario"
        })
    }

    return Comentario;
}