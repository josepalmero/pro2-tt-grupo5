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
    id_usuario 			INT 			UNSIGNED,
	foto                VARCHAR(250) 	NOT NULL,
    nombre              VARCHAR(250) 	NOT NULL,
    descripcion         VARCHAR(250) 	NOT NULL,
    createdAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ,
	updatedAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt           TIMESTAMP       ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE comentarios (
/* 	nombreColumna 		tipoDato 		Restricciones */
    id_post 			INT 			UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    id_usuario 			INT 			UNSIGNED,
    texto               VARCHAR(250) 	NOT NULL,
    createdAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ,
	updatedAt 			TIMESTAMP 		DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt           TIMESTAMP       ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);


INSERT INTO usuarios (email, contrasenia, fecha, dni, foto)
VALUES('marianoperez@gmail.com', 'contrasenia', '1990-03-17', 58325219, '/images/usuarios/mariano.JPG'),
('catasanchez@gmail.com', 'contrasenia', '1998-10-23', 95824326, '/images/usuarios/cata.JPG'),
('loli123@gmail.com', 'contrasenia', '2007-07-05', 47651352, '/images/usuarios/loli.JPG'),
('pedro.fernandez@gmail.com', 'contrasenia', '2001-06-19', 45423654, '/images/usuarios/pedro.JPG'),
('anitarodriguez@gmail.com', 'contrasenia', '2003-02-18', 54762897, '/images/usuarios/anita.PNG'),
('alan.martinez@gmail.com', 'contrasenia', '2006-09-25', 154622869, '/images/usuarios/alan.PNG');

INSERT INTO productos(id, foto, nombre, descripcion)
VALUES(0, '/images/products/Borcego_aliss.png', 'Borcego Alis', 'Borcego de cuero, con apliques de color plateado. Alto de caña de 27 cm.'),
(1, '/images/products/Borcego_cordon.png', 'Borcego Cordon', 'Borcego de cuero con una caña de 23,5 cm de largo, base de 7 cm de taco y cordones largos.'),
(2, '/images/products/Borcego_dip.png', 'Bercego Dip', 'Borcegos de cuero con tachas doradas, base de 2,5 cm, altura de caña de 28 cm, y 37 cm de circiunferencia.'),
(3, '/images/products/Borcego_mex.png', 'Borcego Mex', 'Boregos de cuero, con apliques plateados, taco de 5,5 cm. '),
(10, '/images/products/Borcego_tiki.png', 'Borcego Tiki', 'Borcegos de ecocuero y de charol opaco, de caña alta.' ),
(7, '/images/products/Texana_only.png', 'Texana Only', 'Texanas de cuero, con bordado y hebilla. Alto de la caña 29 cm, alto de taco 4 cm.'),
(5, '/images/products/Bota_owen.png', 'Bota Owen', 'Borcegos de cuero con hebillas, apliques de metal de caña alta y taco de 5 cm. '),
(4, '/images/products/Bota_aliss_marron.png', 'Bota Aliss Marron', 'Borcegos de cuero, con hebillas en el costado, alto de caña de 30,5 cm y taco de 5 cm.'),
(9, '/images/products/Bota_aliss_negra.png', 'Bota Aliss Negra', 'Borcegos de cuero, con hebillas en el costado, alto de caña de 30,5 cm y taco de 5 cm.'),
(8, '/images/products/Texana_cow.png', 'Texana Cow', 'Texana negras de cuero combinadas en contratono beige. Altura de la caña 36,5 cm. y altura del taco 7 cm.');

INSERT INTO comentarios(id_usuario, texto)
VALUES('id' ,'comentario' ),
(DEFAULT ,'Divinas!' ),
(DEFAULT ,'Los mejores borcegos que he tenido!' ),
(DEFAULT ,'Increible calidad' ),
(DEFAULT ,'Son muy comodos, aptos para usarlos en cualquier ocasion' ),
(DEFAULT ,'Cada centavo gastado en ellas vale la pena' ),
(DEFAULT ,'Las uso siempre. Me encantan!' ),
(DEFAULT ,'Estoy enamorado de mis nuevos borcegos' ),
(DEFAULT ,'Una compra que no me arrepentire nunca!' ),
(DEFAULT ,'AMOOOOOO' ),
(DEFAULT ,'Dios que hermosas' ),
(DEFAULT ,'Las amooo' ),
(DEFAULT ,'Hermosas!!' ),
(DEFAULT ,'Me encantan' ),
(DEFAULT ,'Muy bombaaa!' ),
(DEFAULT ,'Las necesito ya' ),
(DEFAULT ,'Me encantan todos sus zapatos!' ),
(DEFAULT ,'Muero las amo demasiado' ),
(DEFAULT ,'Mis favss' ),
(DEFAULT ,'Quiero todas' ),
(DEFAULT ,'Las tengo, son lo mas!' ),
(DEFAULT ,'No pueden mas de hermosas!' ),
(DEFAULT ,'Estan de lujo' ),
(DEFAULT ,'Una belleza' ),
(DEFAULT ,'Son lo mass!' ),
(DEFAULT ,'Tremendasss!!' ),
(DEFAULT ,'Quiero todooo' ),
(DEFAULT ,'Hermosos calzados!! los colecciono' ),
(DEFAULT ,'AMO LAS BOTAS DE SEFINA' ),
(DEFAULT ,'Amo Sefina' );
