import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button, Card } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from "axios";
import blue from '@material-ui/core/colors/blue';


const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);
  const toFirstCharUppercase=(name)=>
  name.charAt(0).toUpperCase()+name.slice(1);
  const generatePokemonJSX = (pokemon) => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    const theme = createMuiTheme({
      palette: {
        type:"dark",
      },
    });
    return (
      <>
      <ThemeProvider theme={theme}>

      <Card style={{
        textAlign: "center",
      }}>

        <Typography variant="h1">
          {`${id}.` } {toFirstCharUppercase(name)} 
          <img src={front_default} />
        </Typography>
        <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
        <Typography variant="h3">Pokemon Info</Typography>
        <Typography>
          {"Species: "}
          <Link href={species.url}>{species.name} </Link>
        </Typography>
        <Typography>Height: {height} </Typography>
        <Typography>Weight: {weight} </Typography>
        <Typography variant="h6"> Types:</Typography >
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return <Typography key={name} style={{
            padding:"4px",
            borderRadius:"12px",
            backgroundColor:"purple",
            display:"inline-block",
            margin:"1px"
          }}> {`${name}`}</Typography>;
        })}
        </Card>
          </ThemeProvider>
      </>
    );
  };
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}
      {pokemon !== undefined && (
        <Button variant="contained" onClick={() => history.push("/")} style={{
          margin:"2px 43%",
          backgroundColor:"pink"

          
        }}>
          back to pokedex
        </Button>
      )}
    </>
  );
};
export default Pokemon;