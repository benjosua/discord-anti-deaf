require('dotenv').config()
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES", "GUILD_MEMBERS", "GUILD_PRESENCES"] });

client.login(process.env.BOT_TOKEN)

client.on("ready", () => {
    console.log("Bot is ready")
    })

var timeouts  = new Map([])
var delay = ""
var afkChannelID = ""

client.on("voiceStateUpdate", (oldState, newState) =>
{
    if (newState.selfDeaf && newState.member.manageable && (newState.channelId != afkChannelID)) {
        timeouts.set(newState.member.id, setTimeout(() => newState.member.voice.setChannel(afkChannelID), delay))
}});

client.on('voiceStateUpdate', (oldState, newState) => { 
    if(newState.selfDeaf == false && (newState.channelId != afkChannelID)) {
        console.log(timeouts.has(newState.member.id))
        if (timeouts.has(newState.member.id)) {
            clearTimeout(timeouts.get(newState.member.id));
        }
}});
