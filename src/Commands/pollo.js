const Command = require("../Structures/Command")

module.exports = new Command({
    name: "pollo",
    description: "Por lo menos tengo pollo.",
    run (message, args, client){
        client.channels.cache.get(message.channelId).send({ files: ['./src/Sounds/pollo.mp3'] });
    }
})