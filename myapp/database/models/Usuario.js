module.exports = function (sequelize, dataTypes ) {
    let alias = "Usuario";

    let cols = {
        id: {
            autoIncrement : true,
            primaryKey : true,
            type : dataTypes.INTEGER
        },
        email: {
            type : dataTypes.STRING
        },
        contrasenia: {
            type : dataTypes.STRING
        },
        fecha: {
            type : dataTypes.DATE
        },
        dni: {
            type : dataTypes.INTEGER
        },
        foto: {
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
        tableName: "usuarios",
        timestamps: false,
        underscored: false
    }
    
    let Usuario = sequelize.define(alias, cols, config);

    //relacion entre usuario y peliculas
    Usuario.associate = function(models){
        Usuario.hasMany(models.Producto, {
            as: "productos", //alias de la relacion
            foreignKey: "idUsuario"
        });
    }

    //relacion entre usuario y comentarios
    Usuario.associate = function(models){
        Usuario.hasMany(models.Comentario, {
            as: "comentarioUsuario", //alias de la relacion
            foreignKey: "idUsuario"
        });
    }

    return Usuario;
}