import {registerDecorator, ValidationOptions, ValidationArguments} from 'class-validator'
import {I18nContext} from 'nestjs-i18n'

export function ExtLength(minLength: number, maxLength: number, validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            name: 'ExtLength',
            target: object.constructor,
            propertyName,
            constraints: [minLength, maxLength],
            options: validationOptions,
            validator: {
                async validate(value: string, args: ValidationArguments) {
                    const [minLength, maxLength] = args.constraints
                    return typeof value === 'string' && value.length >= minLength && value.length <= maxLength
                },
                defaultMessage(args: ValidationArguments) {
                    const i18n = I18nContext.current()
                    const [minLength, maxLength] = args.constraints
                    const targetName = args.property

                    // Translate with minLength, maxLength
                    return i18n.t('message.validation.range_length', {
                        args: {targetName, minLength, maxLength},
                    })
                },
            },
        })
    }
}
