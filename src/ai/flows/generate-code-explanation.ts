'use server';

/**
 * @fileOverview Generates an explanation for a given code snippet.
 *
 * - generateCodeExplanation - A function that generates an explanation for a given code snippet.
 * - GenerateCodeExplanationInput - The input type for the generateCodeExplanation function.
 * - GenerateCodeExplanationOutput - The return type for the generateCodeExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeExplanationInputSchema = z.object({
  code: z.string().describe('The code snippet to explain.'),
  language: z.string().describe('The programming language of the code snippet.'),
});
export type GenerateCodeExplanationInput = z.infer<typeof GenerateCodeExplanationInputSchema>;

const GenerateCodeExplanationOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the code snippet.'),
});
export type GenerateCodeExplanationOutput = z.infer<typeof GenerateCodeExplanationOutputSchema>;

export async function generateCodeExplanation(input: GenerateCodeExplanationInput): Promise<GenerateCodeExplanationOutput> {
  return generateCodeExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodeExplanationPrompt',
  input: {schema: GenerateCodeExplanationInputSchema},
  output: {schema: GenerateCodeExplanationOutputSchema},
  prompt: `You are an expert software developer. Explain the following code snippet in a clear and concise manner, as if you were explaining it to another developer.\n\nLanguage: {{{language}}}\nCode:\n{{{
        code
    }}}`,
});

const generateCodeExplanationFlow = ai.defineFlow(
  {
    name: 'generateCodeExplanationFlow',
    inputSchema: GenerateCodeExplanationInputSchema,
    outputSchema: GenerateCodeExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
