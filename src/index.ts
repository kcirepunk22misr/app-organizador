import { config } from 'dotenv';
import morgan from 'morgan';
import Server from './server/server';
import Mongoose from 'mongoose';
import bodyParser from 'body-parser';
import color from 'colors';
import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
config();
const server = Server.instance;

// CORS
server.app.use((req: Request, res: Response, next: NextFunction) => {
	res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.header('Access-control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
	next();
});
// server.app.use(cors({origin: true, credentials: true}));

// middleware
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
server.app.use(morgan('dev'));
// Routes
import './routes/router';

// uploads image
server.app.use('uploads', express.static(path.resolve('uploads')));

// Conecting MongoDB
try {
	Mongoose.connect(String(process.env.MONGO_URI_NODE_ENV), {
		useNewUrlParser: true,
		useCreateIndex: true,
		autoIndex: false,
		useUnifiedTopology: true
	});
	console.log(`database: ${color.green('Online')}`);
} catch (error) {
	console.log(`database: ${color.red('Offline')}`);
	throw new Error(error);
}

// Start Server
server.start(() => {
	console.log(`Server Status: ${color.green('Online')}`);
});
