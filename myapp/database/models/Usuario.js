module.exports = function (sequelize, dataTypes ) {
    let alias = "Movie";

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
        delatedAt: {
            type : dataTypes.DATE
        },
  	}

    let config = {
        tableName: "usuarios",
        timestamps: false,
        underscored: false
    }
    
    let Usuario = sequelize.define(alias, cols, config);
    return Usuario;
}