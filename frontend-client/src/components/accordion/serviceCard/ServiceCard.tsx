import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import serviceCard from "./ServiceCard.module.sass";

export interface ServiceCardProps {
  number: string;
  question: string;
  answer: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  number,
  question,
  answer,
}: ServiceCardProps) => {
  const [isShow, setShow] = useState(false);

  const handleChangeShow = () => {
    setShow(!isShow);
  };

  return (
    <>
      <div
        className={`${serviceCard.wrapper} ${
          isShow ? serviceCard.wrapper_active : ""
        }`}
        onClick={handleChangeShow}
      >
        {/*Left column*/}
        <div className={serviceCard.number}>
          <p>{number}</p>
        </div>
        {/*Right column*/}
        <div className={`${serviceCard.content}`}>
          {/* Header */}
          <div className={serviceCard.content_header}>
            <h3 className={serviceCard.content_header_title}>{question}</h3>
          </div>

          <AnimatePresence>
            {isShow && (
              <motion.div
                className={serviceCard.content_body}
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: "hidden" }}
              >
                <p className={serviceCard.content_body_text}>{answer}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
