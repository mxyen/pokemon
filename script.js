//5IV7 - Cárdenas Mayén Diana Araceli
// aca usare cada elemento 
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

//codigo de colores para cada área
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychi : '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#360d1a',
};

//lo primero que hay que hacer es crear la funcion searchpokemon, que cuando 
//el usuario meta algo al input pues lo haga
const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    //por si el user lo pone con mayusculas, no afecte a mi request

    .then(data => data.json())
    .then(response => renderPokemonData(response))
    //suponiendo que meten un pokemon que no existe, quiero una funcion para que 
    //esas cosas no sucedan
    .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    //obtener de la data sus sprites:
    const sprite = data.sprites.front_default;
    const { stats, types } = data;
    
    //wiiii ya aparece el nombre, la img y el numero jijijiji
    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`; 
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    //ahora cada elemento que fui creando vamos a poner los tipos
    //osea hare que el color este relacionado al tipo de pokemon
 
}

const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    //va a buscar al objeto creado, toma el primer type y el name
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    //si no lo tiene el segundo color, usa el default
    pokeImg.style.background = `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
    pokeImg.style.backgroundSize = '7px 7px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    //es por si busca uno y despues otro, queremos borrar los tipos q habia y uno nuevo
    //types for each para iterarlos
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        //para darle colorcito al texto
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

//ahora ya esta el color y los tipos, me faltan las stats

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });

}

//para que diga que no se encontro el pokemon

const renderNotFound = () => {
    pokeName.textContent = "Pokémon no encontrado";
    pokeImg.setAttribute('src', 'poke-shadow.png')
    pokeImg.style.background = '#FFFF'
    // como no va haber ni stats ni types ni id, pues no va a mostrar nada
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
}


