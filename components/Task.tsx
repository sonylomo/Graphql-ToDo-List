import request, { gql } from "graphql-request";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Task.module.css";
import { taskProps } from "../utils/types";

const MarkComplete = gql`
  mutation MarkComplete(
    $taskId: String!
    $taskComplete: Boolean
    $tagName: String!
  ) {
    updateTask(id: $taskId, complete: $taskComplete, tagName: $tagName) {
      id
      description
      complete
      tag {
        id
        name
      }
    }
  }
`;

const DeleteTask = gql`
  mutation DeleteTask($taskId: String!) {
    deleteTask(id: $taskId) {
      id
      description
      complete
      tag {
        id
        name
      }
    }
  }
`;

const Task = ({ id, description, complete, tag }: taskProps) => {
  const router = useRouter();
  const [checked, setChecked] = useState(complete);

  const handleCheck = (value: boolean) => {
    console.log("Touched ", value);
    setChecked(value);
    request({
      url: "/api/graphql",
      document: MarkComplete,
      variables: {
        taskId: id,
        taskComplete: value,
        tagName: tag?.name,
      },
    })
      .then((res) => {
        console.log("Just Checked", res);
      })
      .catch(console.log);
  };

  const handleDelete = () => {
    request({
      url: "/api/graphql",
      document: DeleteTask,
      variables: {
        taskId: id,
      },
    })
      .then((res) => {
        console.log("Just Deleted", res);
        router.reload();
      })
      .catch(console.log);
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
