import { z } from "zod";

export const SERVICE_TYPES = ["salesforce", "web", "mobile", "autre"] as const;

export const MIN_FILL_MS = 3_000;
export const MAX_FILL_MS = 2 * 60 * 60 * 1000;

const LINK_PATTERN = /(https?:\/\/|www\.)/gi;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\d\s.-]{6,25}$/)
    .refine((value) => (value.match(/\d/g) || []).length >= 6),
  company: z.string().trim().max(100).optional().default(""),
  serviceType: z.enum(SERVICE_TYPES),
  message: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .default("")
    .refine((value) => (value.match(LINK_PATTERN) || []).length <= 1),
  // Anti-bot
  hp_website: z.string().optional().default(""), // champ piège
  ts: z.coerce.number().optional(),
  turnstileToken: z.string().max(4096).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
