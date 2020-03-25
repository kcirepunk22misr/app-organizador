import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt';
import { LoginUser } from '../interfaces/interfaces';
import jwt from 'jsonwebtoken';
import { SEED } from '../global/environment';

class UserController {
	public login(req: Request, res: Response) {
		let body = req.body;

		User.findOne({ email: body.email }, (err, userDB: LoginUser) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					mensaje: 'Error al buscar usuario'
				});
			}

			if (!userDB) {
				return res.status(400).json({
					ok: false,
					mensaje: 'Credenciales incorrectas - email',
					err
				});
			}

			if (!bcrypt.compareSync(String(body.password), userDB.password)) {
				return res.status(400).json({
					ok: false,
					mensaje: 'Credenciales incorrectar - password',
					err
				});
			}

			// Crear Token
			userDB.password = ':)';
			const token = jwt.sign(
				{
					user: userDB
				},
				String(SEED),
				{
					expiresIn: '24h'
				}
			);

			res.status(200).json({
				ok: true,
				user: userDB,
				id: userDB._id,
				token
			});
		});
	}

	public verificarAdmin(req: Request, res: Response, next: NextFunction) {
		let usuario = req.body.usuario;
		if (usuario.role === 'ADMIN_ROLE') {
			next();
			return;
		} else {
			return res.status(401).json({
				ok: false,
				message: 'Token no valido - no es administrador'
			});
		}
	}

	public token(req: Request, res: Response, next: NextFunction) {
		let token = req.query.token;
		jwt.verify(token, String(SEED), (err: any, decode: any) => {
			if (err) {
				return res.status(401).json({
					ok: false,
					message: 'Token no valido',
					err
				});
			}

			req.body.usuario = decode.user;
			next();
		});
	}

	public getUsers(req: Request, res: Response) {
		User.find().exec((err, userDB) => {
			if (err)
				return res.status(400).json({
					ok: false,
					message: 'Error al guardar el mensaje',
					err
				});

			res.json({
				ok: true,
				usuarios: userDB
			});
		});
	}

	public saveUser(req: Request, res: Response) {
		let body = req.body;
		const user = new User({
			firstName: body.firstName,
			lastName: body.lastName,
			sex: body.sex,
			email: body.email,
			password: bcrypt.hashSync(body.password, 10)
		});

		user.save((err, userDB) => {
			if (err)
				return res.status(400).json({
					ok: false,
					message: 'Error al guardar el usuario',
					err
				});

			res.status(201).json({
				ok: true,
				user: userDB
			});
		});
	}
}

export const userController = new UserController();
