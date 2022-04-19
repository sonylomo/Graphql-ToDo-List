import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Task.module.css";
import { taskProps } from "../utils/types";


const Task = ({ id, description, complete, tag }: taskProps) => {
  const router = useRouter();
  const [checked, setChecked] = useState(complete);

  const handleCheck = (value: boolean) => {
   //Under maintenance ⚒
  };

  const handleDelete = () => {
     //Under maintenance 🛠
  };

  return (
    <article className={styles.task}>
      <input
        id={id}
        type="checkbox"
        defaultChecked={complete}
        onChange={(e) => handleCheck(e.target.checked)}
      />

      <p className={`${styles.description} ${checked ? styles.strike : ""}`}>
        {description}
      </p>
      <br />
      <span
        style={{
          fontFamily: " Helvetica Neue, sans-serif",
          fontSize: "0.8rem",
          color: `${checked ? "lightblue" : "blue"}`,
          marginLeft: "4px",
        }}
      >
        {tag?.name}
      </span>
      <div
        style={{
          width: "17%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <button
          type="button"
          className={styles["task-btn"]}
          onClick={() => router.push(`/edit/${id}`)}
        >
          🖋
        </button>
        <button
          type="button"
          className={styles["task-btn"]}
          onClick={() => handleDelete()}
        >
          ❌
        </button>
      </div>
    </article>
  );
};

export default Task;
