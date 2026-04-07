require('dotenv').config();
const { Telegraf } = require('telegraf');

// Замените на ваш токен (лучше использовать .env в продакшене)
const BOT_TOKEN = process.env.BOT_TOKEN || '8669073034:AAHhuavT4QqFehwb-GpqSAuv4t-VK_y4_eg';
const WEB_APP_URL = process.env.WEB_APP_URL || 'https://kinexai.vercel.app'; // Ссылка на ваш задеплоенный React App

const bot = new Telegraf(BOT_TOKEN);

// Команда /start
bot.start((ctx) => {
  ctx.reply('Welcome to KINEX! 🏋️‍♂️\nClick the button below to start your workout.', {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Open App', web_app: { url: WEB_APP_URL } }]
      ]
    }
  });
});

// ЗАГЛУШКА: Роут для создания счета (Invoice) внутри Mini App
bot.on('message', async (ctx) => {
  // 1. Оплата картой (Fiat)
  // Для этого в @BotFather нужно подключить платежного провайдера (Stripe, YooKassa, Smart Glocal)
  // И получить PROVIDER_TOKEN. 
  // const invoiceLinkFiat = await ctx.telegram.createInvoiceLink({
  //   title: 'KINEX PRO', description: '1 Month Subscription',
  //   payload: 'sub_1m', provider_token: process.env.STRIPE_TOKEN,
  //   currency: 'USD', prices: [{ label: '1 Month', amount: 999 }] // $9.99
  // });

  // 2. Оплата Звездами (Stars / XTR)
  // Провайдер токен не нужен.
  // const invoiceLinkStars = await ctx.telegram.createInvoiceLink({
  //   title: 'KINEX PRO', description: '1 Month Subscription',
  //   payload: 'sub_1m_stars', provider_token: '',
  //   currency: 'XTR', prices: [{ label: '1 Month', amount: 500 }] // ~500 Stars
  // });
});

// Обработка успешного платежа
bot.on('pre_checkout_query', (ctx) => ctx.answerPreCheckoutQuery(true)); // Подтверждаем платеж
bot.on('successful_payment', async (ctx) => {
  console.log('Payment successful:', ctx.message.successful_payment);
  // Здесь нужно обновить статус пользователя в Firebase на PRO
  ctx.reply('Thanks for purchasing Premium! 🌟');
});

bot.launch().then(() => {
  console.log('🤖 KINEX Bot started...');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
