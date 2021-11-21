const fs = require("fs");

class CommandLoader {
    constructor(client) {
        fs.readdirSync("./src/Commands").filter(file => file.endsWith('.js')).forEach(file => {
            const command = require(`../Commands/${file}`);
            client.commands.set(command.name, command);
        });
    }
}

module.exports = CommandLoader;