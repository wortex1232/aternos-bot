const mineflayer = require('mineflayer');

const botConfig = {
    host: 'Smpp-duda.aternos.me',
    port: 17998,
    version: '1.21.1',
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
        console.log(`${name} sunucuya katildi!`);
        
        setTimeout(() => {
            bot.chat('/register 12345678 12345678');
            setTimeout(() => {
                bot.chat('/login 12345678');
                setTimeout(() => {
                    bot.chat('Salam');
                    console.log(`[SYS] ${name} kimlik dogrulama ve ilk mesaj gonderildi.`);
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
        }, 1000 + Math.random() * 2000);
    });

    bot.on('error', (err) => console.log(`${name} Hatasi:`, err.message));
    
    bot.on('end', () => {
        const reconnectDelay = Math.floor(Math.random() * 60000) + 60000;
        console.log(`${name} ayrildi, ${reconnectDelay/1000} saniye sonra tekrar denenecek...`);
        setTimeout(() => createBot(generateRandomName()), reconnectDelay);
    });
}

function generateRandomName() {
    const firstNames = ['Ali', 'Veli', 'Hasan', 'Huseyin', 'Mehmet', 'Ahmet', 'Fatma', 'Ayse', 'Zeynep', 'Elif', 'Emre', 'Can', 'Deniz', 'Mert', 'Yusuf', 'Eda', 'Selin', 'Berk', 'Oguz', 'Kaan'];
    const lastNames = ['Yilmaz', 'Kaya', 'Demir', 'Sahin', 'Celik', 'Ozdemir', 'Arslan', 'Dogan', 'Korkmaz', 'Erdogan', 'Aydin', 'Ozturk', 'Yildirim', 'Acar', 'Aksoy'];
    const numbers = Math.floor(Math.random() * 1000);
    const useUnderscore = Math.random() > 0.5;
    const prefix = Math.random() > 0.7 ? ['x', 'i', 'Pro', 'The', 'Mr', 'Mrs'][Math.floor(Math.random() * 6)] : '';
    
    let name = prefix + firstNames[Math.floor(Math.random() * firstNames.length)];
    if (useUnderscore) name += '_';
    name += lastNames[Math.floor(Math.random() * lastNames.length)];
    if (Math.random() > 0.3) name += numbers;
    
    return name;
}

console.log(`${BOT_COUNT} bot baslatma islemi basliyor...`);
for (let i = 1; i <= BOT_COUNT; i++) {
    setTimeout(() => {
        const botName = generateRandomName();
        console.log(`${botName} baslatiliyor...`);
        createBot(botName);
    }, i * JOIN_DELAY);
}
