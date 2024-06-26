import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cors from "cors"

async function bootstrap() {
  const corsOptions = {
    origin: "http://127.0.0.1:3000",
  };
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api")
  app.enableCors();
  // app.use(cors(corsOptions))
  await app.listen(3000);
}
bootstrap();
