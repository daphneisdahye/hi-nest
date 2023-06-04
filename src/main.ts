import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
   {
    whitelist : true,
    forbidNonWhitelisted: true, //@데코레이터 없으면 에러메시지 띄움 
    transform: true, //자동 형변환
   }),
  ); // 유효성검사
  await app.listen(3000);
}
bootstrap();
