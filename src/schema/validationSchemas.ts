import * as z from "zod"

export const Activity = z.object({
    activity: z.string().min(3, "Minimum 3 chars"),
});

export type ActivityValues = z.infer<typeof Activity>;