import axios from "axios";
import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [pokemon, setPokemon] = useState("pikachu");
  const [pokemonData, setPokomeonData] = useState([]);
  const [pokemonType1, setPokemonType1] = useState("");
  const [pokemonAbility1, setPokemonAbility1] = useState("");
  const [pokemonType2, setPokemonType2] = useState("");
  const [pokemonAbility2, setPokemonAbility2] = useState("");

  const handleChange = (e) => {
    setPokemon(e.target.value.toLowerCase());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    getPokemon();
  };

  const getPokemon = async () => {
    const toArray = [];

    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const res = await axios.get(url);
      toArray.push(res.data);
      setPokemonType1(res.data.types[0].type.name);
      if (res.data.types[1]) {
        setPokemonType2(res.data.types[1].type.name);
      }
      setPokemonAbility1(res.data.abilities[0].ability.name);
      if (res.data.types[1]) {
        setPokemonAbility2(res.data.abilities[1].ability.name);
      }
      setPokomeonData(toArray);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container-lg App">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Pokemon name"
          />
        </label>
      </form>
      {pokemonData.map((data) => {
        return (
          <div className="container-sm">
            <div className="sprites">
              <img src={data.sprites["front_default"]} alt={""} />
              <img src={data.sprites["front_shiny"]} alt={""} />
              <img src={data.sprites["back_default"]} alt={""} />
              <img src={data.sprites["back_shiny"]} alt={""} />
            </div>
            <table class="table table-hover table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col-sm-3 align-self-center">#</th>
                  <th scope="col-sm-3 align-self-center">Name</th>
                  <th scope="col-sm-3 align-self-center">Abilities</th>
                  <th scope="col-sm-3 align-self-center">Type</th>
                  <th scope="col-sm-3 align-self-center">Height</th>
                  <th scope="col-sm-3 align-self-center">Weight</th>
                  <th scope="col-sm-3 align-self-center">Battles</th>
                </tr>
              </thead>
              <tbody className="col-2">
                <tr>
                  <th scope="col-2 align-self-center">{data.id}</th>
                  <td>{data.name}</td>
                  <td>
                    {pokemonAbility1} {pokemonAbility2}
                  </td>
                  <td>
                    {pokemonType1} {pokemonType2}
                  </td>
                  <td> {Math.round(data.height * 3.9)}</td>
                  <td> {Math.round(data.weight / 4.3)} lbs</td>
                  <td>{data.game_indices.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default App;
