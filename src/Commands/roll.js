const Command = require("../Structures/Command")
const Discord = require("discord.js");

module.exports = new Command({
    name: "roll",
    description: "Rolls a dice.",
    run (message, args, client){
        let response = "";
        if(args.length === 1 || isNaN(parseInt(args[1])) || parseInt(args[1]) <= 0){
            response = "<@" + message.author.id + "> rolled **" + (Math.floor(Math.random() * 6) + 1) + "** out of 6";
        }else{
            response = "<@" + message.author.id + "> rolled **" + (Math.floor(Math.random() * parseInt(args[1])) + 1) + "** out of " + args[1];
        }

        const newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription(response)
        message.channel.send({ embeds: [newEmbeded] });
    }
})