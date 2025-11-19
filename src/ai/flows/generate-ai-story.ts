'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a narrative about a codebase's evolution,
 * architecture decisions, and key contributors. It takes repository metadata as input and returns a story.
 *
 * - generateStory - An async function that initiates the story generation process.
 * - GenerateStoryInput - The input type for the generateStory function, including repository URL and analysis ID.
 * - GenerateStoryOutput - The output type for the generateStory function, which contains the generated story.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input schema definition
const GenerateStoryInputSchema = z.object({
  repoUrl: z.string().describe('The URL of the GitHub repository.'),
  analysisId: z.string().describe('The ID of the analysis being performed.'),
});

export type GenerateStoryInput = z.infer<typeof GenerateStoryInputSchema>;

// Output schema definition
const GenerateStoryOutputSchema = z.object({
  story: z.string().describe('The generated story about the codebase.'),
});

export type GenerateStoryOutput = z.infer<typeof GenerateStoryOutputSchema>;

// Async function to initiate the story generation process
export async function generateStory(input: GenerateStoryInput): Promise<GenerateStoryOutput> {
  return generateStoryFlow(input);
}

// Prompt definition
const generateStoryPrompt = ai.definePrompt({
  name: 'generateStoryPrompt',
  input: {schema: GenerateStoryInputSchema},
  output: {schema: GenerateStoryOutputSchema},
  prompt: `You are an assistant tasked with generating a narrative about a codebase.
  Use the following information about the repository to create an engaging and informative story:

  Repository URL: {{{repoUrl}}}
  Analysis ID: {{{analysisId}}}

  The story should cover the project's origin, evolution, key architectural decisions, and highlight the contributions of key developers.
  Focus on making the story understandable and engaging for both technical and non-technical audiences.
  Keep it relatively brief and do not exceed 500 words.
  Output the story in markdown format.
  `,
});

// Genkit flow definition
const generateStoryFlow = ai.defineFlow(
  {
    name: 'generateStoryFlow',
    inputSchema: GenerateStoryInputSchema,
    outputSchema: GenerateStoryOutputSchema,
  },
  async input => {
    const {output} = await generateStoryPrompt(input);
    return output!;
  }
);
