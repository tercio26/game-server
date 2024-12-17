import { Module } from '@nestjs/common'
import { I18nModule, AcceptLanguageResolver, HeaderResolver, QueryResolver } from 'nestjs-i18n'
import * as path from 'path'


@Module({
    imports: [
        I18nModule.forRoot({
            fallbackLanguage: 'en',
            loaderOptions: {
                path: path.join(__dirname, '..', '..', 'i18n'),
                watch: true, // Enable this for development (hot-reloading translations)
            },
            resolvers: [
                { use: QueryResolver, options: ['lang'] },
                AcceptLanguageResolver,
                new HeaderResolver(['x-custom-lang']),
            ],
        }),
    ],
    exports: [I18nModule],
})
export class I18nConfigModule {}
