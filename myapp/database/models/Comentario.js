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
        delatedAt: {
            type : dataTypes.DATE
        },
  	}

    let config = {
        tableName: "comentarios",
        timestamps: false,
        underscored: false
    }
    
    let Comentarios = sequelize.define(alias, cols, config);
    return Comentarios;
}