import { Injectable } from '@nestjs/common'
import { I18nContext } from 'nestjs-i18n'
import { TranslateOptions } from 'nestjs-i18n/dist/services/i18n.service'

@Injectable()
export class I18nTranslateService {
    t(key: string, options?: TranslateOptions): string {
        return I18nContext.current().t(key, options)
    }
}
