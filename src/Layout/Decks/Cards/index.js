import React from 'react';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import NewCard from './NewCard';
import EditCard from './EditCard';
import NotFound from '../../NotFound';

const Cards = ({ deck, updateDeckCards }) => {

  return <Switch>
    <Route path={'/decks/:deckId/cards/new'} >
      <NewCard deck={deck} updateDeckCards={updateDeckCards} />
    </Route>
    <Route path={'/decks/:deckId/cards/:cardId/edit'} >
      <EditCard deck={deck} updateDeckCards={updateDeckCards} /> 
    </Route>
    <Route>
      <NotFound />
    </Route>
  </Switch>
}

export default Cards;
