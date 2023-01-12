import { useState, useEffect } from "react";

const show = {
  display: "block",
};

const hide = {
  display: "none",
};

const Test = () => {
  const list = ["hei", "på", "deg"];
  const N = list.length - 1;
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState(list[0]);

  const [cardAnswerClass, setCardAnswerClass] = useState(show);
  const [cardAnswerClassState, setCardAnswerClassState] = useState(false);

  //   const []

  const swipeLeft = () => {
    if (currentCardIndex === 0) {
      setCurrentCardIndex(N);
    } else {
      setCurrentCardIndex(currentCardIndex - 1);
    }
    setCurrentCard(list[currentCardIndex]);
  };

  const swipeRight = () => {
    if (currentCardIndex === N) {
      setCurrentCardIndex(0);
    } else {
      setCurrentCardIndex(currentCardIndex + 1);
    }
    setCurrentCard(list[currentCardIndex]);
  };

  //   useEffect(() => {
  //     console.log("useffect");

  //     setCardAnswerClass(cardAnswerClassState ? show : hide);

  //     document.addEventListener("keydown", keyDownHandler);

  //     return () => {
  //       document.removeEventListener("keydown", keyDownHandler);
  //     };
  //   }, [cardAnswerClassState, cardAnswerClassState2, cardAnswerClassState3]);

  //   const keyDownHandler = (e) => {
  //     if (e.code === "ArrowLeft") {
  //       console.log("siu left");
  //       setCardAnswerClassState(!cardAnswerClassState);
  //     }

  //     if (e.code === "ArrowRight") {
  //       console.log("siu right");
  //       setCardAnswerClassState2(!cardAnswerClassState2);
  //     }

  //     if (e.code === "Space") {
  //       console.log("siu space");
  //       setCardAnswerClassState3(!cardAnswerClassState3);
  //     }
  //   };

  return (
    <>
      <div onClick={() => swipeLeft()}>
        <p>swipe left</p>
      </div>

      <div>
        <h1>title 1</h1>
        <h2 style={cardAnswerClass}>{currentCard}</h2>
      </div>

      <div onClick={() => swipeRight()}>
        <p>swipe right</p>
      </div>
    </>
  );
};

export default Test;
