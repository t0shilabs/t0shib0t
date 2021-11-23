const fs = require("fs");
const colors = require("../Structures/ColorsList.json");
const Discord = require("discord.js");

module.exports = function (reaction, user, set) {

    let data = JSON.parse(fs.readFileSync('./src/Dbs/ColorMessages/messages.json', 'utf8'));

    if(data.indexOf(reaction.message.id) !== -1 && !user.bot){
        const emoji = reaction.emoji.name;
        colors.list.forEach(function(v,k){
            if(emoji === v.symbol){
                let role = reaction.message.guild.roles.cache.find(role => role.name === v.name);
                let mentionedUser = reaction.message.guild.members.cache.find((m) => m.user.id === user.id);
                if(set){
                    mentionedUser.roles.add(role).catch(
                        function(){
                            const newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription("Something went wrong. Make sure I have enough privileges to assign roles.")
                            reaction.channel.send({ embeds: [newEmbeded] });
                        }
                    )
                }else{
                    mentionedUser.roles.remove(role).catch(
                        function(){
                            const newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription("Something went wrong. Make sure I have enough privileges to assign roles.")
                            reaction.channel.send({ embeds: [newEmbeded] });
                        }
                    )
                }
            }
        });
    }
};