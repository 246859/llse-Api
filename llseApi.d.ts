/**
 * @description 整型位置对象接口
 */
type DimIdType = 0 | 1 | 2;

interface IntPos {

    x: number;

    y: number;

    z: number;

    dim: string;

    dimid: DimIdType;
}

/**
 * @description 浮点型位置对象接口
 */
interface FloatPos {

    x: number;

    y: number;

    z: number;

    dim: string;

    dimid: DimIdType;
}

/**
 * @description 方向角对象接口
 */
type FaceType = 0 | 1 | 2 | 3;

interface DirectionAngle {

    pitch: number;

    yaw: number;

    toFacing(): FaceType;
}

/**
 * @description 可执行NBT对象接口
 */
interface NbtObjectExecutable {

    getNbt(): NbtCompound;

    setNbt(nbt: NbtCompound): boolean;

}

/**
 * @description 可执行计分板对象接口
 */
interface ScoreBroadExecutable {

    getScore(target: Player | string): number;

    setScore(target: Player | string, score: number): number;

    addScore(target: Player | string, score: number): number;

    reduceScore(target: Player | string, score: number): number;

    deleteScore(target: Player | string): boolean;
}

/**
 * @description 实体对象接口
 */
interface Entity extends NbtObjectExecutable {

    readonly name: string;

    readonly type: string;

    readonly id: number;

    readonly pos: FloatPos;

    readonly blockPos: IntPos;

    readonly maxHealth: number;

    readonly inAir: boolean;

    readonly inWater: boolean;

    readonly sneaking: boolean;

    readonly speed: number;

    readonly direction: DirectionAngle;

    readonly uniqueId: string;

    teleport(pos: IntPos | FloatPos): boolean;

    teleport(x: number, y: number, z: number, dimid: DimIdType): boolean;

    kill(): boolean;

    hurt(damage: number): boolean;

    setOnFire(time): boolean;

    isPlayer(): boolean;

    toPlayer(): Player;

    isItemEntity(): boolean;

    toItem(): Item;

    getBlockStandingOn(): Block;

    getArmor(): Container;

    hasContainer(): boolean;

    getContainer(): boolean;

    refreshItems(): boolean;

    addTag(tag: string): boolean;

    removeTag(tag: string): boolean;

    hasTag(tag: string): boolean;

    getAllTags(): Array<string>;

}

/**
 * @description 物品对象接口
 */
interface Item extends NbtObjectExecutable {

    readonly name: string;

    readonly type: string;

    readonly id: number;

    readonly count: number;

    readonly aux: number;

    clone(): Item;

    isNull(): boolean;

    setNull(): boolean;

    set(item: Item): number;

    setAux(aux: number): boolean;

    setLore(names: Array<string>): boolean;

}

/**
 * @description 方块对象接口
 */
interface Block extends NbtObjectExecutable {

    readonly name: string;

    readonly type: string;

    readonly id: number;

    getBlockState(): object;

    hasContainer(): boolean;

    getContainer(): Container;

    hasBlockEntity(): boolean;

    getBlockEntity(): BlockEntity;

    removeBlockEntity(): boolean;

}

/**
 * @description 方块实体对象接口
 */
interface BlockEntity extends NbtObjectExecutable {

    readonly pos: IntPos;

    readonly type: IntPos;

    getBlock(): Block;
}

/**
 * @description 容器对象
 */
interface Container {

    readonly size: number;

    readonly type: string;

    addItem(item: Item): boolean;

    addItemToFirstEmptySlot(item: Item): boolean;

    hasRoomFor(item: Item): boolean;

    removeItem(index: number, count: number): boolean;

    getItem(index: number): Item;

    setItem(index: number, item: Item): boolean;

    getAllItems(): Array<Item>;

    removeAllItems(): boolean;

    isEmpty(): boolean;
}

/**
 * @description 计分板对象接口
 */
interface Objective extends ScoreBroadExecutable {

    readonly name: string;

    readonly displayName: string;

    setDisplay(slot: string, sortOrder?: OrderType): boolean;
}

/**
 * @description 玩家对象接口
 */
