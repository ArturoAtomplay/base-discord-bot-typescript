# base-discord-bot-typescript
This project is a base for creating Discord bots using discord.js and TypeScript. It allows you to easily set up and deploy your own bot to a Discord server.

# installation
Clone or download the repository.
```bash
git clone https://github.com/ArturoAtomplay/base-discord-bot-typescript.git
```

Access the project folder:
```bash
cd base-discord-bot-typescript
```

Installs the project dependencies:
```bash
npm install
```

Create a file called .env in the root of the project and add your Discord bot token in the following line:
```
TOKEN=[your token here]
```

Modify the GUILD_ID and CLIENT_ID in src/config.ts to match your Discord server and bot information.

Compile the project to prepare it for deployment:
```bash
npm run build
```

Deploy the commands:
```bash
npm run deploy
```

Start the bot:
```bash
npm run start
```
