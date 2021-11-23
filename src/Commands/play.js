const Command = require("../Structures/Command")
const Discord = require("discord.js");

module.exports = new Command({
    name: "play",
    description: "Plays a youtube song.",
    async run(message, args, client) {
        try {
            let song_name = "";
            for (let i = 1; i < args.length; i++) song_name += args[i] + " ";

            let guildQueue = client.player.getQueue(message.guild.id);

            let queue = await client.player.createQueue(message.guild.id, {data: {queueInitMessage: message}});

            await queue.join(message.member.voice.channel);

            await queue.play(song_name).catch(_ => {
                if (!guildQueue)
                    queue.stop();
            });
        }catch (e){
            console.log(e)
            message.channel.send({embeds: [new Discord.MessageEmbed().setColor("#008000").setDescription(`Something went wrong please try again.`)]});
        }
    }
});