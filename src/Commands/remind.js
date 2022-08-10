const fs = require("fs")
const Command = require("../Structures/Command")
const Discord = require("discord.js");

module.exports = new Command({
    name: "remind",
    description: "Saves a new reminder.",
    run (message, args, client){
        let datetime = Date.parse(args[1] + " " + args[2] + " GMT-05:00");
        let msg = "";
        for (let i=3; i<args.length; i++) msg += args[i] + " ";

        if(datetime){
            if(datetime < Date.now()){
                const newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription("Date must be future.")
                message.channel.send({ embeds: [newEmbeded] });
                return;
            }
            let dict = { userId: message.author.id, channel: message.channelId, date: datetime, message: msg, finished: false}

            try{
                let data = JSON.parse(fs.readFileSync('./src/Dbs/Reminders/' + message.channelId + ".json", 'utf8'));
                data.push(dict);
                data.sort(function (a, b) { if (a.date >= b.date) return 1; else return -1; });
                fs.writeFileSync('./src/Dbs/Reminders/' + message.channelId + ".json", JSON.stringify(data));
                const newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription("Ok.")
                message.channel.send({ embeds: [newEmbeded] });
            }catch (e) {
                fs.writeFileSync('./src/Dbs/Reminders/' + message.channelId + ".json", JSON.stringify([dict]));
                const newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription("Ok.")
                message.channel.send({ embeds: [newEmbeded] });
            }
        }else{
            const newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription("The correct format is: !remind {yyyy/mm/dd} {hh:mm:ss} {title}")
            message.channel.send({ embeds: [newEmbeded] });
        }
    }
})