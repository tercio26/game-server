import {ApiProperty} from '@nestjs/swagger'
import {IsEnum, IsOptional, Max} from 'class-validator'
import {Transform} from 'class-transformer'
import {OrderDir, Pager} from '../enum/enums'

export class PaginationRequest {
    @IsOptional()
    @Transform(({value}) => Number(value) || Pager.DEFAULT_PAGE)
    page?: number

    @IsOptional()
    @Max(Pager.MAX_LIMIT)
    @Transform(({value}) => Number(value) || Pager.DEFAULT_LIMIT)
    limit?: number

    @IsOptional()
    orderBy?: string

    @ApiProperty({type: 'enum', enum: OrderDir})
    @IsOptional()
    @IsEnum(OrderDir)
    @Transform(({value}) => value || Pager.DEFAULT_ORDER_DIR)
    orderDir?: string | Pager.DEFAULT_ORDER_DIR

    constructor() {
        this.page = this.page || Pager.DEFAULT_PAGE
        this.limit = this.limit || Pager.DEFAULT_LIMIT
        this.orderDir = this.orderDir || Pager.DEFAULT_ORDER_DIR
    }
}
