import React from "react";
import Styles from "./style.module.scss";

export default function AnalysisTable() {
  return (
    <div className={Styles.tableContainer}>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p className="text-white">Date</p>
        </div>
        <div className={Styles.content1}>Percent</div>
        <div className={Styles.content1}>Amount</div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p className="text-white">2024-12-31</p>
        </div>
        <div className={Styles.content}>0.7%</div>
        <div className={Styles.content}>327</div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p className="text-white">2024-12-30</p>
        </div>
        <div className={Styles.content}>0.6%</div>
        <div className={Styles.content}>299</div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p className="text-white">2024-12-29</p>
        </div>
        <div className={Styles.content}>1.2%</div>
        <div className={Styles.content}>282</div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p className="text-white">2024-12-28</p>
        </div>
        <div className={Styles.content}>0.2%</div>
        <div className={Styles.content}>180</div>
      </div>
      <div className={Styles.row}>
        <div className={Styles.title}>
          <p className="text-white">2024-12-27</p>
        </div>
        <div className={Styles.content}>0.5%</div>
        <div className={Styles.content}>150</div>
      </div>
    </div>
  );
}
