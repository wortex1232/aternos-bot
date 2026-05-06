const mineflayer = require('mineflayer');

const botConfig = {
    host: 'mtatr.aternos.me',
    port: 25565,
    version: '1.21.11',
    checkTimeoutInterval: 60000
};

const BOT_COUNT = 5; // Aternos IP engeli yememek için sayı düşürüldü
const JOIN_DELAY = 15000; // Giriş süresi uzatıldı (Güvenlik)

function createBot(name) {
    const bot = mineflayer.createBot({
        ...botConfig,
        username: name
    });

    bot.on('spawn', () => {
        console.log(`${name} sunucuya katıldı!`);
        
        // Rastgele hareket döngüsü (Sunucudan atılmamak için)
        setInterval(() => {
            const actions = ['forward', 'back', 'left', 'right', 'jump'];
            const action = actions[Math.floor(Math.random() * actions.length)];
            bot.setControlState(action, true);
            setTimeout(() => bot.setControlState(action, false), 1000);
        }, 15000);
    });

    bot.on('error', (err) => console.log(`${name} Hatası:`, err.message));
    
    bot.on('end', () => {
        const reconnectDelay = Math.floor(Math.random() * 30000) + 30000; // 30-60 saniye arası rastgele tekrar dene
        console.log(`${name} ayrıldı, ${reconnectDelay/1000} saniye sonra tekrar denenecek...`);
        setTimeout(() => createBot(name), reconnectDelay);
    });
}

function generateRandomName() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let name = 'AFK_';
    for (let i = 0; i < 6; i++) {
        name += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return name;
}

// Botları sırayla başlat
console.log(`${BOT_COUNT} bot başlatma işlemi başlıyor...`);
for (let i = 1; i <= BOT_COUNT; i++) {
    setTimeout(() => {
        const botName = generateRandomName();
        console.log(`${botName} başlatılıyor...`);
        createBot(botName);
    }, i * JOIN_DELAY);
}
