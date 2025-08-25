import { z } from "zod";

export const waitlistSchema = z.object({
  name: z.string().min(2, "Nome troppo corto"),
  surname: z.string().min(2, "Cognome troppo corto"),
  email: z.string().email("Email non valida"),
  curriculum: z.string().min(2, "Seleziona un curriculum"),
  grade: z.string().min(1, "Classe obbligatoria"),
  birthdate: z.string().min(4, "Data obbligatoria"),
  privacy: z.boolean().refine(v => v === true, "Devi accettare la privacy"),
});
