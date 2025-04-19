import { json } from '@sveltejs/kit';
import { modelOptions } from '$lib/data/modelOptions';

export async function GET({ params }) {
  const { part } = params;
  return json(modelOptions[part] || []);
}