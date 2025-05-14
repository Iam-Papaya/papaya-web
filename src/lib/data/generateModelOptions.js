// generateModelOptions.js run node src/lib/data/generateModelOptions.js

// @ts-check

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Necesario para __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateModelOptions() {
  const modelsDir = path.resolve(__dirname, '../../../static/models');
  try {
    const parts = await fs.readdir(modelsDir);
    
    /** @type {{ [key: string]: string[] }} */
    const options = {};

    for (const part of parts) {
      const partDir = path.join(modelsDir, part);
      const stats = await fs.stat(partDir);
      if (stats.isDirectory()) {
        const files = await fs.readdir(partDir);
        options[part] = files
          .filter(file => file.endsWith('.glb'))
          .map(file => file.replace('.glb', ''));
      }
    }

    const output = `/**
 * @type {{ [key: string]: string[] }}
 */
export const modelOptions = ${JSON.stringify(options, null, 2)};\n`;

    const outputPath = path.resolve(__dirname, './modelOptions.js');
    await fs.writeFile(outputPath, output);
    console.log('✅ src/lib/data/modelOptions.js generado.');
  } catch (error) {
    console.error('❌ Error al generar modelOptions.js:', error);
  }
}

generateModelOptions();
