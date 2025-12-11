import { z } from "zod";

export const conversionSchema = z.object({
    value: z
        .number()
        .min(-273.15, {
            message:
                "Температура не может быть ниже абсолютного нуля (-273.15°C)",
        })
        .max(10000, { message: "Температура слишком высокая" }),
    from: z.enum(["celsius", "fahrenheit", "kelvin"]),
    to: z.enum(["celsius", "fahrenheit", "kelvin"]),
});

export const bulkConversionSchema = z.object({
    value: z.union([z.string(), z.number()]),
    from: z.enum(["celsius", "fahrenheit", "kelvin"]),
});
