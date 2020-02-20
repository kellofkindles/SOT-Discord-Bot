/*
Usefull links - 
  Discord.js documentation: https://discord.js.org/#/docs/main/stable/general/welcome
  Javascript reference (Mozilla): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
  Xbox API - https://xboxapi.com/documentation
  To interact with the Xbox API - https://github.com/bendl/node-xbox
*/
require('dotenv').config(); // Module for getting variables from secret .env file
var fs = require('fs');
var https = require('https');
var xbox = require('node-xbox')("c136af27daf36b5b4dd3f91f25ad92bc6111b260"); // Xbox API wrapper
var colors = require('colors'); // Adds colors to the console
const readline = require('readline'); // To recieve console input
const rl = readline.createInterface({ // Start listening to the console
  input: process.stdin,
  output: process.stdout
});

const Discord = require('discord.js'); // Discord bot module
const client = new Discord.Client(); // Discord bot
client.login(process.env.LOGIN) // Logs in the bot using secret token
const msgRelay = new Discord.Client(); // Message relay bot
msgRelay.login(process.env.MSGRELAY);
msgRelay.on('ready', () => {
  console.log(`Logged in as ${msgRelay.user.tag}!`.blue);
})
client.on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`.yellow); // Note the backticks here - this lets us include evaluations with "${}"
    });
    const prefix = "!"

/*
xbox.profile.achievements('2535406750174916', "1717113201",(err, data) => {
  if(err){
    console.error(err)
  } else{
    fs.appendFile('mynewfile1.txt', data, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
  }
})
*/

/*
 var channelList = Array.from(client.channels);
        console.log(channelList);
        var channelsMsg = "";
        var channelsObj = {};
        for(i = 0;i < channelList.length;i++){
          switch(channelList[i][1].type){
            case "voice":
            break;

            case "category":
            channelsMsg += channelList[i][1].name + "\n";
            break;

            case "text":
            channelsMsg += "  " + channelList[i][1].name + ": " + channelList[i][1].id +"\n";
            break;

          }
        }
        console.log(channelsMsg)
*/

rl.on('line', (input) => {
  msgRelay.channels.get('609938145764442113').send(input);
});


//"Ahoy! helprun"
//"helprun"
// commands.helprun === undefined

client.on("message", function(msg) {
  console.log(msg.content.green)
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

function link(msg){
  var embed = {
    "fields":[]
  }

  

}

function ping(msg) { // Ping the bot
        msg.channel.send("Pong!")
    }

function help(msg, local) { // Shows commands a user can run or specific command
	var embed = {
		"color": 1,
		"fields": [],
	}
// "!help ping" -> help ping -> "ping"
	if(local === undefined) {
		var rawOptions = msg.content.replace(prefix, "").substring(5); //TODO: Fix this line (change substring?)
	} else {
		var rawOptions = local
	}

	if(!(commands[rawOptions] != undefined && msg.member.hasPermission(commands[rawOptions].require))) {
		var cmds = Object.keys(commands); // All commands in array form ["help","ping"]

		for(var i = 0; i < cmds.length; i++) {
			if(msg.member.hasPermission(commands[cmds[i]].require)) { // Only add commands the user can run
				embed.fields.push({ // Build message to send
					"name": "**" + prefix + cmds[i] + "**",
					"value": commands[cmds[i]].description + "\nUsage: `" + commands[cmds[i]].usage + "`",
					"inline": true
				})
			}
		}
	} else {
			embed.fields.push({ // Build message to send
				"name": "**" + prefix + rawOptions + "**",
				"value": commands[rawOptions].description + "\nUsage: `" + commands[rawOptions].usage + "`",
				"inline": true
			})
	}
	msg.channel.send({
		embed
	}) // Send message


}
    
