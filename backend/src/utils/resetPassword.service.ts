import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

// Настройка SMTP Mail.ru
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILRU_EMAIL, // Ваш email на Mail.ru
    pass: process.env.MAILRU_PASSWORD, // Пароль или пароль приложения
  },
});

export const sendNewPassword = async (
  email: string,
  password: string,
): Promise<void> => {
  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.MAILRU_EMAIL as string, // Используем process.env напрямую
    to: email,
    subject: 'Ваш новый пароль',
    text: `Ваш новый пароль: ${password}\n\nВы можете изменить его после входа в систему.`,
    html: `<p>Ваш новый пароль: <strong>${password}</strong></p><p>Вы можете изменить его после входа в систему.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Письмо успешно отправлено на ${email}`);
  } catch (error) {
    console.error('Ошибка при отправке письма:', error);
    throw new Error('Не удалось отправить письмо с новым паролем');
  }
};
