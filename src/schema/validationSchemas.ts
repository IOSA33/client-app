import * as z from "zod"

export const Activity = z.object({
    activity: z.string().min(3, "Minimum 3 chars"),
});

export type ActivityType = z.infer<typeof Activity>;

// TODO: remove interfaces and formvalue, and use "infer" from this
// Profit: much cleaner code base
export const IAuthZod = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required")
})

export const IAuthResetZod = z.object({
    email: z.email("Email is required"),
})

export const IAuthRegisterZod = z.object({
    username: z.string().min(3, "Username must be at least 3 character"),
    email: z.email(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordAgain: z.string()
}).superRefine((data, ctx) => {
    if (data.password !== data.passwordAgain) {
            ctx.addIssue({
            code: "custom",
            message: "Passwords do not match",
            path: ["passwordAgain"],
            });
        }
    }
);