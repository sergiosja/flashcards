# Flashcards

## Dependencies

Npm. If you have npm installed I _think_ you can get away with just running

```
npm install
```

In any case, I have used Next.js with a JSON server. Create a folder called data and put the db.json file inside it.

## Run

Start the client with

```
npm run dev
```

and spin up the server with (either make sure port 8080 is available or change this in the `package.json` file)

```
npm run db
```

## What's this anyway?

I wanted to try out flashcards to help me study. Wasn't satisfied with the stuff I found online. I've wanted to learn Next.js for a while and figured this could be a way to do so.

### Use

Every category has contains a list of topics. Every topic contains a list of (flash)cards. That's the hierarchy.

To create new categories and topics, enter a title and press enter. No buttons!

To create a new card, press the + sign to the left of a topic and enter a title and an answer, before pressing the button underneath the text area.

To toggle the visibility of a card's answer, press space. To swipe through the cards, use the left- and right arrow keys. Again, no buttons!

That's it really

## Future work

- Deleting categories, topics and cards
