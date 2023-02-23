import { Key } from "react";

export interface Card {
  title: string;
  answer: string;
  id: Key;
}

export interface Topic {
  title: string;
  cards: Card[];
  id: any; // is used as both a Key and a number!
}

export interface CategoryType {
  title: string;
  topics: Topic[];
  id: Key;
}

export interface CategoryTitle {
  title: string;
  id: Key;
}
