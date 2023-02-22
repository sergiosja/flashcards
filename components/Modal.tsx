import { useState } from "react";
import styles from "../styles/Modal.module.css";
import axios from "axios";

// løs opp alle "any"s

interface Props {
  category: any | null | undefined;
  matter: any | null | undefined;
  index: any | null | undefined;
  onUpdate: any | null | undefined;
}

const Modal = ({ category, matter, index, onUpdate }: Props) => {
  const [title, setTitle] = useState("");
  const [answer, setAnswer] = useState("");

  // Add new category
  const addNewCategory = async (e: any) => {
    e.preventDefault();

    await axios
      .all([
        axios.post("http://localhost:8080/titles", { title }),
        axios.post("http://localhost:8080/data", { title, topics: [] }),
      ])
      .then(() => {
        onUpdate(title, []);
      });
  };

  // Add new topic
  const addNewTopic = async (e: any) => {
    e.preventDefault();

    const newTopics = {
      topics: [
        ...category.topics,
        {
          title,
          cards: [],
          id: category.topics.length + 1,
        },
      ],
    };

    await axios
      .patch(`http://localhost:8080/data/${category.id}`, newTopics)
      .then(() => {
        onUpdate(title);
      });
  };

  // Add new card
  const addNewCard = async (e: any) => {
    e.preventDefault();

    const cards = category.topics[index - 1].cards;
    const newCard = {
      title,
      answer,
      id: cards.length + 1,
    };

    category.topics[index - 1].cards = [...cards, newCard];

    await axios
      .patch(`http://localhost:8080/Data/${category.id}`, {
        topics: category.topics,
      })
      .then(() => {
        setTitle("");
        setAnswer("");
      })
      .then(onUpdate());
  };

  return (
    <>
      {matter == "card" ? (
        <div className={`${styles.modal}`}>
          <form onSubmit={addNewCard}>
            <label>Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label>Answer</label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <button type="submit" className={styles.button} />
          </form>
        </div>
      ) : (
        <div className={styles.modal}>
          <form onSubmit={matter == "category" ? addNewCategory : addNewTopic}>
            <label>Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </form>
        </div>
      )}
    </>
  );
};

export default Modal;