type MsgType = 0 | 1 | 4 | 5 | 9;

type PermissionType = 0 | 1 | 4;

type GameModeType = 0 | 1 | 2 | 3;

type OrderType = 0 | 1;

interface Player extends Entity, ScoreBroadExecutable, FormSendable, PlayerBindable {

    readonly realName: string;

    readonly xuid: string;

    readonly uuid: string;

    readonly permLevel: PermissionType;

    readonly gameMode: GameModeType;

    isOP(): boolean;

    kick(msg?: string): boolean;

    disconnect(msg?: string): boolean;

    tell(msg: string, type?: MsgType): boolean;

    sendText(msg: string, type?: MsgType): boolean;

    broadcast(msg: string, type?: MsgType): boolean;

    runcmd(cmd: string): boolean;

    talkAs(text: string): boolean;

    talkAs(target: Player, text: string): boolean;

    rename(newname: string): boolean;

    getDevice(): Device;

    getHand(): Item;

    getOffHand(): Item;

    getInventory(): Container;

    getEnderChest(): Container;

    getRespawnPosition(): IntPos;

    setRespawnPosition(pos: IntPos): boolean;

    setRespawnPosition(x: number, y: number, z: number, dimid: DimIdType): boolean;

    giveItem(item: Item): boolean;

    clearItem(type: string): number;

    refreshChunks(): boolean;

    setPermLevel(level: PermissionType): boolean;

    setGameMode(mode: GameModeType): boolean;

    addLevel(count: number): boolean;

    getLevel(): number;

    resetLevel(): boolean;

    getXpNeededForNextLevel(): number;

    addExperience(count: number): boolean;

    transServer(server: string, port: number): boolean;

    crash(): boolean;

    setSidebar(title: string, data: object, setOrder?: OrderType): boolean;

    removeSidebar(): boolean;

    setBossBar(title: string, percent: number, colour?: number): boolean;

    removeBossBar(): boolean;

    getAbilities(): object;

    getAttributes(): Array<object>;

    isSprinting(): boolean;

    setSprinting(sprinting: boolean): boolean;

    isSimulatedPlayer(): boolean;

    simulateAttack(target?: Entity): boolean;

    simulateDestory(pos?: IntPos, face?: FaceType): boolean;

    simulateDestory(block?: Block, face?: FaceType): boolean;

    simulateDisconnect(): boolean;

    simulateInteract(target?: Entity): boolean;

    simulateInteract(pos?: IntPos, face?: FaceType): boolean;

    simulateInteract(block?: Block, face?: FaceType): boolean;

    simulateJump(): boolean;

    simulateLookAt(pos: IntPos | FloatPos): boolean;

    simulateLookAt(target: Entity): boolean;

    simulateLookAt(block: Block): boolean;

    simulateSetBodyRotation(rot: number): boolean;

    simulateNavigateTo(entity: Entity, speed?: number): boolean;

    simulateNavigateTo(pos: IntPos | FloatPos, speed?: number): boolean;

    simulateNavigateTo(posArray: IntPos[] | FloatPos[], speed?: number): boolean;

    simulateUseItem(slot?: number, pos?: IntPos, face?: FaceType, relative?: FloatPos): boolean;

    simulateUseItem(item?: Item, pos?: IntPos, face?: FaceType, relative?: FloatPos): boolean;

    simulateStopDestroyingBlock(): boolean;

    simulateStopInteracting(): boolean;

    simulateStopMoving(): boolean;

    simulateStopUsingItem(): boolean;

    simulateLocalMove(): boolean;

}

/**
 * @description 设备对象接口
 */

type DeviceType = "Android"
    | "iOS"
    | "Amazon"
    | "GearVR"
    | "Hololens"
    | "Windows10"
    | "Win32"
    | "TVOS"
    | "PlayStation"
    | "Nintendo"
    | "Xbox"
    | "WindowsPhone"
    | "Unknown";

interface Device {
    readonly ip: string;

    readonly avgPing: number;

    readonly avgPacketLoss: number;

    readonly os: DeviceType;

    readonly clientId: string;
}

/**
 * @description 字符串格式化对象接口
 */

