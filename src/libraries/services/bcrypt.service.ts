import {Injectable} from '@nestjs/common'
import {compare, genSalt, hash} from 'bcryptjs'

@Injectable()
export class BcryptService {
    hash(data: string): string {
        return hash(data, genSalt())
    }

    compare(data: string, encrypted: string): boolean {
        return compare(data, encrypted)
    }
}
