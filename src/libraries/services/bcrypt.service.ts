import {Injectable} from '@nestjs/common'
import {compare, genSalt, hash} from 'bcryptjs'

@Injectable()
export class BcryptService {
    async hash(data: string): Promise<string> {
        const salt = await genSalt()
        return hash(data, salt)
    }

    compare(data: string, encrypted: string): boolean {
        return compare(data, encrypted)
    }
}
