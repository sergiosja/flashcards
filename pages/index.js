import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Modal from "../components/Modal";
import styles from "../styles/Home.module.css";

export const getStaticProps = async () => {
  const response = await fetch("http://localhost:8080/titles/");
  const categoryTitles = await response.json();

  return {
    props: { categoryTitles },
  };
};

export default function Home({ categoryTitles }) {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [data, setData] = useState(categoryTitles);

  const toggleModal = () => {
    setShowCategoryModal(!showCategoryModal);
  };

  const handleUpdate = (newTitle) => {
    setData([...data, { title: newTitle, id: data.length + 1 }]);
    setShowCategoryModal(false);
  };

  return (
    <>
      <Head>
        <title>Categories</title>
      </Head>
      <div>
        <h1>Categories</h1>

        {/* Modal */}
        <div
          onClick={toggleModal}
          className={`${styles.button} ${styles.newCategoryButton}`}
        >
          New category
        </div>

        {showCategoryModal && (
          <Modal matter="category" onUpdate={handleUpdate} />
        )}

        {/* Categories */}
        {data &&
          data.map((categoryTitle) => (
            <div className={styles.container} key={categoryTitle.id}>
              <Link
                href={`/category/${categoryTitle.id}`}
                className={`${styles.button} ${styles.categoryButton}`}
              >
                {categoryTitle.title}
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
