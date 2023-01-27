# base-discord-bot-typescript
This project is a base for creating Discord bots using discord.js and TypeScript.

# installation
Access the project folder:
```bash
cd base-discord-bot-typescript
```

installs the project dependencies:
```bash
npm install
```

Create a file called .env in the root of the project and add your Discord bot token in the following line:
```
TOKEN=[your token here]
```

compiles the project so that you can deploy the commands and turn it on:

(you must change GUILD_ID and CLIENT_ID in src/config.ts before compiling)
```bash
npm run build
```

you must first deploy the commands before turning it on:
```bash
npm run deploy
```

now everything is ready for you to turn the bot on.
```bash
npm run start
```
