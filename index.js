/*
var bot = require('./bot.js'), // Load discord-bot.js
  website = require('./website.js'); // Load website.js
  */
var fs = require('fs')
const XboxLiveAuth = require('@xboxreplay/xboxlive-auth');
const XboxLiveAPI = require('@xboxreplay/xboxlive-api');

XboxLiveAuth.authenticate(process.env.USERNAME, process.env.PASSWORD)
    .then((data) => {
      XboxLiveAPI.getPlayerSettings('kellofkindles', {
        userHash: data.userHash,
        XSTSToken: data.XSTSToken
      }, ['GameDisplayPicRaw', 'GameDisplayName', 'PreferredColor'])
      .then(console.info)
      .catch(console.error);
    
    XboxLiveAPI.getPlayerXUID(
      "GoldBubbles4071",
      {
        userHash: data.userHash,
        XSTSToken: data.XSTSToken
      }
    )
    .then((xuid) => {
      console.log(xuid)
      XboxLiveAPI.call(
        `https://achievements.xboxlive.com/users/xuid(${xuid})/achievements/`,
        { userHash: data.userHash,
          XSTSToken: data.XSTSToken},
        {qs:
          {maxItems:28,
          }}
      ).then((achievement) => {
        let pirateLegend = achievement.achievements[0];
 
        fs.appendFile('mynewfile3.txt', JSON.stringify(achievement), function (err) {
  if (err) throw err;
  console.log('Saved!');
});
        console.log(pirateLegend.name);
        console.log(pirateLegend.progressState);
        console.log(pirateLegend.isRevoked);
        if(pirateLegend.name === "Become Pirate Legend" && pirateLegend.progressState === "Achieved" && !pirateLegend.isRevoked){
          console.log('This account is a Pirate Legend!')
        } else{
          console.log('This account is not a Pirate Legend!')
        }
        }).catch(console.error)
    }).catch(console.error)
    })

    
    .catch(console.error);
/*
bot(); // Run discord-bot.js
website(); // Run website.js
*/