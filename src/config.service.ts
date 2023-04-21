import { Inject, Injectable } from "@nestjs/common";
import { CONFIG_OPTIONS } from "./constants";
import { ConfigOptions } from "./types";
import { isNil, get, set } from 'lodash';
import { sync } from "glob";
import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import * as path from 'path';

@Injectable()
export class ConfigService {
    private configs: Record<string, Record<string, any>>;

    constructor(@Inject(CONFIG_OPTIONS) private configOptions: ConfigOptions) {
        const configGlob = configOptions.configGlob
        this.loadEnv(configOptions.envGlob)
        this.loadConfig(configOptions.configGlob)
    }

    private loadEnv = (envGlob?: string) => {
        if (!isNil(envGlob)) {
            const envFiles = sync(envGlob);
            envFiles.forEach((file) => {
                dotenv.config({path: file})
            })
            return
        }

        const currentEnvFile = path.resolve(process.cwd(), `.env.${process.env.NODE_DEV}`)
        existsSync(currentEnvFile)
        && dotenv.config({path: currentEnvFile})

        dotenv.config();
    }

    private loadConfig = (configGlob: string) => {
        const config_files = sync(configGlob);
        this.configs = config_files.reduce((configs: Record<string, any>, file: string) => {
            const basename = path.basename(file);
            const key = basename.substring(0, basename.lastIndexOf('.'));
            const value = require(file)
            configs[key] = value.default || value;
            return configs;
        }, {});
    }

    get = (key: string, defaultValue: any = undefined): any => {
        return get(this.configs, key, defaultValue);
    }

    set = (key: string, value: any) => {
        set(this.configs, key, value);
    }
}