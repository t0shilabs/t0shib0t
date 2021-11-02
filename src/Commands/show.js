const fs = require("fs")
const moment = require("moment")
const Command = require("../Structures/Command")

module.exports = new Command({
    name: "show",
    description: "Shows all reminders",
    run (message, args, client){
        let show = "";
        try{
            let data = JSON.parse(fs.readFileSync('./src/Reminders/' + message.channelId + ".json", 'utf8'));
            if(data.length > 0){
                data.forEach(function(v,k){
                    const df = moment(v.date).utcOffset(-300).format("MMMM Do YYYY, h:mm:ss a");
                    show += (k+1) + ".-  " + df + " " + v.message + "\n";
                });
                client.channels.cache.get(message.channelId).send(show);
            }else{
                client.channels.cache.get(message.channelId).send("There are not upcoming events.");
            }
        } catch (err) {
            client.channels.cache.get(message.channelId).send("There are not upcoming events.");
        }
    }
})