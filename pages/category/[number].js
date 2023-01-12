import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "../../components/Modal";
import styles from "../../styles/Category.module.css";

export const getStaticPaths = async () => {
  const response = await fetch("http://localhost:8080/data");
  const data = await response.json();
  const paths = data.map((entry) => {
    return {
      params: {
        number: entry.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.number;
  const response = await fetch(`http://localhost:8080/data/${id}`);
  const category = await response.json();

  return {
    props: { category },
  };
};

const Category = ({ category }) => {
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(category.topics);
  const [newCardStatus, setNewCardStatus] = useState(false);

  // Toggle display of modals
  const toggleModal = (setter, value) => {
    if (setter === setShowTopicModal && showCardModal === true) {
      setShowCardModal(false);
    } else if (setter === setShowCardModal && showTopicModal === true) {
      setShowTopicModal(false);
    }
    setter(!value);
  };

  // Toggle display of card modal with right index
  const toggleCardModal = (index) => {
    toggleModal(setShowCardModal, showCardModal);
    setIndex(index);
  };

  // After a new topic has been added
  const handleNewTopic = (newTitle) => {
    const newTopics = [
      ...data,
      { title: newTitle, cards: [], id: data.length + 1 },
    ];
    setData(newTopics);
    setShowTopicModal(false);
    setShowCardModal(false);

    category.topics = newTopics;
  };

  // Fires useEffect so that data is updated
  const handleNewCard = () => {
    setNewCardStatus(!newCardStatus);
  };

  useEffect(() => {
    setData(category.topics);
  }, [newCardStatus]);

  return (
    <>
      <Head>
        <title>{category.title}</title>
      </Head>
      <div>
        <h1>{category.title}</h1>

        {/* Modal for topics */}
        <div className={styles.container}>
          <div
            onClick={() => toggleModal(setShowTopicModal, showTopicModal)}
            className={`${styles.button} ${styles.newTopicButton}`}
          >
            New topic
          </div>
          <div className={`${styles.blackBox}`}></div>
        </div>

        {showTopicModal && (
          <Modal category={category} matter="topic" onUpdate={handleNewTopic} />
        )}

        {/* Modal for cards */}
        {showCardModal && (
          <Modal
            category={category}
            matter="card"
            index={index}
            onUpdate={handleNewCard}
          />
        )}

        {/* Topics */}
        {data &&
          data.map((topic) => (
            <div key={topic.id} className={styles.container}>
              <Link
                href={{
                  pathname: "/card",
                  query: {
                    title: topic.title,
                    id: topic.id,
                    cards: encodeURIComponent(JSON.stringify(topic.cards)),
                    categoryId: category.id,
                  },
                }}
                as={`/card/${topic.title}`}
                className={`${styles.button} ${styles.topicButton}`}
              >
                {topic.title}
              </Link>
              <div
                onClick={() => toggleCardModal(topic.id)}
                className={`${styles.button} ${styles.newCardButton}`}
              >
                +
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Category;
