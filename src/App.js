import React, { useState, useEffect } from 'react';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [previousPageUrl, setPreviousPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    let CancelToken = axios.CancelToken;
    let call1 = CancelToken.source();

    axios.get(currentPageUrl, {
      cancelToken: call1.token
    }).then(res => {
      setLoading(false);
      setNextPageUrl(res.data.next);
      setPreviousPageUrl(res.data.previous);
      setPokemon(res.data.results.map(p => p.name));
    });

    return () => call1.cancel();
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPreviousPage() {
    setCurrentPageUrl(previousPageUrl);
  }

  if (loading) return "Loading...";

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination gotoNextPage={nextPageUrl ? gotoNextPage : null} gotoPreviousPage={previousPageUrl ? gotoPreviousPage : null} />
    </>
  );
}

export default App;
