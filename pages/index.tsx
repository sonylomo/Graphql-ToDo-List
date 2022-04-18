import type { NextPage } from "next";
import { ChangeEvent, FormEvent, SetStateAction, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Task from "../components/Task";
import { taskProps } from "../utils/types";
import data from "../utils/task.json";

const Home: NextPage = () => {
  // fetch("http://localhost:3000/api/hello")
  //   .then((res) => {
  //     res.json();
  //   })
  //   .then((data) => console.log("Fetched things: ", data));

  const [Tasks, setTasks] = useState(data);

  const [CategorySearch, setCategorySearch] = useState<string[]>([]);
  const [searchItem, setsearchItem] = useState("");
  const [filteredResults, setFilteredResults] = useState<string[]>([]);

  const getCategories = () => {
    let categories: string[] = [];
    Tasks.map(({ category }) => categories.push(category.toLowerCase()));
    setCategorySearch(categories);
  };

  const searchCategory = (value: string) => {
    getCategories();

    setsearchItem(value);
    if (searchItem !== "") {
      const filteredData = CategorySearch.filter((item) => {
        return Object.values(item).includes(searchItem.toLowerCase());
      });

      setFilteredResults(filteredData);
    } else {
      setFilteredResults(CategorySearch);
    }
  };

  const addTask = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log("input2", filteredResults);
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
              type="text"
              className={styles.input1}
              placeholder="What do you have in mind today? 👀"

            />
            <input
              type="text"
              id="category"
              className={styles.input2}
              onChange={(e) => searchCategory(e.target.value)}
              placeholder="Add category"
              title="Type in a category"
            />
            
            <button type="submit" className={styles["add-task"]}>
              ✔
            </button>
            {/* <select
              // onChange={(e) => searchCategory(e.target.value)}
              placeholder="Add category"
              style={{width: "30%", height:"2rem"}}
            >
              {searchItem.length > 1 && filteredResults.length > 1 ? (
                filteredResults.map((category) => {
                  return <option value={category}> </option>;
                })
              ) : (
                <option value="not found"></option>
              )}
              <option />
            </select> */}
          </form>
          {Tasks.map(({ id, description, status, category }) => (
            <Task
              id={id}
              description={description}
              status={status}
              category={category}
            />
          ))}
        </section>
      </main>
      <footer className={styles.footer}>
        <a
          href="https://www.flaticon.com/free-icons/description"
          title="description icons"
        >
          Image created by Freepik - Flaticon
        </a>
      </footer>
    </div>
  );
};

export default Home;
