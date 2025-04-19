import { json } from '@sveltejs/kit';
import fs from 'node:fs/promises';
import path from 'node:path';

export async function GET({ params }) {
  const { part } = params;
  const modelsDir = path.join('./static/models', part);

  try {
    const files = await fs.readdir(modelsDir);
    const glbFiles = files.filter((file: string) => file.endsWith('.glb')).map((file: string) => file.replace('.glb', ''));
    return json(glbFiles);
  } catch (error) {
    console.error('Error reading directory:', error);
    return new Response(JSON.stringify([]), { status: 500 });
  }
}