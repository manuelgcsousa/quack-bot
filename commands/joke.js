const axios = require('axios');

module.exports = {
	name: 'joke',
	description: 'Gives a random joke.',
	execute(message, args) {
		if (args.length !== 0)
			return;

		axios
			.get('https://sv443.net/jokeapi/v2/joke/Any')
			.then(res => {
				if (res.data.hasOwnProperty('joke')) {
					message.channel.send(res.data.joke);	
				}

				if (res.data.hasOwnProperty('setup') && res.data.hasOwnProperty('delivery')) {
					let joke = res.data.setup + "\n" + res.data.delivery;
					message.channel.send(joke);
				}
			});
	}
};
