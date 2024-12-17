import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from '../../enum/user.enum'
import { ROLE_KEY } from '../../decorators/role/role.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<Role[]>(ROLE_KEY, [context.getHandler(), context.getClass()])

        if (!roles) {
            return true
        }

        const { user } = context.switchToHttp().getRequest()

        return roles.some((role) => user.role == role)
    }
}
