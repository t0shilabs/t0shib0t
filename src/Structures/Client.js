const Discord = require("discord.js")
const Command = require("./Command.js")
const intents = new Discord.Intents(32767);

class Client extends Discord.Client {
    constructor(options) {
        super({
            intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_VOICE_STATES],
            partials: ['MESSAGE', 'CHANNEL', 'REACTION']
        });

        this.commands = new Discord.Collection();
    }
}

module.exports = Client;