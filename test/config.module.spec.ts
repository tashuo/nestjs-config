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
        // console.log(require(resolve(__dirname, 'data/config', 'app.ts')));
        const configService = module.get<ConfigService>(ConfigService);
        expect(configService.get('app.name')).toEqual('app');
    });
});

describe('module with env', () => {
    it('config', async () => {
        const module = await Test.createTestingModule({
            imports: [
                ConfigModule.register({
                    configGlob: resolve(__dirname, 'data/config', '*.ts'),
                    envPath: resolve(__dirname, 'data/', '.env'),
                }),
            ]
        }).compile();
// console.log(require(resolve(__dirname, 'data/config', 'app.ts')));
        const configService = module.get<ConfigService>(ConfigService);
        expect(configService.get('app.name')).toEqual('app-test');
    });
});

describe('module with node env', () => {
    it('config', async () => {
        process.env.NODE_DEV = 'development'
        const module = await Test.createTestingModule({
            imports: [
                ConfigModule.register({
                    configGlob: resolve(__dirname, 'data/config', '*.ts'),
                    envPath: resolve(__dirname, 'data/', '.env'),
                }),
            ]
        }).compile();
        // console.log(require(resolve(__dirname, 'data/config', 'app.ts')));
        const configService = module.get<ConfigService>(ConfigService);
        expect(configService.get('app.name')).toEqual('app-development');
    });
});