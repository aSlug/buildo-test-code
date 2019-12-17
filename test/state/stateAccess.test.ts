import assert from 'assert';
import { State } from '../../src/state/state';
import * as stateAccess from '../../src/state/stateAccess';
import * as mock from './../mock/mockConfigurations';

describe('stateAccess module', () => {

    beforeEach('reset state', () => {
        State.configurations.clear();
    });

    describe('existsConfiguration()', () => {
        it('returns true if the configuration is present', () => {
            State.configurations.set('foo', mock.fooConfig);
            assert.equal(true, stateAccess.existsConfiguration('foo'));
        });
        it('returns false if the configuration is not present', () => {
            State.configurations.set('foo', mock.fooConfig);
            assert.equal(false, stateAccess.existsConfiguration('bar'));
        });
    });

    describe('getConfiguration()', () => {
        it('returns the correct configuration', () => {
            State.configurations.set('foo', mock.fooConfig);
            State.configurations.set('bar', mock.barConfig);
            assert.equal(mock.barConfig, stateAccess.getConfiguration('bar'));
        });
    });

    describe('getAllConfigurations()', () => {
        it('returns all the configurations', () => {
            State.configurations.set('foo', mock.fooConfig);
            State.configurations.set('bar', mock.barConfig);
            const result = stateAccess.getAllConfigurations();
            assert.equal(true, result.includes(mock.fooConfig));
            assert.equal(true, result.includes(mock.barConfig));
        });
    });

    describe('saveNewConfiguration()', () => {
        it('correctly saves configuration', () => {
            stateAccess.saveNewConfiguration(mock.barConfig);
            assert.equal(mock.barConfig, State.configurations.get('bar'));
        });
        it('throws error when trying to save duplicates', () => {
            stateAccess.saveNewConfiguration(mock.barConfig);
            assert.throws(() => stateAccess.saveNewConfiguration(mock.barConfig), Error);
        });
    });

    describe('updateConfiguration()', () => {
        it('correctly updates configuration', () => {
            State.configurations.set('foo', mock.fooConfig);
            State.configurations.set('bar', mock.barConfig);
            stateAccess.updateConfiguration(mock.fooConfigUpdated);
            assert.equal(mock.fooConfigUpdated, State.configurations.get('foo'));
        });
        it('does not mess other configuration', () => {
            State.configurations.set('foo', mock.fooConfig);
            State.configurations.set('bar', mock.barConfig);
            stateAccess.updateConfiguration(mock.fooConfigUpdated);
            assert.equal(mock.barConfig, State.configurations.get('bar'));
        });
        it('throws error when trying to update not existing configurations', () => {
            assert.throws(() => stateAccess.updateConfiguration(mock.barConfig), Error);
        });
    });

    describe('deleteConfiguration()', () => {
        it('correctly deletes configuration', () => {
            State.configurations.set('foo', mock.fooConfig);
            State.configurations.set('bar', mock.barConfig);
            stateAccess.deleteConfiguration('foo');
            assert.equal(false, State.configurations.has('foo'));
        });
        it('does not mess other configurations', () => {
            State.configurations.set('foo', mock.fooConfig);
            State.configurations.set('bar', mock.barConfig);
            stateAccess.deleteConfiguration('foo');
            assert.equal(mock.barConfig, State.configurations.get('bar'));
        });
        it('throws error when trying to delete not existing configurations', () => {
            assert.throws(() => stateAccess.deleteConfiguration('foo'), Error);
        });
    });

});
