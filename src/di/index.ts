import { utils } from './utils';
import { repositories } from './repositories';
import { services } from './services';
import { useCases } from './use-case';

export const DI = { utils, repositories, services, useCases } as const;
