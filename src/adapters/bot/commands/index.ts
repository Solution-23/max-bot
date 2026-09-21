import { registerIdsCommand } from './ids';
import { Bot } from '../../../entity/bot.entity';
import { BotDeps } from '../deps';
import { registerAllUsersCommand } from './allusers';
import { registerHelpCommand } from './help';
import { registerNotifyCommand } from './notify';
import { registerStartCommand } from './start';


export function registerCommands(bot: Bot, deps: BotDeps): void {
  registerStartCommand(bot, deps.startUseCase);
  registerHelpCommand(bot, deps);
  registerAllUsersCommand(bot, deps);
  registerNotifyCommand(bot, deps);
  registerIdsCommand(bot, deps);
}