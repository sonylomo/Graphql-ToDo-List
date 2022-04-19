import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import TagLabel from "../components/Tag";
import Task from "../components/Task";
import styles from "../styles/Home.module.css";
import tasks_data from "../utils/tasks.json"
import tags_data from "../utils/tags.json"

const Home: NextPage = () => {
  //this section changes soon
  const [tasks, setTasks] = useState(tasks_data);
  const [allTags, setAllTags] = useState(tags_data);
  //this section changes soon

  const [newTag, setNewTag] = useState("");
  const [newDescription, setNewDescription] = useState("");


  const addTask = () => {
    // we'll fix this later 🛠 
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>TO-DO List</title>
        <meta name="description" content="Simple to-do list app" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📝</text></svg>"
        />
      </Head>
      <main className={styles.main}>
        <h1 style={{ color: "grey" }}>My TO-DO List</h1>
        <Image src="/to-do-pic.png" alt="clipboard" width="64" height="64" />

        <section className={styles.section}>
          <form onSubmit={addTask}>
            <input
              required
              type="text"
              className={styles.input1}
              placeholder="What do you have in mind today? 👀"
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <input
              required
              type="text"
              className={styles.input2}
              onChange={(e) => setNewTag(e.target.value.toLowerCase())}
              placeholder="Add tag"
            />
            <button type="submit" className={styles["add-task"]}>
              ✔
            </button>
          </form>
          <article className={styles.tags}>
            {allTags.map(({ id, name }) => (
              <TagLabel key={id} name={name} />
            ))}
          </article>
          {tasks.length > 0 ? (
            tasks.map(({ id, description, complete, tag }) => (
              <Task
                key={id}
                id={id}
                description={description}
                complete={complete}
                tag={tag}
              />
            ))
          ) : (
            <p>Add a new task!!</p>
          )}
        </section>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://www.flaticon.com/free-icons/description"
          title="description icons"
        >
          Image created by Freepik & Eucalyp - Flaticon
        </a>
      </footer>
    </div>
  );
};

export default Home;
