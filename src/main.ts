#! /usr/bin/env node

import { createClient } from './modules/copipe_bot';

(() => {
  const TOKEN = process.env.COPIPE_BOT_TOKEN;
  if (!TOKEN) {
    throw new Error('トークンが見つかりませんでした');
  }

  const copipebot = createClient();
  void copipebot.login(TOKEN);
})();
