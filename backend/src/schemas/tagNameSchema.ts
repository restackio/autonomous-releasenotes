import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export const nextTagNameSchema = z.object({
  tagName: z.string().describe('The next tag name.'),
});

export type NextTagName = z.infer<typeof nextTagNameSchema>;

export const nextTagNameJsonSchema = {
  name: 'nextTagName',
  schema: zodToJsonSchema(nextTagNameSchema),
};
