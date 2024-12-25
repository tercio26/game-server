import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common'
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from '../../auth/guards/jwt.guard'
import { GameAccessGuard } from '../guards/game-access.guard'
import { ApiTag } from '../../../libraries/enum/api.enum'

import { ResponseFactory } from '../../../libraries/factories/response.factory'

import { IPlayerFacade, IPlayerFacadeToken } from '../interfaces/player.facade.interface'

import { PlayerDTO } from '../dto/response/player/player.dto'
import { CreatePlayerRequest } from '../dto/request/player/create-player.dto'
import { UpdatePlayerRequest } from '../dto/request/player/update-player.dto'

@Controller('game/:gameId/account/:accountId/player')
export class GamePlayerController {
    constructor(@Inject(IPlayerFacadeToken) private readonly playerFacade: IPlayerFacade) {}

    @Post('create')
    @UseGuards(JwtGuard, GameAccessGuard)
    @ApiOperation({ summary: 'Create a player for an account' })
    @ApiHeader({
        name: 'Authorization',
        example: 'Bearer {{access_token}}',
        required: true,
        description: 'JWT Access Token',
    })
    @ApiParam({ name: 'gameId', required: true, description: 'ID of the game' })
    @ApiParam({ name: 'accountId', required: true, description: 'ID of the account' })
    @ApiBody({ type: CreatePlayerRequest, required: true, description: 'The data to create the player' })
    @ApiTags(ApiTag.PLAYER)
    @ApiResponse({ type: PlayerDTO })
    async createPlayer(
        @Param('gameId', ParseIntPipe) gameId: number,
        @Param('accountId', ParseIntPipe) accountId: number,
        @Body() request: CreatePlayerRequest,
    ) {
        return ResponseFactory.success(await this.playerFacade.createPlayer(gameId, accountId, request))
    }

    @Delete(':playerId')
    @UseGuards(JwtGuard, GameAccessGuard)
    @ApiOperation({ summary: 'Deletes a player associated with a specific account in a game.' })
    @ApiHeader({
        name: 'Authorization',
        example: 'Bearer {{access_token}}',
        required: true,
        description: 'JWT Access Token',
    })
    @ApiParam({ name: 'gameId', required: true, description: 'ID of the game' })
    @ApiParam({ name: 'accountId', required: true, description: 'ID of the account' })
    @ApiParam({ name: 'playerId', required: true, description: 'The ID of the player to be deleted' })
    @ApiTags(ApiTag.PLAYER)
    async deletePlayer(
        @Param('gameId') gameId: number,
        @Param('accountId') accountId: number,
        @Param('playerId') playerId: number,
    ) {
        await this.playerFacade.deletePlayer(gameId, accountId, playerId)

        return ResponseFactory.successNoData()
    }

    @Get('')
    @UseGuards(JwtGuard, GameAccessGuard)
    @ApiOperation({ summary: 'Get all players for an account' })
    @ApiHeader({
        name: 'Authorization',
        example: 'Bearer {{access_token}}',
        required: true,
        description: 'JWT Access Token',
    })
    @ApiParam({ name: 'gameId', required: true, description: 'ID of the game' })
    @ApiParam({ name: 'accountId', required: true, description: 'ID of the account' })
    @ApiTags(ApiTag.PLAYER)
    @ApiResponse({ type: PlayerDTO })
    async getPlayer(@Param('gameId') gameId: number, @Param('accountId') accountId: number) {
        return ResponseFactory.success(await this.playerFacade.getPlayers(gameId, accountId))
    }

    @Put(':playerId')
    @UseGuards(JwtGuard, GameAccessGuard)
    @ApiOperation({ summary: 'Updates a player associated with a specific account in a game.' })
    @ApiHeader({
        name: 'Authorization',
        example: 'Bearer {{access_token}}',
        required: true,
        description: 'JWT Access Token',
    })
    @ApiParam({ name: 'gameId', required: true, description: 'ID of the game' })
    @ApiParam({ name: 'accountId', required: true, description: 'ID of the account' })
    @ApiParam({ name: 'playerId', required: true, description: 'The ID of the player to be updated' })
    @ApiBody({ type: UpdatePlayerRequest, required: true, description: 'The data to update the player' })
    @ApiTags(ApiTag.PLAYER)
    @ApiResponse({ type: PlayerDTO })
    async updatePlayer(
        @Param('gameId') gameId: number,
        @Param('accountId') accountId: number,
        @Param('playerId') playerId: number,
        @Body() request: UpdatePlayerRequest,
    ) {
        return ResponseFactory.success(await this.playerFacade.updatePlayer(gameId, accountId, playerId, request))
    }
}
