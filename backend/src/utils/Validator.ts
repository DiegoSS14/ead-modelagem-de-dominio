import ValidationError from "@/error/ValidationError";

export default class Validator {
    
    public static notNull(value: any, error: string): ValidationError | null {
        return value !== null && value !== undefined 
            ? null 
            : ValidationError.new({code: error, value})
    }

    static combine(...errors: (ValidationError | null)[]): ValidationError[] | null {
        const res: ValidationError[] = errors.filter(err => err !== null)
        return res.length > 0 ? res : null
    }

    static notUndefined(value: string, error: string): ValidationError | null {
        return value === undefined ? ValidationError.new({code: error, value: value}) : null
    }

    static notEmpty(value: string, error: string): ValidationError | null {
        return value.trim() === '' ? ValidationError.new({code: error, value: value}) : null
    }

    static sizeSmallerThen(value: string | any[], maxSize: number, error: string): ValidationError | null {
        return value.length > maxSize ? ValidationError.new({code: error, value: value}) : null
    }

    static sizeLargerThen(value: string | any[], minSize: number, error: string): ValidationError | null {
        return value.length < minSize ? ValidationError.new({code: error, value: value}) : null
    }

    static regex(value: string, regex: RegExp, error: string): ValidationError | null {
        return regex.test(value) ? null : ValidationError.new({code: error, value: value})
    }

    static isValidEmail(email: string): boolean {
        const regex: RegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
        return regex.test(email)
    }
}