interface Format {

    readonly Black: string;

    readonly DarkBlue: string;

    readonly DarkGreen: string;

    readonly DarkAqua: string;

    readonly DarkRed: string;

    readonly DarkPurpl: string;

    readonly Gold: string;

    readonly Gray: string;

    readonly DarkGray: string;

    readonly Blue: string;

    readonly Green: string;

    readonly Aqua: string;

    readonly Red: string;

    readonly LightPurp: string;

    readonly Yellow: string;

    readonly White: string;

    readonly MinecoinGold: string;

    readonly Bold: string;

    readonly Italics: string;

    readonly Underline: string;

    readonly StrikeThrough: string;

    readonly Random: string;

    readonly Clear: string;
}

/**
 * 字符串格式化操作对象
 */
declare const Format: Format;

/**
 * @description 真指令对象参数类型接口
 */

/**
 * PermType枚举类
 */
declare enum PermType {
    Any,
    GameMaster,
    Console
}

/**
 * ParamType枚举类
 */
declare enum ParamType {

    Bool,

    Int,

    Float,

    String,

    Actor,

    Player,

    BlockPos,

    Vec3,

    RawText,

    Message,

    JsonValue,

    Item,

    Block,

    Effect,

    Enum,

    SoftEnum,

    ActorType,

    Command,

}

/**
 * @description 真指令对象接口
 */
interface Command {

    setAlias(alias: string): boolean;

    setEnum(name: string, values: Array<string>): boolean;

    mandatory(name: string, type: ParamType, enumName?: string, identifier?: string, enumOptions?: number): boolean;

    optional(name: string, type: ParamType, enumName?: string, identifier?: string, enumOptions?: number): boolean;

    overload(params: Array<string>): boolean;

    setCallback(callback: Function): boolean;

    setup(): boolean;
}

/**
 * @description 命令执行者对象接口
 */
interface CommandOrigin {

    readonly type: string;

    readonly name: string;

    readonly pos: FloatPos;

    readonly blockPos: IntPos;

    readonly entity: Entity;

    readonly player: Player;
}

interface CommandOutput {

    success(msg: string): boolean;

    error(msg: string): boolean;

    addMessage(msg: string): boolean;
}

/**
 * @description NBT全局对象接口
 */


interface NbtGlobal {

    readonly End: any;

    readonly Byte: number;

    readonly Short: number;

    readonly Int: number;

    readonly Long: number;

    readonly Float: number;

    readonly Double: number;

    readonly ByteArray: Array<number>;

    readonly String: string;

    readonly List: object;

    readonly Compound: NbtCompound;

    parseSNBT(snbt: string): NbtCompound;

    parseBinaryNBT(nbt: any): NbtCompound;

}

/**
 * NBT操作对象
 */
declare const NBT: NbtGlobal;


/**
 * @description NBT数据对象接口
 */
interface NbtObject {

    getType(): any;

    toString(space?: number): string;

    toSNBT(space?: number): string;
}

declare abstract class NbtNormalObject implements NbtObject {

    protected constructor();

    getType(): any;

    toString(space?: number): string;

    toSNBT(space?: number): string;

    set(data: any): boolean;

    get(): any;

}

declare abstract class NbtSpecialObject implements NbtObject {

    protected constructor();

    getType(): any;

    toString(space?: number): string;

    toSNBT(space?: number): string;

    setEnd(key: number | string): NbtSpecialObject;

    setByte(key: number | string, data: any): NbtSpecialObject;

    setShort(key: number | string, data: any): NbtSpecialObject;

    setInt(key: number | string, data: any): NbtSpecialObject;

    setLong(key: number | string, data: any): NbtSpecialObject;

    setFloat(key: number | string, data: any): NbtSpecialObject;

    setDouble(key: number | string, data: any): NbtSpecialObject;

    setByteBuffer(key: number | string, data: any): NbtSpecialObject;

    setString(key: number | string, data: any): NbtSpecialObject;

    addTag(tag: NbtObject): NbtSpecialObject;

    setTag(key: string | number, tag: NbtObject): boolean;

