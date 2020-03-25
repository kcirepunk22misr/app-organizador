import { Request, Response } from 'express';
import Location from '../models/Location';

class LocationController {
	public getLocations(req: Request, res: Response) {
		Location.find({}).exec((err, locationDB) => {
			if (err)
				return res.status(400).json({
					ok: false,
					err
				});

			res.json({
				ok: true,
				locacions: locationDB
			});
		});
	}

	public saveLocation(req: Request, res: Response) {
		let body = req.body;
		const location = new Location({
			escaparate: body.escaparate,
			columna: body.columna,
			fila: body.fila
		});

		location.save((err, locationDB) => {
			if (err)
				return res.status(400).json({
					ok: false,
					err
				});

			res.status(201).json({
				ok: true,
				location: locationDB
			});
		});
	}
}

export const locationController = new LocationController();
