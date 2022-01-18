var shell = require('shelljs');
var mysql = require('mysql');

const dotenv = require('dotenv');
dotenv.config();

const { Client, Intents } = require('discord.js');
const { token } = process.env.DISCORD_TOKEN;

// Create a new client instance
//const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const client = new Client({
    intents:[
        Intents.FLAGS.GUILDS,//adds server functionality
        Intents.FLAGS.GUILD_MESSAGES //gets messages from our bot.
    ]
});
//
// const con = mysql.createConnection({
//    host: process.env.mysqlhost,
//    user: process.env.mysqluser,
//    database: process.env.mysqldatabase,
//    password: process.env.mysqlpassword
// });
//
// con.connect(function(err) {
// if (err) throw err;
//  console.log("Connected!");
//      con.query("SELECT * FROM serverinfo WHERE name='" + cmd_option +"'", function (err, result, fields, serverinfo) {
//        if (err) throw err;
//        });
//   });

console.log(process.env.mysqlhost);

// When the client is ready, run this code (only once)
client.on('ready', () => {
         console.log('Connected');
         console.log('Logged in as: ',client.user.username);
         console.log('Logged in ID: ',client.user.id);
});

client.on('message', function (messages){
  //console.log(messages);
    if(messages.content.toLocaleLowerCase()==='hello')
    messages.channel.send('hello' + ' '  + messages.author.username); //reply hello word message with senders name

    //    It will listen for messages that will start with `!`
        if (messages.content.substring(0, 1) == '!') {


            var args = messages.content.substring(1).split(' ');
            var cmd = args[0];
            var cmd_option = args[1];

            // logger.info(message);
            args = args.splice(1);
            switch(cmd) {
                // !ping
                case 'ping':
                    messages.reply('Pong!' + ' '  + messages.author.username);
    	          break;

                case 'hi':
                        console.log(messages.author.username + " - " + messages.author.id);
                        messages.reply('Hi!' + ' '  + messages.author.username);
    	          break;

                //BEGIN
                case 'starboundstart':
                        console.log(messages);
                        check = roleCheck(messages,"AWE");
                        if ( check == 1 ) {
                          console.log(messages.author.username + " - " + messages.author.id);
                          shcmd = shell.exec('starbound.sh start');
                        } else {
                          console.log(messages.author.username + " - " + messages.author.id + " Rolecheck failed!");
                          messages.reply('Rolecheck failed for User: ' + messages.author.username );
                        }
    	          break;

                case 'starboundstop':
                        check = roleCheck(messages,"AWE");
                        if ( check == 1 ) {
                          console.log(messages.author.username + " - " + messages.author.id);
                          shcmd = shell.exec('starbound.sh stop');
                          messages.reply('' + shcmd);
                        } else {
                          console.log(messages.author.username + " - " + messages.author.id + " Rolecheck failed!");
                          messages.reply('Rolecheck failed for User: ' + messages.author.username );
                        }
                break;

                case 'starboundrestart':
                        check = roleCheck(messages,"AWE");
                        if ( check == 1 ) {
                          console.log(messages.author.username + " - " + messages.author.id);
                          shcmd = shell.exec('starbound.sh restart');
                          messages.reply(' ' + shcmd );
                        } else {
                          console.log(messages.author.username + " - " + messages.author.id + " Rolecheck failed!");
                          messages.reply('Rolecheck failed for User: ' + messages.author.username );
                        }
                break;

                case 'starboundupdate':
                        check = roleCheck(messages,"AWE");
                        if ( check == 1 ) {
                          console.log(messages.author.username + " - " + messages.author.id);
                          shcmd = shell.exec('starbound.sh update');
                          messages.reply(' ' + shcmd );
                      } else {
                        console.log(messages.author.username + " - " + messages.author.id + " Rolecheck failed!");
                        messages.reply('Rolecheck failed for User: ' + messages.author.username );
                      }
    	          break;

                case 'starboundstatus':
                        console.log(messages.author.username + " - " + messages.author.id);
    		                shcmd = shell.exec('starbound.sh status');
                        messages.reply('' + shcmd );
    	          break;
                //END
                case 'valheim-start':
                        check = roleCheck(messages.author.username, messages.author.id, channelID, evt, "AWE");
                        if ( check == 1 ) {
                          console.log(messages.author.username + " - " + messages.author.id);
                          systemctl('start','valheim');

                          if ( shcmd == '' ) {
                            messages.reply('Server started!');
                          } else {
                            messages.reply(' ' + shcmd );
                          }
                      } else {
                          console.log(messages.author.username + " - " + messages.author.id + " Rolecheck failed!");
                          messages.reply('Rolecheck failed for User: ' + messages.author.username );
                      }
                break;

                case 'valheim-stop':
                        check = roleCheck(messages,"AWE");
                        if ( check == 1 ) {
                          console.log(messages.author.username + " - " + messages.author.id);

                          systemctl('stop','valheim');

                          if ( shcmd == '' ) {
                            messages.reply('Server stopped!');
                          } else {
                            messages.reply(' ' + shcmd );
                          }
                      } else {
                          console.log(messages.author.username + " - " + messages.author.id + " Rolecheck failed!");
                          messages.reply('Rolecheck failed for User:' + messages.author.username );
                      }
                break;

                case 'valheim-status':
                        console.log(messages.author.username + " - " + messages.author.id);
                        systemctl('status','valheim');

                        if ( shcmd == '' ) {
                          messages.reply('Keine Antwort!');
                        } else {
                          messages.reply(' ' + shcmd );
                        }
                break;

                //Zomboid Start
                case 'zomboid-start':
                  check = roleCheck(messages,"AWE");
                  if ( check == 1 ) {
                    console.log(messages.author.username + " - " + messages.author.id);
                    systemctl('start','zomboid');

                    if ( shcmd == '' ) {
                      messages.reply('Server started!');
                    } else {
                      messages.reply(' ' + shcmd );
                    }

                  } else {
                    console.log(messages.author.username + " - " + messages.author.id + " Rolecheck failed!");
                    messages.reply('Rolecheck failed for User: ' + messages.author.username );
                  }
    	          break;

                case 'zomboid-stop':
                  check = roleCheck(messages,"AWE");
                  if ( check == 1 ) {
                    console.log(messages.author.username + " - " + messages.author.id);
                    systemctl('stop','zomboid');

                    if ( shcmd == '' ) {
                      messages.reply('Server stopped!');
                    } else {
                      messages.reply(' ' + shcmd );
                    }

                  } else {
                    console.log(messages.author.username + " - " + messages.author.id + " Rolecheck failed!");
                    messages.reply('Rolecheck failed for User: ' + messages.author.username );
                  }
                break;
                case 'zomboid-restart':
                        check = roleCheck(messages,"AWE");
                        if ( check == 1 ) {
                          console.log(messages.author.username + " - " + messages.author.id);
                          systemctl('restart','zomboid');

                          if ( shcmd == '' ) {
                            //
                            messages.reply('Server restarted!');
                          } else {
                            messages.reply(' ' + shcmd );
                          }

                        } else {
                          console.log(messages.author.username + " - " + messages.author.id + " Rolecheck failed!");
                          messages.reply('Rolecheck failed for User: ' + messages.author.username );
                        }
                break;
                case 'zomboid-status':
                          console.log(messages.author.username + " - " + messages.author.id);
                          systemctl('status','zomboid');
                          if ( shcmd == '' ) {
                            //
                            messages.reply('Keine Rückantwort.');
                          } else {
                            messages.reply(' ' + shcmd );
                          }
                break;

                case 'clearChat':
                    check = roleCheck(messages,"AWE");
                    if ( check == 1 ) {
                      message.channel.bulkDelete(cmd_option, true)
                          .then((_message) => {
                            message.channel
                              // do you want to include the current message here?
                              // if not it should be ${_message.size - 1}
                              .send(`Bot cleared \`${_message.size}\` messages :broom:`)
                              .then((sent) => {
                                setTimeout(() => {
                                  sent.delete();
                                }, 2500);
                              });
                          });
                    } else {
                        console.log(messages.author.username + " - " + messages.author.id + " Rolecheck failed!");
                        messages.reply('Rolecheck failed for User: ' + messages.author.username );
                    }
    	          break;

                // Get Server Info
                // case 'getInfo':
                //       serverInfo = getServerInfo(cmd_option);
    	          // break;
    	   // Just add any case commands if you want to..
             }
         }

         if (messages.content.substring(0, 12) == '(╯°□°）╯︵ ┻━┻') {
             var args = messages.content.substring(1).split(' ');
             var cmd = args[0];
             var reply = "";
             var i = 0;
             //count the tables
             //var count = message.indexOf('(╯°□°）╯︵ ┻━┻', 0);
             var count = (messages.content.match(/\(╯°□°）╯︵ ┻━┻/g) || []).length;
             console.log("Tables thrown: " + count);

             args = args.splice(1);
             //putting back the correct amount of Tables
            if ( count == 1 ) {
              reply = '┬─┬ ノ( ゜-゜ノ) ';
            } else {
              for( var i = 1 ; i <= count ; i ++) {
                  if ( i == 1 ) {
                    reply = '┬─┬ ノ( ゜-゜ノ) ';
                  } else {
                    reply = reply + ' ┬─┬ ノ( ゜-゜ノ)';
                  }
              }
            }
            messages.reply(reply);
            messages.reply('No table flipping!');

            // Just add any case commands if you want to..

          }


});

 function roleCheck(messages,checkRole) {
      //console.log(messages.guild.roles);
      //console.log(checkRole);

      rolecheck = messages.guild.roles.cache.find(role => role.name === checkRole);

      //console.log(rolecheck.name);

		  if (rolecheck.name === checkRole) {
			     return 1;
		  } else {
			     return 0;
      }
}

function systemctl(cmd,service) {
  shcmd = shell.exec('systemctl ' + cmd + ' ' +service );

  if ( cmd == 'status' ) {
    shcmd = shcmd.split(/\n\n/);
    shcmd = shcmd[0];
  }
  return shcmd;
}

//  function getServerInfo(cmd_option) {
//        console.log(cmd_option);
//
//        var serverinfo = [];
//
//        con.connect(function(err) {
//        if (err) throw err;
//         console.log("Connected!");
//             con.query("SELECT * FROM serverinfo WHERE name='" + cmd_option +"'", function (err, result, fields, serverinfo) {
//               if (err) throw err;
//                 console.log(result);
//                 var serverinfo_rows = [ 'Servername: ' , 'Spielname: ' , 'Mods: ' , 'Maximale Spieleranzahl: ' , 'FQDN: ' , 'IP Adresse: ' , 'Port: ' , 'Server User: ' , 'Server User Password: '];
//                 var tablespaces = [ 'name' , 'game_name' ,'max_player_count' , 'fqdn' , 'ipaddress' , 'port' , '']
//                 serverinfo.forEach(function(item, index, array){
//                    console.log(item, index);
//
//                    messages.reply(serverinfo_rows[0] + result[0].name + "\n" + serverinfo_rows[1] + result[0].game_name + "\n" + serverinfo_rows[2] + result[0].mods + "\n" + serverinfo_rows[3] + result[0].max_player_count + "\n" +
//                        serverinfo_rows[4] + result[0].fqdn + "\n" + serverinfo_rows[5] + result[0].ipaddress + "\n" + serverinfo_rows[6] + result[0].port + "\n" + serverinfo_rows[7] + result[0].servermessages.author.username + "\n" + serverinfo_rows[8] + result[0].serveruserpassword);
//                  messages.reply('Servername: ' + result[0].name);
//                  messages.reply('Spielname: ' + result[0].game_name );
//                  messages.reply('Maximale Spieleranzahl: ' + result[0].max_player_count );
//                  messages.reply('FQDN: ' + result[0].fqdn );
//                  messages.reply('IP Adresse: ' + result[0].ipaddress );
//                  messages.reply('Port: ' + result[0].port );
//                  messages.reply('Server User: ' + result[0].serveruser );
//                  messages.reply('Server User Password: ' + result[0].serveruserpassword);
//
//               });
//
//            });
//
//          });
//
//  	    return 0;
// }

// Login to Discord with your client's token
client.login(token);
