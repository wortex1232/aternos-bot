const mineflayer = require('mineflayer');

const botConfig = {
    host: 'mtatr.aternos.me',
    port: 25565,
    version: '1.21.11',
    checkTimeoutInterval: 60000
};

const BOT_COUNT = 5;
const JOIN_DELAY = 15000;

function createBot(name) {
    const bot = mineflayer.createBot({
        ...botConfig,
        username: name
    });

    bot.on('spawn', () => {
        console.log(`${name} sunucuya katıldı!`);
        
        setTimeout(() => {
            bot.chat('/register 12345678 12345678');
            setTimeout(() => {
                bot.chat('/login 12345678');
                setTimeout(() => {
                    bot.chat('Salam');
                    console.log(`[SYS] ${name} kimlik doğrulama ve ilk mesaj gönderildi.`);
                }, 1500);
            }, 1500);
        }, 3000);

        setInterval(() => {
            const actions = ['forward', 'back', 'left', 'right', 'jump'];
            const action = actions[Math.floor(Math.random() * actions.length)];
            bot.setControlState(action, true);
            setTimeout(() => bot.setControlState(action, false), 500 + Math.random() * 1500);
        }, 10000 + Math.random() * 20000);

        const phrases = [
            'discord.gg/exantriX',
            'discord.gg/mtatr'
        ];

        setInterval(() => {
            const phrase = phrases[Math.floor(Math.random() * phrases.length)];
            bot.chat(phrase);
            console.log(`[CHAT] ${name}: ${phrase}`);
        }, 5000 + Math.random() * 10000);
    });

    bot.on('error', (err) => console.log(`${name} Hatası:`, err.message));
    
    bot.on('end', () => {
        const reconnectDelay = Math.floor(Math.random() * 60000) + 60000;
        console.log(`${name} ayrıldı, ${reconnectDelay/1000} saniye sonra tekrar denenecek... Yeni isim alınıyor...`);
        setTimeout(() => createBot(generateRandomName()), reconnectDelay);
    });
}

function generateRandomName() {
    const firstNames = ['Ali', 'Veli', 'Hasan', 'Hüseyin', 'Mehmet', 'Ahmet', 'Fatma', 'Ayşe', 'Zeynep', 'Elif', 'Emre', 'Can', 'Deniz', 'Mert', 'Yusuf', 'Eda', 'Selin', 'Berk', 'Oğuz', 'Kaan'];
    const lastNames = ['Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Çelik', 'Özdemir', 'Arslan', 'Doğan', 'Korkmaz', 'Erdoğan', 'Aydın', 'Öztürk', 'Yıldırım', 'Acar', 'Aksoy'];
    const numbers = Math.floor(Math.random() * 1000);
    const useUnderscore = Math.random() > 0.5;
    const prefix = Math.random() > 0.7 ? ['x', 'i', 'Pro', 'The', 'Mr', 'Mrs'][Math.floor(Math.random() * 6)] : '';
    
    let name = prefix + firstNames[Math.floor(Math.random() * firstNames.length)];
    if (useUnderscore) name += '_';
    name += lastNames[Math.floor(Math.random() * lastNames.length)];
    if (Math.random() > 0.3) name += numbers;
    
    return name;
}

console.log(`${BOT_COUNT} bot başlatma işlemi başlıyor...`);
for (let i = 1; i <= BOT_COUNT; i++) {
    setTimeout(() => {
        const botName = generateRandomName();
        console.log(`${botName} başlatılıyor...`);
        createBot(botName);
    }, i * JOIN_DELAY);
}
