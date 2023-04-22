import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '../index';
import { resolve } from 'path';

describe('module', () => {
    it('config', async () => {
        const module = await Test.createTestingModule({
            imports: [
                ConfigModule.register({
                    configGlob: resolve(__dirname, 'data/config', '*.ts'),
                }),
            ]
        }).compile();
        const configService = module.get<ConfigService>(ConfigService);
        expect(configService.get('app.name')).toBe('app');
    });
});
