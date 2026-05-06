const mineflayer = require('mineflayer');

const botArgs = {
    host: 'mtatr.aternos.me',
    port: 25565,
    username: 'AFK_Bot_NPC',
    version: '1.21.4' // Sürümü 1.21.4 olarak sabitledik
};

function createBot() {
    console.log('Bot sunucuya bağlanmaya çalışıyor...');
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log('BOT SUNUCUYA KATILDI! AFK modu aktif.');
        
        // Rastgele hareket döngüsü
        setInterval(() => {
            const actions = ['forward', 'back', 'left', 'right', 'jump'];
            const action = actions[Math.floor(Math.random() * actions.length)];
            
            bot.setControlState(action, true);
            setTimeout(() => {
                bot.setControlState(action, false);
            }, 1000);
        }, 15000); // Her 15 saniyede bir hareket eder
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message.toLowerCase().includes('selam')) {
            bot.chat(`Selam ${username}, ben buradayım!`);
        }
    });

    bot.on('error', (err) => {
        console.log('Hata Oluştu:', err.message);
    });
    
    bot.on('end', () => {
        console.log('Sunucudan ayrıldı, 30 saniye içinde tekrar bağlanılıyor...');
        setTimeout(createBot, 30000);
    });
}

createBot();
