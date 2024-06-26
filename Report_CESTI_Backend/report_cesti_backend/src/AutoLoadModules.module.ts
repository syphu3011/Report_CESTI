
import { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as glob from 'glob';

@Module({})
export class AutoLoadModules {
    static register(): DynamicModule {
        let modules = glob
            .sync(path.join(__dirname, './models/**/*.module.{ts,js}'))
            .map((file) => {
            const module = require(file);
            const moduleName = Object.keys(module)[0];
            return module[moduleName];
        });
        return {
            module: AutoLoadModules,
            imports: modules,
        };
    }
}