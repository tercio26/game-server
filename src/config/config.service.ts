export default () => ({
    server: {
        host: process.env.SERVER_HOST,
        port: parseInt(process.env.SERVER_PORT, 10) || 8080,
        contextPath: process.env.SERVER_CONTEXT_PATH,
        cors: {
            allowedOrigins: process.env.SERVER_CORS_ALLOWED_ORIGINS,
            allowedMethods: process.env.SERVER_CORS_ALLOWED_METHODS,
            allowedHeaders: process.env.SERVER_CORS_ALLOWED_HEADERS,
            exposedHeaders: process.env.SERVER_CORS_EXPOSED_HEADERS,
        },
    },
    db: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10) || 3306,
        name: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    },
    log: {
        console: {
            level: process.env.LOG_CONSOLE_LEVEL,
        },
    },
})
