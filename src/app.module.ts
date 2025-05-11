import { Module } from '@nestjs/common';
import { OllamaModule } from './ollama/ollama.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [OllamaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })],
  controllers: [],
  providers: [],
})
export class AppModule { }
