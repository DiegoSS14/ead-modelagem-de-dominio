import Errors from "@/constants/Errors"
import Validator from "@/utils/Validator"

export default class PeopleName{
    private value: string

    constructor(name?: string) {
        this.value = (name ?? '').trim()
        const nameParts = this.value.split(/\s+/)

        let errors = Validator.combine(
            Validator.notEmpty(this.value, Errors.EMPTY_NAME),
            // VERY_SMALL_NAME: error when length < 4 -> use sizeLessThan (checks < min)
            Validator.sizeLessThan(this.value, 4, Errors.VERY_SMALL_NAME),
            // VERY_BIG_NAME: error when length > 120 -> use sizeGreaterThan (checks > max)
            Validator.sizeGreaterThan(this.value, 120, Errors.VERY_BIG_NAME),
            Validator.notEmpty(nameParts[1] ?? '', Errors.NO_LASTNAME),
            Validator.regex(this.value, /^[\p{L}\p{M}\s.'’-]+$/u, Errors.INVALID_CHARACTERS),
        )

        if(errors) throw Error(errors.join(','))
    }

    get fullName() {
        return this.value
    }

    get firstName() {
        return this.value.split(' ')[0]
    }

    get lastName() {
        return this.value.split(' ').slice(1)
    }
}