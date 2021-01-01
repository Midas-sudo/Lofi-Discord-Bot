//Import of the packages needed for the project
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const fs = require('fs');
const config_name = './config.json';
const config = require('./config.json');


var {prefix, token, voiceChannelId, textChannelId, serverId, manager_role} = config; //Information loaded from config
const client = new Discord.Client();

var size = 0;
var oldsize = 0;
var channel_name;
var view_number, oldview_number;

client.once('ready', () => {
  console.log('Lofi Bot is online!');
  //Gets current name of the viewer text channel and splits the number from the name
  channel_name = client.guilds.cache.get(serverId).channels.cache.get(textChannelId).name.split('-');
  //Getting the current number (this only occures when bot comes online)
  view_number = channel_name[2];
  console.log(channel_name, view_number);
  name_updater();
  //Calling fucntion to update the name of the channel, this is done in intervals of 5 min because of limitations of the Discord API (The value can't be lower than 5 min)
  setInterval(() => name_updater(), 300000);});
client.once('reconnecting', () => {
  console.log('Reconnecting!');
});
client.once('disconnect', () => {
  console.log('Disconnect!');
});

/*********************************************
 * Event Listener: 
 * 
 * Trigger: Message sent;
 * Parameters: The message object;
 * 
 * Effect: Evaluates if the message starts with the prefix, if it was sent by a member with a specific role;
 * Outcomes: ${prefix}views - Sends message back to sender telling the total number of views;
 *           ${prefix}reset - Resets views back to 0;
 *           ${prefix}prefix ## - Changes the prefix to ##;
 *  
 * *******************************************/
client.on("message", async (message) => {
  //Checks if message is from another bot, if it doesn't starts with the prefix and if its from a user with the manager_role
  if (message.author.bot || !message.content.startsWith(prefix) || !message.member.roles.cache.get(manager_role)) return;

  //Splits the message into args
  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  const text_channel = message.guild.channels.cache.get(textChannelId);

  //Checks if the command is one of these 3
  if(command == "views"){
    message.channel.send(`**Numero Total de Views: ${view_number}**`)     //Send's response in the same channel as the original message
  }else if(command == "reset"){
    view_number = 0;                                                      //Resets total number of views (needs 5 min to update)
  }else if(command == "prefix"){
    config.prefix = args[0];                                              //Sets the new prefix in the JSON object loaded in the start of the code
    fs.writeFile(config_name, JSON.stringify(config, null, 2), function writeJSON(err) {  //Writes to the config file the new JSON Object with the new prefix
      if (err) return console.log(err);
      console.log(JSON.stringify(config));
      console.log('writing to ' + config_name);
    });
    prefix = args[0];                                                                   //Changes the prefix of the variable that has the old prefix
    message.channel.send(`**Prefixo alterado com sucesso. Novo Prefixo: ${args[0]}**`); //Send's message confirming the change of the prefix
  }else if(command == "vc_id"){
    config.voiceChannelId = args[0];                                              //Sets the new voice channel ID in the JSON object loaded in the start of the code
    fs.writeFile(config_name, JSON.stringify(config, null, 2), function writeJSON(err) {  //Writes to the config file the new JSON Object with the new ID
      if (err) return console.log(err);
      console.log(JSON.stringify(config));
      console.log('writing to ' + config_name);
    });
    voiceChannelId = args[0];                                                                   //Changes the voice channel ID of the variable that has the old ID
    message.channel.send(`**ID do voice channel alterado com sucesso. Novo ID: ${args[0]}**`); //Send's message confirming the change of the ID
  }else if(command == "text_id"){
    config.textChannelId = args[0];                                              //Sets the new text channel ID in the JSON object loaded in the start of the code
    fs.writeFile(config_name, JSON.stringify(config, null, 2), function writeJSON(err) {  //Writes to the config file the new JSON Object with the new ID
      if (err) return console.log(err);
      console.log(JSON.stringify(config));
      console.log('writing to ' + config_name);
    });
    textChannelId = args[0];                                                                  //Changes the text channel ID of the variable that has the old ID
    message.channel.send(`**ID do text channel alterado com sucesso. Novo ID: ${args[0]}**`); //Send's message confirming the change of the ID
  }else if(command == "serv_id"){
    config.serverlId = args[0];                                              //Sets the new text channel ID in the JSON object loaded in the start of the code
    fs.writeFile(config_name, JSON.stringify(config, null, 2), function writeJSON(err) {  //Writes to the config file the new JSON Object with the new ID
      if (err) return console.log(err);
      console.log(JSON.stringify(config));
      console.log('writing to ' + config_name);
    });
    serverId = args[0];                                                                  //Changes the text channel ID of the variable that has the old ID
    //Gets current name of the viewer text channel and splits the number from the name
    channel_name = client.guilds.cache.get(serverId).channels.cache.get(textChannelId).name.split('-');
    //Getting the current number (this only occures when bot comes online)
    view_number = channel_name[2];
    console.log(channel_name, view_number);
    message.channel.send(`**ID do Server alterado com sucesso. Novo ID: ${args[0]}**`); //Send's message confirming the change of the ID
  }else if(command == `${prefix}help`){        
    message.channel.send({
    embed: {
        color: 0xf7c500,
        title: "LOFI Bot Help Page",
        description: "Ahh I see you are looking for some guidance",
        fields: [
            {
              "name": "Alguns comandos são:",
              "value": "-------------------------------------------"
            },
            {
              "name": `${prefix}views`,
              "value": "Este comando mostra o número total de views`\n"
            },
            {
              "name": `${prefix}reset`,
              "value": "Este comando faz reset ao número de views"
            },
            {
              "name": `${prefix}prefix`,
              "value": `Este comando define um novo prefixo passado como argumento.\n\`\`\`Exemplo: ${prefix}prefix ##\n Neste caso o novo prefixo passaria a ser ##\`\`\``
            },
            {
              "name": `${prefix}vc_id`,
              "value": `Este comando define um novo id, para o voice channel, passado como argumento.\n\`\`\`Exemplo: ${prefix}vc_id 123456789987654321\n Neste caso o novo id passaria a ser 123456789987654321\`\`\``
            },
            {
              "name": `${prefix}text_id`,
              "value": `Este comando define um novo id, para o text channel, passado como argumento.\n\`\`\`Exemplo: ${prefix}text_id 123456789987654321\n Neste caso o novo id passaria a ser 123456789987654321\`\`\``
            },
            {
              "name": `${prefix}serv_id`,
              "value": `Este comando define um novo id, para o server, passado como argumento. ATENÇÂO este comando tem de ser executado apenas depois de mudar o id do textChannel\n\`\`\`Exemplo: ${prefix}serv_id 123456789987654321\n Neste caso o novo id passaria a ser 123456789987654321\`\`\``
            },
            {
              "name": `${prefix}${prefix}help`,
              "value": `Este comando mostra esta mensagem`
            }
          ],
        author: {
            "name": "Pagina de GitHub",
            "url": "https://github.com/Midas-sudo/Lofi-Discord-Bot"
        },
      },
    });
  }
});



