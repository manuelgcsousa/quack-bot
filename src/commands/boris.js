module.exports = {
	name: 'boris',
	description: 'Music.',
	execute(message, args) {
		if (args.length !== 0)
			return;

		message.channel.send('-play https://www.youtube.com/watch?v=vqz8c4ZP3Wg');
	}
};
