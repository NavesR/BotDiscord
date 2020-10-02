const Discord = require("discord.js")
const client = new Discord.Client()
const config = require("./config.json")
const jimp = require("jimp")


client.on("ready", () => {
    console.log(`O Bot foi iniciado, com ${client.users.cache.size} usuarios, em ${client.channels.cache.size} canais, em ${client.guilds.cache.size} servidores.`)
    client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores.`)
})

client.on("guildCreate", guild => {
    console.log(`O Bot entrou no servidor: ${guild.name} (id: ${guild.id}). População: ${guild.memberCount} membros!`)
    client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores.`)
})

client.on("guildDelete", guild => {
    console.log(`O Bot foi removido do servidor: ${guild.name} (id: ${guild.id})`)
    client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores.`)
})

client.on("message", async message => {
    
    if(message.author.bot) return
    if(message.channel.type === "dm") return

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
    const comando = args.shift().toLowerCase()
    
    if(comando === 'server'){

        var server = message.guild;
      
        const embed = new Discord.MessageEmbed()
        .setThumbnail(server.iconURL)
        .setAuthor(server.name, server.iconURL)
        .addField('ID', server.id, true)
        .addField('Region', server.region, true)
        .addField('Creado el', server.joinedAt.toDateString(), true)
        .addField('Dueño del Servidor', server.owner.user.username+'#'+server.owner.user.discriminator+' ('+server.owner.user.id +')', true)
        .addField('Miembros', server.memberCount, true)
        .addField('Roles', server.roles.size, true)
        .setColor(0x66b3ff)
        
       message.channel.send({ embed });
    
      }
    if (comando === 'ping') {

        let ping = Math.floor(message.client.ping);
        
        message.channel.send(":ping_pong: Pong!")
          .then(m => {
              m.edit(`:incoming_envelope: Ping Mensajes: \`${Math.floor(m.createdTimestamp - Date.now())} ms\`\n:satellite_orbital: Ping DiscordAPI: \`${ping} ms\``);
          });
    }
    if(comando === 'ban'){
    
        let user = message.mentions.users.first();
        let razon = args.slice(1).join(' ');
    
        if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
        if (!razon) return message.channel.send('Escriba un razón, `-ban @username [razón]`');
        if (!message.guild.member(user).bannable) return message.reply('No puedo banear al usuario mencionado.');
        
    
        message.guild.member(user).ban(razon);
        message.channel.send(`**${user.username}**, fue baneado del servidor, razón: ${razon}.`);
    
    }
    if (comando === 'user') {
        let userm = message.mentions.users.first()
        if(!userm){
            var user = message.author
            const embed = new Discord.MessageEmbed()
            .setThumbnail(user.avatarURL())
            .setAuthor(user.username+'#'+user.discriminator, user.avatarURL())
            //.setImage(user.avatarURL())
            .addFields(
                { name: 'ID:', value: user.id, inline: false },
                { name: 'Jogando:', value: user.presence.game != null ? user.presence.game.name : 'Nada', inline: false },
                { name: 'Status:', value: user.presence.status, inline: false },
                //{ name: 'Apelido:', value: message.member.nickname, inline: false },
                { name: 'Conta criada:', value: user.createdAt.toDateString(), inline: false },
                { name: 'Entrada no servidor:', value: message.member.joinedAt.toDateString(), inline: false },
                { name: 'Roles:', value: message.member.roles.cache.map(roles => `\`${roles.name}\``).join(', '), inline: false }
            )
            .setColor(0x66b3ff)
            
           message.channel.send(embed);
        } else {
          const embed = new Discord.MessageEmbed()
          .setThumbnail(userm.avatarURL())
          .setAuthor(userm.username+'#'+userm.discriminator, userm.avatarURL())
          .addFields(
            { name: 'ID:', value: userm.id, inline: false },
            { name: 'Jogando:', value: userm.presence.game != null ? userm.presence.game.name : 'Nada', inline: false },
            { name: 'Status:', value: userm.presence.status, inline: false },
            //{ name: 'Apelido:', value: message.member.nickname, inline: false },
            { name: 'Conta criada:', value: userm.createdAt.toDateString(), inline: false },
            //{ name: 'Entrada no servidor:', value: userm.joinedAt.toDateString(), inline: false },
            { name: 'Roles:', value: message.member.roles.cache.map(roles => `\`${roles.name}\``).join(', '), inline: false },
            { name: 'Roless:', value: message.member, inline: false },
            { name: 'Roless:', value: userm.username, inline: false },
            { name: 'Roless:', value: userm.member, inline: false }
            { name: 'Roless:', value: userm.id., inline: false }
        )
          .setColor(0x66b3ff)
          
         message.channel.send(embed);
        }
      }
    if(comando === "n") {
        const exampleEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle('Confira quanto tempo falta para executar algumas das minhas ações:')
            .setURL('https://discord.js.org/')
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            //.setDescription('Some description here')
            //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .addFields(
                //{ name: '\u200B', value: '\u200B' },
                { name: 'c!semanal:', value: 'Value here', inline: true},
                { name: 'c!recompensa:', value: 'Value here', inline: true},
                { name: 'c!crime:', value: 'Value here', inline: true },
                { name: 'c!beber:', value: 'Value here', inline: true },
                { name: 'c!roubarbanco::', value: 'Value here', inline: true},
                { name: 'c!roubar::', value: 'Value here', inline: true},
                { name: 'c!trabalhar:', value: 'Value here', inline: true },
                { name: 'c!blackjack:', value: 'Value here', inline: true },
                { name: 'c!gf:', value: 'Value here', inline: true},
                { name: 'c!amantes gf:', value: 'Value here', inline: true},
                { name: 'c!roleta:', value: 'Value here', inline: true },
                { name: 'c!cavalo:', value: 'Value here', inline: true },
            )
            //.addField('Inline field title', 'Value here', true)
            //.setImage('https://i.imgur.com/wSTFkRM.png')
            .setTimestamp()
            .setFooter('Nome do servido', 'https://i.imgur.com/wSTFkRM.png')
            message.channel.send(exampleEmbed)
    }

})


  

client.login(config.token)