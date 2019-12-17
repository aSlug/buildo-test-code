import { Configuration } from '../models/configuration';
import { State } from './state';

export function existsConfiguration(id: string): boolean {
    return State.configurations.has(id);
}

export function getConfiguration(id: string): Configuration {
    return State.configurations.get(id);
}

export function getAllConfigurations(): Configuration[] {
    return Array.from(State.configurations.values());
}

export function saveNewConfiguration(config: Configuration) {
    if (State.configurations.has(config.id)) {
        throw new Error('Unable to save a duplicate configuration');
    }
    State.configurations.set(config.id, config);
}

export function updateConfiguration(config: Configuration) {
    if (!State.configurations.has(config.id)) {
        throw new Error('Unable to update not existing configuration');
    }
    State.configurations.set(config.id, config);
}

export function deleteConfiguration(id: string) {
    if (!State.configurations.has(id)) {
        throw new Error('Unable to delete unexisting configuration');
    }
    State.configurations.delete(id);
}
