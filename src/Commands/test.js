const Command = require("../Structures/Command")
const fs = require("fs")
const Discord = require("discord.js");

module.exports = new Command({
    name: "test",
    description: "lalala",
    run (message, args, client){
        const newEmbeded = new Discord.MessageEmbed()
            .setColor("#304281")
            .setTitle("It's Happening!")
            .setDescription("response")

        message.channel.send({ embeds: [newEmbeded] });
    }
})