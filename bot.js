/*
Added more comments
Can't recall if I need to add a webpage, will have to check other bots I've made here

Usefull links - 
  Discord.js documentation: https://discord.js.org/#/docs/main/stable/general/welcome
  Javascript reference (Mozilla): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference

*/
require('dotenv').config(); // Library for getting variables from secret .env file
var colors = require('colors'); // Adds colors to the console
const Discord = require('discord.js'); // Discord bot library
const client = new Discord.Client(); // Discord bot
client.login(process.env.LOGIN) // Logs in the bot using secret token
client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`.yellow); // Note the backticks here - this lets us include evaluations with "${}"
    });
    const prefix = "Ahoy! "

//"Ahoy! helprun"
//"helprun"
// commands.helprun === undefined
client.on("message", function(msg) {
  console.log(JSON.stringify(msg))
        var cmd = msg.content.replace(prefix, "").split(" ")[0]; // Remove the prefix and options
        if (msg.content.startsWith(prefix) && msg.author != client.user && commands[cmd] && msg.member.hasPermission(commands[cmd].require)) { // Only continue if the message starts with the prefix and the bot didn't send the message and it is a command and the user has permission to run it
            commands[cmd].run(msg); // Run function linked to a command
        }

    })

var commands = {
        "help": {
            "run": help,
            "description": 'Shows this menu, or just one command',
            "usage": prefix + "help {command}",
            "require": []
        },
        "ping": {
            "run": ping,
            "description": "Pings the bot",
            "usage": prefix + "ping",
            "require": []
        },
}

function ping(msg) { // Ping the bot
        msg.channel.send("Pong!")
    }

function help(msg, local) { // Shows commands a user can run or specific command
  var embed = { // Defines an empty embed to be edited (this is a Discord thing, makes messages look cooler. Notice it's not in the ping command)
    "color": 1,
      "fields": []
  }

  if(local === undefined){ // Local is used for when this function is called by other functions in this program (like if someone did "!complicateCommand" it would return a help page on said command)
    var rawOptions = msg.content.replace(prefix, "").substring(4); //TODO: Fix this line (change substring?) // Fixed in other version, will update later
    } else{
      var rawOptions = local
    }

    if(rawOptions.length <= 1){
      var cmds = Object.keys(commands); // All commands in array form

      for (var i = 0; i < cmds.length; i++) {
        if (msg.member.hasPermission(commands[cmds[i]].require)) { // Only add commands the user can run
          embed.fields.push({ // Build message to send
            "name": "**" + prefix + cmds[i] + "**",
            "value": commands[cmds[i]].description + "\nUsage: `" + commands[cmds[i]].usage + "`",
            "inline": true
          })
        }
      }
    } else{
      var cmd = rawOptions.substring(1)
      if (commands[cmd] != undefined && msg.member.hasPermission(commands[cmd].require)) {
        embed.fields.push({ // Build message to send
          "name": "**" + prefix + cmd + "**",
          "value": commands[cmd].description + "\nUsage: `" + commands[cmd].usage + "`",
          "inline": true
        })
      }
    }

  msg.channel.send({embed}) // Send premade embed to the channel
}
    
