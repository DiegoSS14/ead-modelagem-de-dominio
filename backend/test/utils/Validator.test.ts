import Errors from "@/constants/Errors"
import ValidationError from "@/error/ValidationError"
import Validator from "@/utils/Validator"

test('Deve validar um valor não nulo', ()=>{
    const error = Validator.notNull('Diego', Errors.NULL_VALUE)
    expect(error).toBeNull()
})

test('Deve validar um valor nulo', ()=>{
    const error = Validator.notNull(null, Errors.NULL_VALUE)
    expect(Errors.NULL_VALUE).toBe(error?.code)
})