    getTag(key: string | number): NbtObject;

    removeTag(key: string | number): NbtSpecialObject;

    getTypeOf(key: string | number): any;

    getData(key: string | number): any;
}

/**
 *  @description Nbt普通数据类型
 */
declare class NbtEnd extends NbtNormalObject implements NbtObject {
    constructor();
}

declare class NbtByte extends NbtNormalObject implements NbtObject {
    constructor(data?: number);
}

declare class NbtShort extends NbtNormalObject implements NbtObject {
    constructor(data?: number);
}

declare class NbtInt extends NbtNormalObject implements NbtObject {
    constructor(data?: number);
}

declare class NbtLong extends NbtNormalObject implements NbtObject {
    constructor(data?: number);
}

declare class NbtFloat extends NbtNormalObject implements NbtObject {
    constructor(data?: number);
}

declare class NbtDouble extends NbtNormalObject implements NbtObject {
    constructor(data?: number);
}

declare class NbtByteArray extends NbtNormalObject implements NbtObject {
    constructor(data?: Array<number>);
}

declare class NbtString extends NbtNormalObject implements NbtObject {
    constructor(data?: string);
}

/**
 * @description Nbt列表类型
 */
declare class NbtList extends NbtSpecialObject implements NbtObject {

    constructor(data?: Array<NbtObject>);

    getSize(): number;

    toArray(): Array<any>;

    setEnd(index: number): NbtList;

    setByte(index: number, data: any): NbtList;

    setShort(index: number, data: any): NbtList;

    setInt(index: number, data: any): NbtList;

    setLong(index: number, data: any): NbtList;

    setFloat(index: number, data: any): NbtList;

    setDouble(index: number, data: any): NbtList;

    setByteBuffer(index: number, data: any): NbtList;

    setString(index: number, data: any): NbtList;

    addTag(tag: NbtObject): NbtList;

    setTag(index: number, tag: NbtObject): boolean;

    getTag(index: number): NbtObject;

    removeTag(index: number): NbtList;

    getTypeOf(index: number): any;

    getData(index: number): any;

}

/**
 * @description Nbt标签类型
 */
declare class NbtCompound extends NbtSpecialObject implements NbtObject {

    constructor(data?: object);

    toObject(): object;

    toBinaryNBT(): any;

    destroy(): boolean;

    getKeys(): Array<string>;

    setEnd(key: string): NbtCompound;

    setByte(key: string, data: any): NbtCompound;

    setShort(key: string, data: any): NbtCompound;

    setInt(key: string, data: any): NbtCompound;

    setLong(key: string, data: any): NbtCompound;

    setFloat(key: string, data: any): NbtCompound;

    setDouble(key: string, data: any): NbtCompound;

    setByteBuffer(key: string, data: any): NbtCompound;

    setString(key: string, data: any): NbtCompound;

    addTag(tag: NbtObject): NbtCompound;

    setTag(key: string, tag: NbtObject): boolean;

    getTag(key: string): NbtObject;

    removeTag(key: string): NbtCompound;

    getTypeOf(key: string): any;

    getData(key: string): any;

}


/**
 * @description 表单对象接口
 */


interface SimpleForm {

    setTitle(title: string): SimpleForm;

    setContent(content: string): SimpleForm;

    addButton(text: string, image?: string): SimpleForm;

}


interface CustomForm {

    setTitle(title: string): CustomForm;

    addLabel(text: string): CustomForm;

    addInput(title: string, placeholder?: string, Default?: string): CustomForm;

    addSwitch(title: string, Default: boolean): CustomForm;

    addDropdown(title: string, items: Array<string>, Default: number): CustomForm;

    addSlider(title: string, min: number, max: number, step: number, Default: number): CustomForm;

    addStepSlider(title: string, items: Array<string>, Default: number): CustomForm;
}


/**
 * @description 可发送表单对象接口
 */

interface FormSendable {

    sendModalForm(title: string, content: string, button1: string, button2: string, callback: Function): number;

    sendSimpleForm(title: string, content: string, buttons: Array<string>, images: Array<string>, callback: Function): number;

    sendCustomForm(json: string, callback: Function): number;

