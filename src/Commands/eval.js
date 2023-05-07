const Command = require("../Structures/Command")
const Discord = require("discord.js");

module.exports = new Command({
    name: "eval",
    description: "Executes javascript code passed as string.",
    run (message, args, client){
        if(args.length === 1){
            message.reply("Write some code to execute.");
        }else{
            try{
                args.shift();
                const result = eval(args.join(" "));
                console.log(result);
                const newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription(result.toString());
                message.channel.send({ embeds: [newEmbeded] });
            }catch (e){
                console.log(e);
                const newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription(e.message);
                message.channel.send({ embeds: [newEmbeded] });
            }
        }
    }
})
