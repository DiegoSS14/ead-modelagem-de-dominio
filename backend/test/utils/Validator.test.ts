import Errors from "@/constants/Errors"
import ValidationError from "@/error/ValidationError"
import Validator from "@/utils/Validator"

describe('Validator - notNull', () => {
    test('Deve retornar null para um valor válido (string)', () => {
        const error = Validator.notNull('Diego', Errors.NULL_VALUE)
        expect(error).toBeNull()
    })

    test('Deve retornar null para um valor válido (number)', () => {
        const error = Validator.notNull(42, Errors.NULL_VALUE)
        expect(error).toBeNull()
    })

    test('Deve retornar null para um valor válido (object)', () => {
        const error = Validator.notNull({}, Errors.NULL_VALUE)
        expect(error).toBeNull()
    })

    test('Deve retornar erro para valor null', () => {
        const error = Validator.notNull(null, Errors.NULL_VALUE)
        expect(error).not.toBeNull()
        expect(error?.code).toBe(Errors.NULL_VALUE)
    })

    test('Deve retornar erro para valor undefined', () => {
        const error = Validator.notNull(undefined, Errors.NULL_VALUE)
        expect(error).not.toBeNull()
        expect(error?.code).toBe(Errors.NULL_VALUE)
    })
})

describe('Validator - notUndefined', () => {
    test('Deve retornar null para string definida', () => {
        const error = Validator.notUndefined('texto', Errors.NULL_VALUE)
        expect(error).toBeNull()
    })

    test('Deve retornar null para string vazia definida', () => {
        const error = Validator.notUndefined('', Errors.NULL_VALUE)
        expect(error).toBeNull()
    })

    test('Deve retornar erro para valor undefined', () => {
        const error = Validator.notUndefined(undefined as any, Errors.NULL_VALUE)
        expect(error).not.toBeNull()
        expect(error?.code).toBe(Errors.NULL_VALUE)
    })
})

describe('Validator - notEmpty', () => {
    test('Deve retornar null para string com conteúdo', () => {
        const error = Validator.notEmpty('Diego', Errors.SMALL_NAME)
        expect(error).toBeNull()
    })

    test('Deve retornar erro para string vazia', () => {
        const error = Validator.notEmpty('', Errors.SMALL_NAME)
        expect(error).not.toBeNull()
        expect(error?.code).toBe(Errors.SMALL_NAME)
    })

    test('Deve retornar erro para string com apenas espaços', () => {
        const error = Validator.notEmpty('   ', Errors.SMALL_NAME)
        expect(error).not.toBeNull()
        expect(error?.code).toBe(Errors.SMALL_NAME)
    })

    test('Deve retornar null para string com espaços mas com conteúdo', () => {
        const error = Validator.notEmpty('  Diego  ', Errors.SMALL_NAME)
        expect(error).toBeNull()
    })
})

describe('Validator - sizeSmallerThen', () => {
    test('Deve retornar null quando tamanho é menor que o máximo', () => {
        const error = Validator.sizeSmallerThen('Diego', 10, Errors.BIG_NAME)
        expect(error).toBeNull()
    })

    test('Deve retornar null quando tamanho é igual ao máximo', () => {
        const error = Validator.sizeSmallerThen('Diego', 5, Errors.BIG_NAME)
        expect(error).toBeNull()
    })

    test('Deve retornar erro quando tamanho é maior que o máximo', () => {
        const error = Validator.sizeSmallerThen('Diego Silva', 5, Errors.BIG_NAME)
        expect(error).not.toBeNull()
        expect(error?.code).toBe(Errors.BIG_NAME)
    })

    test('Deve funcionar com arrays', () => {
        const error = Validator.sizeSmallerThen([1, 2, 3], 5, Errors.BIG_NAME)
        expect(error).toBeNull()
    })

    test('Deve retornar erro para array maior que máximo', () => {
        const error = Validator.sizeSmallerThen([1, 2, 3, 4, 5], 3, Errors.BIG_NAME)
        expect(error).not.toBeNull()
        expect(error?.code).toBe(Errors.BIG_NAME)
    })
})

describe('Validator - sizeLargerThen', () => {
    test('Deve retornar null quando tamanho é maior ou igual ao mínimo', () => {
        const error = Validator.sizeLargerThen('Diego Silva', 5, Errors.SMALL_NAME)
        expect(error).toBeNull()
    })

    test('Deve retornar null quando tamanho é exatamente igual ao mínimo', () => {
        const error = Validator.sizeLargerThen('Diego', 5, Errors.SMALL_NAME)
        expect(error).toBeNull()
    })

    test('Deve retornar erro quando tamanho é menor que o mínimo', () => {
        const error = Validator.sizeLargerThen('Ana', 5, Errors.SMALL_NAME)
        expect(error).not.toBeNull()
        expect(error?.code).toBe(Errors.SMALL_NAME)
    })

    test('Deve funcionar com arrays', () => {
        const error = Validator.sizeLargerThen([1, 2, 3, 4, 5], 3, Errors.SMALL_NAME)
        expect(error).toBeNull()
    })

    test('Deve retornar erro para array menor que mínimo', () => {
        const error = Validator.sizeLargerThen([1, 2], 5, Errors.SMALL_NAME)
        expect(error).not.toBeNull()
        expect(error?.code).toBe(Errors.SMALL_NAME)
    })
})

