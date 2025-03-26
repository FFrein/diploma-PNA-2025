import { useState } from "react";

export const Questions = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div className="section__inner section_pt30px">
        <div className="content-wrapper">
          <section className="FAQ-section FAQ-section_first">
            <div className="content-wrapper">
              <h4 className="section-title" style={{ marginBottom: "0px" }}>
                Вопросы о проекте «Друг для друга», о правилах
              </h4>
              <div className="FAQ-section-question-wrapper">
                {[
                  {
                    question: "Что такое проект «Друг для друга»?",
                    answer: (
                      <p>
                        Это уникальный проект, созданный для того, чтобы люди и
                        животные из приютов могли найти друг друга и стать
                        друзьями на всю жизнь. На сайте www.friendforpet.ru есть
                        удобная система поиска для подбора питомца в
                        соответствии со вашими предпочтениями, складом характера
                        и привычками.
                      </p>
                    ),
                  },
                  {
                    question: "Нужно ли платить за пользование сервисом?",
                    answer: (
                      <p>
                        Наш проект является благотворительным. Регистрация на
                        сайте и поиск животных через сервис бесплатны.
                      </p>
                    ),
                  },
                  {
                    question: "Чем ваш сервис отличается от сайтов приютов?",
                    answer: (
                      <p>
                        В проекте «Друг для друга» принимают участие приюты,
                        имеющие высокие стандарты содержания животных и хорошую
                        репутацию. Все животные на сайте прошли обследование у
                        ветеринарного врача, привиты, социализированы и готовы к
                        жизни с человеком.
                      </p>
                    ),
                  },
                  // ... другие вопросы
                ].map((item, index) => (
                  <div className="question-block" key={index}>
                    <div
                      className="question"
                      onClick={() => toggleAnswer(index)}
                    >
                      {item.question}
                    </div>
                    {activeIndex === index && (
                      <div className="answer">{item.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="FAQ-section">
            <div className="content-wrapper">
              <h4 className="section-title" style={{ marginBottom: "0px" }}>
                Регистрация, авторизация на сайте
              </h4>
              <div className="FAQ-section-question-wrapper">
                {[
                  {
                    question: "Как зарегистрироваться на сайте?",
                    answer: (
                      <p>
                        Для регистрации необходимо заполнить все поля с
                        контактной информацией. Форма регистрации доступна по
                        кнопке «Войти» в верхней части сайта или при клике на
                        кнопке «Взять питомца» на карточке питомца.
                      </p>
                    ),
                  },
                  {
                    question: "Что делать, если забыли пароль?",
                    answer: (
                      <p>
                        Воспользоваться формой восстановления пароля, которая
                        доступна по кнопке «Войти» в шапке сайта.
                      </p>
                    ),
                  },
                  {
                    question:
                      "Не получили письмо с подтверждением для регистрации. Что делать?",
                    answer: (
                      <p>
                        Проверьте папку «Спам». Если письма там нет, пришлите
                        для проверки своей email на адрес Горячей линии:
                        contact@ru.nestle.com.
                      </p>
                    ),
                  },
                  // ... другие вопросы
                ].map((item, index) => (
                  <div className="question-block" key={index + 3}>
                    <div
                      className="question"
                      onClick={() => toggleAnswer(index + 3)}
                    >
                      {item.question}
                    </div>
                    {activeIndex === index + 3 && (
                      <div className="answer">{item.answer}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
