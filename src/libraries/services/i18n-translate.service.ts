import {Injectable} from '@nestjs/common'
import {I18nContext} from 'nestjs-i18n'
import {TranslateOptions} from 'nestjs-i18n/dist/services/i18n.service'

@Injectable()
export class I18nTranslateService {
    async translate(key: string, options?: TranslateOptions): Promise<string> {
        const i18n = I18nContext.current()
        return i18n.t(key, options)
    }
}
