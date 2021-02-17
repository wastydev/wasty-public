const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");


module.exports.run = async (client, message, args) => {
  if(!message.member.roles.cache.has(ayarlar.yetenekavcisi) && !message.member.hasPermission("ADMINISTRATOR") ) // ' 'nin arasına yetenek avcısı rol id
     return message.channel.send('Yetkin yok moruk')
     .then(x => x.delete({timeout: 5000}));

   let member = message.mentions.users.first() || client.users.cache.get(args.join(' ')) 
   if(!member) {
       return message.channel.send('**Bir kişi etiketlemelisin!**')
   }

   let wasty = message.guild.member(member)


   wasty.roles.add(ayarlar.codder)
   let embed = new Discord.MessageEmbed()
   .setColor('CYAN')
   .setTitle('Codder Rolü Verildi')
   .addField('**Codder Yapılan Kullanıcı**',member)
   .addField('**Komutu Kullanan Yetkili**', message.author)
   .setThumbnail("")
   .setFooter("© Wasty")
 message.channel.send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['codder'],
    permLevel: 0
};

exports.help = {
    name: 'codder',
    description: 'codder',
    usage: 'codder'
};