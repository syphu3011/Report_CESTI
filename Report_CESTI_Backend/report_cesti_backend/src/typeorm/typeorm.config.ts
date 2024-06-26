import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export default () => {
    return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) | 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/models/**/*.entity.{ts,js}'],
    logging: true,
    synchronize: true,
    autoLoadEntities: true
}
}