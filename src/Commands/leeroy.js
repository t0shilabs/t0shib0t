const Command = require("../Structures/Command")

module.exports = new Command({
    name: "leeroy",
    description: "Leeeeerooooy jeeenkiiiins.",
    run (message, args, client){
        client.channels.cache.get(message.channelId).send({ files: ['./src/Sounds/leeroy.mp3'] });
    }
})