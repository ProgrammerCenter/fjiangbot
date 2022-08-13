import events from 'inquirer/lib/utils/events';
import schedule from 'node-schedule';
import { Client } from 'oicq';
import { groupc } from '../config/config';
import { HtmlImg } from './puppeteer';

async function timing(bot: Client) {
    //每3秒执行一次
    bot.getGroupList().forEach(async (group) => {
        let c = groupc.get(group.group_id) ?? groupc.get(1);

        if (c?.Iscurfew) {
            let Time = schedule.scheduleJob(c.curfewTime, async () => {
                await bot.sendGroupMsg(group.group_id, {
                    type: "image",
                    file: `base64://${await HtmlImg("curfew", {
                        Avatar: `https://p.qlogo.cn/gh/${group.group_id}/${group.group_id}/${100}`,
                        title: "夜已深，请注意休息",
                        content: "已开启宵禁模式"
                    }, group.group_id)}`
                });
                await bot.pickGroup(group.group_id).muteAll(true)
                bot.logger.info(`${group.group_id}宵禁已开闭，下次宵禁将在${Time.nextInvocation().toLocaleString()}开启`);
            })
            let endTime = schedule.scheduleJob(c.curfewEndTime, async () => {
                await bot.sendGroupMsg(group.group_id, {
                    type: "image",
                    file: `base64://${await HtmlImg("curfew", {
                        Avatar: `https://p.qlogo.cn/gh/${group.group_id}/${group.group_id}/${100}`,
                        title: "天亮了，开始摸鱼了",
                        content: "已关闭宵禁模式"
                    }, group.group_id)}`
                });
                await bot.pickGroup(group.group_id).muteAll(false)
                bot.logger.info(`${group.group_id}宵禁关闭，下次宵禁将在${endTime.nextInvocation().toLocaleString()}关闭`);
            })
            bot.logger.info(`${group.group_id} 宵禁任务已启动`)
        }
    })
}
export default timing;
