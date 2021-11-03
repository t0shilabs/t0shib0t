const Command = require("../Structures/Command")
const https = require('https');

module.exports = new Command({
    name: "define",
    description: "Shows the meaning of a word.",
    run (message, args, client){
        if(args.length > 1){
            https.get('https://api.dictionaryapi.dev/api/v2/entries/en/' + args[1], (resp) => {
                let data = '';
                resp.on('data', (chunk) => { data += chunk; });
                resp.on('end', () => {
                    var msg = "";
                    var json = JSON.parse(data)

                    if(json[0]){
                        json[0].meanings.forEach(function(v,k){
                            msg += v.partOfSpeech + ":\n";
                            v.definitions.forEach(function(p,q){
                                msg += "\t- " + p.definition + "\n";
                            });
                        });
                        message.reply(msg)
                    }else{
                        message.reply("No definitions were found.")
                    }
                });
            });
        }else{
            message.reply("Define what?")
        }
    }
})