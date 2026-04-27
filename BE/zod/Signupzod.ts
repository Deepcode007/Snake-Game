import zod from "zod";

export const signupzod = zod.object({
    name: zod.string(),
    password: zod.string(),
    email: zod.email()
})