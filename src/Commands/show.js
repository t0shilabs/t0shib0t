const fs = require("fs")
const moment = require("moment")
const Command = require("../Structures/Command")
const Discord = require("discord.js");

module.exports = new Command({
    name: "show",
    description: "Shows all reminders",
    run (message, args, client){
        try{
            let data = JSON.parse(fs.readFileSync('./src/Reminders/' + message.channelId + ".json", 'utf8'));
            if(data.length > 0){

                let list = [];

                data.forEach(function(v,k){
                    const value = moment(v.date).utcOffset(-300).format("MMMM Do YYYY, h:mm:ss a");
                    const name = (k+1) + ".-  " + v.message + "\n";
                    list.push({name: name , value: value})
                });

                const newEmbeded = new Discord.MessageEmbed()
                    .setColor("#FFFF00")
                    .setTitle("Upcoming Events List!")
                    .setFields(list)

                client.channels.cache.get(message.channelId).send({ embeds: [newEmbeded] });
            }else{
                client.channels.cache.get(message.channelId).send("There are not upcoming events.");
            }
        } catch (err) {
            client.channels.cache.get(message.channelId).send("There are not upcoming events.");
        }
    }
})