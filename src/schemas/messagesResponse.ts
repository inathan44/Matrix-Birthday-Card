import { z } from 'zod';
export const messagesResponse = z.object({
  id: z.number(),
  created_at: z.string(),
  message: z.string(),
  from: z.string().optional(),
});

export type MessagesResponseType = z.infer<typeof messagesResponse>;
