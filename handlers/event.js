module.exports = async (bot) => {
    bot.on('ready', () => {
        require('../events/ready')(bot)
    })
    bot.on('guildMemberAdd', member => {
        require('../events/guildMemberAdd')(bot, member)
    })
    bot.on('guildMemberRemove', member => {
        require('../events/guildMemberRemove')(bot, member)
    })
    bot.on('message', async (message) => {
        require('../events/message')(bot, message)
    })
    bot.on('channelDelete', async (bot, channel) => {
        require('../events/channelDelete')
    })
    bot.on('channelCreate', async (bot, channel) => {
        require('../events/channelCreate')
    })
}