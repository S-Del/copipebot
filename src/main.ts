import { container, Symbols } from './config/';
import { Bot } from './presentation/discord/';

(async () => {
    const bot = container.get<Bot>(Symbols.Discord.Bot);
    await bot.login();
})();
