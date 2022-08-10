const Command = require("../Structures/Command")

module.exports = new Command({
    name: "horn",
    description: "Leeeeerooooy jeeenkiiiins.",
    run (message, args, client){
        message.channel.send({ files: ['./src/Sounds/horn.mp3'] });
    }
})