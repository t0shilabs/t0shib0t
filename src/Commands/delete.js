const fs = require("fs")
const moment = require("moment")
const Command = require("../Structures/Command")
const Discord = require("discord.js");

module.exports = new Command({
    name: "delete",
    description: "Deletes a reminder.",
    run (message, args, client){
        if(args.length === 1 || isNaN(parseInt(args[1]))){
            message.reply("Index is needed");
        }else{
            let index = parseInt(args[1]) - 1;
            try{
                let data = JSON.parse(fs.readFileSync('./src/Dbs/Reminders/' + message.channelId + ".json", 'utf8'));
                if(index < 0 || index >= data.length){
                    const newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription("Index does not exist.")
                    message.channel.send({ embeds: [newEmbeded] });
                }else{
                    let d = data[index];
                    data.splice(index,1);
                    if(data.length === 0){
                        fs.unlinkSync('./src/Dbs/Reminders/' + message.channelId + ".json");
                    }else{
                        fs.writeFileSync('./src/Dbs/Reminders/' + message.channelId + ".json", JSON.stringify(data));
                    }

                    let deleteDate = moment(d.date).utcOffset(-300).format("MMMM Do YYYY, h:mm:ss a");
                    const newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription(`Deleting... ${deleteDate} ${d.message}`)
                    message.channel.send({ embeds: [newEmbeded] });

                }
            }catch (e){
                const newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription("Nothing to delete.")
                message.channel.send({ embeds: [newEmbeded] });
            }
        }
    }
})