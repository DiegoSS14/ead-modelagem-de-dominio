import ValidationError from "@/error/ValidationError";

export default class Validator {
    
    public static notNull(value: any, error: string): ValidationError | null {
        return value !== null && value !== undefined 
            ? null 
            : ValidationError.new({code: error, value})
    }
}