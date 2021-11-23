const Command = require("../Structures/Command")
const Discord = require("discord.js");

module.exports = new Command({
    name: "queue",
    description: "Returns current playlist.",
    async run (message, args, client){

        try {
            let guildQueue = client.player.getQueue(message.guild.id);

            if (guildQueue) {
                if(guildQueue.songs.length > 0){
                    let msg = "";
                    guildQueue.songs.forEach(function (v, k) {
                        msg += `${k}.- ${v.name}\n`;
                    });
                    const newEmbeded = new Discord.MessageEmbed().setColor("#008000").setDescription(msg);
                    message.channel.send({embeds: [newEmbeded]});
                }else{
                    const newEmbeded = new Discord.MessageEmbed().setColor("#008000").setDescription("Queue is empty.");
                    message.channel.send({embeds: [newEmbeded]});
                }
            }
        }catch (e) {
            console.log(e);
            message.channel.send({embeds: [new Discord.MessageEmbed().setColor("#008000").setDescription(`Something went wrong please try again.`)]});
        }
    }
})