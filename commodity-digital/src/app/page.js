import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.btns}>
        <h1 className={styles.title}>COMMODITY DIGITAL</h1>
        <div className={styles.button}>
          <Link href="/create">
            <span>Create New</span>
          </Link>
        </div>
        <div className={styles.button}>
          <Link href="/allreports">
            <span>View All</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
