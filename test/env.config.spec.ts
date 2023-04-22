import { Test } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '../index';
import { resolve } from 'path';

describe('module with node env', () => {
    it('config', async () => {
        const module = await Test.createTestingModule({
            imports: [
                ConfigModule.register({
                    configGlob: resolve(__dirname, 'data/config', '*.ts'),
                    envPath: resolve(__dirname, 'data/', '.env'),
                }),
            ]
        }).compile();
        const configService = module.get<ConfigService>(ConfigService);
        expect(configService.get('app.name')).toEqual('app-test');
    });
});