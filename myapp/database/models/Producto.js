module.exports = function (sequelize, dataTypes ) {
    let alias = "Producto";

    let cols = {
        id: {
            autoIncrement : true,
            primaryKey : true,
            type : dataTypes.INTEGER
        },
        idUsuario: {
            type : dataTypes.INTEGER
        },
        foto: {
            type : dataTypes.STRING
        },
        nombre: {
            type : dataTypes.STRING
        },
        descripcion: {
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
        tableName: "productos",
        timestamps: false,
        underscored: false
    }
    
    let Producto = sequelize.define(alias, cols, config);

    //relaciones
    Producto.associate = function(models) {
        Producto.belongsTo(models.Usuario , {
            as: "usuario",  // alias de la relacion 
            foreignKey: "idUsuario"
        }),
        Producto.hasMany(models.Comentario , {
            as: "comentarios", // el alias dela relacion
            foreignKey: "idPost"
        })
    }

    return Producto;
}