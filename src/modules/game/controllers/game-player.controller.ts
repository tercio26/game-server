import { Controller, Get, UseGuards } from '@nestjs/common'
import { JwtGuard } from '../../auth/guards/jwt.guard'
import { ResponseFactory } from '../../../libraries/factories/response.factory'
import { AuthAccount } from '../../../libraries/decorators/auth/account.decorator'

@Controller('user')
export class GamePlayerController {
    constructor() {
    }

    @Get('profile')
    @UseGuards(JwtGuard)
    profile(
        @AuthAccount() user: any
    ) {
        console.log(user)
        return ResponseFactory.success(user)

        // const user = req.user
    }
}
