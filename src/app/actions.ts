'use server';

import { generateStory } from '@/ai/flows/generate-ai-story';
import { generateCodeExplanation } from '@/ai/flows/generate-code-explanation';

export async function getStory(repoUrl: string) {
  try {
    const result = await generateStory({ repoUrl, analysisId: 'mock-id' });
    return { story: result.story };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { error: `Failed to generate story: ${errorMessage}` };
  }
}

export async function getCodeExplanation(code: string, language: string) {
  if (!code || !language) {
    return { error: 'Code and language are required.' };
  }

  try {
    const result = await generateCodeExplanation({ code, language });
    return { explanation: result.explanation };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return { error: `Failed to generate code explanation: ${errorMessage}` };
  }
}
