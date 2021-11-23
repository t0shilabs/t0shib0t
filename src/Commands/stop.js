const Command = require("../Structures/Command")
const Discord = require("discord.js");

module.exports = new Command({
    name: "stop",
    description: "Stops music.",
    async run (message, args, client){

        try {
            let guildQueue = client.player.getQueue(message.guild.id);

            if (guildQueue) {
                guildQueue.stop();
                message.channel.send({embeds: [new Discord.MessageEmbed().setColor("#008000").setDescription(`⏹ Queue terminated.`)]});
            }
        }catch (e) {
            console.log(e);
            message.channel.send({embeds: [new Discord.MessageEmbed().setColor("#008000").setDescription(`Something went wrong please try again.`)]});
        }
    }
})