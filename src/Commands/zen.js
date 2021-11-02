const Command = require("../Structures/Command")
const https = require('https');

module.exports = new Command({
    name: "zen",
    description: "Shows a zen quote.",
    run (message, args, client){
        https.get('https://zenquotes.io/api/random', (resp) => {
            let data = '';
            resp.on('data', (chunk) => { data += chunk; });
            resp.on('end', () => {
                try{
                    client.channels.cache.get(message.channelId).send(JSON.parse(data)[0].q);
                }catch (e) {
                    client.channels.cache.get(message.channelId).send("I failed retrieving a zen quote.");
                }
            });
        });
    }
})