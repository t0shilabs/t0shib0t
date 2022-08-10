const Command = require("../Structures/Command")
const https = require('https');
const Discord = require("discord.js");
const gTTS = require("gtts");

module.exports = new Command({
    name: "joke",
    description: "Tells a joke.",
    run (message, args, client){
        https.get('https://v2.jokeapi.dev/joke/Any', (resp) => {
            let data = '';
            resp.on('data', (chunk) => { data += chunk; });
            resp.on('end', () => {
                try{
                    const json = JSON.parse(data);
                    const type = json['type'];
                    //let newEmbeded;
                    let finalJoke;

                    if (type === 'twopart') {
                        const setup = json['setup'];
                        const delivery = json['delivery'];
                        finalJoke = setup + ' ' + delivery;
                        //newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription(setup + ' ' + delivery)
                    }
                    if (type === 'single') {
                        const joke = json['joke'];
                        finalJoke = joke;
                        //newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription(joke)
                    }
                    var gtts = new gTTS(finalJoke, 'en');
                    gtts.save('./src/Sounds/say.mp3', function (err, result) {
                        if(err) { throw new Error(err) }
                        message.channel.send({ files: ['./src/Sounds/say.mp3'] });
                    });
                    //message.channel.send({ embeds: [newEmbeded] });
                }catch (e) {
                    const newEmbeded = new Discord.MessageEmbed().setColor("#ffffff").setDescription("I have no jokes u_u")
                    message.channel.send({ embeds: [newEmbeded] });
                }
            });
        });
    }
})