const Client = require("./Structures/Client")
const config = require("./config.json");
const client = new Client();

const fs = require('fs');


setInterval(function (){

    fs.readdirSync("./src/Reminders").filter(file => file.endsWith('.json')).forEach(file => {
        let data = JSON.parse(fs.readFileSync('./src/Reminders/' + file, 'utf8'));
        data.forEach(function(v,k){
            if(Date.now() > v.date){
                let response = "<@" + v.userId + "> " + v.message;
                v.finished = true;
                client.channels.cache.get(v.channel).send(response);
            }
        });
        let arr = data.filter(d => !d.finished);
        if(arr.length === 0){
            fs.unlinkSync('./src/Reminders/' + file);
        }else{
            fs.writeFileSync('./src/Reminders/' + file, JSON.stringify(data));
        }
    });

},60000);


fs.readdirSync("./src/Commands").filter(file => file.endsWith('.js')).forEach(file => {
    const command = require(`./Commands/${file}`);
    client.commands.set(command.name, command);
});

client.on("ready", () =>{ client.user.setActivity('!toshibot'); });

client.on("messageCreate", function(message){

    if(!message.content.startsWith(config.prefix)) return;
    if(message.author.username === 'ToshiBot') return;

    const args = message.content.substring(config.prefix.length).split(/ +/);
    const command = client.commands.find(cmd => cmd.name === args[0])

    if(!command) return;

    command.run(message, args, client);
});

client.login(config.token);