module.exports = {
	name: 'help',
	description: 'List all of the available commands or info about a specific command.',
	execute(message, args) {
		var msg = "";
		const { commands } = message.client;

		if (args.length === 0) {
			msg += 'Here\'s a list of all the commands: ';
			msg += (commands.map(command => command.name).join(', '));
			msg += '\nYou can do \'$help [command name]\' to get info on a specific command!';

			return message.channel.send(msg);
		}
	}
};
