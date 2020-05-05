const jsonfile = require('jsonfile');
const store_db = (__dirname + '/../../data/store.json');
const Discord = require('discord.js');

module.exports = {
	name: 'store',
	description: 'Guardar a lista daqueles mambos que vocês sabem mpts.\n\nRetrieve store: $store\nAdd value: $store add *key* *value*\nRemove value: $store rm *key*\nClean store (CARE!): $store clean',
	async execute(message, args) {
		if (message.guild.id === process.env.AQUELES_PATOS_ID) {
			switch (args.length) {
				case 0:
					try {
						var msg = "";

						const store = await jsonfile.readFileSync(store_db);

						if (Object.keys(store).length === 0)
							msg = "No info available.";
						else {			
							for (const key in store) {
								msg += (
									key + " :: \'" + store[key] + "\'\n\n"
								);	
							}

							const embed = new Discord.MessageEmbed()
								.setColor('#ebb327')
								.setTitle('* STORE *')
								.setDescription(msg);
							
							return message.channel.send(embed);
						}

						return message.channel.send(msg);
					} catch (err) {
						console.log(err);
						return message.reply('there was an error while reading the information!');
					}

					break;
				
				case 1:
					if (args[0] === 'clean') {
						try {
							jsonfile.writeFileSync(store_db, {});

							return message.reply('the information was removed.');
						} catch (err) {
							return message.reply('there was an error while cleaning the information!');
						}
					}

					break;
				
				case 2:
					if (args[0] === 'rm') {
						try {
							const store = await jsonfile.readFileSync(store_db);
							
							if (args[1] in store) {
								delete store[args[1]];
								jsonfile.writeFileSync(store_db, store);
							
								return message.reply('the value was removed with success.');
							} else {
								return message.reply('the key provided does not exist!');
							}
						} catch (err) {
							return message.reply('there was an error while removing your value!');
						}
					} else {
						return message.reply('the command selected is not valid!');
					}

					break;

				case 3:
					if (args[0] === 'add') {
						try {
							const store = await jsonfile.readFileSync(store_db);
							
							const key = args[1];
							const url = args[2].replace(/http(s)?:\/\/(www\.)?/g, ''); // clean url.

							store[key] = url;
							jsonfile.writeFileSync(store_db, store);
							
							return message.reply('the value was saved with success.');
						} catch (err) {
							return message.reply('there was an error while saving your new value!');
						}
					} else {
						return message.reply('the command selected is not valid!');
					}
	 
					break;

				default:
					return message.reply('an internal error occured.');
			}
		} else {
			return message.reply('this command is not allowed in this server.');
		}
	}
};
