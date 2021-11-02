const Command = require("../Structures/Command")
const fs = require("fs")

module.exports = new Command({
    name: "test",
    description: "lalala",
    run (message, args, client){
        try {
            const data = fs.readFileSync('./src/reminders123', 'utf8');
            console.log(data)
        } catch (err) {
            if(err.code === "ENOENT"){

            }
        }
    }
})