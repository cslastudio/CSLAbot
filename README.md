# About Cbot
Cbot is a Discord bot developed in [DiscordJS](https://discord.js.org/), which is a cross-platform JavaScript runtime environment based on NodeJS. It works as an assistant bot on [CSLA Discord](https://discord.gg/ekmBnmVY6Z). The basic command that links to other subcommands is `/help`.

It is still being extended with other commands and functions, but the following are worth mentioning:
* automatic moderation of image-only channels
* automatic assignment of roles based on a choice of options
* basic assistance commands
* automatic handling of incoming tickets
* fun commands and much more ...

# Cbot setup
| :warning: **I've used Ubuntu 22.04 as an operating system.** |
| --- |

Install the required dependencies:
```shell
sudo apt install build-essential libssl-dev
```

Install NVM using cURL:
```shell
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Install NodeJS 16.17.0:
```shell
nvm install 16.17.0
```

To start Cbot, navigate to the directory where you downloaded Cbot and run this command:
```shell
node .
```

We can automatically check every hour if the bot is running on the server using a cron job. Execute `crontab -e` and add this line at the end of the file:
```bash
0 * * * * /home/lukino/.nvm/versions/node/v16.17.0/bin/node /home/lukino/cslabot.js >> /home/lukino/cbot.log 2>&1
```
| :warning: **When using this method, there is no need to manually start Cbot via the `node .` command!** |
| --- |
