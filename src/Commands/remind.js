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
                let data = JSON.parse(fs.readFileSync('./src/Reminders/' + message.channelId + ".json", 'utf8'));
                data.push(dict);
                fs.writeFileSync('./src/Reminders/' + message.channelId + ".json", JSON.stringify(data));
                client.channels.cache.get(message.channelId).send("Ok.");
            }catch (e) {
                fs.writeFileSync('./src/Reminders/' + message.channelId + ".json", JSON.stringify([dict]));
                client.channels.cache.get(message.channelId).send("Ok.");
            }
        }else{
            client.channels.cache.get(message.channelId).send("Invalid date.");
        }
    }
})