module.exports.run = async (bot, message, args) => {
    if (message.author.id === '443278070825091072') {
        await message.channel.send(`Shutting Down...`)
        process.exit();
    } else {

    }
}

module.exports.config = {
    name: "shutdown",
    description: "Shutdown command for bot owner",
    usage: "<CODE>",
    category: 'Owner',
    timeout: 5000,
    timeoutname: '5 seconds',
    accessableby: "Owner"
}