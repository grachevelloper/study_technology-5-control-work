import { Request, Response } from "express";
import { TemperatureService } from "../../services/degree";
import { type ConversionRequest } from "../../types/degree";

/**
 * @swagger
 * tags:
 *   name: Temperature
 *   description: Конвертация температур
 */
export class TemperatureController {
    /**
     * @swagger
     *  /convert:
     *   post:
     *     summary: Конвертировать температуру
     *     tags: [Temperature]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/ConversionRequest'
     *           examples:
     *             celsiusToFahrenheit:
     *               summary: Цельсий → Фаренгейт
     *               value:
     *                 value: 100
     *                 from: celsius
     *                 to: fahrenheit
     *             fahrenheitToCelsius:
     *               summary: Фаренгейт → Цельсий
     *               value:
     *                 value: 212
     *                 from: fahrenheit
     *                 to: celsius
     *     responses:
     *       200:
     *         description: Успешная конвертация
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   $ref: '#/components/schemas/TemperatureConversion'
     *                 message:
     *                   type: string
     *                   example: Converted 100°C to fahrenheit
     *       400:
     *         description: Ошибка валидации
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/ErrorResponse'
     *       500:
     *         description: Внутренняя ошибка сервера
     */
    static async convertTemperature(req: Request, res: Response) {
        try {
            const { value, from, to }: ConversionRequest = req.body;

            const result = TemperatureService.convert({
                value: Number(value),
                from,
                to,
            });

            res.json({
                success: true,
                data: result,
                message: `Converted ${value}${from
                    .charAt(0)
                    .toUpperCase()} to ${to}`,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Conversion failed",
            });
        }
    }

    /**
     * @swagger
     *  /convert-all:
     *   get:
     *     summary: Конвертировать во все шкалы
     *     tags: [Temperature]
     *     parameters:
     *       - in: query
     *         name: value
     *         required: true
     *         schema:
     *           minimum: -273.15
     *         description: Значение температуры
     *         example: 100
     *       - in: query
     *         name: from
     *         required: true
     *         schema:
     *           type: string
     *           enum: [celsius, fahrenheit, kelvin]
     *         description: Исходная шкала
     *         example: celsius
     *     responses:
     *       200:
     *         description: Все возможные конвертации
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   example: true
     *                 data:
     *                   type: object
     *                   properties:
     *                     original:
     *                       type: object
     *                       properties:
     *                         value:
     *                           type: number
     *                         unit:
     *                           type: string
     *                     conversions:
     *                       type: array
     *                       items:
     *                         $ref: '#/components/schemas/TemperatureConversion'
     *       400:
     *         description: Неверные параметры
     */
    static async convertToAll(req: Request, res: Response) {
        try {
            const { value, from } = req.query;
            const numValue = Number(value);

            const results = TemperatureService.convertAll(
                numValue,
                from as any
            );

            res.json({
                success: true,
                data: {
                    original: { value: numValue, unit: from },
                    conversions: results,
                },
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Conversion failed",
            });
        }
    }
}
