const Discord = require("discord.js")
const Client = require("../index")

function RunFunction(message, args, client){}

class Command{
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.run = options.run;
    }
}

module.exports = Command;