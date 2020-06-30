import React from 'react';
import {AppBar,Toolbar,Grid,Card,CardContent, CircularProgress,CardMedia,Typography,TextField} from "@material-ui/core";
import  {makeStyles,fade} from "@material-ui/core/styles";
import mockData from "./mockData";
import { useState,useEffect } from 'react';
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
const useStyles =makeStyles(theme=>({
    pokedexContainer:{
        paddingTop:'20px',
        paddingLeft:'50px',
        paddingRight:'50px',
    },
    cardMedia:{
        margin:"auto",
    },
    cardContent: {
        textAlign: "center",
        backgroundColor:"pink",
        color:'purple',
        

      },
      searchContainer: {
        display: "flex",
        backgroundColor: fade(theme.palette.common.white, 0.15),
        paddingLeft: "20px",
        paddingRight: "20px",
        marginTop: "5px",
        marginBottom: "5px",
      },
      searchIcon: {
        alignSelf: "flex-end",
        marginBottom: "5px",
      },
      searchInput: {
        width: "200px",
        margin: "5px",
      },
}));
const toFirstCharUppercase=(name)=>
name.charAt(0).toUpperCase()+name.slice(1);
const Pokedex=props=>{
    const {history} =props;
    const classes=useStyles();
    const[pokemonData,setPokemonData]=useState({});
    const [filter, setFilter] = useState("");
useEffect(()=>{
    axios
    .get(`https://pokeapi.co/api/v2/pokemon?limit=807`)
    .then(function (response) {
      const { data } = response;
      const { results } = data;
      const newPokemonData = {};
      results.forEach((pokemon, index) => {
        newPokemonData[index + 1] = {
          id: index + 1,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            index + 1
          }.png`,
        };
      });
      setPokemonData(newPokemonData);
    });



},[]);
const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };
    const getPokemonCard=(pokemonId)=>{
        //console.log(pokemonData[`${pokemonId}`]);
        const { id, name, sprite } = pokemonData[pokemonId];
        return(
            <>
            <Grid item xs={12} sm={3} key={pokemonId}>
                <Card onClick={()=>history.push(`/${pokemonId}`)}>
                    <CardMedia
                        className={classes.cardMedia}
                        image={sprite}
                        style={{width:"160px",height:"160px"}}/>
                    
                    <CardContent className={classes.cardContent}>
        <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
                    </CardContent>
                    </Card>
    
            </Grid>
            </>
        );
    };
    
    
    return(
        <>
      <AppBar position="static" style={{ background: 'rgb(191,10,48)' }}>
        <Toolbar>
        <div className={classes.searchContainer}>
            <SearchIcon className={classes.searchIcon} />
            <TextField
              className={classes.searchInput}
              onChange={handleSearchChange}
              label="Pokemon"
              variant="standard"
            />
          </div>
        </Toolbar>
      </AppBar>
      {pokemonData ?(  <Grid container spacing={2} className={classes.pokedexContainer}>
        {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
              getPokemonCard(pokemonId)
          )}
      </Grid>
      ):(
          <CircularProgress/>
      )
    }
    
          
        </>
    );
};

export default Pokedex;