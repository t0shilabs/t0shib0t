const fs = require("fs")
const moment = require("moment")
const Command = require("../Structures/Command")

module.exports = new Command({
    name: "delete",
    description: "Deletes a reminder.",
    run (message, args, client){
        if(args.length === 1 || isNaN(parseInt(args[1]))){
            message.reply("Index is needed");
        }else{
            let index = parseInt(args[1]) - 1;
            try{
                let data = JSON.parse(fs.readFileSync('./src/Dbs/Reminders/' + message.channelId + ".json", 'utf8'));
                if(index < 0 || index >= data.length){
                    message.reply("Index does not exist.");
                }else{
                    let d = data[index];
                    data.splice(index,1);
                    if(data.length === 0){
                        fs.unlinkSync('./src/Dbs/Reminders/' + message.channelId + ".json");
                    }else{
                        fs.writeFileSync('./src/Dbs/Reminders/' + message.channelId + ".json", JSON.stringify(data));
                    }
                    let deleteDate = moment(d.date).format("MMMM Do YYYY, h:mm:ss a");
                    client.channels.cache.get(message.channelId).send("Deleting... " + deleteDate + " " + d.message);
                }
            }catch (e){
                client.channels.cache.get(message.channelId).send("Nothing to delete.");
            }
        }
    }
})