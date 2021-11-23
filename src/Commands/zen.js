const Command = require("../Structures/Command")
const https = require('https');
const Discord = require("discord.js");

module.exports = new Command({
    name: "zen",
    description: "Shows a zen quote.",
    run (message, args, client){
        https.get('https://zenquotes.io/api/random', (resp) => {
            let data = '';
            resp.on('data', (chunk) => { data += chunk; });
            resp.on('end', () => {
                try{
                    const newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription(JSON.parse(data)[0].q)
                    message.channel.send({ embeds: [newEmbeded] });
                }catch (e) {
                    const newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription("I failed retrieving a zen quote.")
                    message.channel.send({ embeds: [newEmbeded] });
                }
            });
        });
    }
})