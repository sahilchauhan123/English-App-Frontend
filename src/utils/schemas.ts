import { z } from 'zod'


const userSchema = z.object({
    Id: z.number().int().optional(), // Optional as it's set by DB
    FullName: z.string().min(1, "Full name is required"),
    Username: z.string().min(1, "Username is required"),
    Email: z.email("Invalid email address"),
    Password: z.string().optional(), // Optional as it's only used in local auth
    Age: z.string().min(1, "Age is required"), // Consider using z.number() for age if applicable
    Gender: z.string().min(1, "Gender is required"),
    Interests: z.array(z.string()).min(1, "At least one interest is required"),
    ProfilePic: z.url("Invalid URL for profile picture"),
    AuthType: z.enum(["google", "email"]).refine((val) => val, {
        message: "Auth type must be 'google' or 'email'",
    }),
    CreatedAt: z.string().optional(), // Optional as it's set on backend
});


export { userSchema } 