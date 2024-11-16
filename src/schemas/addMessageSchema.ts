import { z } from 'zod';

export const addMessageSchema = z.object({
  message: z.string().min(1),
  from: z.string().optional(),
});

export type AddMessageType = z.infer<typeof addMessageSchema>;
