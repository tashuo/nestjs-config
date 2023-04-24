import { Injectable } from "@nestjs/common";
import { ConfigOptions } from "./types";
import { get, set } from 'lodash';
import { sync } from "glob";
import * as dotenv from 'dotenv';
import { existsSync } from 'fs';
import * as path from 'path';

@Injectable()
export class ConfigService {
    private configs: Record<string, Record<string, any>>;

    constructor(private configOptions: ConfigOptions) {
        this.loadEnv(configOptions.envPath)
        this.loadConfig(configOptions.configGlob)
    }

    private loadEnv = (envPath?: string) => {
        envPath = envPath ? envPath : path.resolve(process.cwd(), '.env');
        const currentEnvPath = `${envPath}.${process.env.NODE_DEV}`;
        existsSync(currentEnvPath) && dotenv.config({path: currentEnvPath});
        dotenv.config({path: envPath});
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