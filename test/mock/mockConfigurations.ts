import { Configuration } from '../../src/models/configuration';

export const fooConfig = new Configuration();
fooConfig.id = 'foo';
fooConfig.name = 'configuration for foo';
fooConfig.value = 'this is the value for configuration foo';

export const barConfig = new Configuration();
barConfig.id = 'bar';
barConfig.name = 'configuration for bar';
barConfig.value = 'this is the value for configuration bar';

export const fooConfigUpdated = new Configuration();
fooConfigUpdated.id = 'foo';
fooConfigUpdated.name = 'updated configuration for foo';
fooConfigUpdated.value = 'this is the new value for configuration foo';