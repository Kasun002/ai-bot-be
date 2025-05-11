import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OllamaService {
    async generateAnswer(prompt: string): Promise<string> {
        try {
            const response = await axios.post(
                `${process.env.AI_PROVIDER_URL}/generate`,
                {
                    model: 'llama3',
                    prompt,
                    stream: true,
                },
                {
                    responseType: 'stream',
                    headers: { 'Content-Type': 'application/json' },
                },
            );

            let finalText = '';
            const stream = response.data;

            for await (const chunk of stream) {
                const lines = chunk.toString().split('\n').filter(Boolean);
                for (const line of lines) {
                    try {
                        const parsed = JSON.parse(line);
                        if (parsed.response) finalText += parsed.response;
                        if (parsed.done) break;
                    } catch (err) {
                        console.warn('Failed to parse chunk line:', line);
                    }
                }
            }

            return finalText.trim();
        } catch (error) {
            console.error('Ollama error:', error.message);
            throw new InternalServerErrorException('Failed to generate response from Ollama');
        }
    }
}
