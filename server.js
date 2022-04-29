const Discord = require('discord.js')
const axios =require("axios")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });



client.on("ready",()=>{

    console.log(`logged in as ${client.user.tag}`)
})

cient.on("messageCreate", async(msg)=>{        
    

})
client.login(process.env.botToken)