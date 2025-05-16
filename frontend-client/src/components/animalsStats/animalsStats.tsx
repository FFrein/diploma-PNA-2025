import styles from "./animalsStats.module.sass";

interface AnimalsStatsProps {}

const AnimalsStats: React.FC<AnimalsStatsProps> = () => {
  return (
    <div className={styles.AnimalsStats_wrapper}>
      <div className={styles.AnimalsStats_card}>
        <h4>Животных в приюте:</h4>
        <p>12</p>
      </div>
      <div className={styles.AnimalsStats_card}>
        <h4>Животных нашли дом:</h4>
        <p>4</p>
      </div>
    </div>
  );
};

export default AnimalsStats;
