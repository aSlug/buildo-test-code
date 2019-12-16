import { Configuration } from './../models/configuration';

export class State {
    public static configurations: Map<string, Configuration> = new Map();
}
