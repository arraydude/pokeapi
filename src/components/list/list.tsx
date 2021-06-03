import axios, {AxiosError} from "axios";
import React, {useEffect, useState} from "react";
import {PokemonResult} from "../../types";

import {Select, TYPE} from 'baseui/select';

interface IAPIResponse {
    count: number
    next: string
    previous: string
    results: PokemonResult[]
}

function useListPokemons(limit: number, offset: number): {
    list: PokemonResult[] | undefined
    error?: AxiosError
    isLoading: boolean
} {
    const [pokeData, setPokeData] = useState<IAPIResponse | undefined>()
    const [error, setError] = useState()
    const [isLoading, setLoading] = useState(false)

    async function fetch(limit: number, offset: number) {
        setLoading(true)

        try {
            const {data} = await axios.get<IAPIResponse>(`pokemon?limit=${limit}&offset=${offset}`)

            setPokeData(data)
        } catch (error) {
            setError(error)
        }

        setLoading(false)
    }

    useEffect(() => {
        fetch(limit, offset)
    }, [limit, offset])


    return {
        list: pokeData?.results,
        error,
        isLoading
    }
}


interface ListPokemonsProps {
    onChange: (selected: PokemonResult[]) => void
}

function ListPokemons({onChange}: ListPokemonsProps) {
    const {list, error, isLoading} = useListPokemons(10, 0)
    const [value, setValue] = useState<PokemonResult[]>([]);

    useEffect(() => {
        onChange(value)
    }, [onChange, value])

    if (isLoading) {
        return <p>Loading list of pokemon</p>
    }

    if (error) {
        return (
            <pre>
                {JSON.stringify(error, undefined, 2)}
            </pre>
        )
    }

    return (
        <div>
            <Select
                options={value.length > 1 ? [] : list}
                filterOutSelected={true}
                labelKey="name"
                valueKey="url"
                placeholder="Choose your pokemons"
                maxDropdownHeight="300px"
                type={TYPE.search}
                multi
                onChange={({value}: {value: any}) => setValue(value)}
                value={value}
            />
        </div>
    )
}

export default ListPokemons