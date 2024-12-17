import { FileTypeValidator, MaxFileSizeValidator } from '@nestjs/common'
import { Variable } from '../enum/enums'

export const UploadImageFilePipe = {
    fileIsRequired: false,
    validators: [
        new MaxFileSizeValidator({ maxSize: Variable.MAX_IMAGE_SIZE }),
        new FileTypeValidator({ fileType: Variable.IMAGE_ACCEPT_TYPES }),
    ],
}
