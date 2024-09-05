import { z } from "zod";

// Define the schema
const UserValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().nonempty({ message: "Password is required" }),
    phone: z.string().regex(/^\d+$/, { message: "Phone number must be a positive integer" }),
    address: z.string().nonempty({ message: "Address is required" }),
    role: z.enum(["user", "admin"], { message: "Role must be either 'user' or 'admin'" }),
    image: z.string().optional(), // Image can be optional
  }),
});

export default UserValidationSchema;

