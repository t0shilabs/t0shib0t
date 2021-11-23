const Command = require("../Structures/Command")
const gTTS = require("gtts");
const Discord = require("discord.js");

module.exports = new Command({
    name: "stop",
    description: "Stops music.",
    async run (message, args, client){

        let guildQueue = client.player.getQueue(message.guild.id);

        if(guildQueue) {
            guildQueue.stop();
            message.channel.send({embeds: [new Discord.MessageEmbed().setColor("#008000").setDescription(`⏹ ${guildQueue.nowPlaying.name}`)]});
        }
    }
})