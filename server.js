const Discord = require('discord.js')
const axios =require("axios")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
require('dotenv').config()


client.on("ready",()=>{

    console.log(`logged in as ${client.user.tag}`)
})
function joke(){
    params = {
    method: 'GET',
    headers: {
    'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com',
    'X-RapidAPI-Key': 'c275f492cfmsh1481aba9c0522d8p121ae8jsn4d073f1ee41b'
  }

  }

  axios.get("https://jokeapi-v2.p.rapidapi.com/joke/Any",params).then(response=>{
    console.log(response);
    
  });
}

joke()

function getData () { 
axios.get("https://zenquotes.io/api/random").then(
  response=>{
    console.log(response);
  });
  
  
};

client.on("messageCreate", async(msg)=>{        
    
    // console.log(msg)
        
    if(msg.content == "1"){
        msg.reply('Enter movie in format movie-"moviename"')
        return;
    }
    else if(msg.content === "2"){
        msg.reply(joke())
    }
    else if(msg.content.startsWith("movie-")){
        const searchMovieName = msg.content.split('-')[1];
        let uri = `http://www.omdbapi.com/?s=${searchMovieName}&apikey=36869c0c`
        const {data} = await axios.get(uri)
        const {Search} = data;
        // console.log( Search)

        // if(!(movies.data.length > 0 ) ){
        //     msg.reply("Movie not found!!")
        //     return;
        // }
        // movies = JSON.stringify(movies);
       const arr =  Search.filter(movie=>{
            return movie.Title+movie.imdbId
        })
        msg.reply(toString(arr))
    }
    else if(msg.content && msg.author.bot !=true){
            msg.reply(`1.Movies 2.Jokes`)
        }
   

})
 client.on("messageCreate",async(msg1)=>{
  if(msg1.content==="heys bitches"){
    msg1.reply("ain't your bitch")
    
  }
  else if(msg1.content===("how are you?","how are you")){
    msg1.reply("i am good, just sick of the summer weather ")
  }
  else if(msg1.content ===("hi","hello","hey")){
    msg1.reply("greetings! hope you had a great day")
  }
 })


client.login(process.env.botToken)
