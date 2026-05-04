import Id from "./Id";

export interface EntityProps {
    id?: string
}

export default abstract class Entity<Type, Props extends EntityProps> {
    readonly id: Id
    readonly props: Props

    constructor(props: EntityProps){
        this.id = props.id ? new Id(props.id) : Id.generate()
        this.props = { ...props, id: this.id.value } as Props
    }

    equals(entity: Entity<Type, Props>): boolean {
        return this.id.value === entity.id.value
    }

    diferent(entity: Entity<Type, Props>): boolean {
        return this.id.value !== entity.id.value
    }

    clone(newProps: Props, ...args: any[]): Type {
        return new (this.constructor as any) ({...this.props, ...newProps}, ...args)
    }
}