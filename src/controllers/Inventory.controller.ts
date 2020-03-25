import { Request, Response } from 'express';
import Inventory from '../models/Inventory';
import path from 'path';
import fs from 'fs';

class InventoryController {
	public getInventarios(req: Request, res: Response) {
		Inventory.find(
			{ available: true },
			'name marca type group location state size color quantify createdAt img'
		).exec((err, inventarioDB) => {
			if (err)
				return res.status(400).json({
					ok: false,
					err
				});

			res.json({
				ok: true,
				inventaios: inventarioDB
			});
		});
	}

	public getInventoryById(req: Request, res: Response) {
		let id = req.params.id;
		Inventory.findById(
			id,
			'name marca type group location state size color quantify img',
			(err, inventoryDB) => {
				if (err)
					return res.status(500).json({
						ok: false,
						err
					});

				if (!inventoryController)
					return res.status(400).json({
						ok: false,
						err: {
							message: 'El id de la herramienta no sirve',
							err
						}
					});

				res.json({
					ok: true,
					inventory: inventoryDB
				});
			}
		);
	}

	public async updateTool(req: Request, res: Response) {
		let id = req.body._id;
		let tool = req.body.tools;
		const img = await Inventory.findById(id);
		let urlImg = path.resolve(__dirname, '../../uploads');

		Inventory.findByIdAndUpdate(
			id,
			tool,
			{ new: true },
			(err, inventoryUpdate) => {
				if (err)
					return res.status(500).json({
						ok: false,
						err
					});

				if (!inventoryUpdate)
					return res.status(400).json({
						ok: false,
						err: {
							message: 'El id no existe',
							err
						}
					});

				console.log(tool);

				res.json({
					ok: true,
					inventario: inventoryUpdate
				});
			}
		);
	}

	public deleteTools(req: Request, res: Response) {
		let id = req.body._id;
		Inventory.findByIdAndUpdate(
			id,
			{ available: false },
			{ new: true },
			(err, inventoryDelete) => {
				if (err)
					return res.status(500).json({
						ok: false,
						err
					});

				if (!inventoryDelete)
					return res.status(400).json({
						ok: false,
						err: {
							message: 'El id no existe',
							err
						}
					});

				res.json({
					ok: true,
					iventario: inventoryDelete
				});
			}
		);
	}

	public search(req: Request, res: Response) {
		let busqueda = req.params.busqueda;
		let regex = new RegExp(busqueda, 'i');

		Inventory.find({ name: regex, available: true }, (err, inventoryDB) => {
			if (err)
				return res.status(500).json({
					ok: false,
					err
				});

			res.json({
				ok: true,
				tools: inventoryDB
			});
		});
	}

	public getImage(req: Request, res: Response) {
		let img = req.params.img;

		const pathImagen = path.resolve(__dirname, `../../uploads/${img}`);

		if (fs.existsSync(pathImagen)) {
			res.sendFile(pathImagen);
		} else {
			res.json({
				ok: false,
				img: 'no image'
			});
		}
	}

	public uploadImage(req: Request, res: Response) {
		let id = req.params.id;
		let imageName = req.file.filename;

		Inventory.findByIdAndUpdate(
			id,
			{ img: imageName },
			{ new: true },
			(err, imageDB) => {
				if (err) {
					return res.status(400).json({
						ok: false,
						err,
						aqui: 'aqui es el error'
					});
				}

				res.json({
					ok: true,
					inventaios: imageDB
				});
			}
		);

		// Inventory.findById(id, {img: imageName}, {new: true}, (err, imgDB) => {
		//     if(err) {
		//         return res.status(400).json({
		//             ok: false,
		//             err
		//         });
		//     }

		//     res.json({
		//         ok: true,
		//         inventarios: imgDB
		//     });
		// });
	}

	public saveTool(req: Request, res: Response) {
		let body = req.body;

		// 5e53d8777f40ae158784046f userId
		// 5e52f6c882193e25afe7ec4d tipoId
		// 5e52fd936a8e382b26474f92 gruposId
		// 5e54248a034f9726d526fa16 marcaId

		const inventory = new Inventory({
			name: body.name,
			userId: body.usuario._id,
			marca: body.marca,
			type: body.type,
			size: body.size,
			color: body.color,
			group: body.group,
			location: {
				escaparate: body.escaparate,
				columna: body.columna,
				fila: body.fila
			},
			state: body.state,
			quantify: body.quantify
		});

		inventory.save((err, inventoryDB) => {
			if (err)
				return res.status(400).json({
					ok: false,
					err
				});

			res.status(201).json({
				ok: true,
				inventarios: inventoryDB
			});
		});
	}

	// public uploadImage(req: Request, res: Response) {
	//     let tipo = req.params.tipo;
	//     let id = req.params.id;

	//     // Tipos de coleccion
	//     let tiposValidos = ['herramientas', 'usuarios'];
	//     if(tiposValidos.indexOf(tipo) < 0)
	//         return res.status(400).json({
	//             ok: false,
	//             mensaje: 'Tipo de coleccion no es valido',
	//             errors: {message: 'No es valido'}
	//         });

	//     if(!req.files) return res.status(400).json({
	//         ok: false,
	//         mensaje: 'No selecciono nada',
	//         errors: {message: 'Debe de selecionar una imagen'}
	//     });

	//     // Obtener nombre de imagen
	//     let archivo = req.files.imagen;
	//     let archivoExt = archivo.name.split('.');
	//     let extArchivo = archivoExt[archivoExt.length - 1];

	//     // Solo estas extensiones aceptamos
	//     let extValidas = ['png', 'jpg', 'gif', 'jpeg'];
	//     if(extValidas.indexOf(extArchivo) < 0)
	//         return res.status(400).json({
	//             ok: false,
	//             mensaje: 'Extension no valida',
	//             errors: {message: 'Las extensiones validas son '+ extValidas.join(', ')}
	//         });

	//     // Nombre de archivo personalizado
	//     let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${archivoExt}`;

	//     // Mover el archivo del temporal a un path

	//     const path = `./uploads/${tipo}/${nombreArchivo}`;
	//     archivo.mv(path, err => {
	//         if(err) {
	//             return res.status(500).json({
	//                 ok: false,
	//                 mensaje: 'Error al mover archivo',
	//                 err
	//             });
	//         }

	//         res.status(200).json({
	//             ok: true,
	//             mensaje: 'Archivo movido',
	//             extArchivo
	//         })
	//     });

	// }
}

export const inventoryController = new InventoryController();
