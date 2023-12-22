import React from "react";
import { Link } from 'react-router-dom';

const NavBreadCrumb = ({ deck, page = '' }) => {
  const deckCrumb = deck ? <Link to={`/decks/${deck.id}`}>{deck.name}</Link> : null;
  const pageCrumb = page ? <>{page}</> : null;

  return <nav name='navigation'>
    <p>
      <Link to='/'>Home</Link>
      { deckCrumb }
      { pageCrumb }
    </p>
  </nav>
};

export default NavBreadCrumb;
