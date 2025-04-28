import { z } from "zod";

export const configurationSchema = z.object({
  mint: z
    .string({
      message: "Invalid mint address",
    })
    .nullable(),
});

export const recipientSchema = z.object({
  tokenAmount: z
    .string({
      message: "Invalid token amount is required",
    })
    .min(1, { message: "Invalid token amount" })
    .refine(
      (value) => {
        const numValue = Number(value);
        return numValue >= 0 && numValue <= 1000000000;
      },
      {
        message: "Token amount must be between 0 and 1 billion",
      }
    ),
  recipient: z
    .string({
      message: "Recipient address is required",
    })
    .min(1, { message: "Invalid recipient address" }),
});

export const reviewSchema = z.object({});

export const stepSchemas = {
  Configuration: configurationSchema,
  Recipients: recipientSchema,
  Review: reviewSchema,
};

export type StepSchemaKey = keyof typeof stepSchemas;
