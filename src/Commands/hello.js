const Command = require("../Structures/Command")

module.exports = new Command({
    name: "hello",
    description: "Uploads a murloc mp3 sound.",
    run (message, args, client){
        message.channel.send({ files: ['./src/Sounds/Murloc.mp3'] });
    }
})