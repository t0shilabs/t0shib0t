const Client = require("./Structures/Client")
const config = require("./config.json");
const RemindersCron = require("./Crons/RemindersCron")
const CommandLoader = require("./Structures/CommandLoader");
const SetRoleReaction = require("./Actions/SetRoleReaction")
const { Player, Utils } = require("discord-music-player");
const Discord = require("discord.js");

const client = new Client();
const player = new Player(client, { leaveOnEmpty: false, leaveOnEnd: false});

CommandLoader(client);
RemindersCron(client);

client.player = player;

client.player.on('songChanged', function(queue, newSong, oldSong){
    let initMessage = queue.data.queueInitMessage;
    initMessage.channel.send({ embeds: [new Discord.MessageEmbed().setColor("#008000").setDescription(`▶ ${newSong}.`)]});
});

client.player.on('songFirst',  function (queue, song)
{
    let initMessage = queue.data.queueInitMessage;
    initMessage.channel.send({ embeds: [new Discord.MessageEmbed().setColor("#008000").setDescription(`▶ ${song}.`)] });
});

client.player.on('songAdd',  function (queue, song)
{
    let initMessage = queue.data.queueInitMessage;
    initMessage.channel.send({ embeds: [new Discord.MessageEmbed().setColor("#008000").setDescription(`🆕 ${song}`)] });
});


client.on("ready", () =>{
    client.user.setActivity('!t0shib0t');
});

client.on("messageCreate", function(message){

    if(!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.substring(config.prefix.length).split(/ +/);
    const command = client.commands.find(cmd => cmd.name === args[0])

    if(!command) return;

    command.run(message, args, client);
});

client.on('messageReactionAdd', async (reaction, user) => {

    if (reaction.partial) {
        try { await reaction.fetch(); }
        catch (error) { return; }
    }

    SetRoleReaction(reaction, user, true);
});

client.on('messageReactionRemove', async (reaction, user) => {

    if (reaction.partial) {
        try { await reaction.fetch(); }
        catch (error) { return; }
    }

    SetRoleReaction(reaction, user, false);
});

client.login(config.token);