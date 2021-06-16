import React, { useState } from "react";
import { PokemonResult } from "types";

import Bank from "components/bank";
import ListPokemons from "components/list";

import styles from "./styles.module.scss";

function Game() {
  const [selectedPokemons, setSelectedPokemons] = useState<PokemonResult[]>([]);

  return (
    <div>
      <ListPokemons onChange={(pokemons) => setSelectedPokemons(pokemons)} />

      <div className={styles.arena}>
        {selectedPokemons.map((pokemon) => (
          <Bank pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default Game;
