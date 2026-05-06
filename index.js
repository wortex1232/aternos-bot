const mineflayer = require('mineflayer');

const botArgs = {
    host: 'mtatr.aternos.me',
    port: 25565, // Aternos genelde varsayılan portu kullanır
    username: 'AFK_Bot_NPC', // Botun oyundaki adı
    version: '1.21.11' // Hem Bedrock hem Java desteği için sürüm sabitlendi
};

function createBot() {
    const bot = mineflayer.createBot(botArgs);

    bot.on('spawn', () => {
        console.log('Bot sunucuya katıldı!');
        
        // Rastgele hareket döngüsü
        setInterval(() => {
            const actions = ['forward', 'back', 'left', 'right', 'jump'];
            const action = actions[Math.floor(Math.random() * actions.length)];
            
            bot.setControlState(action, true);
            setTimeout(() => {
                bot.setControlState(action, false);
            }, 1000);
        }, 10000); // Her 10 saniyede bir hareket eder
    });

    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        console.log(`${username}: ${message}`);
        
        // Basit etkileşim: Birisi "selam" derse cevap verebilir
        if (message.toLowerCase().includes('selam')) {
            bot.chat(`Selam ${username}, ben buradayım!`);
        }
    });

    bot.on('error', (err) => console.log('Hata:', err));
    
    bot.on('end', () => {
        console.log('Sunucudan ayrıldı, 30 saniye içinde tekrar bağlanılıyor...');
        setTimeout(createBot, 30000); // Bağlantı koparsa tekrar bağlanır
    });
}

createBot();
