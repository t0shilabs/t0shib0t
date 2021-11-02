const Command = require("../Structures/Command")

module.exports = new Command({
    name: "toshibot",
    description: "toshibot command list",
    run (message, args, client){
        let instr =
            "**!roll number** : rolls a dice of \"number\" sides\n" +
            "**!remind yyyy/mm/dd hh:mm:ss title**: registers and event for that date\n" +
            "**!show** : show all upcoming  events\n" +
            "**!delete index** : deletes the event of that specific index";

        client.channels.cache.get(message.channelId).send(instr);
    }
})