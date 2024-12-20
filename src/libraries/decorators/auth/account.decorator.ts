import {createParamDecorator, ExecutionContext} from '@nestjs/common'

export const AuthAccount = createParamDecorator((data: string, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user
})
