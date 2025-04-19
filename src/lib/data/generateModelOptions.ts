// generateModelOptions.js
import fs from 'node:fs/promises';
import path from 'node:path';

async function generateModelOptions() {
  const modelsDir = path.resolve('./static/models');
  try {
    const parts = await fs.readdir(modelsDir);
    const options: { [key: string]: string[] } = {}; // Define el tipo de 'options'

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

    const output = `export const modelOptions = ${JSON.stringify(options, null, 2)};`;
    await fs.writeFile('./src/lib/data/modelOptions.js', output);
    console.log('src/lib/data/modelOptions.js generado.');

  } catch (error) {
    console.error('Error al generar modelOptions.js:', error);
  }
}

generateModelOptions();