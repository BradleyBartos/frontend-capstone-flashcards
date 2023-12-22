import React, { useEffect, useState} from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import ViewDeck from './ViewDeck';
import StudyDeck from './StudyDeck';
import EditDeck from './EditDeck';
import Cards from './Cards';
import NotFound from '../NotFound';
import { readDeck } from '../../utils/api';

const Decks = ({ deleteDeck, updateDeck }) => {
  const initDeck = {
    id: '',
    name: '',
    description: '',
    cards: [{
      id: '',
      front: '',
      back: '', 
      deckId: ''
    }]
  }
  const [deck, setDeck] = useState(initDeck);
  let { deckId } = useParams();

  useEffect(() => {
    const abortControl = new AbortController();

    const getDeck = async () => {
      const deckResp = await readDeck(deckId, abortControl.signal);
      setDeck(deckResp);
    }
    getDeck();

    return () => abortControl.abort();
  }, [deckId]);

  const handleDeckUpdate = async (data) => {
    updateDeck(data);
    setDeck(data);
  };

  const updateDeckCards = (data) => {
    if (deck.cards.map(card => card.id).includes(data.id)) {
      setDeck({ ...deck, cards: deck.cards.map(card => 
        card.id === data.id ? data : card
      )});
    } else {
      setDeck({ ...deck, cards: deck.cards.concat([data]) });
    }
  };

  return <Switch>
    <Route path='/decks/:deckId' exact={true}>
      <ViewDeck deck={deck} deleteDeck={deleteDeck} updateDeck={handleDeckUpdate} />
    </Route>
    <Route path='/decks/:deckId/study'>
      <StudyDeck deck={deck} />
    </Route>
    <Route path='/decks/:deckId/edit'>
      <EditDeck deck={deck} updateDeck={handleDeckUpdate} />
    </Route>
    <Route path='/decks/:deckId/cards'>
      <Cards deck={deck} updateDeckCards={updateDeckCards} />
    </Route>
    <Route>
      <NotFound />
    </Route>
  </Switch>
}

export default Decks;
