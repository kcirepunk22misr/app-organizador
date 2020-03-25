import { Request, Response } from 'express';
import Report from '../models/Report';
import Inventory from '../models/Inventory';

class ReportController {
	public getReport(req: Request, res: Response) {
		let id = req.params.id;

		Inventory.findById(id, 'report createdAtReport', (err, reportDB) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err
				});
			}

			if (!reportDB) {
				return res.status(400).json({
					ok: false,
					message: 'El id no existe',
					err
				});
			}

			res.json({
				report: reportDB
			});
		});
	}

	public updateReport(req: Request, res: Response) {
		let body = req.body;
		let id = req.body._id;

		Inventory.findByIdAndUpdate(
			id,
			{ report: body.report, createdAtReport: body.createdAtReport },
			{ new: true },
			(err, inventoryDB) => {
				if (err) {
					return res.status(500).json({
						ok: false,
						err
					});
				}

				if (!inventoryDB) {
					return res.status(400).json({
						ok: false,
						err,
						mensaje: 'no existe el id'
					});
				}

				res.json({
					report: inventoryDB
				});
			}
		);
		// Report.findOne({inventoryId: id}, (err, reportDB) => {

		//     if(err) {
		//         return res.status(500).json({
		//             ok: false,
		//             err
		//         });
		//     }

		//     reportDB.description = body.description;
		//     reportDB.createdAt = body.createdAt;

		//     reportDB.save((err, reportDB) => {
		//         if(err) {
		//             return res.status(500).json({
		//                 ok: false,
		//                 err
		//             });
		//         }

		//         res.json({
		//             report: reportDB
		//         });
		//     });

		// });
	}

	public saveReport(req: Request, res: Response) {
		let body = req.body;

		const report = new Report({
			inventoryId: body.inventoryId,
			description: body.description
		});
		{
			report.save((err, reportDB) => {
				if (err)
					return res.status(500).json({
						ok: false,
						err
					});

				res.json({
					ok: true,
					report: reportDB
				});
			});
		}
	}

	public updateState(req: Request, res: Response) {
		let id = req.body.inventoryId;
		let state = req.body.state;

		Inventory.findByIdAndUpdate(
			id,
			{ state },
			{ new: true, runValidators: true },
			(err, InventorySave) => {
				if (err) {
					return res.status(400).json({
						ok: false,
						err
					});
				}

				res.json({
					ok: true,
					inventarios: InventorySave
				});
			}
		);
	}
}

export const reportController = new ReportController();