    sendForm(fm: SimpleForm, callback: Function): number;

    sendForm(fm: CustomForm, callback: Function): number;
}

/**
 * @description 日志对象接口
 */
type LogLevelType = 0 | 1 | 2 | 3 | 4 | 5;

interface Logger {

    setConsole(isOpen: boolean, logLevel: LogLevelType): void;

    setFile(filepath: string, logLevel: LogLevelType): void;

    setPlayer(player: Player, logLevel: LogLevelType): void;

    log(...data: Array<any>): void;

    debug(...data: Array<any>): void;

    info(...data: Array<any>): void;

    warn(...data: Array<any>): void;

    error(...data: Array<any>): void;

    fatal(...data: Array<any>): void;
}

/**
 * 日志操作对象
 */
declare const logger: Logger;

/**
 * @description LiteLoaderBDS加载器对象相关接口
 */

interface Version {

    major: number;

    minor: number;

    revision: number;

    isBeta: boolean;

}

interface LiteLoaderBDS {

    version(): Version;

    versionString(): string;

    requireVersion(major: number, minor: number, revision: number): boolean;

    listPlugins(): Array<string>;

    export(func: Function, name: string): boolean;

    export(func: Function, namespace: string, name: string): boolean;

    import(name: string): Function;

    import(namespace: string, name: string): Function;

    require(path: string, remotePath: string): boolean;

    eval(str): any;

}

/**
 * 加载器操作对象
 */
declare const ll: LiteLoaderBDS;

/**
 * @description 配置文件对象相关接口
 */
declare abstract class ConfigFile {

    protected constructor();

    reload(): void;

    close(): void;

    getPath(): string;

    read(): string;

    write(content: string): boolean;
}

declare class JsonConfigFile extends ConfigFile {

    constructor(path: string, Default?: string);

    init(name: string, Default?: any): any;

    set(name: string, data: any): boolean;

    get(name: string, Default?: any): any;

    delete(name: string): boolean;

}

declare class IniConfigFile extends ConfigFile {

    constructor(path: string, Default?: string);

    init(section: string, name: string, Default?: any): any;

    set(section: string, name: string, data: any): boolean;

    getStr(section: string, name: string, Default: string): string;

    getInt(section: string, name: string, Default: number): number;

    getFloat(section: string, name: string, Default: number): number;

    getBool(section: string, name: string, Default: boolean): boolean;

    delete(section: string, name: string): boolean;
}

/**
 * @description 数据库相关对象接口
 */

interface DBStmt {

    readonly affectedRows: number;

    readonly insertId: number;

    bind(val: any): void;

    bind(obj: object): void;

    bind(arr: Array<any>): void;

    bind(val: any, index: number): void;

    bind(val: any, name: string): void;

    step(): boolean;

    next(): boolean;

    fetch(): object;

    fetchAll(): Array<Array<object>>;

    fetchAll(callback: Function): void;

    reset(): boolean;

    clear(): boolean;
}

declare class KVDatabase {

    constructor(dir: string);

    set(name: string, data: any): boolean;

    get(name: string): any;

    delete(name: string): boolean;

    listKey(): Array<any>;

    close(): boolean;

}


declare class DBSession {

    constructor(type: string, params: { path: string, create?: boolean, readonly?: boolean, readwrite?: boolean });

    constructor(str: string);

    query(sql: string): Array<Array<any>>;

    exec(sql): boolean;

    execute(sql): boolean;

    isOpen(): boolean;

    close();

    prepare(sql): DBStmt;
}

/**
 *@description 经济系统相关接口
 */
interface record {

    readonly from: string;

    readonly to: string;

    readonly money: number;

    readonly time: string;

    readonly note: string;

}

interface Money {

    set(xuid: string, money: number): boolean;

    get(xuid: string): number;

    add(xuid: string, money: number): boolean;

    reduce(xuid: string, money: number): boolean;

    trans(xuid1: string, xuid2: string, money: number, note: string): boolean;

    getHistory(xuid: string, time: number): Array<record>;

    clearHistory(time: number): boolean;

}

/**
 * 经济操作对象
 */
