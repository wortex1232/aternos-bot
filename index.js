const mineflayer = require('mineflayer');

const botConfig = {
    host: 'osmbaba.aternos.me',
    port: 12827,
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
        
        // Kayıt ve Giriş İşlemi (Aternos genelde cracked olduğu için)
        setTimeout(() => {
            bot.chat('/register 12345678 12345678');
            bot.chat('/login 12345678');
            bot.chat('السلام عليكم'); // İlk mesaj
            console.log(`[SYS] ${name} kimlik doğrulama ve ilk mesaj gönderildi.`);
        }, 2000);

        // Rastgele hareket döngüsü (Sunucudan atılmamak için)
        setInterval(() => {
            const actions = ['forward', 'back', 'left', 'right', 'jump'];
            const action = actions[Math.floor(Math.random() * actions.length)];
            bot.setControlState(action, true);
            setTimeout(() => bot.setControlState(action, false), 1000);
        }, 15000);

        // Azerice sohbet döngüsü
        const azeriPhrases = [
            'discord.gg/mtatr',
            'discord.gg/mtatr',
            'discord.gg/mtatr',
            'discord.gg/exantriX',
            'Mən burdayam',
            'Hardasınız?',
            'Oyun əladır',
            'Hahaha',
            'Xoş gəldiniz',
            'Hamıya salam'
        ];

        setInterval(() => {
            const phrase = azeriPhrases[Math.floor(Math.random() * azeriPhrases.length)];
            bot.chat(phrase);
            console.log(`[CHAT] ${name}: ${phrase}`);
        }, Math.floor(Math.random() * 20000) + 20000); // 20-40 saniye arası rastgele mesaj atar

        // TP Döngüsü (Direkt TP - Hile gibi)
        setInterval(() => {
            bot.chat('/tp Voix3170');
            console.log(`[SYS] ${name} -> Voix3170 oyuncusuna direkt TP atıldı.`);
        }, 30000); // 30 saniyede bir direkt TP atar
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
