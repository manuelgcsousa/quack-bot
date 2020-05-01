const axios = require('axios');

module.exports = {
	name: 'trumpdump',
	description: 'Random shit Donald Trump has ever said.',
	execute(message, args) {
		if (args.length !== 0)
			return;

		axios
			.get('https://api.tronalddump.io/random/quote')
			.then(res => {
				let quote = res.data.value;
				message.channel.send('\"' + quote + '\"');
			});
	}
};
