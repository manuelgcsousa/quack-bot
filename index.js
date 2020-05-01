'use strict';

require('dotenv').config();

const prefix = '$';
const Reddit = require('./utils/reddit.js');
const Discord = require('discord.js');
const fs = require('fs');
const ytdl = require('ytdl-core');

// Create an instance of a Discord client.
const client = new Discord.Client();
// Create a discord collections for storing commands.
client.commands = new Discord.Collection();

// Read all file commands and set them to the discord collection.
const cmdFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of cmdFiles) {
	let cmd = require('./commands/' + file);

	client.commands.set(cmd.name, cmd);
}


/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord.
 */
client.on('ready', () => {
	console.log('Running...');	
});

// Create an event listener for messages.
client.on('message', async message => {
	if (!message.content.startsWith(prefix) || message.author.bot)
		return;

	let args = message.content.slice(prefix.length).split(/ +/);	
	let cmd = args.shift().toLowerCase();

	if (!client.commands.has(cmd))
		return;
	
	if (message.content === '!play') {
		console.log('boas');
		if (message.channel.type !== 'text') return;

		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('please join a voice channel first!');
		}

		voiceChannel.join().then(connection => {
			const stream = ytdl('https://www.youtube.com/watch?v=EOxj2ROIxok', { filter: 'audioonly' });
			const dispatcher = connection.play(stream);

			dispatcher.on('end', () => voiceChannel.leave());
		});
	}	

	try {
		client.commands.get(cmd).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('There was an error while executing that command!');
	}
});

// Login bot using unique token.
client.login(process.env.BOT_TOKEN);
