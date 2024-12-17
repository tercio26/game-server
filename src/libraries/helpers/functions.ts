export function arrayToMap<T>(arr: T[], key: string): Map<any, T> {
    return new Map<any, T>(arr.map((obj) => [obj[key], obj]))
}

export function arrayToMapWithGroup<T>(arr: T[], key: string): Map<any, T[]> {
    const result = new Map<any, T[]>()
    arr.forEach((obj) => {
        if (!result.has(obj[key])) {
            result.set(obj[key], [])
        }
        result.get(obj[key]).push(obj)
    })
    return result
}

export function mapToArray<T>(map): Array<T> {
    return Array.from(map.values())
}

export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
}
