module.exports = {
	name: 'help',
	description: 'List all of the available commands or info about a specific command.',
	execute(message, args) {
		const data = [];
		const { commands } = message.client;

		if (args.length === 0) {
			data.push('Here\'s a list of all the commands:');
			data.push(commands.map(command => command.name).join(', '));
			data.push('\nYou can do $help [command name] to get info on a specific command!');

			return message.author.send(data, { split: true });
		}
	}
};
