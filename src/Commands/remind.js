const fs = require("fs")
const Command = require("../Structures/Command")

module.exports = new Command({
    name: "remind",
    description: "Saves a new reminder.",
    run (message, args, client){
        let datetime = Date.parse(args[1] + " " + args[2] + " GMT-05:00");
        let msg = "";
        for (let i=3; i<args.length; i++) msg += args[i] + " ";

        if(datetime){
            if(datetime < Date.now()){ client.channels.cache.get(message.channelId).send("Date must be future."); return; }
            let dict = { userId: message.author.id, channel: message.channelId, date: datetime, message: msg, finished: false}

            try{
                let data = JSON.parse(fs.readFileSync('./src/Dbs/Reminders/' + message.channelId + ".json", 'utf8'));
                data.push(dict);
                data.sort(function (a, b) { if (a.date >= b.date) return 1; else return -1; });
                fs.writeFileSync('./src/Dbs/Reminders/' + message.channelId + ".json", JSON.stringify(data));
                client.channels.cache.get(message.channelId).send("Ok.");
            }catch (e) {
                fs.writeFileSync('./src/Dbs/Reminders/' + message.channelId + ".json", JSON.stringify([dict]));
                client.channels.cache.get(message.channelId).send("Ok.");
            }
        }else{
            client.channels.cache.get(message.channelId).send("Invalid date.");
        }
    }
})