const fs = require('fs');
const moment = require('moment');
const Discord = require("discord.js");
const config = require("./config.json");
const intents = new Discord.Intents(32767);
const client = new Discord.Client({ intents });
const gTTS = require('gtts');

setInterval(function (){
    let data = JSON.parse(fs.readFileSync('./src/reminders', 'utf8'));
    data.forEach(function(v,k){
        if(Date.now() > v.date){
            let response = "<@" + v.userId + "> " + v.message;
            v.finished = true;
            client.channels.cache.get(v.channel).send(response);
        }
    });
    let arr = data.filter(d => !d.finished);
    fs.writeFileSync('./src/reminders', JSON.stringify(arr));
},60000);

client.on("ready", () =>{
    client.user.setActivity('!toshibot');
});

client.on("messageCreate", function(message){

    if(!message.content.startsWith(config.prefix)) return;
    if(message.author.username === 'ToshiBot') return;

    const args = message.content.substring(config.prefix.length).split(/ +/);

    switch(args[0]){
        case "toshibot":
            let instr = "**!roll number** : rolls a dice of \"number\" sides\n" +
                        "**!remind yyyy/mm/dd hh:mm:ss title**: registers and event for that date\n" +
                        "**!show** : show all upcoming  events\n" +
                        "**!delete index** : deletes the event of that specific index";

            client.channels.cache.get(message.channelId).send(instr);
            break;

        case "roll":
            let response = "";
            if(args.length === 1 || isNaN(parseInt(args[1])) || parseInt(args[1]) <= 0){
                response = "<@" + message.author.id + "> rolled **" + (Math.floor(Math.random() * 6) + 1) + "** out of 6";
            }else{
                response = "<@" + message.author.id + "> rolled **" + (Math.floor(Math.random() * parseInt(args[1])) + 1) + "** out of " + args[1];
            }
            client.channels.cache.get(message.channelId).send(response);
            break;

        case "remind":
            let datetime = Date.parse(args[1] + " " + args[2] + " GMT-05:00");
            let msg = "";
            for (let i=3; i<args.length; i++) msg += args[i] + " ";

            if(datetime){
                if(datetime < Date.now()){ client.channels.cache.get(message.channelId).send("Date must be future."); return; }
                let dict = { userId: message.author.id, channel: message.channelId, date: datetime, message: msg, finished: false}
                let data = JSON.parse(fs.readFileSync('./src/reminders', 'utf8'));
                data.push(dict);
                fs.writeFileSync('./src/reminders', JSON.stringify(data));
                client.channels.cache.get(message.channelId).send("Ok.");
            }else{
                client.channels.cache.get(message.channelId).send("Invalid date.");
            }
            break;

        case "show":
            let show = "";
            let data = JSON.parse(fs.readFileSync('./src/reminders', 'utf8'));
            if(data.length > 0){
                data.forEach(function(v,k){
                    const df = moment(v.date).format("MMMM Do YYYY, h:mm:ss a");
                    show += (k+1) + ".-  " + df + " " + v.message + "\n";
                });
                client.channels.cache.get(message.channelId).send(show);
            }else{
                client.channels.cache.get(message.channelId).send("There are not upcoming events.");
            }
            break;

        case "delete":
            if(args.length === 1 || isNaN(parseInt(args[1]))){
                message.reply("Index is needed");
            }else{
                let index = parseInt(args[1]) - 1;
                let data = JSON.parse(fs.readFileSync('./src/reminders', 'utf8'));
                if(index < 0 || index >= data.length){
                    message.reply("Index does not exist.");
                }else{
                    let d = data[index];
                    data.splice(index,1);
                    fs.writeFileSync('./src/reminders', JSON.stringify(data));
                    let deleteDate = moment(d.date).format("MMMM Do YYYY, h:mm:ss a");
                    client.channels.cache.get(message.channelId).send("Deleting... " + deleteDate + " " + d.message);
                }
            }
            break;

        case "hello":
            client.channels.cache.get(message.channelId).send({ files: ['./src/Murloc.mp3'] });
            break;

        case "say":
            if(args.length === 1){
                message.reply("Tell me something to say.");
                return;
            }
            if(args.length > 30){
                message.reply("Too many words.");
                return;
            }
            let say = "";
            for (let i=1; i<args.length; i++) say += args[i] + " ";
            var gtts = new gTTS(say, 'es');
            gtts.save('./say.mp3', function (err, result) {
                if(err) { throw new Error(err) }
                client.channels.cache.get(message.channelId).send({ files: ['./say.mp3'] });
            });
            break;
    }
})

client.login(config.token);