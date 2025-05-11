import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { EmbeddingService } from './embedding.service';
import { OllamaService } from './ollama.service';
import { StoreService } from './store.service';
import { ApiBody, ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AskDto } from './ask.dto';

@ApiTags('ollama')
@Controller('ollama')
export class OllamaController {
    constructor(
        private readonly embedding: EmbeddingService,
        private readonly ollama: OllamaService,
        private readonly store: StoreService,
    ) { }

    @ApiOperation({ summary: 'Get AI Support' })
    @ApiHeader({ name: 'Content-Type', description: 'application/json' })
    @ApiBody({ type: AskDto })
    @HttpCode(HttpStatus.OK)
    @Post('ask')
    async ask(@Body('question') question: string) {
        const vectors = this.store.load();
        const qEmbed = await this.embedding.getEmbedding(question);

        const scored = vectors.map(v => ({
            chunk: v.chunk,
            score: this.embedding.cosineSimilarity(qEmbed, v.embedding),
        }));

        const top = scored.sort((a, b) => b.score - a.score)[0];

        if (!top || top.score < 0.6) {
            return { answer: 'Sorry, this is out of my context.' };
        }

        const prompt = `Use this context to answer: "${top.chunk}".\nQuestion: ${question}`;
        const answer = await this.ollama.generateAnswer(prompt);

        return { answer };
    }
}
