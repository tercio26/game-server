import { GameDTO } from '../dto/response/game.dto'

export const IGameFacadeToken: string = 'IGameFacade'

export interface IGameFacade {
    getGame(gameId: number): Promise<GameDTO>
}
