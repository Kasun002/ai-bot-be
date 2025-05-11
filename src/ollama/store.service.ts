import * as fs from 'fs';
const VECTOR_PATH = 'src/assets/json/vector-store.json';

export class StoreService {
  save(vectors: any[]) {
    fs.writeFileSync(VECTOR_PATH, JSON.stringify(vectors, null, 2));
  }

  load(): any[] {
    if (!fs.existsSync(VECTOR_PATH)) return [];
    return JSON.parse(fs.readFileSync(VECTOR_PATH, 'utf-8'));
  }
}