declare const money: Money;

/**
 * @description 玩家数据绑定相关接口
 */

interface PlayerBindable {

    setExtraData(name: string, data: any): boolean;

    getExtraData(name: string): any;

    delExtraData(name: string): boolean;

}

interface DataProcessable {

    name2xuid(realName: string): string;

    xuid2name(xuid: string): string;

    toJson(val: any, space: number): string;

    parseJson(json: string): any;

    toMD5(str: string): string;

    toSHA1(str: string): string;

    toBase64(str: string): string;

    fromBase64(base64: string, isBinary: boolean): string;

}

/**
 * 通用数据操作对象
 */
declare const data: DataProcessable;

/**
 *@description 文件读写相关接口
 */

// @ts-ignore
declare class File {

    constructor(path: string, mode: any);

    readonly path: string;

    readonly absolutePath: string;

    readonly size: number;

    static readonly ReaDMode: any;

    static readonly WriteMode: any;

    static readonly AppendMode: any;

    static readFrom(path: string): string;

    static writeTo(path: string, text: string): string;

    static writeLine(path: string, text: string): string;

    static createDir(dir: string): boolean;

    static mkdir(dir: string): boolean;

    static delete(path: string): boolean;

    static exists(path: string): boolean;

    static copy(from: string, to: string): boolean;

    static move(from: string, to: string): boolean;

    static rename(from: string, to: string): boolean;

    static getFileSize(path: string): number;

    static checkIsDir(path: string): boolean;

    static getFilesList(dir: string): Array<string>;

    readSync(cnt: number): string | ArrayBuffer;

    readLineSync(): string;

    readAllSync(): string | ArrayBuffer;

    writeSync(str: string | ArrayBuffer): boolean;

    writeLineSync(str: string): boolean;

    read(cnt: number, callback: Function): boolean;

    readLine(callback: Function): boolean;

    readAll(callback: Function): boolean;

    write(str: string | ArrayBuffer, callback?: Function): boolean;

    writeLine(str: string, callback?: Function): boolean;

    seekTo(pos: number, isRelative: boolean): boolean;

    setSize(size: number): boolean;

    close(): boolean;

    isEOF(): boolean;

    flush(): boolean;

    errorCode(): number;

    clear(): boolean;
}

/**
 * @description 网络接口
 */

interface NetWork {

    /**
     * 发送一个异步HTTP(s) Get请求
     * @param url
     * @param header
     * @param callback
     */
    httpGet(url: string, header: object, callback: Function): boolean;

    /**
     * 发送一个异步HTTP(s) Post请求
     * @param url
     * @param header
     * @param data
     * @param type
     * @param callback
     */
    httpPost(url: string, header: object, data: string, type: string, callback: Function): boolean;

}

/**
 * 网络调用对象
 */
declare const network: NetWork;


declare class WSClient {

    /**
     * 当前的连接状态
     * wsc.Open - 处于正常连接中
     * wsc.Closing - 正在断开连接
     * wsc.Closed - 未连接
     */
    readonly status: any;

    constructor();

    /**
     * 创建连接
     * @param target 要连接的目标地址
     */
    connect(target: string): boolean;

    /**
     * 异步创建连接
     * @param target 连接的目标地址
     * @param callback 回调函数
     */
    connectAsync(target: string, callback: Function): boolean;

    /**
     * 发送文本 / 二进制消息
     * @param msg
     */
    send(msg: string | ArrayBuffer): boolean;

    /**
     * 监听WebSocket事件
     * @param event 事件名
     * @param callback 回调函数
     */
    listen(event: string, callback: Function): boolean;

    /**
     * 关闭连接
     */
    close(): boolean;

    /**
     * 强制断开连接
     */
    shutdown(): boolean;

    /**
     * 获取错误码
     */
    errorCode(): number;

}

/**
 * @description 系统调用接口
 */

interface System {


    getITimeStr(): string;

    getTimeObj(): object;

    randomGuid(): string;

    /**
     * 调用shell执行指定系统命令
     * @param cmd
     * @param callback
     * @param timeLimit
     */
    cmd(cmd: string, callback: Function, timeLimit: number): boolean;

