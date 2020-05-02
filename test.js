const Lyricist = require('lyricist/node6');

const lyricist = new Lyricist('uJL04kgNjj77yT65oqo5ZGshlscUq6zQJYXkh5t2X-e5ef5Tcr4iwfUNIIQyc-2u');

const song = 
	lyricist
		.songsByArtist(1739531)
		.then(songs => {
			const num_songs = songs.length;
			const idx = Math.floor(Math.random() * num_songs);
			
			const id_song = songs[idx].id;

			lyricist
				.song(id_song, { fetchLyrics: true })
				.then(song => {
					console.log(song.title);
					
					console.log(song);


					const lyrics = song.lyrics
						.split('\n')
						.map(str => { return str.replace(/\[(.*?)\]/, '') })
						.filter(str => str !== '');
							
					if (lyrics.length <= 4)
						console.log(lyrics);
					else {
						let range = Math.floor(Math.random() * (lyrics.length - 4));
						console.log(range);

						console.log(
							lyrics[range] + '\n' +
							lyrics[range + 1] + '\n' + 
							lyrics[range + 2] + '\n' + 
							lyrics[range + 3]
						)
					};
				})
				.catch(err1 => console.log(err1));
		})
		.catch(err2 => console.log(err2));
