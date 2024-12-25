import { Controller, Get, Inject, Param, ParseIntPipe, UseGuards } from '@nestjs/common'
import { ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from '../../auth/guards/jwt.guard'
import { AuthAccount } from '../../../libraries/decorators/auth/account.decorator'
import { ApiTag } from '../../../libraries/enum/api.enum'

import { ResponseFactory } from '../../../libraries/factories/response.factory'

import { IGameFacade, IGameFacadeToken } from '../interfaces/game.facade.interface'

import { LoginDTO } from '../../auth/dto/response/login.dto'
import { GameDTO } from '../dto/response/game.dto'

@Controller('game/:gameId')
export class GameController {
    constructor(@Inject(IGameFacadeToken) private readonly gameFacade: IGameFacade) {}

    @Get('')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get game information' })
    @ApiHeader({
        name: 'Authorization',
        example: 'Bearer {{access_token}}',
        required: true,
        description: 'JWT Access Token',
    })
    @ApiParam({ name: 'gameId', required: true, description: 'ID of the game' })
    @ApiTags(ApiTag.GAME)
    @ApiResponse({ type: GameDTO })
    async createPlayer(@Param('gameId', ParseIntPipe) gameId: number, @AuthAccount() _account: LoginDTO) {
        const response = await this.gameFacade.getGame(gameId)

        return ResponseFactory.success(await this.gameFacade.getGame(gameId))
    }
}
