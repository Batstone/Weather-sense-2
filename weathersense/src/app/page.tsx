import styles from "./page.module.css";

import Form from "./components/Form";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className={styles.title}>Weather Sense</h1>
        <Form />
      </main>
    </div>
  );
}
