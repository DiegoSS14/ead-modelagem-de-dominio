import Errors from "@/constants/Errors" 
import PeopleName from "@/shared/PeopleName"

test('Deve lançar erro ao cadastrar nome vazio', ()=>{
    expect(() => new PeopleName('')).toThrow(Errors.EMPTY_NAME)
})

test('Deve lançar erro ao cadastrar nome undefined', ()=>{
    expect(() => new PeopleName(undefined)).toThrow(Errors.EMPTY_NAME)
})

test('Deve criar um nome corretamente', () => {
    const name = 'Diego Sousa'
    expect(new PeopleName(name).fullName).toBe(name)
})

test('Deve lançar erro ao tentar criar um nome sem sobrenome', () => {
    const name = 'Diego'
    expect(() => new PeopleName(name)).toThrow(Errors.NO_LASTNAME)
})

test('Deve lançar erro ao cadastrar nome muito grande', () => {
    expect(() => new PeopleName('asdasdadasdasddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddsassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'))
        .toThrow(Errors.VERY_BIG_NAME)
})

test('Deve lançar erro ao cadastrar nome muito pequeno', () => {
    expect(() => new PeopleName('Ana')).toThrow(Errors.VERY_SMALL_NAME)
})

test('Deve lançar erro ao cadastrar nome com caracteres inválidos', () => {
    expect(() => new PeopleName('Diego d|ssdn()')).toThrow(Errors.INVALID_CHARACTERS)
})

/** duplicate test removed: covered by earlier 'Deve lançar erro ao tentar criar um nome sem sobrenome' */

test('Deve criar uma pessoa com nome e sobrenome e validá-los', ()=>{
    const people = new PeopleName(' Diego Sousa da Silva')
    expect(people.fullName).toBe('Diego Sousa da Silva')
    expect(people.firstName).toBe('Diego')
    expect(people.lastName).toEqual(['Sousa', 'da', 'Silva'])
})