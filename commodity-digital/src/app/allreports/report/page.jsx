"use client";

import styles from "../../page.module.css";
import MyDocument from "@/components/pdf";
import { useSearchParams } from "next/navigation";

function report(prop) {
  return (
    <div className={styles.report}>
      <div className={styles.report}>
        <MyDocument pdfUrl={prop.searchParams.name} />
      </div>
    </div>
  );
}

export default report;
