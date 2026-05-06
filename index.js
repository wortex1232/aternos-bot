const mineflayer = require('mineflayer');

// Sunucu bilgileri
const botArgs = {
    host: 'mtatr.aternos.me',
    port: 25565,
    username: 'AFK_Bot_NPC',
    version: false // Java sunucularında sürümü otomatik algılar
};

function createBot() {
    console.log('Bot Java sunucusuna bağlanmaya çalışıyor...');
    const bot = mineflayer.createBot(botArgs);

    // Sunucuya başarıyla girdiğinde çalışır
    bot.on('spawn', () => {
        console.log('TEBRİKLER! Bot sunucuya katıldı ve AFK kalıyor.');
        
        // Sunucunun seni AFK diye atmaması için 20 saniyede bir zıplama hareketi yapar
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => {
                bot.setControlState('jump', false);
            }, 500);
        }, 20000); 
    });

    // Biri sohbete selam yazarsa cevap verir (Aktif görünmek için)
    bot.on('chat', (username, message) => {
        if (username === bot.username) return;
        if (message.toLowerCase().includes('selam')) {
            bot.chat(`Selam ${username}, ben sunucuyu 7/24 tutan botum!`);
        }
    });

    // Hata oluşursa buraya yazar
    bot.on('error', (err) => {
        console.log('Bağlantı Hatası:', err.message);
    });
    
    // Bağlantı koparsa (sunucu kapanırsa vb.) 30 saniye sonra tekrar girmeyi dener
    bot.on('end', () => {
        console.log('Bağlantı kesildi. 30 saniye sonra tekrar denenecek...');
        setTimeout(createBot, 30000);
    });
}

// Botu başlat
createBot();
