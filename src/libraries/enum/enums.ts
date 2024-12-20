export enum OrderDir {
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum Pager {
    DEFAULT_LIMIT = 100,
    MIN_LIMIT = 50,
    MAX_LIMIT = 5000,
    DEFAULT_PAGE = 1,
    DEFAULT_ORDER_DIR = OrderDir.DESC,
}

export const Variable = {
    CHUNK_SIZE: 1000,
    MAX_ITEM: 1000000,
    MAX_IMAGE_SIZE: 1.5 * 1024 * 1024,
    MIN_IMAGE_WIDTH: 500,
    MIN_IMAGE_HEIGHT: 500,
    IMAGE_ACCEPT_TYPES: /image\/(jpeg|jpg|png)/,
    COLLATE: 'utf8mb4_general_ci',
}

export enum Guard {
    LOCAL = 'local',
    JWT = 'JWT',
    GOOGLE = 'GOOGLE',
    FACEBOOK = 'FACEBOOK',
    APPLE = 'APPLE',
}

export enum GameStatus {
    INACTIVE = 0,
    DEVELOPING = 1,
    OPEN_BETA = 2,
    OFFICIAL_RELEASE = 3,
    CLOSED_BETA = 4,
}