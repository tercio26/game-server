import {Transform} from 'class-transformer'

export function Trim() {
    return Transform(({value}) => (typeof value === 'string' ? value.trim() : value))
}

export function TransformNumber() {
    return Transform(({value}) => Number(value))
}

export function TransformBoolean() {
    return Transform(({value}) => {
        if (value === 'true') {
            return true
        } else if (value === 'false') {
            return false
        }
        return Boolean(value)
    })
}
