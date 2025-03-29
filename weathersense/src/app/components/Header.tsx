import styles from "@/app/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Weather Sense.</h1>
      <p>Forecasts that make sense</p>
    </header>
  );
}
