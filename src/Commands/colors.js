const Command = require("../Structures/Command")
const fs = require("fs")
const Discord = require("discord.js");
const colors = require("../Structures/ColorsList.json");


module.exports = new Command({
    name: "colors",
    description: "Pick a color for your nickname.",
    run (message, args, client){

        let title = "";

        colors.list.forEach(function(v,k){
            title += v.name + " " + v.emoji + "\n";
            if (!message.guild.roles.cache.find(role => role.name === v.name)){
                message.guild.roles.create({ name: v.name, color: v.color });
            }
        });

        const newEmbeded = new Discord.MessageEmbed().setColor("#808080").setTitle(title)

        message.channel.send({ embeds: [newEmbeded] }).then(
            function(response){

                try{
                    let data = JSON.parse(fs.readFileSync('./src/Dbs/ColorMessages/messages.json', 'utf8'));
                    data.push(response.id);
                    fs.writeFileSync('./src/Dbs/ColorMessages/messages.json', JSON.stringify(data));
                }catch (e) {
                    fs.writeFileSync('./src/Dbs/ColorMessages/messages.json', JSON.stringify([response.id]));
                }

                colors.list.forEach(function(v,k){ response.react(v.symbol); });
                message.delete();
            }
        );
    }
})