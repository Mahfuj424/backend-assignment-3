import { string, z } from "zod";

const loginValidation = z.object({
  body: z.object({
    email: string(),
    password: string(),
  }),
});


export default loginValidation;