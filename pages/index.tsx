import Head from "next/head";
import Modal from "../components/Modal";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { Key, useState } from "react";
//import Modal from "../components/Modal";

// må fikse
interface Props {
  categoryTitles: any;
}

interface CategoryType {
  title: String;
  topics: Array<any>;
  id: Key;
}

export const getStaticProps = async () => {
  const response: Response = await fetch("http://localhost:8080/titles/");
  const categoryTitles = await response.json();

  return {
    props: { categoryTitles },
  };
};

export default function Home({ categoryTitles }: Props) {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [data, setData] = useState(categoryTitles);

  const toggleModal = () => {
    setShowCategoryModal(!showCategoryModal);
  };

  const handleUpdate = (newTitle: String) => {
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
          <Modal
            matter="category"
            onUpdate={handleUpdate}
            category={undefined}
            index={undefined}
          />
        )}

        {/* Categories */}
        {data &&
          data.map((categoryTitle: CategoryType) => (
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
