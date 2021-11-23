const Command = require("../Structures/Command")
const Discord = require("discord.js");


module.exports = new Command({
    name: "resume",
    description: "Resumes the music.",
    async run(message, args, client) {

        let guildQueue = client.player.getQueue(message.guild.id);

        if(guildQueue){
            guildQueue.setPaused(false);
            message.channel.send({ embeds: [new Discord.MessageEmbed().setColor("#008000").setDescription(`▶ ${guildQueue.nowPlaying.name}`)]});
        }
    }
});