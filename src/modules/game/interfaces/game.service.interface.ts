import { GameDTO } from '../dto/response/game.dto'

export const IGameServiceToken: string = 'IGameService'

export interface IGameService {
    getGame(gameId: number): Promise<GameDTO>
}
