const { Client, Intents, Guild } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName, guild } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('pong!')
	}
	else if (commandName === 'reset_nickname') {
		await interaction.reply(guild.name);
		const members = await guild.members.fetch()
		console.log('%d members found.', members.size)
		members.each(async (user, user_id) => {
			if (user.manageable) {
				try {
					await guild.members.edit(user_id, {nick: ""});
					console.log('Nickname reset for %s', user.displayName)
				} catch (err) {
					console.error(err);
				}
			}
			else {
				console.log('Cannot clear %s\'s nickname. Permission (%d).', user.displayName, user.permissions);
			}
		})
		console.log('Done!')
	}
});

client.login(token);