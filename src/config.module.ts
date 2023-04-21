import { DynamicModule, Module } from "@nestjs/common";
import { ConfigOptions } from "./types";
import { CONFIG_OPTIONS } from "./constants";
import { ConfigService } from "./config.service";

@Module({})
export class ConfigModule {
    static register = (options: ConfigOptions): DynamicModule => ({
        module: ConfigModule,
        providers: [
            {
                provide: CONFIG_OPTIONS,
                useValue: options,
            },
            ConfigService,
        ],
        exports: [ConfigService],
    });
}