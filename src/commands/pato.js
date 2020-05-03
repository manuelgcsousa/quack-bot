module.exports = {
	name: 'pato',
	description: 'Saudações ao nosso rei pato.',
	execute(message, args) {
		if (args.length !== 0)
			return;

		message.channel.send('cartucheira carregada oh filho!');
	}
};
