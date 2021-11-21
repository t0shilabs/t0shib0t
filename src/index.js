const Client = require("./Structures/Client")
const config = require("./config.json");
const RemindersCron = require("./Crons/RemindersCron")
const CommandLoader = require("./Structures/CommandLoader");
const colors = require("./Structures/ColorsList.json");
const fs = require("fs");

const client = new Client();
new CommandLoader(client);
new RemindersCron(client);

client.on("ready", () =>{
    client.user.setActivity('!t0shib0t');
});

client.on("messageCreate", function(message){

    if(!message.content.startsWith(config.prefix) || message.author.username === 't0shib0t') return;

    const args = message.content.substring(config.prefix.length).split(/ +/);
    const command = client.commands.find(cmd => cmd.name === args[0])

    if(!command) return;

    command.run(message, args, client);
});

client.on('messageReactionAdd', async (reaction, user) => {

    if (reaction.partial) { try { await reaction.fetch(); } catch (error) { return; } }

    let data = JSON.parse(fs.readFileSync('./src/Dbs/ColorMessages/messages.json', 'utf8'));

    if(data.indexOf(reaction.message.id) !== -1 && user.username !== 't0shib0t'){
        const emoji = reaction.emoji.name;
        colors.list.forEach(function(v,k){
           if(emoji === v.symbol){
               let role = reaction.message.guild.roles.cache.find(role => role.name === v.name);
               let mentionedUser = reaction.message.guild.members.cache.find((m) => m.user.id === user.id);
               try{
                   mentionedUser.roles.add(role);
               }catch (e){
                   console.log(e);
               }
           }
        });
    }

});

client.on('messageReactionRemove', async (reaction, user) => {

    if (reaction.partial) { try { await reaction.fetch(); } catch (error) { return; } }

    let data = JSON.parse(fs.readFileSync('./src/Dbs/ColorMessages/messages.json', 'utf8'));

    if(data.indexOf(reaction.message.id) !== -1 && user.username !== 't0shib0t'){
        const emoji = reaction.emoji.name;
        colors.list.forEach(function(v,k){
            if(emoji === v.symbol){
                let role = reaction.message.guild.roles.cache.find(role => role.name === v.name);
                let mentionedUser = reaction.message.guild.members.cache.find((m) => m.user.id === user.id);
                try{
                    mentionedUser.roles.remove(role);
                }catch (e){
                    console.log(e);
                }
            }
        });
    }
});

client.login(config.token);