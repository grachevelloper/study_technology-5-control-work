import { SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Temperature Converter API",
        version: "1.0.0",
        description:
            "API для конвертации температур между шкалами Цельсия, Фаренгейта и Кельвина",
    },
    servers: [
        {
            url: "http://localhost:3000/api",
            description: "Development server",
        },
    ],
    tags: [
        {
            name: "Temperature",
            description: "Операции с температурами",
        },
    ],
    components: {
        schemas: {
            TemperatureConversion: {
                type: "object",
                properties: {
                    from: {
                        type: "string",
                        enum: ["celsius", "fahrenheit", "kelvin"],
                        description: "Исходная шкала температуры",
                    },
                    to: {
                        type: "string",
                        enum: ["celsius", "fahrenheit", "kelvin"],
                        description: "Целевая шкала температуры",
                    },
                    value: {
                        type: "number",
                        description: "Значение температуры",
                        example: 100,
                    },
                    result: {
                        type: "number",
                        description: "Результат конвертации",
                        example: 212,
                    },
                    formula: {
                        type: "string",
                        description: "Использованная формула",
                        example: "100°C × 9/5 + 32 = 212°F",
                    },
                },
            },
            ConversionRequest: {
                type: "object",
                required: ["value", "from", "to"],
                properties: {
                    value: {
                        type: "number",
                        description: "Температура для конвертации",
                        example: 100,
                    },
                    from: {
                        type: "string",
                        enum: ["celsius", "fahrenheit", "kelvin"],
                        example: "celsius",
                    },
                    to: {
                        type: "string",
                        enum: ["celsius", "fahrenheit", "kelvin"],
                        example: "fahrenheit",
                    },
                },
            },
            ErrorResponse: {
                type: "object",
                properties: {
                    success: {
                        type: "boolean",
                        example: false,
                    },
                    error: {
                        type: "string",
                        example: "Validation failed",
                    },
                    details: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                field: { type: "string" },
                                message: { type: "string" },
                            },
                        },
                    },
                },
            },
        },
    },
};

const options = {
    swaggerDefinition,
    apis: [
        "./src/routes/*.ts",
        "./src/controllers/degree/*.ts",
        "./src/controllers/**/*.ts",
    ],
};

export default options;
