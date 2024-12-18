import { Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { User } from '../entities/user.entity'
import { UserProvider } from '../../../libraries/enum/user.enum'
import { LoginRequest } from '../dto/request/login.dto';

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager())
    }

    getUserByProvider(provider: UserProvider, providerId: string): Promise<User> {
        return this.findOne({ where: { provider, providerId } })
    }

    registerLocalUser(email: string, hashedPassword: string, name: string): Promise<User> {
        const user = this.create({
            provider: UserProvider.LOCAL,
            email,
            password: hashedPassword,
            name: name,
        })

        return this.save(user)
    }

    registerUserByProvider(request: LoginRequest): Promise<User> {
        const user = this.create({
            provider: request.provider,
            providerId: request.providerId,
            email: request.email,
            name: request.name,
            avatarPath: request.avatarPath,
        })

        return this.save(user)
    }
}
