import {EntityManager, EntityMetadata, EntityTarget, Repository} from 'typeorm'
import {Variable} from '../enum/enums'

export class EntityRepositoryManager<T> extends Repository<T> {
    constructor(
        private readonly entity: EntityTarget<T>,
        private readonly entityManager: EntityManager,
        private readonly entityMetadata: EntityMetadata,
    ) {
        super(entity, entityManager)
    }

    async bulkUpdate(
        objs: Record<string, string>[],
        fields: string[],
        batchSize: number = Variable.CHUNK_SIZE,
    ): Promise<void> {
        let primaryKey: string

        if (this.entityMetadata.primaryColumns.length === 1) {
            primaryKey = this.entityMetadata.primaryColumns[0].databaseName
        } else {
            throw new Error('Entity has a composite primary key; multiple primary columns found.')
        }

        const maxBatchSize = batchSize || objs.length
        const batches = []
        const columnMap = new Map<string, string>()
        this.entityMetadata.columns.forEach((col) => {
            columnMap.set(col.databaseName, col.propertyPath)
        })

        if (batchSize !== undefined && batchSize <= 0) {
            throw new Error('Batch size must be a positive integer.')
        }

        if (fields.length === 0) {
            throw new Error('Field names must be provided to bulkUpdate.')
        }

        const invalidFields = fields.filter((field) => !columnMap.has(field))
        if (invalidFields.length > 0) {
            throw new Error(`Invalid fields provided: ${invalidFields.join(', ')}`)
        }

        // Check that each object has a primary key
        if (objs.some((obj) => !(primaryKey in obj))) {
            throw new Error(`All objects in bulk update must have the primary key '${String(primaryKey)}' set.`)
        }

        for (let i = 0; i < objs.length; i += maxBatchSize) {
            batches.push(objs.slice(i, i + maxBatchSize))
        }

        for (const batch of batches) {
            const caseStatements = fields.reduce(
                (acc, field) => {
                    const entityField = columnMap.get(field)
                    const cases = batch
                        .map((obj) => {
                            const primaryKeyValue = obj[primaryKey]
                            let fieldValue = obj[field]
                            if (fieldValue instanceof Date) {
                                fieldValue = `'${fieldValue.toISOString().slice(0, 19).replace('T', ' ')}'`
                            } else if (typeof fieldValue === 'string') {
                                fieldValue = `'${fieldValue.replace(/'/g, "''")}'`
                            }
                            return `WHEN ${primaryKey} = ${primaryKeyValue} THEN ${fieldValue}`
                        })
                        .join(' ')

                    acc[entityField] = () => `CASE ${cases} ELSE ${entityField} END`
                    return acc
                },
                {} as Record<string, any>,
            )

            const updateQuery = this.entityManager
                .createQueryBuilder()
                .update(this.entity)
                .set(caseStatements)
                .where(`${primaryKey} IN (:...ids)`, {ids: batch.map((obj) => obj[primaryKey])})

            await updateQuery.execute()
        }
    }
}
