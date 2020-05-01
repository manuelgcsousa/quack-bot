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

		voiceChannel
			.join()
			.then(connection => {
				if (song_url.includes('www.youtube.com'))
					stream = ytdl(song_url, { filter: 'audioonly' });
				else
					stream = song_url;

				const dispatcher = connection.play(stream, { volume: 0.5 });

				dispatcher.on('finish', () => voiceChannel.leave());
				dispatcher.destroy(); // end the stream.
			})
			.catch(err => {
				return message.reply('There was an error an playing the requested song!');
			});
	}
};
