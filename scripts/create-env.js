const fs = require('fs');
const path = require('path');

function createEnvFiles() {
    // Определяем пути относительно расположения скрипта
    const scriptsDir = __dirname; // папка scripts
    const rootDir = path.dirname(scriptsDir); // корень проекта
    const frontendDir = path.join(rootDir, 'frontend');
    const backendDir = path.join(rootDir, 'backend');

    // Создаем папки если они не существуют
    [frontendDir, backendDir].forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`📁 Created directory: ${dir}`);
        }
    });

    // Frontend .env
    const frontendEnvPath = path.join(frontendDir, '.env');
    if (!fs.existsSync(frontendEnvPath)) {
        const frontendEnvContent = `VITE_BASE_URL=http://localhost:8080\n`;
        fs.writeFileSync(frontendEnvPath, frontendEnvContent);
        console.log(`✅ Created: ${frontendEnvPath}`);
    } else {
        console.log(`⚠️  File already exists: ${frontendEnvPath}`);
    }

    // Backend .env
    const backendEnvPath = path.join(backendDir, '.env');
    if (!fs.existsSync(backendEnvPath)) {
        const backendEnvContent = `DATABASE_URL="file:./dev.db"\n`;
        fs.writeFileSync(backendEnvPath, backendEnvContent);
        console.log(`✅ Created: ${backendEnvPath}`);
    } else {
        console.log(`⚠️  File already exists: ${backendEnvPath}`);
    }

    console.log('🎉 All .env files created successfully!');
}

createEnvFiles();