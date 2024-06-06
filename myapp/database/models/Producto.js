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
        delatedAt: {
            type : dataTypes.DATE
        },
  	}

    let config = {
        tableName: "productos",
        timestamps: false,
        underscored: false
    }
    
    let Producto = sequelize.define(alias, cols, config);

    Producto.associate = function(models) {
        Producto.belongsTo(models.Usuario , {
            as: "usuario",  // alias de la relacion 
            foreignKey: "idUsuario"
        });
    }

    return Producto;
}