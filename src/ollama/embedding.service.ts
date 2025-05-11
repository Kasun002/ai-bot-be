import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EmbeddingService {
    async getEmbedding(text: string): Promise<number[]> {
        const res = await axios.post(`${process.env.AI_PROVIDER_URL}/embeddings`, {
            model: 'nomic-embed-text',
            prompt: text,
        });
        return res.data.embedding;
    }

    cosineSimilarity(a: number[], b: number[]): number {
        const dot = a.reduce((acc, val, i) => acc + val * b[i], 0);
        const normA = Math.sqrt(a.reduce((acc, val) => acc + val * val, 0));
        const normB = Math.sqrt(b.reduce((acc, val) => acc + val * val, 0));
        return dot / (normA * normB);
    }
}
