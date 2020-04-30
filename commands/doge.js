const axios = require('axios');
const Discord = require('discord.js');

module.exports = {
	name: 'doge',
	description: 'Random pictures of our boi doge.',
	execute(message, args) {
		axios
			.get('https://shibe.online/api/shibes')
			.then(res => {
				let img = res.data[0];

				const embed = new Discord.MessageEmbed()
					.setColor('#0099ff')
					.setImage(img);
			
				message.channel.send(embed);
			});
	}
};
