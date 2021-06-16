import axios from "axios";
import classNames from "classnames";
import { PokemonResult } from "types";
import React, { ReactElement, useEffect, useState } from "react";

import styles from "./styles.module.scss";

interface Props {
  pokemon: PokemonResult;
}

function Bank({ pokemon }: Props): ReactElement {
  const [pokemonData, setPokemonData] = useState<{
    image: string;
    stats: {
      hp: number;
      attack: number;
      defense: number;
    };
    types: string[];
    weight: number;
  }>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon(url: string) {
      setIsLoading(true);

      try {
        const { data } = await axios.get(url);

        const stats = data.stats.reduce((acc: any, curr: any) => {
          switch (curr.stat.name) {
            case "hp": {
              return {
                ...acc,
                hp: curr.base_stat,
              };
            }
            case "attack": {
              return {
                ...acc,
                attack: curr.base_stat,
              };
            }
            case "defense": {
              return {
                ...acc,
                defense: curr.base_stat,
              };
            }
          }

          return acc;
        }, {});

        setPokemonData({
          image: data.sprites.other.dream_world.front_default,
          stats: stats,
          types: data.types.map((type: any) => type.type.name),
          weight: 100,
        });
      } catch (error) {
        throw new Error(error);
      }

      setIsLoading(false);
    }

    fetchPokemon(pokemon.url);
  }, [pokemon.url]);

  return (
    <div>
      {isLoading && <p>Loading</p>}
      {!isLoading && pokemonData && (
        <figure
          className={classNames(styles.bank, styles[pokemonData.types[0]])}
        >
          <div className={styles.imageContainer}>
            <img
              src={pokemonData.image}
              alt={pokemon.name}
              className={styles.image}
            />
          </div>
          <figcaption>
            <h1>{pokemon.name}</h1>
            <div className={styles.type}>{pokemonData.types[0]}</div>
            <dl className={styles.stats}>
              <dt>HP</dt>
              <dd>{pokemonData.stats.hp}</dd>

              <dt>ATTACK</dt>
              <dd>{pokemonData.stats.attack}</dd>

              <dt>DEFENSE</dt>
              <dd>{pokemonData.stats.defense}</dd>
            </dl>
          </figcaption>
        </figure>
      )}
    </div>
  );
}

export default Bank;
