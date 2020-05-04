const songs = require('../songs.json');

module.exports = {
	name: 'sonzaco',
	description: 'Fazer deploy daquele somzaço que vocês sabem mpts.',
	execute(message, args) {
		var msg = "";

		switch (args.length) {
			case 0:
				for (const key in songs) {
					msg += ("\'" + key + "\' - " + songs[key] + "\n");	
				}
				
				message.channel.send(msg);
				break;

			case 3:
				break;

			default:
				// Error
		}
	}
};
