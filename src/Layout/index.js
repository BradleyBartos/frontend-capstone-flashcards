import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Decks from './Decks/index.js';
import Home from './Home/index.js';
import Header from "./Header.js";
import NotFound from "./NotFound.js";
import { createDeck, deleteDeck, listDecks, updateDeck } from "../utils/api/index.js";
import NewDeck from "./Decks/NewDeck.js";

const Layout = () => {
  const [ decks, setDecks ] = useState([]);

  useEffect(() => {
    const abortControl = new AbortController();

    const fetchDecks = async () => {
      const deckResp = await listDecks( abortControl.signal );
      setDecks(deckResp);
    }
    fetchDecks();

    return () => abortControl.abort();
  }, []);

  const deckStateAdd = async data => {
    const abortControl = new AbortController();

    // api
    await createDeck(data, abortControl.signal);
    // state
    setDecks([...decks, data]);

    return () => abortControl.abort();
  }

  const deckStateUpdate = async data => {
    const abortControl = new AbortController();

    // api
    await updateDeck(data, abortControl.signal);
    // state
    setDecks(decks.map(deck => deck.id === data.id ? data : deck));

    return () => abortControl.abort();
  }

  const deckStateDelete = async deckId => {
    const abortControl = new AbortController();

    // api
    await deleteDeck(deckId, abortControl.signal)
    // state
    setDecks(decks.filter( deck => deck.id !== deckId));

    return () => abortControl.abort();
  }

  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path='/' exact={true}>
            <Home decks={decks} deleteDeck={deckStateDelete} />
          </Route>
          <Route path='/decks/new'>
            <NewDeck addDeck={deckStateAdd}/>
          </Route>
          <Route path='/decks/:deckId'>
            <Decks decks={decks} deleteDeck={deckStateDelete} updateDeck={deckStateUpdate} />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default Layout;
