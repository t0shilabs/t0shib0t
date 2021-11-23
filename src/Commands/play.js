const Command = require("../Structures/Command")
const ytdl = require('ytdl-core');
const yts = require( 'yt-search' )
const {joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType} = require("@discordjs/voice");


module.exports = new Command({
    name: "play",
    description: "Plays a youtube song.",
    async run(message, args, client) {

        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) return message.channel.send("You need to be in a voice channel to play music!");

        const permissions = voiceChannel.permissionsFor(message.client.user);

        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) return message.channel.send("I need the permissions to join and speak in your voice channel!");

        try{
            const conn = await joinVoiceChannel({
                channelId: message.member.voice.channel.id,
                guildId: message.guild.id,
                adapterCreator: message.guild.voiceAdapterCreator
            })

            let msg = "";
            for (let i=1; i<args.length; i++) msg += args[i] + " ";

            const songs = await yts(msg);

            if (!songs.all.length) return message.channel.send("⛔ No songs were found!");

            const song = songs.all[0]

            const stream = await ytdl(song.url, {quality: 'lowestaudio', filter: "audioonly"});

            const resource = createAudioResource(stream,{ inputType: StreamType.Arbitrary });

            const player = createAudioPlayer();

            setTimeout(function(){
                player.play(resource);
                conn.subscribe(player);
            }, 3000)

            message.channel.send(`▶ ${song.title}`);
        }catch (e){
            console.log(e);
        }


    }
});