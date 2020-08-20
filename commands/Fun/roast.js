const roast = require('roastme')
module.exports.run = async (bot, message, args) => {
    const x = roast.random()
    const member = await message.mentions.members.first() || message.guild.members.cache.get(args.slice(0).join(" ")) || message.guild.members.cache.find(m => m.displayName === args.slice(0).join(" ")) || message.guild.members.cache.find(member => member.user.username === args.slice(0).join(" ")) || message.guild.members.cache.find(member => member.user.tag === args.slice(0).join(" ")) || message.member || args.slice(0).join(' ');
    if (member.id === '714009112605622332') {
        return message.reply(`🔥 Your dumbass really thought I was going to roast myself?`)
    } else if (member.id === '443278070825091072') return message.reply(`🔥 Your dumbass really thought I was going to roast my owner?`)
    message.channel.send(`${member}, 🔥 ${x}`)
}

module.exports.config = {
    name: "roast",
    description: "Roasts A mentioned member or the member",
    accessableby: "Members",
    timeout: 2000,
    usage: '<MEMBER>',
    timeoutname: '2 seconds',
    category: "Fun",
}
