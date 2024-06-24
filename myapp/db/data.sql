
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
    deletedAt           TIMESTAMP       NULL
);

CREATE TABLE productos (
/* 	nombreColumna 		tipoDato 		Restricciones */
    id 					INT 			UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    idUsuario 			INT 			UNSIGNED,
    foto                VARCHAR(250) 	NOT NULL,
    nombre              VARCHAR(250) 	NOT NULL,
    descripcion         VARCHAR(250) 	NOT NULL,
    createdAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ,
	updatedAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt           TIMESTAMP       NULL,

    FOREIGN KEY (idUsuario) REFERENCES usuarios(id)
);

CREATE TABLE comentarios (
/* 	nombreColumna 		tipoDato 		Restricciones */
	id 			        INT 			UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    idPost 			    INT 			UNSIGNED,
    idUsuario 			INT 			UNSIGNED,
    texto               VARCHAR(250) 	NOT NULL,
    createdAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ,
	updatedAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt           TIMESTAMP       NULL,
    
    FOREIGN KEY (idUsuario) REFERENCES usuarios(id),
    FOREIGN KEY (idPost) REFERENCES productos(id)
);


INSERT INTO usuarios (id, email, contrasenia, fecha, dni, foto, createdAt, updatedAt, deletedAt)
VALUES(DEFAULT,'marianoperez@gmail.com', 'contrasenia', '1990-03-17', 58325219, '/images/usuarios/mariano.JPG', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,'catasanchez@gmail.com', 'contrasenia', '1998-10-23', 95824326, '/images/usuarios/cata.JPG', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,'loli123@gmail.com', 'contrasenia', '2007-07-05', 47651352, '/images/usuarios/loli.JPG', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,'pedro.fernandez@gmail.com', 'contrasenia', '2001-06-19', 45423654, '/images/usuarios/pedro.JPG', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,'anitarodriguez@gmail.com', 'contrasenia', '2003-02-18', 54762897, '/images/usuarios/anita.PNG', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,'alan.martinez@gmail.com', 'contrasenia', '2006-09-25', 154622869, '/images/usuarios/alan.PNG', DEFAULT, DEFAULT, DEFAULT);

INSERT INTO productos(id, idUsuario, foto, nombre, descripcion, createdAt, updatedAt, deletedAt) 
VALUES(DEFAULT,1, 'Borcego_aliss.png', 'Borcego Alis', 'Borcego de cuero, con apliques de color plateado. Alto de caña de 27 cm.', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,2, 'Borcego_cordon.png', 'Borcego Cordon', 'Borcego de cuero con una caña de 23,5 cm de largo, base de 7 cm de taco y cordones largos.', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,3, 'Borcego_dip.png', 'Bercego Dip', 'Borcegos de cuero con tachas doradas, base de 2,5 cm, altura de caña de 28 cm, y 37 cm de circiunferencia.', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,4, 'Borcego_mex.png', 'Borcego Mex', 'Boregos de cuero, con apliques plateados, taco de 5,5 cm. ', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,5, 'Borcego_tiki.png', 'Borcego Tiki', 'Borcegos de ecocuero y de charol opaco, de caña alta.', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,6, 'Texana_only.png', 'Texana Only', 'Texanas de cuero, con bordado y hebilla. Alto de la caña 29 cm, alto de taco 4 cm.', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,1, 'Bota_owen.png', 'Bota Owen', 'Borcegos de cuero con hebillas, apliques de metal de caña alta y taco de 5 cm. ', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,2, 'Bota_aliss_marron.png', 'Bota Aliss Marron', 'Borcegos de cuero, con hebillas en el costado, alto de caña de 30,5 cm y taco de 5 cm.', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,3, 'Bota_aliss_negra.png', 'Bota Aliss Negra', 'Borcegos de cuero, con hebillas en el costado, alto de caña de 30,5 cm y taco de 5 cm.', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,4, 'Texana_cow.png', 'Texana Cow', 'Texana negras de cuero combinadas en contratono beige. Altura de la caña 36,5 cm. y altura del taco 7 cm.', DEFAULT, DEFAULT, DEFAULT);

INSERT INTO comentarios(id, idPost, idUsuario, texto, createdAt, updatedAt, deletedAt)
VALUES(DEFAULT,10, 1 ,'Una mas linda que la otra. Me encantan!', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,1, 2 ,'Divinas!', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,2, 3 ,'Los mejores borcegos que he tenido!', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,3, 4 ,'Increible calidad', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,4, 5 ,'Son muy comodos, aptos para usarlos en cualquier ocasion', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,5, 6 ,'Cada centavo gastado en ellas vale la pena', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,6, 1 ,'Las uso siempre. Me encantan!', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,7, 2 ,'Estoy enamorado de mis nuevos borcegos', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,8, 3 ,'Una compra que no me arrepentire nunca!', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,9, 4 ,'AMOOOOOO', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,10, 5 ,'Dios que hermosas', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,1, 6 ,'Las amooo', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,2, 1 ,'Hermosas!!', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,3, 2 ,'Me encantan', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,4, 3 ,'Muy bombaaa!', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,5, 4 ,'Las necesito ya', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,6, 5 ,'Me encantan todos sus zapatos!', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,7, 6 ,'Muero las amo demasiado', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,8, 1 ,'Mis favss', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,9, 2 ,'Quiero todas', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,10, 3 ,'Las tengo, son lo mas!', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,1, 4 ,'No pueden mas de hermosas!', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,2, 5 ,'Estan de lujo', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,3, 6 ,'Una belleza', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,4, 1 ,'Son lo mass!', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,5, 2 ,'Tremendasss!!', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,6, 3 ,'Quiero todooo', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,7, 4 ,'Hermosos calzados!! los colecciono', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,8, 5 ,'AMO LAS BOTAS DE SEFINA', DEFAULT, DEFAULT, DEFAULT),
(DEFAULT,9, 6 ,'Amo Sefina', DEFAULT, DEFAULT, DEFAULT);