    /**
     * 运行指定位置程序
     * @param process
     * @param callback
     * @param timeLimit
     */
    newProcess(process: string, callback: Function, timeLimit: number): boolean;

}

/**
 * 系统调用对象
 */
declare const system: System;

/**
 * 数据包对象接口
 */
interface Packet {
    getName() : String;

    getId() : Number;
}


/**
 * 二进制流对象
 */
declare class BinaryStream {

    reset() : boolean;

    writeBool() : boolean

    writeByte() : Number;

    writeFloat() : Number;

    writeSignedBigEndianInt() : Number;

    writeSignedInt() : Number;

    writeSignedInt64() : Number;

    writeSignedShort(): Number;

    writeString() : String;

    writeUnsignedChar() : Number;

    writeUnsignedInt() : Number;

    writeUnsignedInt64() : Number;

    writeUnsignedShort() : Number;

    writeUnsignedVarInt() : Number;

    writeUnsignedVarInt64() : Number;

    writeVarInt() : Number;

    writeVarInt64() : Number;

    writeVec3() : FloatPos;

    writeCompountTag() : NbtCompound;

    createPacket(pktid:Number) : Packet;

}

/**
 * @description 事件监听
 */
interface Listenable {

    listen(event: string, callback: Function): void;

}


/**
 * @description 全局游戏对象接口
 */
interface Global extends Listenable {

    /**
     * 生成一个整型坐标对象
     * @param x
     * @param y
     * @param z
     * @param dimid
     */
    newIntPos(x: number, y: number, z: number, dimid: DimIdType): IntPos;

    /**
     * 生成一个浮点坐标对象
     * @param x
     * @param y
     * @param z
     * @param dimid
     */
    newFloatPos(x: number, y: number, z: number, dimid: DimIdType): FloatPos;

    /**
     * 执行一条后台命令
     * @param cmd
     */
    runcmd(cmd: string): boolean;

    /**
     * 执行一条后台命令(强化版本)
     * @param cmd
     */
    runcmdEx(cmd: string): { success: boolean, output: string };

    /**
     * @description 广播消息，参数可以是数组，或任意字符串
     * @param data
     */
    broadcast(...data: Array<any>): void;

    /***
     * 注册一个新的玩家命令（假命令）
     * @param cmd
     * @param description
     * @param callback
     * @param level
     */
    regPlayerCmd(cmd: string, description: string, callback: Function, level?: 0 | 1): boolean;

    /**
     * 注册一个新的控制台命令（假命令）
     * @param cmd
     * @param description
     * @param callback
     */
    regConsoleCmd(cmd: string, description: string, callback: Function): boolean;

    /**
     * 模拟产生一个控制台命令输出
     * @param output
     */
    sendCmdOutput(output: string): boolean;

    /**
     * 注册一条顶层命令
     * @param cmd
     * @param description
     * @param permission
     * @param flag
     * @param alias
     */
    newCommand(cmd: string, description: string, permission?: PermType, flag?: number, alias?: string): Command;

    /**
     * 通过玩家名或者xuid手动生成玩家对象
     * 通过此函数来手动生成对象，注意，你要获取的玩家必须是在线状态，否则会生成失败
     * @param info
     */
    getPlayer(info: string): Player;

    /**
     * 此函数会返回一个玩家对象的数组，其中每个对象都对应了一个服务器中的玩家
     */
    getOnlinePlayers(): Array<Player>;

    /**
     * 通过此函数来手动生成对象，注意，你要获取的方块必须处于已被加载的范围中，否则会出现问题
     * @param pos
     */
    getBlock(pos: IntPos): Block;

    /**
     * 通过此函数来手动生成对象，注意，你要获取的方块必须处于已被加载的范围中，否则会出现问题
     * @param x
     * @param y
     * @param z
     * @param dimid
     */
    getBlock(x: number, y: number, z: number, dimid: DimIdType): Block;

    /**
     * 通过此函数，将一个坐标对应的方块设置成另一个，类似于命令 /setblock
     * @param pos
     * @param block
     * @param tiledata
     */
    setBlock(pos: IntPos, block: Block | string | NbtCompound, tiledata: number): boolean;

