import { Platform } from "oicq";
import { LogLevel } from "oicq/lib/client";
import { type } from "os";

type QQcT = {
    qq: number,
    password?: string,
    log: LogLevel,
    platform: Platform
}
// 类型“String”的参数不能赋给类型“string | number | RecurrenceRule | RecurrenceSpecDateRange | RecurrenceSpecObjLit | Date”的参数。

type groupT = {
    IsgroupCod: boolean,
    IsgroupCodTime: number,
    Iscurfew: boolean,
    curfewTime: string | number | Date,
    curfewEndTime: string | number | Date,
    Isadmin: boolean,
    props: Array<Number>,
}
type signT = {
    Issign: boolean,
    MaxGold: number,
    MinGold: number
}
type propT = {
    id: number,
    type: "jy" | "cj" | "cdk",
    name: string,
    price: number,
    effect: any
}
type cdksT = {
    id: number,
    cdk: Array<cdkT>
}
type cdkT = {
    cod: "未使用" | "已使用",
    cdk: string,
}
let QQc: QQcT = {
    qq: 161009029,
    password: '13393280310a',
    log: "info",
    platform: Platform.aPad
};
let groupc: Map<number, groupT> = new Map([
    // 默认配置
    [1, {
        IsgroupCod: true,//是否开启进群验证码
        IsgroupCodTime: 10000,//单位秒
        Iscurfew: false,//是否开启宵禁
        //Cron表达式生成网址：https://cron.qqe2.com
        curfewTime: "0 0 22 ? * ? ?",//宵禁开始时间 需要Cron表达式
        curfewEndTime: "0 0 7 ? * ? ",//宵禁结束时间 需要Cron表达式
        Isadmin: true,//是否管理员使用群管功能
        props: []//禁止使用的道具
    }],
    // 单独配置
    [877894787, {
        IsgroupCod: true,//是否开启进群验证码
        IsgroupCodTime: 60000,//单位毫秒
        Iscurfew: false,//是否开启宵禁
        // 尽量不要设置同一时间段否则容易🐔
        curfewTime: "0 0 22 ? * ? ?",//宵禁开始时间
        curfewEndTime: "0 0 7 ? * ? ",//宵禁结束时间
        Isadmin: true,
        props: []//禁止使用道具
    }],
]);
let signc: signT = {
    Issign: true,//是否开启签到
    MaxGold: 10,//最大金币
    MinGold: 1//最小金币
}
let admins: Array<number> = [2180323481];//管理员QQ号
let props: Array<propT> = [{
    //道具图片在modular/shop/icon文件夹下命名规则：id.png
    id: 1,
    name: "禁言卡",
    type: "jy",
    price: 100,//道具售价
    effect: 60//禁言时常
}, {
    id: 2,
    name: "绿钻cdk",
    type: "cdk",
    price: 1000,
    effect: 1
}, {
    id: 3,
    name: "抽奖卡",
    type: "cj",
    price: 1000,
    effect: [
        {
            type: "gold",//类型只能写gold（金币）或者props（道具）
            value: 100,//金币就是数量道具就是道具id
            probability: 0//概率为0则100%抽到，概率为1则抽到1/2,概率为3则抽到1/3...只接受整数
        }, {
            type: "props",
            value: 200,
            probability: 0
        }]
}]
export { QQc, groupc, signc, admins, props, propT, groupT, cdkT, cdksT };