/*********************************************
 * Event Listener: 
 * 
 * Trigger: Someone entering/leaving a voice channel, muting/unmuting etc..
 * Parameters: Two voice states the previous and the next state of the user that triggered;
 * 
 * Effect: Evaluates if the person entered the Bot Room and procedes according to the result
 *  
 * *******************************************/
client.on('voiceStateUpdate', (oldmember, newmember) => {                                            

  //Checks if the previous channel of the user was the Lofi_Room and if the next room is either diferent from Lofi_Room or no room at all
  if (oldmember.channel == voiceChannelId && (newmember.channel != oldmember.channel || newmember.channel == null) && size != 0) {
    oldsize = size;       
    size = size - 1;    //Decreasses the number of people in the room
  }


  //Checks if the next channel of the user was the Lofi_Room and if the previous room is either diferent from Lofi_Room or no room at all
  if (newmember.channel == voiceChannelId && (oldmember.channel != newmember.channel || oldmember.channel == null)) {
    oldsize = size;
    size = size + 1;                 //Increases the number of people in the room
    if(!(newmember.member.user.bot)){
      view_number++;                 //Increses the number of views
    }
  }



  //Condition only true for the first person that initiates the entry of the bot
  if (size == 1 && oldsize == 0) {
    client.guilds.cache.get("702503348716437556").channels.cache.get(voiceChannelId).join().then((connection) => {         //Retrieves the user voice_channel and calls the join function for the bot
      // || After joining it starts playing the stream  ||
      // vv                                             vv
      console.log('Successfully connected.');
      song = 'https://www.youtube.com/watch?v=5qap5aO4i9A';
      console.log('Now playing ' + song);
      const dispatcher = connection.play(ytdl(song), { filter: 'audioonly' });  //Plays the Lofi youtube stream
      dispatcher.on('end', (end) => {                                           //In case the stream ends the bot will leave
        voiceChannel.leave();
      });
    }).catch((e) => {console.error(e);});                   //Error catching
  }


  //Checks if the bot is alone in the Lofi_Room and leave if true
  if (oldsize == 2 && size == 1) {
    client.guilds.cache.get("702503348716437556").channels.cache.get(voiceChannelId).leave();
  }
  //console.log('size: ' + size);
});

/*********************************************
 * Function name_updater(): 
 * 
 * Trigger: none;
 * Parameters: none;
 * 
 * Effect: When called changes the name of the text channel updating the number of views
 *  
 * *******************************************/
function name_updater(){
  console.log("I entered her hihihi");
  if(oldview_number != view_number){                                                               //Condition used to prevente Discord API rate limit
    var final_name = channel_name[0].concat('-',channel_name[1],'-', view_number.toString());
    client.guilds.cache.get(serverId).channels.cache.get(textChannelId).edit({name: final_name})   //Changes Name of the channel specified with the id textChannelID
    .then(newChannel => console.log(`Channel's new name is ${newChannel.name}`));
    oldview_number = view_number;
  }
}



client.login(token);