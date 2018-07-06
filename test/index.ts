import {expect} from 'chai';
import m from 'mocha';

import RPSTelegramBot from '../src/index';
import { RpsContext } from 'rpscript-interface';

m.describe('telegram-bot', () => {

  m.it('should convert to html', async function () {
    let ctx = new RpsContext;
    ctx.addModuleContext('telegram-bot',{token:'TOKEN'});
    let md = new RPSTelegramBot(ctx);
    

    let output = await md.onMsg(ctx,{},(async (msg:any) => {
      await md.sendMessage(ctx,{},msg.chat.id,'hows your day');
    }));

  }).timeout(0);

})
