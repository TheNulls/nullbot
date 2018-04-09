
const Discord = require('discord.js');
const client = new Discord.Client();
var config = require('./config')

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
});

client.on('message', msg => {
    if (msg.content !== 'no u'){
        // msg.channel.send('no u');
    }
    if (msg.content === '!18++cleanup' && msg.channel.id === config.log){
        console.log('Cleaning up roles!');
        // clean roles
    }
});

client.on('guildMemberAdd', member => {
    // promise here to count users joining in x time
});

client.on('messageDelete', msg => {
    msg.guild.fetchAuditLogs({limit: 1}).then(logs => {
        var logArray = Array.from(logs.entries.values());       
        var entry = logArray[0]
         if (entry.action === 'MESSAGE_DELETE' && entry.executor.username !== entry.target.username){
            let botembed = new Discord.RichEmbed()
                .setDescription('Message Deleted')
                .setColor('#15f153')
                .addField('Sender', `${entry.target.username}#${entry.target.discriminator} (id:  ${entry.target.id})`)
                .addField('Content', msg.cleanContent);
                return client.channels.get(config.log).send(botembed);
        }
	}).catch(console.error);
});

client.login(config.token);