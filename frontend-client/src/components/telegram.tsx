import "./TelegramBlock.css";
import telegramLogo from "/public/telegram.png";

const TelegramBlock = () => {
  return (
    <a href="https://t.me/PetShelterPNA_BOT">
      <div className="telegram-section">
        <img src={telegramLogo} alt="Telegram Logo" className="telegram-logo" />
        <div className="telegram-section-text">
          <h2 className="telegram-text">Мы в Telegram</h2>
          <p>
            Подписывайтесь для получения уведомлений о поступлении новых
            животных!
            <br />
            Будь в курсе всех новостей, подписывайся на рассылку новостей!
          </p>
        </div>
      </div>
    </a>
  );
};

export default TelegramBlock;
