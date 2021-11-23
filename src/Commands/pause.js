const Command = require("../Structures/Command")

const yts = require( 'yt-search' )
const {joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType} = require("@discordjs/voice");
const Discord = require("discord.js");


module.exports = new Command({
    name: "pause",
    description: "Pauses the music.",
    async run(message, args, client) {

        let guildQueue = client.player.getQueue(message.guild.id);

        if(guildQueue) {
            guildQueue.setPaused(true);
            message.channel.send({embeds: [new Discord.MessageEmbed().setColor("#008000").setDescription(`⏸ ${guildQueue.nowPlaying.name}`)]});
        }
    }
});