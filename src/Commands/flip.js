const Command = require("../Structures/Command")
const Discord = require("discord.js");

module.exports = new Command({
    name: "flip",
    description: "Flips a coin.",
    run (message, args, client){
        let response = "<@" + message.author.id + "> ";
        let num = Math.round(Math.random());

        if(num === 0){
            response += "**Tail**";
            const newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription(response)
            message.channel.send({ embeds: [newEmbeded] });
        }else{
            response += "**Head**";
            const newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription(response)
            message.channel.send({ embeds: [newEmbeded] });
        }
    }
})