CREATE SCHEMA my_db;

USE my_db;

CREATE TABLE usuarios (
/* 	nombreColumna 		tipoDato 		Restricciones */
    id 					INT 			UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    email			    VARCHAR(250) 	NOT NULL,
    contrasenia 	    VARCHAR(250) 	NOT NULL,		 	
    fecha               DATE 			NOT NULL,
    dni                 INT 			NOT NULL,
    foto                VARCHAR(250) 	NOT NULL,
    createdAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ,
	updatedAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt           TIMESTAMP       ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE productos (
/* 	nombreColumna 		tipoDato 		Restricciones */
    id 					INT 			UNSIGNED PRIMARY KEY AUTO_INCREMENT,
	foto                VARCHAR(250) 	NOT NULL,
    nombre              VARCHAR(250) 	NOT NULL,
    descripcion         VARCHAR(250) 	NOT NULL,
    createdAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ,
	updatedAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt           TIMESTAMP       ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE comentarios (
/* 	nombreColumna 		tipoDato 		Restricciones */
    id_post 			INT 			UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_usuario 			INT 			UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    texto               VARCHAR(250) 	NOT NULL,
    createdAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ,
	updatedAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt           TIMESTAMP       ON UPDATE CURRENT_TIMESTAMP
);



