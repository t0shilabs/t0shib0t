const Command = require("../Structures/Command")

module.exports = new Command({
    name: "leeroy",
    description: "Leeeeerooooy jeeenkiiiins.",
    run (message, args, client){
        message.channel.send({ files: ['./src/Sounds/leeroy.mp3'] });
    }
})