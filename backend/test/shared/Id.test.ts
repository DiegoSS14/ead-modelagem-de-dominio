import Errors from "@/constants/Errors";
import Id from "@/shared/Id";

test('Deve criar um novo id', () => {
    const id: Id = Id.generate()
    expect(id.value).toHaveLength(36)
    expect(id.new).toBeTruthy()
})

test('Deve criar um id a partir de um id já existente', () => {
    const oldId = Id.generate().value
    const newId = new Id(oldId)
    expect(newId.value).toHaveLength(36)
    expect(newId.new).toBeFalsy()
})

test('Deve lançar erro ao tentar criar um Id a partir de um valor inválido', () => {
    expect(() => new Id('123')).toThrow(Errors.INVALID_ID)
})

test('Deve comparar se um Id é igual ao outro', () => {
    const id: Id = Id.generate()
    const otherId: Id = Id.generate()

    expect(true).toBe(id.equals(id))
    expect(false).toBe(id.equals(otherId))
})

test('Deve comparar se um Id é diferente do outro', () => {
    const id: Id = Id.generate()
    const otherId: Id = Id.generate()

    expect(false).toBe(id.diferent(id))
    expect(true).toBe(id.diferent(otherId))
})