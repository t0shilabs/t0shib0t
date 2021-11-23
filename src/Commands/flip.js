const Command = require("../Structures/Command")

module.exports = new Command({
    name: "flip",
    description: "Flips a coin.",
    run (message, args, client){
        let response = "<@" + message.author.id + "> ";
        let num = Math.round(Math.random());

        if(num === 0){
            response += "**Tail**";
            message.channel.send(response);
        }else{
            response += "**Head**";
            message.channel.send(response);
        }
    }
})