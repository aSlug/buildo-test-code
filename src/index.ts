import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swagger from './../swagger.json';
import * as routes from './routes/routes';

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// expose the OpenAPI doc
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

// expose resources
app.use('/', routes.router);

app.listen(port, () => {
    // tslint:disable-next-line: no-console
    console.log( `Server started at http://localhost:${ port }` );
    // tslint:disable-next-line: no-console
    console.log( `Check documentation at http://localhost:${ port }/api-docs` );
});
