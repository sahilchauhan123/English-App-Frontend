import { userSchema } from "./schemas";



type User = Zod.infer<typeof userSchema>;


export type { User };