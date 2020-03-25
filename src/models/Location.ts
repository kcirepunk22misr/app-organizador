import { Schema, model, Document } from 'mongoose';

const locationSchema = new Schema({
	escaparate: {
		type: String,
		required: false,
		unique: true
	},
	columna: {
		type: String,
		required: false,
		unique: true
	},
	fila: {
		type: String,
		required: false,
		unique: true
	}
});

export default model('Location', locationSchema);
