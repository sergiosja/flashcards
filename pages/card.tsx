import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Card } from "./types/types";
import styles from "../styles/Card.module.css";

interface EventHandler {
  code: string;
}

const Card = () => {
  // Unpacking props sent via Link component in topic.js
  const router = useRouter();
  const { title, cards }: any = router.query;
  const parsedCards: Card[] = JSON.parse(decodeURIComponent(cards));

  const PCN = parsedCards.length - 1;

  // Deciding which card to show
  const firstCard =
    PCN > 0
      ? parsedCards[0]
      : {
          title: "No cards yet!",
          answer: "add cards from the menu :=)",
          id: 0,
        };
  const [currentCard, setCurrentCard] = useState(firstCard);

  // Swiping stuff
  const [swipingPermission, setSwipingPermission] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState("");
  const [swipeState, setSwipeState] = useState(false);

  // Toggling visibility of answer
  const [cardAnswerClass, setCardAnswerClass] = useState(styles.hide);
  const [cardAnswerClassState, setCardAnswerClassState] = useState(false);

  const swipeLeft = (index: number) => {
    if (index === 0) {
      setCurrentCard(parsedCards[PCN]);
    } else {
      setCurrentCard(parsedCards[index - 1]);
    }
  };

  const swipeRight = (index: number) => {
    if (index === PCN) {
      setCurrentCard(parsedCards[0]);
    } else {
      setCurrentCard(parsedCards[index + 1]);
    }
  };

  const keyDownHandler = (e: EventHandler) => {
    if (e.code === "Space") {
      setSwipingPermission(false);
      setCardAnswerClassState(!cardAnswerClassState);
      return;
    } else if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
      if (e.code === "ArrowLeft") setSwipeDirection("left");
      else if (e.code === "ArrowRight") setSwipeDirection("right");
      setSwipingPermission(true);
      setSwipeState(!swipeState);
    }
  };

  useEffect(() => {
    if (swipingPermission) {
      const index = parsedCards.findIndex(
        (c: Card) => c.title === currentCard.title
      );
      if (swipeDirection === "left") swipeLeft(index);
      else if (swipeDirection === "right") swipeRight(index);
    } else {
      setCardAnswerClass(cardAnswerClassState ? styles.show : styles.hide);
    }
    document.addEventListener("keydown", keyDownHandler);

    return () => document.removeEventListener("keydown", keyDownHandler);
  }, [cardAnswerClassState, swipeState]);

  return (
    <>
      <Head>
        <title>Flashcards | {title}</title>
      </Head>
      <h1>
        <i>{title}</i>
      </h1>
      <div className={styles.card}>
        <div className={styles.cardDetails}>
          <h1>{currentCard.title}</h1>
          <h2 className={cardAnswerClass}>{currentCard.answer}</h2>
        </div>
      </div>

      <div className={styles.status}>
        <p>
          {parsedCards.findIndex((c: Card) => c.title === currentCard.title) +
            1}
          /{parsedCards.length}
        </p>
      </div>
    </>
  );
};

export default Card;
