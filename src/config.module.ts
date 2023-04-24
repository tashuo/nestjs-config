import { DynamicModule, Module } from "@nestjs/common";
import { ConfigOptions } from "./types";
import { ConfigService } from "./config.service";

@Module({})
export class ConfigModule {
    static register = (options: ConfigOptions): DynamicModule => ({
        module: ConfigModule,
        providers: [
            {
                provide: ConfigService,
                useFactory: (): ConfigService =>  {
                    return new ConfigService(options);
                }
            },
        ],
        exports: [ConfigService],
    });
}