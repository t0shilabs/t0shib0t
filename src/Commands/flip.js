const Command = require("../Structures/Command")

module.exports = new Command({
    name: "flip",
    description: "Flips a coin.",
    run (message, args, client){
        let response = "<@" + message.author.id + "> ";
        let num = Math.round(Math.random());

        if(num === 0){
            response += "**Tail**";
            client.channels.cache.get(message.channelId).send(response);
        }else{
            response += "**Head**";
            client.channels.cache.get(message.channelId).send(response);
        }
    }
})