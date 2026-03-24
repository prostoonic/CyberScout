import styles from "./page.module.css";
import Button from "@/shared/ui/button/Button";

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        <h1 className={styles.title}>
          CyberScout
        </h1>
        <p className={styles.text}>Твоё приключение в цифровом мире начинается здесь</p>
      </header>
      <main className={styles.main}>
        <form>
          <Button variant="primary" onClick={() =>{ console.log("hello")}} isDisable={false}>
            <span>Начать путешествие</span>
          </Button>
        </form>
      </main>
    </div>
  );
}
