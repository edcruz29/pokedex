import React from 'react'

const PokedexForm = () => {
    const handleChange =(e)=>{
        setPokemon(e.target.value.toLowerCase())

    }
    const handleSubmit =(e)=>{
        e.preveDefault();
        getPokemon();
    }
    return ( 
        <form onSubmit={handleSubmit}>
            <label>
                <input type="text" onChange={handleChange} placeholder="Informe o nome do Pokemon"/>
            </label>

        </form>
     );
}
 
export default PokedexForm;