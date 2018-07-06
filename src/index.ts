/**
 * @module telegram-bot
 */

import TelegramBot from 'node-telegram-bot-api';
import {RpsContext,RpsModule,rpsAction} from 'rpscript-interface';

let MOD_ID = "telegram-bot";

export interface TelegramBotContext {
  bot?:TelegramBot;
  token?:string;
}

@RpsModule(MOD_ID)
export default class RPSTelegramBot {

  constructor(ctx:RpsContext){
    let mapContext = ctx.getModuleContext(MOD_ID);
    
    if(!mapContext)
      ctx.event.emit(RpsContext.LOAD_MOD_ERR_EVT,MOD_ID,new Error("No config found for telegram-bot module"));
    else {
      
      mapContext['bot'] = new TelegramBot(mapContext['token'], {polling: true});

      ctx.addModuleContext(MOD_ID,mapContext);
    }
  }

  @rpsAction({verbName:'on-telegram-text'})
  async onText (ctx:RpsContext,opts:Object, regex:RegExp, cb:(msg:string,match:string)=>void) : Promise<void>{
    let bot:TelegramBot = ctx.getModuleContext(MOD_ID).bot;
    bot.onText(regex, cb);
  }

  @rpsAction({verbName:'send-telegram-message'})
  async sendMessage (ctx:RpsContext,opts:Object, chatId:string,msg:string) : Promise<any>{
    let bot:TelegramBot = ctx.getModuleContext(MOD_ID).bot;
    return bot.sendMessage(chatId,msg);
  }

  @rpsAction({verbName:'on-telegram-message'})
  async onMsg (ctx:RpsContext,opts:Object, cb:(msg:string)=>void) : Promise<void>{
    let bot:TelegramBot = ctx.getModuleContext(MOD_ID).bot;
    bot.on('message', cb);
  }

}
