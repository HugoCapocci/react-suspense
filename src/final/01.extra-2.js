// Simple Data-fetching
// 💯 make more generic createResource
// http://localhost:3000/isolated/final/01.extra-2.js

import React from 'react'
import {fetchPokemon, PokemonDataView} from '../pokemon'
import {ErrorBoundary} from '../utils'

let pokemonResource = createResource(fetchPokemon('pikachu'))

function createResource(promise) {
  let status = 'pending'
  let result
  promise.then(
    r => {
      status = 'success'
      result = r
    },
    e => {
      status = 'error'
      result = e
    },
  )
  return {
    read() {
      if (status === 'pending') throw promise
      if (status === 'error') throw result
      if (status === 'success') return result
      throw new Error('This should be impossible')
    },
  }
}

function Pokemon() {
  const pokemon = pokemonResource.read()
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        <ErrorBoundary>
          <React.Suspense fallback={<div>Loading Pokemon...</div>}>
            <Pokemon />
          </React.Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
