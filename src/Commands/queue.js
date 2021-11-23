const Command = require("../Structures/Command")
const gTTS = require("gtts");
const Discord = require("discord.js");

module.exports = new Command({
    name: "queue",
    description: "Returns current playlist.",
    async run (message, args, client){

        let guildQueue = client.player.getQueue(message.guild.id);

        if(guildQueue) {
            let msg = "";
            guildQueue.songs.forEach(function(v,k){
                msg += `${k}.- ${v.name}\n`;
            });
            const newEmbeded = new Discord.MessageEmbed()
                .setColor("#008000")
                .setDescription(msg);
            message.channel.send({embeds: [newEmbeded]});
        }
    }
})