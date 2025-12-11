import { Router } from "express";
import { TemperatureController } from "../controllers/degree";
import {
    bulkConversionSchema,
    conversionSchema,
} from "../controllers/degree/schema";
import { validate, validateQuery } from "../middlewares/validate";

const router = Router();

router.post(
    "/convert",
    validate(conversionSchema),
    TemperatureController.convertTemperature
);
router.get(
    "/convert-all",
    validateQuery(bulkConversionSchema),
    TemperatureController.convertToAll
);

export default router;
