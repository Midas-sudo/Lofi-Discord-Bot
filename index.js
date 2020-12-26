const config = require('./config.json');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');

const client = new Discord.Client();

var size = 0;
var oldsize = 0;

client.once('ready', () => {
  console.log('Lofi Bot is online!');
});
client.once('reconnecting', () => {
  console.log('Reconnecting!');
});
client.once('disconnect', () => {
  console.log('Disconnect!');
});

client.on('voiceStateUpdate', (oldmember, newmember) => {                 //Activates when someone enters/changes room
                                                                          //Returns 2 states the previous and the next state of the user in question
  let voice_channelId = config.voiceChannelId;
  let text_channelId = config.textChannelId;                                  

  //Checks if the previous channel of the user was the Lofi_Room and if the next room is either diferent from Lofi_Room or no room at all
  if (oldmember.channel == voice_channelId && (newmember.channel != oldmember.channel || newmember.channel == null) && size != 0) {
    oldsize = size;       
    size = size - 1;    //Decreasses the number of people in the room
  }


  //Checks if the next channel of the user was the Lofi_Room and if the previous room is either diferent from Lofi_Room or no room at all
  if (newmember.channel == voice_channelId && (oldmember.channel != newmember.channel || oldmember.channel == null)) {
    oldsize = size;
    size = size + 1;    //Increasses the number of people in the room
    /*if(!(newmember.member.user.bot)){
      let text_channel = newmember.guild.channels.cache.get(text_channelId);  //Gets current name of the viewer text channel
      var name = text_channel.name.split(':');                                //Splits the text from the number of viewers
      name[1]++;
      name[0].concat(name[1]);
      text_channel.setName(name[0]);                                          //Changes Name
    }*/
  }



  //Condition only true for the first person that initiates the entry of the bot
  if (size == 1 && oldsize == 0) {
    newmember.channel.join().then((connection) => {         //Retrieves the user voice_channel (Theoretically is going to always be the Lofi_Room) and calls the join function for the bot
      // || After joining it starts playing the stream  ||
      // vv                                             vv
      console.log('Successfully connected.');
      song = 'https://www.youtube.com/watch?v=5qap5aO4i9A';
      console.log('now playing ' + song);
      const dispatcher = connection.play(ytdl(song), { filter: 'audioonly' });  //Plays the Lofi youtube stream
      dispatcher.on('end', (end) => {                                           //In case the stream ends the bot will leave
        voiceChannel.leave();
      });
    }).catch((e) => {console.error(e);});                   //Error catching
  }


  //Checks if the bot is alone in the Lofi_Room and leave if true
  if (oldsize == 2 && size == 1) {
    oldmember.channel.leave();
  }
  console.log('size: ' + size);
});

client.login(config.token);
