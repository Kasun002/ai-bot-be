import { Module } from '@nestjs/common';
import { OllamaService } from './ollama.service';
import { OllamaController } from './ollama.controller';
import { PdfService } from './pdf.service';
import { EmbeddingService } from './embedding.service';
import { StoreService } from './store.service';

@Module({
  providers: [OllamaService, PdfService, EmbeddingService, StoreService],
  controllers: [OllamaController]
})
export class OllamaModule {}
