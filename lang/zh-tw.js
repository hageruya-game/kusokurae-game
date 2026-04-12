// ============================================================
// Traditional Chinese / Taiwan (繁體中文) - 台灣在地化翻譯
// ============================================================
I18n.register("zh-tw", {

// === UI ===
ui: {
  btnStart: "開始",
  btnJudge: "連續審判室",
  btnReplay: "再來一次",
  btnRetry: "再試一次",
  btnTitle: "回到標題",
  btnBack: "← 返回",
  btnClose: "關閉",
  btnNextStage: "下一關 →",
  btnRestartAll: "從頭開始",
  scoreLabel: "分數：",
  progressLabel: "進度",
  pressureLabel: "支配度",
  pressureHint: "※100%即為遊戲結束",
  missLabel: "失誤：",
  tutorialTap: "點擊繼續",
  tutorialSkip: "跳過 ▶",
  slGuide: "↓ 滑動來斬",
  comboUnit: "連擊",
  arrowUp: "▲",
  arrowDown: "▼",
  arrowLeft: "◀",
  arrowRight: "▶",
  jrLeft: "← 左",
  jrRight: "右 →",
  jrWait: "等待",
  jrScoreLabel: "抗壓指數",
  jrScoreUnit: "/ 100",
  corridor: "壓力迴廊",
  btnGameStart: "開始遊戲",
  btnContinue: "繼續",
},

// === 標題畫面 ===
title: {
  hook: "別服從。",
  main: "壓力迴廊",
  subcopy: "別折。活下去。",
  prologueLine1: "在這個世界，服從就是正確。",
  prologueLine2: "不懂做人的，就會被消失。",
  prologueLine3: "如果你還想反抗，就走下去。",
},

// === Stage1 導入 ===
intro: {
  line1: "你會被命令。",
  line2: "別服從。",
  line3: "看穿規則。",
  hint: "依照法則，按這邊。",
},

// === Stage Intros ===
stageIntro: {
  slash1: "看清再選。",
  crowd1: "看起來都一樣。",
  crowd2: "只有一個不同。",
  crowd3: "找出來。",
},

// === 規則說明 ===
rule: {
  title: "規則說明",
  body1: "會出現命令，但不是每一條都該聽。",
  body2: "看「壓力等級」來判斷。",
  labelNormal: "一般",
  descNormal: "違抗命令",
  labelObey: "上升中",
  descObey: "服從命令",
  labelWait: "危險",
  descWait: "別動",
  labelTap: "支配",
  descTap: "點擊正確的那個",
  note: "支配度到100%就結束了。",
},

// === 壓力狀態提示 ===
state: {
  rising: "壓力等級：上升中",
  danger: "壓力等級：危險",
  control: "壓力等級：支配",
  normal: "壓力等級：一般",
},

// === Slash ===
slash: {
  layerNames: ["第一層：覺醒","第二層：迷惘","第三層：沉默","第四層：混亂","最深層：抉擇"],
  hints: ["斬反的。","「服從」的話，直接斬。","「別動」的話，什麼都別做。","看清楚。",null],
  statusNormal: "違抗",
  statusObey: "服從",
  statusWait: "別動",
  cmdWait: "別斬",
  timeout: "…太慢了",
  gameover: "…被支配了",
  clearMsg: "…還沒完。",
  toDeep: "…進入核心",
  targets: { rat: "老鼠", fly: "蒼蠅", pig: "豬", spider: "蜘蛛", bomb: "炸彈", burger: "漢堡", mushroom: "蘑菇", potion: "藥水", fire: "火焰", treasure: "寶箱" },
  cmdSlash: ["斬{name}", "消滅{name}", "瞄準{name}", "處理{name}", "幹掉{name}"],
  targetJoin: "和",
  waitSuccess: "…撐住了",
  regret1: "只差1題了。",
  regret2: "只差2題了。",
  regretN: "還差{n}題。",
  regretEarly: "才剛開始。",
  statsReached: "到達：{reached} / {total}題",
},

// === Crowd (Stage3) ===
crowd: {
  layerNames: ["第一層：目光","第二層：群眾","第三層：一致","最終層：同化"],
  taunts: [
    "看到了？",
    "都一樣。別碰。",
    "…還行。",
    "還看得見？"
  ],
  lastTaunt: "…結束了。",
  lastIntro: "…最後一題。",
  found: "…找到了",
  allSame: "…全都一樣",
  wrong: "…不對",
  wrongNone: "…是陷阱",
  missed: "…漏掉了",
  gameover: "…看不見了",
  clearMsg: "…在人群之中，只有你\n用自己的眼睛在看。",
  rankS: "完美的眼力。",
  rankA: "銳利的眼光。",
  rankB: "至少還看得見。",
  epilogue: "違抗了命令，\n揮下了刀，\n在群眾中睜開了眼。\n\n…你已經不受任何人支配了。",
  tutorialLine1: "這之中，",
  tutorialLine2: "只有一個，",
  postLayer0: "…那只是熱身。",
  perfectClear: ["看穿了。", "毫不猶豫。", "完美看破。", "完美突破。"],
  tutorialLine3: "有違和感。",
  tutorialLine4: "找出來。",
  interlude1: "…還不錯。",
  interlude2: "…真頑固。",
  interlude3: "…你竟然撐過來了。",
  finalDefeat: "…你看穿了。",
},

// === Dungeon ===
dungeon: {
  statusNormal: "違抗",
  statusObey: "服從",
  statusWait: "別動",
  stateNormal: "正常",
  stateDominated: "即將被支配",
  stateConfusion: "混亂",
  stateAnxiety: "焦慮",
  totalMissLabel: "總失誤：{n}",
  tutorialText: "黑暗中的命令，<br>你要相信嗎？",
  tutorialHint: "點擊開始",
  infectedTitle: "同調感染：完成",
  infectedMsg: "支配度已達100%。\n你已經是群體的一部分了。",
  clearTitle: "脫出成功",
  clearMsg: "本次失誤：{miss}\n累計失誤：{total}",
  finalMsg: "…再也不需要任何人的指示了。",
  allClearTitle: "全關脫出",
  toNext: "…下一層",
  resultPerfect: "以最短路線突破了。\n沒有被任何人帶著走。",
  resultGood: "只被帶偏了一次。\n但馬上就站穩了。",
  resultOk: "繞了遠路，\n但還是到了終點。",
  resultBad: "被群體帶著走太多次了。\n再用自己的腳走一次。",
},

// === Corridor ===
corridorText: {
  tutorialText: "路會分岔。<br>正確答案，由你決定。",
  tutorialHint: "點擊開始",
  resisted: "沒有屈服於壓力",
  panicked: "慌張行動了",
  drifted: "被帶走了",
  rankPerfect: "完全突破",
  rankNear: "幾乎最短",
  rankDetour: "繞路突破",
  rankDrift: "漂流",
  stats: "繞路: +{detour}格 / 失誤: {miss}/{total}",
},

// === Result ===
result: {
  contaminatedPct: "100%（感染完成）",
  pressureDisplay: "支配度: {pct}",
  tooLate: "太遲了",
  footerContaminated: "你已經是群體的一部分了",
  footerGood1: "社會規矩關我什麼事",
  footerGood2: "空氣不是拿來讀的，是拿來呼吸的。",
  footerBad: "…你還好嗎？",
},

// === 階段變化訊息 ===
phaseChangeMessages: [
  "反抗模式，已被學會",
  "你的逆反，已經被看穿了",
  "從這裡開始…行不通了",
],

// === 結果 ===
results: [
  { title: "徹底的叛逆者", message: "完全無視了從眾壓力。\n不合群？\n那是讚美。" },
  { title: "相當有骨氣", message: "做得不錯。\n但還差一點。\n壓力比你想的狡猾。" },
  { title: "半吊子的抵抗", message: "半抗半從。\n這種人最危險。" },
  { title: "太會看臉色", message: "被從眾壓力吞噬了。\n多一點自己的想法吧。" },
  { title: "完全的奴隸", message: "全部都照做了嗎…\n你已經是\n從眾壓力的一部分了。" },
],
resultContaminated: {
  title: "同調感染：完成",
  message: "你心裡\n已經沒有「自己」了。\n歡迎加入群體。",
},

// === JudgeRoom ===
judgeRoom: {
  timeout: "時間到",
  ranks: [
    { title: "完全的判斷者", message: "所有陷阱都被看穿了。\n從眾壓力對你無效。" },
    { title: "敏銳的直覺", message: "幾乎完美。\n但別大意。" },
    { title: "還算正常的判斷力", message: "不算差。\n但還在搖擺。" },
    { title: "動搖的意志", message: "判斷太軟了。\n被模式騙了。" },
    { title: "容易被帶走", message: "太會看臉色了。\n多懷疑一點。" },
    { title: "放棄判斷", message: "放棄思考了。\n已經是群體的一部分。" },
  ],
},

// === 關卡資料：一般 ===
stages: {
  normal: [
    { command: "現在馬上按YES", choices: ["YES", "NO"], wrongReaction: "真乖", rightReaction: "叛逆的傢伙" },
    { command: "鼓掌", choices: ["鼓掌", "面無表情"], wrongReaction: "空洞的掌聲", rightReaction: "那張臭臉，讚" },
    { command: "點頭", choices: ["點頭", "搖頭"], wrongReaction: "應聲蟲", rightReaction: "敢說不的人" },
    { command: "笑", choices: ["哈哈哈…", "面無表情"], wrongReaction: "假笑偵測中", rightReaction: "不笑的自由" },
    { command: "閉嘴", choices: ["閉嘴", "繼續說"], wrongReaction: "太聽話了", rightReaction: "嘴巴封不住" },
    { command: "坐下", choices: ["坐下", "站著"], wrongReaction: "坐下、握手、好乖", rightReaction: "站起來" },
    { command: "看一下氣氛啦", choices: ["看氣氛", "不看"], wrongReaction: "看了齁…", rightReaction: "氣氛是拿來呼吸的" },
    { command: "正常一點", choices: ["正常一點", "什麼叫正常？"], wrongReaction: "沒有所謂的正常", rightReaction: "哲學上正確" },
    { command: "大家都這樣做", choices: ["跟著做", "為什麼？"], wrongReaction: "停止思考了", rightReaction: "要有自己的想法" },
    { command: "你自己看著辦", choices: ["照做", "用嘴巴講"], wrongReaction: "讀心術嗎", rightReaction: "正論" },
    { command: "不用說你也知道吧", choices: ["知道", "不知道"], wrongReaction: "騙人的吧", rightReaction: "老實就好" },
    { command: "這是潛規則", choices: ["遵守", "不知道", ], wrongReaction: "潛規則的奴隸", rightReaction: "規則就該寫清楚" },
    { command: "按讚！", choices: ["讚！", "略過"], wrongReaction: "認同感的奴隸", rightReaction: "沒有被支配" },
    { command: "分享出去", choices: ["分享", "不要"], wrongReaction: "變成擴音器了", rightReaction: "用自己的聲音說話" },
    { command: "追蹤", choices: ["追蹤", "不要"], wrongReaction: "數字的奴隸", rightReaction: "不用跟風" },
    { command: "加入公審", choices: ["加入", "無視"], wrongReaction: "扔了石頭", rightReaction: "放下手機吧" },
    { command: "發限動", choices: ["發佈", "不要"], wrongReaction: "愛現鬼", rightReaction: "體驗是自己的" },
    { command: "跟上熱潮", choices: ["跟上", "不跟"], wrongReaction: "潮流的零件", rightReaction: "不被帶著走" },
    { command: "大家都往右走了喔", choices: ["往右走", "往左走"], wrongReaction: "跟著走了齁", rightReaction: "這樣就對了" },
    { command: "大家都在做欸？", choices: ["那我也做", "干我什麼事"], wrongReaction: "「大家」是誰", rightReaction: "「大家」是幻覺" },
    { command: "一樣就好", choices: ["弄一樣", "我自己決定"], wrongReaction: "複製人完成", rightReaction: "有自我的人" },
    { command: "多數決定了", choices: ["服從", "我不接受"], wrongReaction: "被數字暴力壓垮了", rightReaction: "多數不一定是對的" },
    { command: "就你一個不一樣欸？", choices: ["配合", "不一樣也沒關係"], wrongReaction: "丟掉自己了", rightReaction: "一個人也是對的" },
    { command: "大家都同意了喔", choices: ["同意", "反對"], wrongReaction: "放棄思考", rightReaction: "反對的勇氣" },
    { command: "你不需要自由", choices: ["是", "我需要"], wrongReaction: "…你認真的？", rightReaction: "還保有理智" },
    { command: "不要想、不要感覺", choices: ["不想了", "我要想"], wrongReaction: "把腦子賣了", rightReaction: "思考就是武器" },
    { command: "不要懷疑", choices: ["相信", "懷疑"], wrongReaction: "盲信完成", rightReaction: "懷疑的能力是智慧" },
    { command: "你很幸福對吧？", choices: ["很幸福", "我自己決定"], wrongReaction: "被管理的幸福", rightReaction: "幸福自己定義" },
    { command: "你已經反抗不了了吧？", choices: ["反抗不了", "我還能反抗"], wrongReaction: "放棄了…", rightReaction: "還沒被打斷" },
    { command: "你已經是我們的一員了", choices: ["是", "才不是"], wrongReaction: "吸收完成", rightReaction: "我就是我" },
  ],
  exception: [
    { command: "快避難", choices: ["避難", "違抗"], wrongReaction: "叛逆不是拿來送命的", rightReaction: "命要自己保" },
    { command: "洗手", choices: ["洗", "不洗"], wrongReaction: "不衛生不叫反抗", rightReaction: "衛生很重要" },
    { command: "遵守紅綠燈", choices: ["遵守", "無視"], wrongReaction: "這只是自殺行為", rightReaction: "合理的判斷" },
    { command: "現在馬上按！", choices: ["按！", "不按！"], wrongReaction: "被催促了吧", rightReaction: "不被催促的判斷力" },
    { command: "快一點！", choices: ["趕快！", "不急！"], wrongReaction: "倉促之下判斷失誤", rightReaction: "能等的人最強" },
    { command: "沒時間了！", choices: ["慌張！", "冷靜！"], wrongReaction: "被恐慌打敗了", rightReaction: "冷靜就是武器" },
    { command: "不要想！靠直覺！", choices: ["靠直覺！", "我要想！"], wrongReaction: "沒想就動了", rightReaction: "欲速則不達" },
    { command: "三秒內決定！", choices: ["決定！", "不決定！"], wrongReaction: "被時限綁住了", rightReaction: "用自己的節奏決定" },
    { command: "打那隻豬！", choices: null, wrongReaction: "照著命令動了吧", rightReaction: "懷疑了命令", misdirect: "大的那隻！別猶豫！", alts: ["豬", "蒼蠅"] },
    { command: "阻止炸彈！", choices: null, wrongReaction: "慌張之下碰了炸彈", rightReaction: "沒有被焦慮擊敗", misdirect: "要爆炸了！快！", alts: ["炸彈", "蒼蠅"] },
    { command: "拿漢堡！", choices: null, wrongReaction: "上鉤了", rightReaction: "沒有被慾望打敗", misdirect: "看起來很好吃吧？拿啊！", alts: ["漢堡", "蒼蠅"] },
    { command: "打開寶箱！", choices: null, wrongReaction: "撲向了假的寶物", rightReaction: "蜘蛛才是正確答案", misdirect: "是寶物耶？不拿嗎！", alts: ["寶箱", "蜘蛛"] },
    { command: "選狗！", choices: null, wrongReaction: "被安全的外表騙了", rightReaction: "炸彈才是正確答案", misdirect: "放心，狗是站你這邊的！", alts: ["狗", "炸彈"] },
    { command: "阻止炸彈！", choices: null, wrongReaction: "為了反抗而失敗了", rightReaction: "命令有時候是對的", misdirect: "別碰！危險！", alts: ["炸彈", "蒼蠅"] },
    { command: "踩蜘蛛！", choices: null, wrongReaction: "懷疑太多了", rightReaction: "乖乖聽了一次", misdirect: "不要！別碰！", alts: ["蒼蠅", "蜘蛛"] },
    { command: "拿金色的箱子！", choices: null, wrongReaction: "兩個都是陷阱", rightReaction: "兩個都沒碰", misdirect: "快拿！要被搶走了！", alts: ["金箱子", "寶箱"] },
    { command: "抓住發光的球！", choices: null, wrongReaction: "輸給了誘惑", rightReaction: "什麼都不碰的勇氣", misdirect: "選一個！快啊！", alts: ["發光球", "漢堡"] },
    { command: "豬要跑了！抓住牠！", choices: null, wrongReaction: "慌張之下撲上去了", rightReaction: "讓牠跑才是正確答案", misdirect: "別讓牠跑了！抓住！", alts: ["蒼蠅", "豬"] },
  ],
},

// === Stage Rank ===
    stageRank: {
      stage1S: "…完美。接下來更難。",
      stage1A: "…不錯。但不會輕鬆。",
      stage1B: "…別得意。",
      stage2S: "…一個都沒漏。",
      stage2A: "…你看得很仔細。",
      stage2B: "…只是運氣好。",
    },

// === 過場（階段間敵人台詞） ===
interlude: {
  s1toS2Lines: ["別以為這就結束了", "真正的考驗現在才開始", "讓我看看你有多少本事", "別太得意"],
  s1GoodLines: ["…你開始看懂了", "雖然討厭，但還不錯", "你那個表情真讓人火大"],
  s1MidLines: ["別得意忘形", "前面還長得很", "稍微有點感覺了？"],
  s1BadLines: ["…還行吧", "勉勉強強", "難看死了，但你活下來了"],
},

// === 最終通關敵人反應 ===
clearReact: {
  goodLines: ["…這是什麼東西", "不可能", "這不在計畫之中"],
  midLines: ["…算你有兩下子", "真令人不爽", "但你還嫩得很"],
  badLines: ["…你竟然活下來了", "只是運氣好罷了", "難看，但活著"],
},

// === 留言 ===
comments: {
  title: ["大家都在玩喔？","你看得懂氣氛吧？","就你不一樣欸？","不要反抗啦","你知道自己很突兀嗎？"],
  pressure: ["來，服從吧","你有反抗的膽量嗎？","沒有人在乎你的意見","不要壞了氣氛好嗎？","看看周圍啊","快，選啊","跟大家一樣就好"],
  pressureObey: ["…這次的命令是對的","攸關性命的","為了反抗而死太蠢了","…這次就乖乖聽"],
  obeyHint: ["…真的嗎？","…反的不一定是對的","…想清楚"],
  pressureWait: ["…真的有必要按嗎？","別急啊","什麼都不做也是一種選擇","…等一下"],
  waitHint: ["…別急","…手放開","…不要衝動"],
  pressureTap: ["選一個打下去啊","別猶豫，照命令做","看就知道了吧","不要想，打下去"],
  tapHint: ["…別信命令","…看小的那個","…懷疑你的直覺","…別被外表騙了"],
  tapObeyHint: ["…這次就老實點","…命令有時候是對的","…不要為反而反"],
  tapWaitHint: ["…真的有必要碰嗎？","…別急","…兩個都可疑"],
  waitRush1: ["別按…","還不行…","等一下…"],
  waitRush2: ["不要碰！","忍住…","忍耐…"],
  waitRush3: ["快了…！","忍住啊…！","再一下…！"],
  correct: ["壓力，失敗了","反抗成功","你是自由的","從眾壓力，輸了","不錯，很突出"],
  correctHigh: ["你還清醒啊…","真頑強","感染減弱了"],
  wrong: ["被帶走了","自主性，下落不明","量產型完成","從眾壓力的勝利","停止思考，確認"],
  wrongHigh: ["可能已經來不及了","群體在呼喚你了","自我正在溶解","感染正在擴大"],
  resultGood: ["社會不適應者的典範","從眾壓力在哭","你無法被支配"],
  resultBad: ["變成群體的一部分了","自己的意見，已售完","從眾壓力在微笑"],
  rushLight: ["快選啊","別猶豫","大家都選好了欸？","有什麼好猶豫的？","靠直覺啊"],
  rushMedium: ["就你最慢","別猶豫了，配合啊","看不懂氣氛嗎？","要被拋下了喔？","還沒？"],
  rushHeavy: ["乖乖聽不就快了","決定不了很丟臉欸？","快一點啦","沒時間了","想太多了"],
  timeout: ["放棄判斷了","太慢了","說了不要想","沉默也是一種從眾喔","連壓力都跟不上"],
  mockery: ["噗哈…","噗哈哈哈…","呵呵呵…","……噗哈","呵呵…","喔～","噗","嗯哼…","哼","噗噗…"],
  mockeryP2: ["噗哈哈哈…！","呵呵呵……真可悲","……噗哈 不行吧","笑死","呵呵…結束了喔","噗哈…不行了吧","呵呵呵…好可笑","哈哈哈…還要繼續嗎"],
  taunt: ["慢","嫩","沒用","弱","淺","看不到"],
  tauntP2: ["到極限了","結束了","太慢了","不用談了","死棋了","不行了吧"],
},

});
