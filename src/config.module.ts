import { DynamicModule, Module } from "@nestjs/common";
import { ConfigOptions } from "./types";
import { CONFIG_OPTIONS } from "./constants";

@Module({})
export class ConfigModule {
    static register = (options: ConfigOptions): DynamicModule => {
        return {
            module: ConfigModule,
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options,
                },
            ],
            exports: [],
        }
    }
}