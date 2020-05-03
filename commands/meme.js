const Reddit = require('../utils/reddit.js');
const Discord = require('discord.js');

module.exports = {
	name: 'meme',
	description: 'Gives a random meme from a random subreddit.',
	execute(message, args) {
		if (args.length !== 0)
			return;

		Reddit
			.getRandomPost()
			.then(post => {
				const embed = new Discord.MessageEmbed()
					.setColor('#ebb327')
					.setTitle(post.title)
					.setDescription('SOURCE: \'r/' + post.subreddit + '\'')
					.setImage(post.url);
			
				message.channel.send(embed);
			});
	}
};
