#! /usr/bin/env node

import { CopipeBot } from './modules/CopipeBot'

(() => {
  const TOKEN = process.env.COPIPE_BOT_TOKEN;
  if (!TOKEN) {
    throw new Error('トークンが見つかりませんでした')
  }

  const copipebot = CopipeBot.getInstance(TOKEN);
  copipebot.run();
})();
