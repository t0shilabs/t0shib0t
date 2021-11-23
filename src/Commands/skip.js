const Command = require("../Structures/Command")
const gTTS = require("gtts");
const Discord = require("discord.js");

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