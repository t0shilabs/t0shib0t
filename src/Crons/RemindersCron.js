const moment = require("moment");
const fs = require("fs");
const Discord = require("discord.js");

class RemindersCron {
    constructor(client) {
        setInterval(function (){

            fs.readdirSync("./src/Dbs/Reminders").filter(file => file.endsWith('.json')).forEach(file => {
                let data = JSON.parse(fs.readFileSync('./src/Dbs/Reminders/' + file, 'utf8'));
                data.forEach(function(v,k){
                    if(Date.now() > v.date){

                        const df = moment(v.date).utcOffset(-300).format("MMMM Do YYYY, h:mm:ss a");
                        let response = df + "\n\n" + v.message + "\n\n<@" + v.userId + ">";

                        const newEmbeded = new Discord.MessageEmbed()
                            .setColor("#304281")
                            .setTitle("It's Happening!")
                            .setDescription(response)

                        v.finished = true;
                        client.channels.cache.get(v.channel).send({ embeds: [newEmbeded] });
                    }
                });
                let arr = data.filter(d => !d.finished);
                if(arr.length === 0){
                    fs.unlinkSync('./src/Dbs/Reminders/' + file);
                }else{
                    fs.writeFileSync('./src/Dbs/Reminders/' + file, JSON.stringify(arr));
                }
            });

        },30000);
    }
}

module.exports = RemindersCron;

