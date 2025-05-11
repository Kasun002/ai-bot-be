import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { EmbeddingService } from '../ollama/embedding.service';
import { PdfService } from '../ollama/pdf.service';
import { StoreService } from '../ollama/store.service';

interface VectorDocument {
    chunk: string;
    embedding: number[];
}

(async () => {
    const appContext = await NestFactory.createApplicationContext(AppModule);

    const pdfService = appContext.get(PdfService);
    const embeddingService = appContext.get(EmbeddingService);
    const storeService = appContext.get(StoreService);

    const chunks = await pdfService.parsePdfChunks('src/assets/pdf/agar2024.pdf');
    const vectors: VectorDocument[] = [];

    for (const chunk of chunks) {
        const embedding = await embeddingService.getEmbedding(chunk);
        vectors.push({ chunk, embedding });
    }

    storeService.save(vectors);
    console.log('✅ PDF data embedded and stored.');
})();