describe('Validator - regex', () => {
    test('Deve retornar null quando regex faz match', () => {
        const regex = /^[0-9]+$/
        const error = Validator.regex('12345', regex, Errors.UNKNOW)
        expect(error).toBeNull()
    })

    test('Deve retornar erro quando regex não faz match', () => {
        const regex = /^[0-9]+$/
        const error = Validator.regex('abc123', regex, Errors.UNKNOW)
        expect(error).not.toBeNull()
        expect(error?.code).toBe(Errors.UNKNOW)
    })

    test('Deve funcionar com regex de email simples', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const error = Validator.regex('user@example.com', emailRegex, Errors.INVALID_EMAIL)
        expect(error).toBeNull()
    })

    test('Deve retornar erro para email inválido com regex simples', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const error = Validator.regex('invalid-email', emailRegex, Errors.INVALID_EMAIL)
        expect(error).not.toBeNull()
        expect(error?.code).toBe(Errors.INVALID_EMAIL)
    })
})

describe('Validator - isValidEmail', () => {
    test('Deve retornar true para email válido simples', () => {
        const result = Validator.isValidEmail('user@example.com')
        expect(result).toBe(true)
    })

    test('Deve retornar true para email válido com números', () => {
        const result = Validator.isValidEmail('user123@example.com')
        expect(result).toBe(true)
    })

    test('Deve retornar true para email válido com pontos', () => {
        const result = Validator.isValidEmail('user.name@example.co.uk')
        expect(result).toBe(true)
    })

    test('Deve retornar true para email válido com caracteres especiais permitidos', () => {
        const result = Validator.isValidEmail('user+tag@example.com')
        expect(result).toBe(true)
    })

    test('Deve retornar true para email válido com hífen', () => {
        const result = Validator.isValidEmail('user-name@example.com')
        expect(result).toBe(true)
    })

    test('Deve retornar false para email sem arroba', () => {
        const result = Validator.isValidEmail('userexample.com')
        expect(result).toBe(false)
    })

    test('Deve retornar false para email sem domínio', () => {
        const result = Validator.isValidEmail('user@')
        expect(result).toBe(false)
    })

    test('Deve retornar false para email vazio', () => {
        const result = Validator.isValidEmail('')
        expect(result).toBe(false)
    })

    test('Deve retornar true para email sem extensão de domínio (formato válido pelo regex)', () => {
        const result = Validator.isValidEmail('user@example')
        expect(result).toBe(true)
    })

    test('Deve retornar false para email com espaços', () => {
        const result = Validator.isValidEmail('user @example.com')
        expect(result).toBe(false)
    })

    test('Deve retornar false para email com múltiplas arrobas', () => {
        const result = Validator.isValidEmail('user@@example.com')
        expect(result).toBe(false)
    })
})

describe('Validator - combine', () => {
    test('Deve retornar null quando nenhum erro é passado', () => {
        const result = Validator.combine()
        expect(result).toBeNull()
    })

    test('Deve retornar null quando todos os erros são null', () => {
        const result = Validator.combine(null, null, null)
        expect(result).toBeNull()
    })

    test('Deve retornar array com um erro', () => {
        const err1 = ValidationError.new({code: Errors.NULL_VALUE})
        const result = Validator.combine(null, err1, null)
        expect(result).not.toBeNull()
        expect(result?.length).toBe(1)
        expect(result?.[0]?.code).toBe(Errors.NULL_VALUE)
    })

    test('Deve retornar array com múltiplos erros', () => {
        const err1 = ValidationError.new({code: Errors.NULL_VALUE})
        const err2 = ValidationError.new({code: Errors.SMALL_NAME})
        const err3 = ValidationError.new({code: Errors.BIG_NAME})
        const result = Validator.combine(err1, null, err2, err3)
        expect(result).not.toBeNull()
        expect(result?.length).toBe(3)
        expect(result?.[0]?.code).toBe(Errors.NULL_VALUE)
        expect(result?.[1]?.code).toBe(Errors.SMALL_NAME)
        expect(result?.[2]?.code).toBe(Errors.BIG_NAME)
    })

    test('Deve filtrar corretamente null do início', () => {
        const err1 = ValidationError.new({code: Errors.NULL_VALUE})
        const result = Validator.combine(null, null, err1)
        expect(result?.length).toBe(1)
        expect(result?.[0]?.code).toBe(Errors.NULL_VALUE)
    })

    test('Deve retornar array vazio transformado em null', () => {
        const result = Validator.combine(...[null, null].filter(e => e !== null))
        expect(result).toBeNull()
    })
})

