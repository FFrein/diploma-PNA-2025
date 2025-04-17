"use client";
import ServiceCard, { ServiceCardProps } from "./serviceCard/ServiceCard";
import accordion from "./Accordion.module.sass";

interface AccordionProps {}

const cards: Array<ServiceCardProps> = [
  {
    number: "",
    question: "Что такое проект «Друг для друга»?",
    answer:
      "Это уникальный проект, созданный для того, чтобы люди и животные изприютов могли найти друг друга и стать друзьями на всю жизнь. На сайтеwww. friendforpet.ru есть удобная система поиска для подбора питомца всоответствии со вашими предпочтениями, складом характера и привычками.",
  },
  {
    number: "",
    question: "Нужно ли платить за пользование сервисом?",
    answer:
      "Наш проект является благотворительным. Регистрация на сайте и поиск животных через сервис бесплатны.",
  },
  {
    number: "",
    question: "Что такое проект «Друг для друга»?",
    answer:
      "Это уникальный проект, созданный для того, чтобы люди и животные изприютов могли найти друг друга и стать друзьями на всю жизнь. На сайтеwww. friendforpet.ru есть удобная система поиска для подбора питомца всоответствии со вашими предпочтениями, складом характера и привычками.",
  },
  // ... другие вопросы
];

const Accordion: React.FC<AccordionProps> = ({}: AccordionProps) => {
  return (
    <div className={`${accordion.wrapper}`}>
      <div className="container">
        <h2 className={accordion.title}>Вопросы и ответы</h2>
        <div>
          {cards.map((card, index) => {
            return (
              <div
                key={index}
                style={{
                  zIndex: index,
                  margin: cards.length === index + 1 ? "" : "0 0 -24px 0",
                }}
              >
                <ServiceCard
                  number={index.toString()}
                  question={card.question}
                  answer={card.answer}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
