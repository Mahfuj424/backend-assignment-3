import { z } from "zod";

// Define the schema
const UserValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().nonempty("Password is required"),
    phone: z.string().nonempty("Phone number must be a positive integer"),
    address: z.string().nonempty("Address is required"),
    role: z.enum(["user", "admin"]),
  }),
});

export default UserValidationSchema;
