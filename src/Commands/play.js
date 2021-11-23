const Command = require("../Structures/Command")

const yts = require( 'yt-search' )
const {joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType} = require("@discordjs/voice");
const Discord = require("discord.js");


module.exports = new Command({
    name: "play",
    description: "Plays a youtube song.",
    async run(message, args, client) {

        let song_name = "";
        for (let i=1; i<args.length; i++) song_name += args[i] + " ";

        let guildQueue = client.player.getQueue(message.guild.id);

        let queue = await client.player.createQueue(message.guild.id, { data: { queueInitMessage: message } });

        await queue.join(message.member.voice.channel);

        await queue.play(song_name).catch(_ => {
            if(!guildQueue)
                queue.stop();
        });
    }
});