import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
const pdfParse = require('pdf-parse');

@Injectable()
export class PdfService {
    async parsePdfChunks(filePath: string): Promise<string[]> {
        const dataBuffer = fs.readFileSync(filePath);
        const parsed = await pdfParse(dataBuffer);
        return parsed.text.match(/(.|[\r\n]){1,500}/g) || [];
    }
}
