import { useEffect, useState } from "react";
import styles from "../../styles/EditTask.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

const EditTask = () => {
  const [queryTask, setQueryTask] = useState<any>({});
  const [editDescription, setEditDescription] = useState("");
  const [editTag, setEditTag] = useState("");

  const handleEdit = () => {
    //under maintenance ⚙
  };

  const handleCancel = () => {
    //under maintenance ⚙
  };

  return (
    <div className={styles.EditTask}>
      <h1 className={styles.EditTaskTitle}>Edit Task here:</h1>
      <Image src="/edit-to-do.png" alt="clipboard" width="64" height="64" />

      <form className={styles.EditForm}>
        <div className={styles.EditFormDiv}>
          <label htmlFor="taskDescription">Edit Task: </label>
          <input
            id="taskDescription"
            type="text"
            width={"100%"}
            defaultValue={queryTask.description}
            onChange={(e) => setEditDescription(e.target.value)}
          />
        </div>
        <br />
        <div className={styles.EditFormDiv}>
          <label htmlFor="taskTag">Edit Tag: </label>
          <input
            id="taskTag"
            type="text"
            width={"100%"}
            defaultValue={queryTask.tag?.name}
            onChange={(e) => setEditTag(e.target.value)}
          />
        </div>
        <div className={styles.EditFormBtn}>
          <button type="button" onClick={() => handleEdit()}>
            💾 Save
          </button>
          <button type="button" onClick={() => handleCancel()}>
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
