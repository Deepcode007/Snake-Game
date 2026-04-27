import zod from "zod";

export const loginzod = zod.object({
    password: zod.string(),
    email: zod.email()
})