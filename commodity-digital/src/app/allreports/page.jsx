"use client";
import Loader from "@/components/loader";
import styles from "../page.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import backendUrl from "@/components/urls";

export default function page() {
  const [reports, setReports] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/documents`);
        console.log("Response", response.data);
        setReports(response.data);
      } catch (error) {
        console.log("error fetching all reports", error);
      }
    };
    fetchReports();
  }, []);

  // const filename = 'report.pdf';
  return (
    <main className={styles.allreportsMain}>
      <div className={styles.allReportCont}>
        <h2>All Reports</h2>
        <h4>Click on the report to view</h4>
        {!reports ? (
          <Loader />
        ) : (
          <div className={styles.allReportSubCont}>
            {reports &&
              reports.map((report) => {
                console.log("report>>>>>>>>>>>>>>>>", report.pdf);

                return (
                  <Link
                    className={`${styles.reportCont} ${styles.button}`}
                    // href={`/allreports/report?search=${report.pdf}`}
                    href={{
                      pathname: `/allreports/report`,
                      query: { name: report.pdf },
                    }}
                  >
                    <span>{report.date.split("T")[0]}</span>
                  </Link>
                );
              })}
          </div>
        )}
      </div>
    </main>
  );
}
