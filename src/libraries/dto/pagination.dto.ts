import {ApiProperty} from '@nestjs/swagger'
import {OrderDir, Pager} from '../enum/enums'
import {IsEnum, IsOptional} from 'class-validator'

export class Pagination {
    @ApiProperty({description: 'The current page number'})
    @IsOptional()
    page?: number = Pager.DEFAULT_PAGE

    @ApiProperty({description: 'The all total item with children'})
    @IsOptional()
    totalWithChildren?: number

    @ApiProperty({description: 'The number of items per page'})
    @IsOptional()
    limit?: number = Pager.DEFAULT_LIMIT

    @ApiProperty({description: 'The total number of items'})
    @IsOptional()
    total?: number = 0

    @ApiProperty({description: 'The field to order by'})
    @IsOptional()
    orderBy?: string

    @ApiProperty({enum: OrderDir})
    @IsOptional()
    @IsEnum(OrderDir)
    orderDir: string = Pager.DEFAULT_ORDER_DIR

    /**
     * Constructor
     *
     * @param page
     * @param limit
     * @param total
     * @param orderBy
     * @param orderDir
     * @param totalWithChildren
     */
    constructor(
        page: number,
        limit: number,
        total: number,
        orderBy: string,
        orderDir: string,
        totalWithChildren?: number,
    ) {
        this.page = Number(page)
        this.limit = Number(limit)
        this.total = Number(total)
        this.orderBy = orderBy
        this.orderDir = orderDir
    }
}