    /**
     * 通过此函数，将一个坐标对应的方块设置成另一个，类似于命令 /setblock
     * @param x
     * @param y
     * @param z
     * @param dimid
     * @param block
     * @param tiledata
     */
    setBlock(x: number, y: number, z: number, dimid: DimIdType, block: Block | string | NbtCompound, tiledata: number): boolean;

    /**
     * 在指定位置生成粒子效果
     * @param pos
     * @param type
     */
    spawnParticle(pos: IntPos, type: string): boolean;

    /**
     * 在指定位置生成粒子效果
     * @param x
     * @param y
     * @param z
     * @param dimid
     * @param type
     */
    spawnParticle(x: number, y: number, z: number, dimid: DimIdType, type: string): boolean;

    /**
     * 获取当前所有已加载的实体
     * 此函数会返回一个实体对象的数组，其中每个对象都对应了一个已加载的实体
     */
    getAllEntities(): Array<Entity>;

    /**
     * 生成新生物并获取
     * 通过此函数，在指定的位置生成一个新生物，并获取它对应的实体对象
     * @param name
     * @param pos
     */
    spawnMob(name: string, pos: IntPos | FloatPos): Entity;

    /**
     * 生成新生物并获取
     * 通过此函数，在指定的位置生成一个新生物，并获取它对应的实体对象
     * @param name
     * @param x
     * @param y
     * @param z
     * @param dimid
     */
    spawnMob(name: string, x: number, y: number, z: number, dimid: DimIdType): Entity;

    /**
     * 在指定位置制造一次爆炸
     * @param pos
     * @param source
     * @param power
     * @param range
     * @param isDestroy
     * @param isFire
     */
    explode(pos: IntPos | FloatPos, source: Entity, power: number, range: number, isDestroy: boolean, isFire: boolean): boolean;

    /**
     * 在指定位置制造一次爆炸
     * @param x
     * @param y
     * @param z
     * @param dimid
     * @param source
     * @param power
     * @param range
     * @param isDestroy
     * @param isFire
     */
    explode(x: number, y: number, z: number, dimid: DimIdType, source: Entity, power: number, range: number, isDestroy: boolean, isFire: boolean): boolean;

    /**
     * 生成新的物品对象
     * 通过此函数，根据给出的信息生成一个新的物品对象
     * @param name
     * @param count
     */
    newItem(name: string, count: number): Item;

    /**
     * 生成新的物品对象
     * 通过此函数，根据给出的信息生成一个新的物品对象
     * @param nbt
     */
    newItem(nbt: NbtCompound): Item;

    /**
     * 创建一个新的计分项
     * @param name
     * @param displayName
     */
    newScoreObjective(name: string, displayName: string): Objective;

    /**
     * 获取某个已存在的计分项
     * @param name
     */
    getScoreObjective(name: string): Objective;

    /**
     * 获取所有计分项
     */
    getAllScoreObjectives(): Array<Objective>;

    /**
     * 获取某个处于显示状态的计分项
     * @param slot
     */
    getDisplayObjective(slot: string): Objective;

    /**
     * 移除一个已存在的计分项
     * @param name
     */
    removeScoreObjective(name: string): boolean;

    /**
     * 使计分项停止显示
     * @param slot
     */
    clearDisplayObjective(slot: string): boolean;

    /**
     * 创建一个普通的表单对象
     */
    newSimpleForm(): SimpleForm;

    /**
     * 创建一个空白的自定义表单对象
     */
    newCustomForm(): CustomForm;

    /**
     * 获取BDS服务端版本号
     */
    getBDSVersion(): string;

    /**
     * 获取BDS服务端协议版本
     */
    getServerProtocolVersion(): number;

    /**
     * 设置服务器Motd字符串
     * @param motd
     */
    setMotd(motd: string): boolean;

    /**
     * 设置服务器最大玩家数
     * @param num
     */
    setMaxPlayers(num: number): boolean;
}

/**
 * LLSE 全局对象
 */
declare const mc: Global;

