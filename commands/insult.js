const axios = require('axios');

module.exports = {
	name: 'insult',
	description: 'Generate a random insult.',
	execute(message, args) {
		if (args.length !== 0)
			return;

		axios
			.get('https://evilinsult.com/generate_insult.php?lang=en&type=json')
			.then(res => {
				let insult = res.data.insult;
				message.channel.send(insult);
			});
	}
};
