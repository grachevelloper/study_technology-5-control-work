export type TemperatureUnit = "celsius" | "fahrenheit" | "kelvin";
export type TemperatureScale = "C" | "F" | "K";

export interface TemperatureConversion {
    from: TemperatureUnit;
    to: TemperatureUnit;
    value: number;
    result: number;
    formula: string;
}

export interface ConversionRequest {
    value: number;
    from: TemperatureUnit;
    to: TemperatureUnit;
}
