import Errors from "@/constants/Errors"

export interface ValidationErrorProps{
    code?: string
    value?: number
    extras?: Object
}

export default class ValidationError extends Error{
    readonly code: string
    readonly value: any
    readonly extras: any

    constructor(props?: ValidationErrorProps){
        super(props?.code ?? Errors.UNKNOW)
        this.code = props?.code ?? Errors.UNKNOW
        this.value = props?.value 
        this.extras = props?.extras ?? {}
    }

    public static new(props: ValidationErrorProps): ValidationError {
        return new ValidationError(props)
    }

    public static throwErr(props: ValidationErrorProps): never {
        throw new ValidationError(props)
    }
}