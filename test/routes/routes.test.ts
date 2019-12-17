import assert from 'assert';
import express from 'express';
import { Server } from 'http';
import request from 'supertest';
import { State } from '../../src/state/state';
import * as routes from './../../src/routes/routes';
import * as mock from './../mock/mockConfigurations';

describe('The server', () => {

    const app = express();
    const port = 3000;
    let server: Server;

    before((done) => {
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
        app.use('/', routes.router);
        server = app.listen(port, (err) => {
            if (err) { return done(err); }
            done();
        });
    });

    after(() => {
        server.close();
    });

    beforeEach(() => {
        State.configurations.clear();
    });

    describe('GET /', () => {
        it('should return 200 and all the configurations', (done) => {
            State.configurations.set('foo', mock.fooConfig);
            State.configurations.set('bar', mock.barConfig);
            request(app)
                .get('/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, (err, res) => {
                    if (err) { assert.fail(err); }
                    assert.equal(JSON.stringify(res.body), JSON.stringify([mock.fooConfig, mock.barConfig]));
                    done();
                });
        });
    });

    describe('GET /:id', () => {
        it('should return 200 and the required configuration if it exists', (done) => {
            State.configurations.set('foo', mock.fooConfig);
            State.configurations.set('bar', mock.barConfig);
            request(app)
                .get('/bar')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, (err, res) => {
                    if (err) { assert.fail(err); }
                    assert.equal(JSON.stringify(res.body), JSON.stringify(mock.barConfig));
                    done();
                });
        });
        it('should return 404 if the required configuration does not exists', (done) => {
            State.configurations.set('foo', mock.fooConfig);
            State.configurations.set('bar', mock.barConfig);
            request(app)
                .get('/charlie')
                .set('Accept', 'application/json')
                .expect(404, done);
        });
    });

    describe('POST /:id', () => {
        it('should save the configuration', (done) => {
            request(app)
                .post('/foo')
                .send(mock.fooConfig)
                .set('Content-Type', 'application/json')
                .then(() => {
                    assert.equal(JSON.stringify(mock.fooConfig), JSON.stringify(State.configurations.get('foo')));
                    done();
                });
        });
        it('should return 201 if the configuration is successfully saved', (done) => {
            request(app)
                .post('/foo')
                .send(mock.fooConfig)
                .set('Content-Type', 'application/json')
                .expect(201, done);
        });
        it('should return 201 if the "id" filed is missing', (done) => {
            request(app)
                .post('/foo')
                .send(mock.fooIdMissingConfig)
                .set('Content-Type', 'application/json')
                .expect(201, done);
        });
        it('should return 400 if the "name" filed is missing', (done) => {
            request(app)
                .post('/foo')
                .send(mock.fooNameMissingConfig)
                .set('Content-Type', 'application/json')
                .expect(400, done);
        });
        it('should return 400 if the "value" filed is missing', (done) => {
            request(app)
                .post('/foo')
                .send(mock.fooValueMissingConfig)
                .set('Content-Type', 'application/json')
                .expect(400, done);
        });
        it('should return 422 if the "id" filed does not match the resource name', (done) => {
            request(app)
                .post('/foo')
                .send(mock.barConfig)
                .set('Content-Type', 'application/json')
                .expect(422, done);
        });
        it('should return 409 if the resource already exists', (done) => {
            State.configurations.set('foo', mock.fooConfig);
            request(app)
                .post('/foo')
                .send(mock.fooConfigUpdated)
                .set('Content-Type', 'application/json')
                .expect(409, done);
        });
    });

    describe('PUT /:id', () => {
        it('should update the configuration', (done) => {
            State.configurations.set('foo', mock.fooConfig);
            request(app)
                .put('/foo')
                .send(mock.fooConfigUpdated)
                .set('Content-Type', 'application/json')
                .then(() => {
                    assert.equal(JSON.stringify(mock.fooConfigUpdated),
                        JSON.stringify(State.configurations.get('foo')));
                    done();
                });
        });
        it('should return 200 if the configuration is successfully saved', (done) => {
            State.configurations.set('foo', mock.fooConfig);
            request(app)
                .put('/foo')
                .send(mock.fooConfigUpdated)
                .set('Content-Type', 'application/json')
                .expect(200, done);
        });
        it('should return 200 if the "id" filed is missing', (done) => {
            State.configurations.set('foo', mock.fooConfig);
            request(app)
                .put('/foo')
                .send(mock.fooIdMissingConfig)
                .set('Content-Type', 'application/json')
                .expect(200, done);
        });
        it('should return 400 if the "name" filed is missing', (done) => {
            State.configurations.set('foo', mock.fooConfig);
            request(app)
                .put('/foo')
                .send(mock.fooNameMissingConfig)
                .set('Content-Type', 'application/json')
                .expect(400, done);
        });
        it('should return 400 if the "value" filed is missing', (done) => {
            State.configurations.set('foo', mock.fooConfig);
            request(app)
                .put('/foo')
                .send(mock.fooValueMissingConfig)
                .set('Content-Type', 'application/json')
                .expect(400, done);
        });
        it('should return 422 if the "id" filed does not match the resource name', (done) => {
            State.configurations.set('foo', mock.fooConfig);
            request(app)
                .put('/foo')
                .send(mock.barConfig)
                .set('Content-Type', 'application/json')
                .expect(422, done);
        });
        it('should return 404 if the resource does not exists', (done) => {
            request(app)
                .put('/foo')
                .send(mock.fooConfigUpdated)
                .set('Content-Type', 'application/json')
                .expect(404, done);
        });
    });

    describe('DELETE /:id', () => {
        it('should delete the configuration', (done) => {
            State.configurations.set('foo', mock.fooConfig);
            request(app)
                .delete('/foo')
                .then(() => {
                    assert.equal(false, State.configurations.has('foo'));
                    done();
                });
        });
        it('should return 204 if the configuration is successfully deleted', (done) => {
            State.configurations.set('foo', mock.fooConfig);
            request(app)
                .delete('/foo')
                .expect(204, done);
        });
        it('should return 404 if the configuration does not exists', (done) => {
            request(app)
                .delete('/foo')
                .expect(404, done);
        });
    });

});

