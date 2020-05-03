const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
	name: 'quack',
	description: 'Random pictures of beautiful quackerinos.',
	execute(message, args) {
		if (args.length !== 0)
			return;

		axios
			.get('https://random-d.uk/api/v2/random')
			.then(res => {
				let img = res.data.url;

				const embed = new Discord.MessageEmbed()
					.setColor('#ebb327')
					.setImage(img);
			
				message.channel.send(embed);
			});
	}
};
