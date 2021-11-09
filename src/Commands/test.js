const Command = require("../Structures/Command")
const fs = require("fs")
const Discord = require("discord.js");

module.exports = new Command({
    name: "test",
    description: "This is a test.",
    run (message, args, client){

        var dict = [{ name: "1.-  November 2nd 2021, 4:25:00 pm", value: "!zen" },
            { name: "1.-  November 2nd 2021, 4:25:00 pm", value: "!zen" },
            { name: "1.-  November 2nd 2021, 4:25:00 pm", value: "!zen" },];

        const newEmbeded = new Discord.MessageEmbed()
            .setColor("#FFFF00")
            .setTitle("Upcoming Events List!")
            .setFields(dict)
        message.channel.send({ embeds: [newEmbeded] });
    }
})