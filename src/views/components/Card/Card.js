import styles from "./Card.module.css";

function Card(props) {
  return (
    <section className={styles.card}>
      <header className={styles.title}>{props.title}</header>
      <section className={styles.details}>{props.children}</section>
    </section>
  );
}

export default Card;
