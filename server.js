const Discord = require('discord.js')
const axios =require("axios")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const randomMovieNames = require('random-movie-names');
const { MessageEmbed } = require('discord.js');

require('dotenv').config()


client.on("ready",()=>{

    console.log(`logged in as ${client.user.tag}`)
})


client.on("messageCreate", async(msg)=>{  

    //  if(msg.content.includes(["hi","Hi","Hello","Hey","hello","hey"])){
     if(["hi","Hi","Hello","Hey","hello","hey"].includes(msg.content)){
        //   msg.reply("greetings! hope you had a great day,how are you feeling?")
        // https://media.giphy.com/media/noyBeNjH4nbtXV5ZLA/giphy.gif
        const exampleEmbed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`hello ${msg.author.username}`)
        .setDescription(`hope you had a great day,how are you feeling?`)
        .setImage(`https://media.giphy.com/media/noyBeNjH4nbtXV5ZLA/giphy.gif`)
        .setTimestamp()

        msg.reply({ embeds: [exampleEmbed] });
        
     }
    else if(["how are you?","how are you"].includes(msg.content)){
      msg.reply("i am good, just sick of the summer weather ")
     }
     else if( ["sad","Sad"].includes(msg.content) ){
       msg.reply("hang in there")
     }     
    else if(msg.content == "1" || msg.content ==='movie'){
        
        var movieName = randomMovieNames()

    
        // movieName =s;
        let uri = `http://www.omdbapi.com/?s=${movieName}&apikey=36869c0c`
        const {data} = await axios.get(uri)
        const {Search} = data;

        if(Search){
            const exampleEmbed = new MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle(Search[0].Title)
	        .setDescription(`Year - ${Search[0].Year}`)
	        .setImage(Search[0].Poster)
	        .setTimestamp()

            msg.reply({ embeds: [exampleEmbed] });
            return;
        }
        const exampleEmbed = new MessageEmbed()
	        .setColor('#0099ff')
	        .setTitle(movieName)
	        // .setDescription(Search[0].Year)
	        // .setImage(Search[0].Poster)
	        .setTimestamp()
        msg.reply({ embeds: [exampleEmbed] })
        // return;
    }
    //jokes api
    else if(msg.content === "2" || msg.content==="joke"){

        try {
            
            params = {
                method:"GET",
                headers:{
                    'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com',
                    'X-RapidAPI-Key': 'c275f492cfmsh1481aba9c0522d8p121ae8jsn4d073f1ee41b'
                }
            }
            const {data} = await axios.get("https://jokeapi-v2.p.rapidapi.com/joke/Any",params)
            console.log(data)

            if(data.type==="twopart"){
                let s = data.setup +" "+ data.delivery
                msg.reply(data.setup +" "+ data.delivery)
                return;
            }
            msg.reply(data.joke)
        } catch (error) {
            console.log(error.messsage)
        }
    }
    //movie api
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
    //movie/jokes choice
    else if(msg.content == "!distract"){
        msg.reply(`1.Movies 2.Jokes`)
    }
    //quotes api
     else if(msg.content == '!inspire'){

       let res = await axios.get("https://zenquotes.io/api/random")
       msg.reply(`Heres an inspiring quote for you :- ${res.data[0].q}`)
       
    }
    //affirmation api
    // else if(msg.content && !msg.author.bot){

    //     try {
    //         let {data} = await axios.get('https://www.affirmations.dev/');
            
    //         msg.reply(data.affirmation)
    //     } catch (error) {
    //         console.log(error.messsage)
    //     }
    //     }
    
})



client.login(process.env.botToken)
