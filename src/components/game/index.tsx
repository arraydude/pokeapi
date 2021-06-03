import React, {useState} from "react";
import Bank from "../bank";
import {PokemonResult} from "../../types";
import ListPokemons from "../list/list";

import styles from './styles.module.scss'

function Game() {
    const [selectedPokemons, setSelectedPokemons] = useState<PokemonResult[]>([])

    return (
        <div>
            <ListPokemons onChange={(pokemons) => setSelectedPokemons(pokemons)}/>

            <div className={styles.arena}>
                {selectedPokemons.map(pokemon => (
                    <Bank pokemon={pokemon} />
                ))}
            </div>
        </div>
    )
}

export default Game