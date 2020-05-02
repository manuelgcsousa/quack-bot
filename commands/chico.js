const Lyricist = require('lyricist/node6');

const lyricist = new Lyricist(process.env.GENIUS_API_TOKEN);

module.exports = {
	name: 'chico',
	description: 'Random quadras do poeta português intitulado de Chico da Tina.',
	execute(message, args) {
		if (args.length !== 0)
			return;

		lyricist
			.songsByArtist(1739531)
			.then(songs => {
				const num_songs = songs.length;
				const idx = Math.floor(Math.random() * num_songs);
				
				const id_song = songs[idx].id;
				
				if (id_song === 5269769) { // dirty way to fix broken lyric.
					idx = Math.floor(Math.random() * num_songs);
					id_song = songs[idx].id;
				}

				lyricist
					.song(id_song, { fetchLyrics: true })
					.then(song => {
						const lyrics = song.lyrics
							.split('\n')
							.map(str => { return str.replace(/\[(.*?)\]/, '') })
							.filter(str => str !== '');
								
						if (lyrics.length <= 4)
							message.channel.send('\"' + lyrics + '\"');
						else {
							let range = Math.floor(Math.random() * (lyrics.length - 4));
								
							let quadra = 
								lyrics[range] + '\n' +
								lyrics[range + 1] + '\n' + 
								lyrics[range + 2] + '\n' + 
								lyrics[range + 3]
							;

							message.channel.send('\" ' + quadra + ' \"\n\n**Chico da Tina** in *' + song.title + '*');
						};
					})
					.catch(err1 => console.log(err1));
			})
			.catch(err2 => console.log(err2));
	}
};
