import { Request, Response } from 'express';
import Type from '../models/Type';
import Group from '../models/Group';
import Marca from '../models/Marca';
import State from '../models/State';
import Size from '../models/Size';
import Color from '../models/Color';

class PropertiesController {
	public getTypes(req: Request, res: Response) {
		Type.find({}).exec((err, typeDB) => {
			if (err)
				return res.status(400).json({
					ok: false,
					message: 'Error al buscar los tipos de herramientas',
					err
				});

			res.json({
				ok: true,
				types: typeDB
			});
		});
	}

	public saveType(req: Request, res: Response) {
		let name = req.body.name;
		const type = new Type({
			name
		});

		type.save((err, typeDB) => {
			if (err)
				return res.status(500).json({
					ok: false,
					message: 'Error al crear tipos de herramientas',
					err
				});

			res.status(201).json({
				ok: true,
				message: 'Tipo Guardado exitosamente',
				type: typeDB
			});
		});
	}

	public getGroup(req: Request, res: Response) {
		Group.find({}).exec((err, groupDB) => {
			if (err)
				return res.status(400).json({
					ok: false,
					message: 'Error al buscar los grupos de herramientas',
					err
				});

			res.json({
				ok: true,
				groups: groupDB
			});
		});
	}

	public saveGroup(req: Request, res: Response) {
		let name = req.body.name;
		const grupo = new Group({
			name
		});

		grupo.save((err, groupDB) => {
			if (err)
				return res.status(500).json({
					ok: false,
					message: 'Error al crear grupo de herramientas',
					err
				});

			res.status(201).json({
				ok: true,
				message: 'Grupo Guardado exitosamente',
				group: groupDB
			});
		});
	}

	public getMarcas(req: Request, res: Response) {
		Marca.find({}).exec((err, marcasDB) => {
			if (err)
				return res.status(400).json({
					ok: false,
					message: 'Error al buscar las marcas de herramientas',
					err
				});

			res.json({
				ok: true,
				marcas: marcasDB
			});
		});
	}

	public saveMarca(req: Request, res: Response) {
		let name = req.body.name;
		const marca = new Marca({
			name
		});

		marca.save((err, marcaDB) => {
			if (err)
				return res.status(500).json({
					ok: false,
					message: 'Error al crear grupo de herramientas',
					err
				});

			res.status(201).json({
				ok: true,
				message: 'Grupo Guardado exitosamente',
				marca: marcaDB
			});
		});
	}

	public getStates(req: Request, res: Response) {
		State.find({}).exec((err, statesDB) => {
			if (err)
				return res.status(400).json({
					ok: false,
					err
				});

			res.json({
				ok: true,
				states: statesDB
			});
		});
	}

	public saveState(req: Request, res: Response) {
		let estado = req.body.name;

		const state = new State({
			name: estado
		});

		state.save((err, stateDB) => {
			if (err)
				return res.status(500).json({
					ok: true,
					err
				});

			res.status(201).json({
				ok: true,
				state: stateDB
			});
		});
	}

	public getSizes(req: Request, res: Response) {
		Size.find().exec((err, SizesDB) => {
			if (err)
				return res.status(400).json({
					ok: false,
					err
				});

			res.json({
				ok: true,
				sizes: SizesDB
			});
		});
	}

	public saveSize(req: Request, res: Response) {
		let tamaño = req.body.name;
		const size = new Size({
			name: tamaño
		});

		size.save((err, sizesDB) => {
			if (err)
				return res.status(500).json({
					ok: false,
					err
				});

			res.json({
				ok: true,
				sizes: sizesDB
			});
		});
	}

	public getColors(req: Request, res: Response) {
		Color.find().exec((err, colorsDB) => {
			if (err)
				return res.status(500).json({
					ok: false,
					err
				});

			res.json({
				ok: true,
				colors: colorsDB
			});
		});
	}

	public saveColor(req: Request, res: Response) {
		let colorH = req.body.name;
		const color = new Color({
			name: colorH
		});

		color.save((err, colorsDB) => {
			if (err)
				return res.status(500).json({
					ok: false,
					err
				});

			res.json({
				ok: true,
				colors: colorsDB
			});
		});
	}

	public async deleteGroup(req: Request, res: Response) {
		let id = req.params.id;
		let groupBorrado = await Group.where('_id').findOneAndRemove({ _id: id });
		res.json({
			group: groupBorrado
		});
	}

	public async deleteType(req: Request, res: Response) {
		let id = req.params.id;
		let typeBorrado = await Type.where('_id').findOneAndRemove({ _id: id });
		res.json({
			type: typeBorrado
		});
	}

	public async deleteMarca(req: Request, res: Response) {
		let id = req.params.id;
		let marcaBorrado = await Marca.where('_id').findOneAndRemove({ _id: id });
		res.json({
			marca: marcaBorrado
		});
	}

	public async deleteState(req: Request, res: Response) {
		let id = req.params.id;
		let stateBorrado = await State.where('_id').findOneAndRemove({ _id: id });
		res.json({
			state: stateBorrado
		});
	}

	public async deleteSize(req: Request, res: Response) {
		let id = req.params.id;
		let sizeBorrado = await Size.where('_id').findOneAndRemove({ _id: id });
		res.json({
			size: sizeBorrado
		});
	}

	public async deleteColor(req: Request, res: Response) {
		let id = req.params.id;
		let colorBorrado = await Color.where('_id').findOneAndRemove({ _id: id });
		res.json({
			color: colorBorrado
		});
	}
}

export const propertiesController = new PropertiesController();
