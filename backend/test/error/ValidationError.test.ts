import ValidationError from "@/error/ValidationError"
import Errors from "@/constants/Errors"

test('Deve lançar um erro de validação', () => {
    expect(() => ValidationError.throwErr({ code: Errors.INVALID_EMAIL, value: 'diego123gmail' })).toThrow(Errors.INVALID_EMAIL)
})

test('Deve criar um erro de validação', () => {
    const error = ValidationError.new({
        code: Errors.INVALID_EMAIL,
        value: 'daknsnda,'
    })

    expect(Errors.INVALID_EMAIL).toBe(error.code)
    expect(error.value).toBeDefined()
})

test('Deve criar um erro sem passar parametros', () => {
    const error = new ValidationError()
    expect(error.code).toBe(Errors.UNKNOW)
})

test('Deve criar um erro com extras', () => {

    const extras = {
        min: '6 characters',
        max: '140 characters'
    }

    const error = ValidationError.new({
        code: Errors.SMALL_NAME,
        value: 'Ab',
        extras: extras
    })

    expect(extras).toBe(error.extras)
    expect(Errors.SMALL_NAME).toBe(error.code)
})