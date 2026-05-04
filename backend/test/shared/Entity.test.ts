import Entity, { EntityProps } from "@/shared/Entity";
import Id from "@/shared/Id";

interface TestEntityProps extends EntityProps {
    name?: string
    age?: number
}

class TestEntity extends Entity<TestEntity, TestEntityProps> {
    constructor(props: TestEntityProps) {
        super(props)
    }
}

test('Deve criar nova entidade', () => {
    const id = Id.generate()
    const entityTest: TestEntity = new TestEntity({ id: id.value ,name: "Diego", age: 22 })
    expect(id.value).toEqual(entityTest.id.value)
})

test('Deve comparar duas entidades', () => {
    const id = Id.generate()
    const entityTest: TestEntity = new TestEntity({ id: id.value ,name: "Diego", age: 22 })
    const entityTest2: TestEntity = new TestEntity({ id: id.value ,name: "Ronaldo", age: 22 })
    const entityTest3: TestEntity = new TestEntity({ id: Id.generate().value ,name: "Ronaldo", age: 22 })
    expect(entityTest.equals(entityTest2)).toBeTruthy
    expect(entityTest.diferent(entityTest2)).toBeFalsy
    expect(entityTest.diferent(entityTest3)).toBeTruthy
    expect(entityTest.equals(entityTest3)).toBeFalsy
})

test('Deve clonar uma entidade', () =>{
    const id = Id.generate()
    const entityTest: TestEntity = new TestEntity({name: "Diego", age: 22 })
    const entityTest2: TestEntity = entityTest.clone({name: "Filipe", age: 27})
    expect(entityTest.props.name !== entityTest2.props.name).toBeTruthy
})

test('Deve gerar id quando não informado e ser instância de Id', () => {
    const entityTest: TestEntity = new TestEntity({ name: "Ana", age: 30 })
    expect(entityTest.id).toBeInstanceOf(Id)
    expect(typeof entityTest.id.value).toBe('string')
    expect(entityTest.id.new).toBeTruthy()
})