import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common'
import { ApiBody, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JwtGuard } from '../../auth/guards/jwt.guard'
import { ApiTag } from '../../../libraries/enum/api.enum'

import { ResponseFactory } from '../../../libraries/factories/response.factory'

import { IGameSaveFacade, IGameSaveFacadeToken } from '../interfaces/game-save.facade.interface'

import { GameSaveRequest } from '../dto/request/game-save.dto'
import { GameSaveDTO } from '../dto/response/game-save.dto'

@Controller('game/:gameId/account/:accountId/player/:playerId/save')
export class GameSaveController {
    constructor(@Inject(IGameSaveFacadeToken) private readonly gameSaveFacade: IGameSaveFacade) {}

    @Get('')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Get list of game saving' })
    @ApiHeader({
        name: 'Authorization',
        example: 'Bearer {{access_token}}',
        required: true,
        description: 'JWT Access Token',
    })
    @ApiParam({ name: 'gameId', required: true, description: 'ID of the game' })
    @ApiParam({ name: 'accountId', required: true, description: 'ID of the account' })
    @ApiParam({ name: 'playerId', required: true, description: 'ID of the player' })
    @ApiTags(ApiTag.GAME)
    @ApiResponse({ type: GameSaveDTO })
    async get(
        @Param('gameId', ParseIntPipe) gameId: number,
        @Param('accountId', ParseIntPipe) accountId: number,
        @Param('playerId', ParseIntPipe) playerId: number,
    ) {
        return ResponseFactory.success(await this.gameSaveFacade.get(gameId, accountId, playerId))
    }

    @Get('load/:gameSaveId')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Load a game save' })
    @ApiHeader({
        name: 'Authorization',
        example: 'Bearer {{access_token}}',
        required: true,
        description: 'JWT Access Token',
    })
    @ApiParam({ name: 'gameId', required: true, description: 'ID of the game' })
    @ApiParam({ name: 'accountId', required: true, description: 'ID of the account' })
    @ApiParam({ name: 'playerId', required: true, description: 'ID of the player' })
    @ApiParam({ name: 'gameSaveId', required: true, description: 'ID of the game save' })
    @ApiResponse({ type: GameSaveDTO })
    @ApiTags(ApiTag.GAME)
    async load(
        @Param('gameId', ParseIntPipe) gameId: number,
        @Param('accountId', ParseIntPipe) accountId: number,
        @Param('playerId', ParseIntPipe) playerId: number,
        @Param('gameSaveId', ParseIntPipe) gameSaveId: number,
    ) {
        return ResponseFactory.success(await this.gameSaveFacade.load(gameId, accountId, playerId, gameSaveId))
    }

    @Post(':gameSaveId')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Saving the game' })
    @ApiHeader({
        name: 'Authorization',
        example: 'Bearer {{access_token}}',
        required: true,
        description: 'JWT Access Token',
    })
    @ApiParam({ name: 'gameId', required: true, description: 'ID of the game' })
    @ApiParam({ name: 'accountId', required: true, description: 'ID of the account' })
    @ApiParam({ name: 'playerId', required: true, description: 'ID of the player' })
    @ApiParam({ name: 'gameSaveId', required: false, description: 'ID of the game save, blank if create new' })
    @ApiBody({ type: GameSaveRequest, required: true, description: 'The data to update the player' })
    @ApiResponse({ type: Number })
    @ApiTags(ApiTag.GAME)
    async save(
        @Param('gameId', ParseIntPipe) gameId: number,
        @Param('accountId', ParseIntPipe) accountId: number,
        @Param('playerId', ParseIntPipe) playerId: number,
        @Param('gameSaveId', ParseIntPipe) gameSaveId: number,
        @Body() request: GameSaveRequest,
    ) {
        return ResponseFactory.success(await this.gameSaveFacade.save(gameId, accountId, playerId, request, gameSaveId))
    }

    @Delete(':gameSaveId')
    @UseGuards(JwtGuard)
    @ApiOperation({ summary: 'Delete a game save data' })
    @ApiHeader({
        name: 'Authorization',
        example: 'Bearer {{access_token}}',
        required: true,
        description: 'JWT Access Token',
    })
    @ApiParam({ name: 'gameId', required: true, description: 'ID of the game' })
    @ApiParam({ name: 'accountId', required: true, description: 'ID of the account' })
    @ApiParam({ name: 'playerId', required: true, description: 'ID of the player' })
    @ApiParam({ name: 'gameSaveId', required: true, description: 'ID of the game save' })
    @ApiTags(ApiTag.GAME)
    async delete(
        @Param('gameId', ParseIntPipe) gameId: number,
        @Param('accountId', ParseIntPipe) accountId: number,
        @Param('playerId', ParseIntPipe) playerId: number,
        @Param('gameSaveId', ParseIntPipe) gameSaveId: number,
    ) {
        await this.gameSaveFacade.delete(gameId, accountId, playerId, gameSaveId)

        return ResponseFactory.successNoData()
    }
}
