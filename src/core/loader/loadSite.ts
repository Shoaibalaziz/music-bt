import express from 'express';

import { registerExpressEvents } from '../api/express';
import { SessionManager } from '../lib/SessionManager';

import type { Client } from 'discord.js';
import type { Bot } from '../../@types';
import type { LocalNodeController } from '../lib/LocalNodeController';


const loadSite = (bot: Bot, client: Client, localNodeController: LocalNodeController) => {
    return new Promise<void>((resolve, _reject) => {
        bot.logger.emit('api', `-> loading Web Framework ......`);

        const port = bot.config.site.port || 33333;
        const app = express();
        const sessionManager = new SessionManager();


        registerExpressEvents(bot, client, localNodeController, app, sessionManager);

        app.listen(port, () => {
            bot.logger.emit('api', `Server start listening port on ${port}`);
            resolve();
        });
    });
};

export { loadSite };