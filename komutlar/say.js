const Discord = require("discord.js");
const ms = require("parse-ms")
const ayarlar = require("../ayarlar.json")



/*
<a:bir:728654763855446087>
<a:iki:728654765202079864>
  <a:uc:728654765092765846>
    <a:dort:728654764916736030>
      <a:bes:728654765969637436>
        <a:alti:728654765285834922>
          <a:yedi:728654766154186812>
            <a:sekiz:728654766246461501>
              <a:dokuz:728654765780762636>
                <a:0_:728654760370241577>
                */
const mapping = {
  "0": ":zero:",
  "1": ":one:",
  "2": ":two:",
  "3": ":three:",
  "4": ":four:",
  "5": ":five:",
  "6": ":Six:",
  "7": ":seven:",
  "8": ":eight:",
  "9": ":nine:",
};

"abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = `:regional_indicator_${c}:`;
});

exports.run = function(client, message, args) {

if(![ayarlar.kayitci].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
    return message.channel
      .send("Bu komutu kullanamazsın!")
      .then(msg => {
    msg.delete({ timeout: 6000 })
  })
  
  let toplam = message.guild.memberCount;
  let sunucu = 
      `${toplam}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
  let onlinesayi = message.guild.members.cache.filter(
    only => only.presence.status != "offline"
  ).size;
  let online =
      `${onlinesayi}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
  let tag = message.guild.members.cache.filter(m => m.user.username.includes("⫝̸")).size;
  let tagdakiler = 
      `${tag}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
  const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  let ses =
      `${count}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")
  let boost = message.guild.premiumSubscriptionCount
  let boostcuk = `${boost}`.split("").map(a => mapping[a] || '0')
  .join("")
  const say = new Discord.MessageEmbed()
  .setAuthor(message.guild.name)
  .setThumbnail(message.guild.iconURL({ dynamic: true }))
  .setDescription(`${client.emojis.cache.get(' ')} **Sunucudaki Kullanıcı Sayısı;** ${sunucu} \n\n${client.emojis.cache.get(' ')} **Sunucudaki Aktif Kullanıcı Sayısı;** ${online} \n\n${client.emojis.cache.get(' ')} **Sesli Kanallarda Bulunan Kullanıcı Sayısı;** ${ses}\n\n${client.emojis.cache.get(' ')} **Sunucuda Tagımızı Alan Kullanıcı Sayısı;** ${tagdakiler}\n\n${client.emojis.cache.get(' ')} **Sunucudaki Boost Sayısı;** ${boostcuk}`)
  // ${client.emojis.cache.get(' ')}  'in boş bırakılan yere emoji adı gelicek!
  .setFooter("© Wasty");
  message.react('🍹')
  message.channel.send(say)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["onlinesay", "info", "i", "online"],
  permLevel: 0
};

exports.help = {
  name: "say",
  usage: "Sunucudaki Online Kişileri Sayar",
  desscription: "say"
};