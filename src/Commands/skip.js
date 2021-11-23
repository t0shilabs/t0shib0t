const Command = require("../Structures/Command")

module.exports = new Command({
    name: "skip",
    description: "Skips song.",
    async run (message, args, client){

        let guildQueue = client.player.getQueue(message.guild.id);

        if(guildQueue) {
            guildQueue.skip();
        }
    }
})