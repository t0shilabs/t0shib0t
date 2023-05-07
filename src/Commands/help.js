const Command = require("../Structures/Command")
const Discord = require("discord.js");

module.exports = new Command({
    name: "help",
    description: "t0shib0t command list.",
    run (message, args, client){

        let list = [];
        list.push({name: "!roll {number}" , value: "Rolls a dice of {number} sides."})
        list.push({name: "!flip" , value: "Filps a coin."})
        list.push({name: "!remind {yyyy/mm/dd} {hh:mm:ss} {title}" , value: "Registers a reminder for that date."})
        list.push({name: "!show" , value: "Show all upcoming  events."})
        list.push({name: "!delete {index}" , value: "Deletes the reminder of that specific index."})
        list.push({name: "!zen" , value: "Texts a random zen quote."})
        list.push({name: "!joke" , value: "Tells a joke."})
        list.push({name: "!define {word}" , value: "Texts de definitions of {word}."})
        list.push({name: "!say {statement}" , value: "Uploads a text to speech sound for that statement."})
        list.push({name: "!horn" , value: "Play the haunting horn to summon hunters."})
        list.push({name: "!eval {statement}" , value: "Evaluates javascript code."})

        /*
        list.push({name: "!murloc" , value: "mrglmrglmrglmrgl."})
        list.push({name: "!pollo" , value: "Por lo menos tengo pollo."})
        list.push({name: "!leeroy" , value: "Leeeeeroooooyyyy Jeeeenkiiiiings."})
        */

        const newEmbeded = new Discord.MessageEmbed()
            .setColor("#ff0000")
            .setTitle("t0shib0t command list.")
            .setFields(list)

        message.channel.send({ embeds: [newEmbeded] });
    }
})
