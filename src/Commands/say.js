const Command = require("../Structures/Command")
const gTTS = require("gtts");

module.exports = new Command({
    name: "say",
    description: "Text to speech.",
    run (message, args, client){
        if(args.length === 1){
            message.reply("Tell me something to say.");
            return;
        }
        if(args.length > 30){
            message.reply("Too many words.");
            return;
        }
        let say = "";
        for (let i=1; i<args.length; i++) say += args[i] + " ";
        var gtts = new gTTS(say, 'es');
        gtts.save('./src/Sounds/say.mp3', function (err, result) {
            if(err) { throw new Error(err) }
            client.channels.cache.get(message.channelId).send({ files: ['./src/Sounds/say.mp3'] });
        });
    }
})