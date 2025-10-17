module.exports = {
    apps: [
        {
            name: 'backend',
            cwd: './backend',
            script: 'dist/server.js',
            env: {
                NODE_ENV: 'production',
                PORT: 8080
            }
        },
        {
            name: 'frontend',
            cwd: './frontend',
            script: 'node',
            args: ['../node_modules/serve/build/main.js', '-s', 'dist', '-l', '3000'],
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
};