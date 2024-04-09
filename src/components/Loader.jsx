import React from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  return (
    <div>
      <div className={styles["three-body"]}>
        <div className={styles["three-body__dot"]}></div>
        <div className={styles["three-body__dot"]}></div>
        <div className={styles["three-body__dot"]}></div>
      </div>
    </div>
  );
};

export default Loader;
