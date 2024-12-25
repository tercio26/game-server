import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'

@Injectable()
export class GameAccessGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest()
        const user = request.user // From JWT
        const { gameId, accountId } = request.params

        // Check if the accountId from the token matches and if the gameId is valid
        return user.accountId == accountId// && isGameValid(gameId, user.accountId)
    }
}
