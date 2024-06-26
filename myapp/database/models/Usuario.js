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

    //relaciones
    Usuario.associate = function(models){
        Usuario.hasMany(models.Producto, {
            as: "producto", //alias de la relacion
            foreignKey: "idUsuario"
        }),
        Usuario.hasMany(models.Comentario, {
            as: "comentario", //alias de la relacion
            foreignKey: "idUsuario"
        })
    }
    return Usuario;
}