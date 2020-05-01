const ytdl = require('ytdl-core');

module.exports = {
	name: 'play',
	description: 'Plays a song when provided a link.',
	execute(message, args) {
		if (args.length === 0 || args.length > 1)
			return;
		
		if (message.channel.type !== 'text')
			return;
		
		const voiceChannel = message.member.voice.channel;

		if (!voiceChannel) {
			return message.reply('Please join a voice channel first!');
		}

		const song_url = args[0];
		console.log(song_url);

		voiceChannel
			.join()
			.then(connection => {
				const stream = ytdl(song_url, { filter: 'audioonly' });
				const dispatcher = connection.play(stream);

				dispatcher.on('end', () => voiceChannel.leave());
			})
			.catch(err => {
				console.log(err);
				return message.reply('There was an error an playing the requested song!');
			});
	}
};
