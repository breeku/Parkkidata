module.exports = {
    openapi: '3.0.0',
    info: {
        title: 'Parkkidata API',
        version: '1.0.0',
        description: 'Parkkidata',
    },
    servers: [
        {
            url: 'http://localhost:3001',
            description: 'Development server',
        },
        {
            url: 'https://api.parkkidata.tk',
            description: 'Production server',
        },
    ],
}
