import styles from "../styles/Task.module.css";
import { taskProps } from "../utils/types";

const Task = ({ id, description, status, category }: taskProps) => {
  return (
    <article className={styles.task}>
      <input id={id} type="checkbox" checked={status} />

      <p className={styles.description}>
        {description}
        <br />
        <span
          style={{
            fontFamily: " Helvetica Neue, sans-serif",
            fontSize: "0.8rem",
            color: "blue",
          }}
        >
          {category}
        </span>
      </p>
      <button className={styles["task-btn"]}>🖋</button>
      <button className={styles["task-btn"]}>❌</button>
    </article>
  );
};

export default Task;
