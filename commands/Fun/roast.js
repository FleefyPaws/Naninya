const {
	MessageEmbed
} = require('discord.js');

module.exports.run = async (bot, message, args) => {
	const roaster = ["(Phone ringing)... Excuse me it's your village, they want their idiot back", "\"Dude you're fat\"\n\"It runs in the family\"\n\"Mate, no one runs in your family\"", "All the branches fell off your family tree when you were born.", "Are you always an idiot or just when I'm around?", "Are you in a costume? It's not Halloween yet... oh, never mind.", "Can I borrow your face? My arse is on holiday.", "Do you have to leave so soon? I was just about to poison the tea.", "Do you still love nature... despite what it did to you?", "Dude stop acting like a girl. My bad, forgot you are one!", "Go away I was looking at something better than you.", "Here's 20 cents, call all your friends and give me back the change.", "Hey, you have something on your chin... 3rd one down.", "I could eat a bowl of alphabet soup and crap out a smarter comeback than what you just said.", "I hear when you were a child your mother wanted to hire somebody to take care of you, but the mafia wanted too much.", "I would ask how old you are, but I know you can't count that high.", "If I wanted to kill myself, I could just climb up to your ego and jump down to your IQ level.", "If you really want to know about mistakes, you should ask your parents.", "Is that your face? Or did your neck just throw up?", "It looks like your face caught on fire and someone tried to put it out with a fork.", "Marriage at a motel is more appealing than the likes of you. What are you, anyways? You look like a joint between a mutilated ape, and a visible fart.", "Out of 100,000 sperm, you were the fastest?", "Please, I could remove 90% of your \"beauty\" with a tissue.", "Shut up, you'll never be the man your mother is.", "Stop bullying fat people, they have enough on their plate.", "The only positive thing about you is your HIV status.", "The only thing that goes erect when I'm near you is my middle finger.", "The only way I'd lay naked with you would be in a mass grave.", "Two wrongs don't make a right. Take your parents as an example.", "We all sprang from apes, but you didn't spring far enough.", "When you were born, the police arrested your dad, the doctor slapped your mom, animal control euthanized your brother, and A&E made a documentary that saved your life.", "Who do you think is the best comedy team? ME? I think it's your parents....they made the biggest joke!", "Why don't you check up on eBay and see if they have a life for sale?", "Why don't you go to Walmart and get a new personality because clearly, the one you got from K-Mart has expired.", "Why don't you slip into something more comfortable? Like a coma.", "With a face like yours, I wish I was blind.", "You are so ugly that when your mama dropped you off at school she got a fine for littering.", "You must be the arithmetic man; you add trouble, subtract pleasure, divide attention, and multiply ignorance.", "You must have been born on a highway, because that's where most accidents happen.", "You're a failed abortion whose birth certificate is an apology from the condom factory.", "You're like STDs, nobody wants you, everyone hates you and it proves your parents should have used protection.", "You're so fake that Barbie is more real than you.", "You're so fat the only letters of the alphabet you know are KFC.", "You're so fat you had to be baptized in Sea World.", "You're so fat you need cheat codes to play Wii Fit.", "You're so ugly Hello Kitty said goodbye to you.", "You're so ugly when you popped out the doctor said: \"Aww what a treasure\" and your mom said, \"Yeah let's bury it.\"", "Your family tree is a cactus, because everybody on it is a prick.", "Your mamma so fat she has to wear 2 watches because she covers two time zones.", "Your mom is so stupid she tried to wake a sleeping bag.", "Your'e about as sharp as a shoelace."];
	try {
		const roastss = roaster[Math.floor(Math.random() * roaster.length)];
		const member = await message.mentions.members.first() ? message.mentions.members.first() : message.guild.members.cache.get(args[0]) || args.slice(0).join(' ') ? args.slice(0).join(' ') : message.member;
		if (member.id === '714009112605622332') {
			return message.reply(`🔥 Your dumbass really thought I was going to roast myself?`);
		} else if (member.id === '443278070825091072') {
			return message.reply(`🔥 Your dumbass really thought I was going to roast my owner?`);
		}
		message.channel.send(`${member}, 🔥 ${roastss}`);
	} catch (err) {
		console.log(err);
		const errembed = new MessageEmbed()
			.setTitle('An error occured')
			.setColor('#FF0000')
			.setDescription(`Error: ${err}. \nPlease report this error to our support server: **[Link](https://discord.gg/CnHEb3h)**`);
		const user = bot.users.cache.get('443278070825091072')
		user.send(errembed)
		return message.channel.send(errembed);
	}
};

module.exports.config = {
	name: 'roast',
	description: 'Roasts A mentioned member or the member',
	accessableby: 'Members',
	timeout: 2000,
	usage: '<MEMBER>',
	category: 'Fun'
};