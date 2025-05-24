import { config } from 'dotenv';

config(); // Загружаем переменные окружения из .env

let bot;
let prisma;

if (!process.env.TELEGRAM_BOT_TOKEN) {
  throw new Error('TELEGRAM_BOT_TOKEN не указан в .env');
}
if (Number(process.env.TELEGRAM_BOT_ACTIVE) === 1) {
  console.log('Запуск телеграм бота');

  const { Telegraf } = require('telegraf');
  const { PrismaClient } = require('@prisma/client');

  prisma = new PrismaClient();

  bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

  // Команда /start
  bot.command('start', async (ctx) => {
    if (!ctx.chat) return;

    const chatId = ctx.chat.id.toString();
    const firstName = ctx.from?.first_name || 'друг';

    try {
      const user = await prisma.telegramUser.findFirst({
        where: { chatId: chatId },
      });

      if (!user && chatId) {
        await prisma.telegramUser.create({
          data: {
            chatId: chatId,
          },
        });
        await ctx.reply(`Привет, ${firstName}! Добро пожаловать в бот!`);
      } else {
        await ctx.reply(`С возвращением, ${firstName}!`);
      }

      const helpMessage = `
  Список команд:
  /start - Начать работу с ботом
  /help - Показать список команд
  /enable_animal_notifications - Включить уведомления о животных
  /disable_animal_notifications - Выключить уведомления о животных
  /enable_news_notifications - Включить уведомления новостей
  /disable_news_notifications - Выключить уведомления новостей
      `;
      await ctx.reply(helpMessage);
    } catch (error) {
      console.error('Ошибка при обработке /start:', error);
      await ctx.reply('Произошла ошибка, попробуй позже.');
    }
  });

  // Команда /help
  bot.command('help', async (ctx) => {
    const helpMessage = `
  Список команд:
  /start - Начать работу с ботом
  /help - Показать список команд
  /enable_animal_notifications - Включить уведомления о животных
  /disable_animal_notifications - Выключить уведомления о животных
  /enable_news_notifications - Включить уведомления новостей
  /disable_news_notifications - Выключить уведомления новостей
  `;
    await ctx.reply(helpMessage);
  });

  // Команда /enable_notifications
  bot.command('enable_animal_notifications', async (ctx) => {
    if (!ctx.chat) return;

    const chatId = ctx.chat.id.toString();

    try {
      const user = await prisma.telegramUser.update({
        where: { chatId: chatId },
        data: { animalNotified: true },
      });
      await ctx.reply('Уведомления включены!');
    } catch (error) {
      console.error('Ошибка при включении уведомлений:', error);
      await ctx.reply('Ты ещё не зарегистрирован. Используй /start.');
    }
  });

  // Команда /disable_notifications
  bot.command('disable_animal_notifications', async (ctx) => {
    if (!ctx.chat) return;

    const chatId = ctx.chat.id.toString();

    try {
      const user = await prisma.telegramUser.update({
        where: { chatId: chatId },
        data: { animalNotified: false },
      });
      await ctx.reply('Уведомления выключены!');
    } catch (error) {
      console.error('Ошибка при выключении уведомлений:', error);
      await ctx.reply('Ты ещё не зарегистрирован. Используй /start.');
    }
  });

  // Команда /enable_notifications
  bot.command('enable_news_notifications', async (ctx) => {
    if (!ctx.chat) return;

    const chatId = ctx.chat.id.toString();

    try {
      console.log(prisma);
      const user = await prisma.telegramUser.update({
        where: { chatId: chatId },
        data: { newsNotified: true },
      });
      await ctx.reply('Уведомления включены!');
    } catch (error) {
      console.error('Ошибка при включении уведомлений:', error);
      await ctx.reply('Ты ещё не зарегистрирован. Используй /start.');
    }
  });

  // Команда /disable_notifications
  bot.command('disable_news_notifications', async (ctx) => {
    if (!ctx.chat) return;

    const chatId = ctx.chat.id.toString();

    try {
      const user = await prisma.telegramUser.update({
        where: { chatId: chatId },
        data: { newsNotified: false },
      });
      await ctx.reply('Уведомления выключены!');
    } catch (error) {
      console.error('Ошибка при выключении уведомлений:', error);
      await ctx.reply('Ты ещё не зарегистрирован. Используй /start.');
    }
  });

  // Запуск бота

  bot.launch().then(() => {
    console.log('Бот запущен!');
  });
}

// Интерфейс для данных уведомления
interface NotificationData {
  imageUrl: string;
  link: string;
  text: string;
}

// Функция для рассылки сообщений
async function sendAnimalNotification({
  imageUrl,
  link,
  text,
}: NotificationData): Promise<void> {
  try {
    if (!bot) {
      throw new Error('TELEGRAM BOT UNACTIVE');
    }

    const users = await prisma.telegramUser.findMany({
      where: { animalNotified: true },
    });

    for (const user of users) {
      try {
        const chatId = user.chatId;
        await bot.telegram.sendPhoto(chatId, imageUrl, {
          caption: `${text}\n\n[Перейти по ссылке](${link})`,
          parse_mode: 'Markdown',
        });
      } catch (error) {
        console.error(`Ошибка отправки пользователю ${user.chatId}:`, error);
      }
    }
    console.log('Рассылка завершена.');
  } catch (error) {
    console.error('Ошибка при получении пользователей для рассылки:', error);
  }
}

// Функция для рассылки сообщений
async function sendNewsNotification({
  imageUrl,
  link,
  text,
}: NotificationData): Promise<void> {
  try {
    if (!bot) {
      throw new Error('TELEGRAM BOT UNACTIVE');
    }

    const users = await prisma.telegramUser.findMany({
      where: { newsNotified: true },
    });

    for (const user of users) {
      try {
        const chatId = user.chatId;
        await bot.telegram.sendPhoto(chatId, imageUrl, {
          caption: `${text}\n\n[Перейти по ссылке](${link})`,
          parse_mode: 'Markdown',
        });
      } catch (error) {
        console.error(`Ошибка отправки пользователю ${user.chatId}:`, error);
      }
    }
    console.log('Рассылка завершена.');
  } catch (error) {
    console.error('Ошибка при получении пользователей для рассылки:', error);
  }
}

// Обработка остановки бота
async function shutdown(signal: string) {
  if (!bot) {
    throw new Error('TELEGRAM BOT: BOT UNACTIVE');
  }

  if (!prisma) {
    throw new Error('TELEGRAM BOT: PRISMA UNACTIVE');
  }
  console.log(`Получен сигнал ${signal}, завершаем работу...`);
  try {
    bot.stop(signal as any); // Останавливаем бота
    await prisma.$disconnect(); // Закрываем соединение с Prisma
    console.log('Бот и Prisma успешно остановлены.');
    process.exit(0); // Завершаем процесс
  } catch (error) {
    console.error('Ошибка при остановке:', error);
    process.exit(1);
  }
}

// Асинхронные обработчики сигналов
process.once('SIGINT', () => shutdown('SIGINT'));
process.once('SIGTERM', () => shutdown('SIGTERM'));

export { sendAnimalNotification, sendNewsNotification };
