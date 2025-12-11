import {
    type TemperatureUnit,
    type TemperatureConversion,
    type ConversionRequest,
} from "../../types/degree";

export class TemperatureService {
    private static readonly formulas = {
        celsiusToFahrenheit: (c: number) => (c * 9) / 5 + 32,
        fahrenheitToCelsius: (f: number) => ((f - 32) * 5) / 9,
        celsiusToKelvin: (c: number) => c + 273.15,
        kelvinToCelsius: (k: number) => k - 273.15,
        fahrenheitToKelvin: (f: number) => ((f - 32) * 5) / 9 + 273.15,
        kelvinToFahrenheit: (k: number) => ((k - 273.15) * 9) / 5 + 32,
    };

    static convert({
        value,
        from,
        to,
    }: ConversionRequest): TemperatureConversion {
        if (from === to) {
            return {
                from,
                to,
                value,
                result: value,
                formula: "no conversion needed",
            };
        }

        let result: number;
        let formula: string;

        switch (`${from}-${to}`) {
            case "celsius-fahrenheit":
                result = this.formulas.celsiusToFahrenheit(value);
                formula = `${value}°C × 9/5 + 32 = ${result}°F`;
                break;

            case "fahrenheit-celsius":
                result = this.formulas.fahrenheitToCelsius(value);
                formula = `(${value}°F - 32) × 5/9 = ${result}°C`;
                break;

            case "celsius-kelvin":
                result = this.formulas.celsiusToKelvin(value);
                formula = `${value}°C + 273.15 = ${result}K`;
                break;

            case "kelvin-celsius":
                result = this.formulas.kelvinToCelsius(value);
                formula = `${value}K - 273.15 = ${result}°C`;
                break;

            case "fahrenheit-kelvin":
                result = this.formulas.fahrenheitToKelvin(value);
                formula = `(${value}°F - 32) × 5/9 + 273.15 = ${result}K`;
                break;

            case "kelvin-fahrenheit":
                result = this.formulas.kelvinToFahrenheit(value);
                formula = `(${value}K - 273.15) × 9/5 + 32 = ${result}°F`;
                break;

            default:
                throw new Error(`Unsupported conversion: ${from} to ${to}`);
        }

        return {
            from,
            to,
            value,
            result: Number(result.toFixed(2)),
            formula,
        };
    }

    static convertAll(value: number, from: TemperatureUnit) {
        const units: TemperatureUnit[] = ["celsius", "fahrenheit", "kelvin"];

        return units
            .map((to) => {
                if (from === to) return null;
                return this.convert({ value, from, to });
            })
            .filter(Boolean);
    }

    static validateValue(value: number, unit: TemperatureUnit): boolean {
        if (unit === "kelvin" && value < 0) return false;
        if (unit === "celsius" && value < -273.15) return false;
        if (unit === "fahrenheit" && value < -459.67) return false;

        return !isNaN(value) && isFinite(value);
    }
}
