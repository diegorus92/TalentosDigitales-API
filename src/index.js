import express from 'express'; //server for api rest
import morgan from 'morgan'; //show client request in console
import { router } from './routes.js';

const app = express(); //create server api rest

app.set('port', 3000); //listen request trhough that port

app.use(morgan('dev'));
app.use(express.json()); //interpret json request sended
app.use(router); //import router for use endpoints

app.listen(app.get('port'), () =>{ //start server in selected port
    console.log(`Server on port ${app.get('port')}`);
}); 
