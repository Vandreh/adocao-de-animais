import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix("/api/v1")
  app.use((req: Request, res: Response, next) => { console.log(req.url);
    // res.on("finish", () => { console.log(res) });
    next()
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }));
  await app.listen(8000, () => { console.log('Server is running!') });
}
bootstrap();
