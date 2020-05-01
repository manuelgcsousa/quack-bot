const ytdl = require('ytdl-core');

module.exports = {
	name: 'stop',
	description: 'Stop the current playing music.',
	execute(message, args) {
		if (args.length !== 0)
			return;
		
		if (message.channel.type !== 'text')
			return;
		
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('Please join a voice channel first!');
		}
		
		voiceChannel.end();
		
		return message.reply('Quack-bot has stopped the sonoro!');
	}
};
