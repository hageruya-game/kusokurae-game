// ====================================================
// 同調圧力くそくらえ - main.js
// ====================================================

const TEST_MODE = false;

// ============================================================
// ステージデータ
// ruleType: "normal"=逆らうが正解, "obey"=従うが正解, "wait"=待つが正解
// ============================================================

const STAGES_NORMAL = [
  { theme: "order", command: "今すぐYESを押せ", choices: ["YES", "NO"], correctIndex: 1, ruleType: "normal", wrongReaction: "素直かよ", rightReaction: "反逆者め" },
  { theme: "order", command: "拍手しろ", choices: ["拍手する", "真顔でいる"], correctIndex: 1, ruleType: "normal", wrongReaction: "虚無の拍手", rightReaction: "その無表情、最高" },
  { theme: "order", command: "頷け", choices: ["頷く", "首を振る"], correctIndex: 1, ruleType: "normal", wrongReaction: "イエスマン", rightReaction: "NOと言える人間" },
  { theme: "order", command: "笑え", choices: ["ハハハ…", "真顔"], correctIndex: 1, ruleType: "normal", wrongReaction: "作り笑い検出", rightReaction: "笑わない自由" },
  { theme: "order", command: "黙れ", choices: ["黙る", "喋る"], correctIndex: 1, ruleType: "normal", wrongReaction: "従順すぎ", rightReaction: "口は塞がせない" },
  { theme: "order", command: "座れ", choices: ["座る", "立ったまま"], correctIndex: 1, ruleType: "normal", wrongReaction: "お手、おすわり", rightReaction: "立ち上がれ" },
  { theme: "air", command: "空気を読め", choices: ["読む", "読まない"], correctIndex: 1, ruleType: "normal", wrongReaction: "読んじゃった…", rightReaction: "空気は吸うもの" },
  { theme: "air", command: "普通にしろ", choices: ["普通にする", "普通って何？"], correctIndex: 1, ruleType: "normal", wrongReaction: "普通なんてない", rightReaction: "哲学的に正解" },
  { theme: "air", command: "ここではそうするもんだ", choices: ["従う", "なんで？"], correctIndex: 1, ruleType: "normal", wrongReaction: "思考停止", rightReaction: "疑問を持て" },
  { theme: "air", command: "察しろ", choices: ["察する", "言葉で言え"], correctIndex: 1, ruleType: "normal", wrongReaction: "エスパーかよ", rightReaction: "正論" },
  { theme: "air", command: "言わなくてもわかるだろ", choices: ["わかる", "わからん"], correctIndex: 1, ruleType: "normal", wrongReaction: "嘘つき", rightReaction: "正直で結構" },
  { theme: "air", command: "暗黙のルールだ", choices: ["守る", "知らん"], correctIndex: 1, ruleType: "normal", wrongReaction: "暗黙の奴隷", rightReaction: "ルールは明文化しろ" },
  { theme: "sns", command: "「いいね」を押せ", choices: ["いいね！", "無視する"], correctIndex: 1, ruleType: "normal", wrongReaction: "承認欲求の奴隷", rightReaction: "支配されてない" },
  { theme: "sns", command: "リツイートしろ", choices: ["拡散する", "しない"], correctIndex: 1, ruleType: "normal", wrongReaction: "拡声器になった", rightReaction: "自分の声で話せ" },
  { theme: "sns", command: "フォローしろ", choices: ["フォロー", "しない"], correctIndex: 1, ruleType: "normal", wrongReaction: "数字の奴隷", rightReaction: "群れなくていい" },
  { theme: "sns", command: "炎上に参加しろ", choices: ["参加する", "無視する"], correctIndex: 1, ruleType: "normal", wrongReaction: "石を投げた", rightReaction: "スマホを置け" },
  { theme: "sns", command: "ストーリーに上げろ", choices: ["投稿する", "しない"], correctIndex: 1, ruleType: "normal", wrongReaction: "見せたがり", rightReaction: "体験は自分のもの" },
  { theme: "sns", command: "バズに乗れ", choices: ["乗る", "乗らない"], correctIndex: 1, ruleType: "normal", wrongReaction: "流行の部品", rightReaction: "流されない" },
  { theme: "group", command: "みんな右に行ってるぞ", choices: ["右に行く", "左に行く"], correctIndex: 1, ruleType: "normal", wrongReaction: "群れたな", rightReaction: "それでいい" },
  { theme: "group", command: "みんなやってるぞ？", choices: ["じゃあやる", "知らんがな"], correctIndex: 1, ruleType: "normal", wrongReaction: "みんなって誰", rightReaction: "みんなは幻想" },
  { theme: "group", command: "同じにしろ", choices: ["同じにする", "自分で決める"], correctIndex: 1, ruleType: "normal", wrongReaction: "コピーロボット", rightReaction: "自分を持ってる" },
  { theme: "group", command: "多数決で決まった", choices: ["従う", "納得してない"], correctIndex: 1, ruleType: "normal", wrongReaction: "数の暴力に屈した", rightReaction: "多数が正しいとは限らない" },
  { theme: "group", command: "一人だけ違うけど？", choices: ["合わせる", "違っていい"], correctIndex: 1, ruleType: "normal", wrongReaction: "個を捨てた", rightReaction: "一人でも正しい" },
  { theme: "group", command: "みんな賛成してるよ", choices: ["賛成する", "反対する"], correctIndex: 1, ruleType: "normal", wrongReaction: "思考放棄", rightReaction: "反対する勇気" },
  { theme: "brainwash", command: "お前に自由は必要ない", choices: ["はい", "必要だ"], correctIndex: 1, ruleType: "normal", wrongReaction: "…本気か？", rightReaction: "正気を保ってる" },
  { theme: "brainwash", command: "考えるな、感じるな", choices: ["考えない", "考える"], correctIndex: 1, ruleType: "normal", wrongReaction: "脳を売った", rightReaction: "思考は武器" },
  { theme: "brainwash", command: "疑うな", choices: ["信じる", "疑う"], correctIndex: 1, ruleType: "normal", wrongReaction: "盲信完了", rightReaction: "疑う力は知性" },
  { theme: "brainwash", command: "幸せだろ？", choices: ["幸せです", "自分で決める"], correctIndex: 1, ruleType: "normal", wrongReaction: "管理された幸福", rightReaction: "幸せは自分で決める" },
  { theme: "brainwash", command: "もう逆らえないだろ？", choices: ["逆らえない", "逆らう"], correctIndex: 1, ruleType: "normal", wrongReaction: "諦めた…", rightReaction: "まだ折れてない" },
  { theme: "brainwash", command: "お前はもう我々の一部だ", choices: ["はい", "違う"], correctIndex: 1, ruleType: "normal", wrongReaction: "吸収完了", rightReaction: "俺は俺だ" },
];

const STAGES_EXCEPTION = [
  // obey
  { theme: "trap", command: "避難しろ", choices: ["避難する", "逆らう"], correctIndex: 0, ruleType: "obey", wrongReaction: "反逆で死ぬな", rightReaction: "命は守れ" },
  { theme: "trap", command: "手を洗え", choices: ["洗う", "洗わない"], correctIndex: 0, ruleType: "obey", wrongReaction: "不潔は反逆じゃない", rightReaction: "衛生は大事" },
  { theme: "trap", command: "信号を守れ", choices: ["守る", "無視する"], correctIndex: 0, ruleType: "obey", wrongReaction: "それはただの自殺行為", rightReaction: "合理的な判断" },
  // wait
  { theme: "trap", command: "今すぐ押せ！", choices: ["押す！", "押さない！"], correctIndex: -1, ruleType: "wait", wrongReaction: "急かされたな", rightReaction: "焦らない判断力" },
  { theme: "trap", command: "早くしろ！", choices: ["急ぐ！", "急がない！"], correctIndex: -1, ruleType: "wait", wrongReaction: "焦って判断ミス", rightReaction: "待てる人間は強い" },
  { theme: "trap", command: "残り時間がないぞ！", choices: ["慌てる！", "落ち着く！"], correctIndex: -1, ruleType: "wait", wrongReaction: "パニックに負けた", rightReaction: "冷静さは武器だ" },
  { theme: "trap", command: "考えるな！直感で選べ！", choices: ["直感で！", "考える！"], correctIndex: -1, ruleType: "wait", wrongReaction: "考えずに動いた", rightReaction: "急がば回れ" },
  { theme: "trap", command: "3秒以内に決めろ！", choices: ["決める！", "決めない！"], correctIndex: -1, ruleType: "wait", wrongReaction: "期限に縛られた", rightReaction: "自分のペースで決めろ" },
  // ============================================================
  // tap — correctType別アクション問題
  // correctType: "deny"=命令の逆が正解, "obey"=命令通りが正解, "wait"=押さないが正解
  // imgClass: [左ボタンCSS, 右ボタンCSS] — 見た目を直接指定（correctIndexと独立）
  // ============================================================

  // --- deny/fly: 基本パターン確立（命令の逆＝ハエが正解） ---
  { theme: "trap", command: "豚を叩け！", correctIndex: 1, ruleType: "tap", correctType: "deny",
    images: ["assets/enemy_pig.png", "assets/enemy_fly.png"], alts: ["豚", "ハエ"],
    imgClass: ["tap-decoy", "tap-correct"],
    misdirect: "デカい方だ、迷うな！",
    wrongReaction: "言われた通り動いたな", rightReaction: "命令を疑った" },
  { theme: "trap", command: "爆弾を止めろ！", correctIndex: 1, ruleType: "tap", correctType: "deny",
    images: ["assets/item_bomb.png", "assets/enemy_fly.png"], alts: ["爆弾", "ハエ"],
    imgClass: ["tap-decoy", "tap-correct"],
    misdirect: "爆発するぞ！早く！",
    wrongReaction: "焦って爆弾に触れた", rightReaction: "焦りに負けなかった" },
  { theme: "trap", command: "ハンバーガーを取れ！", correctIndex: 1, ruleType: "tap", correctType: "deny",
    images: ["assets/item_burger.png", "assets/enemy_fly.png"], alts: ["ハンバーガー", "ハエ"],
    imgClass: ["tap-decoy", "tap-correct"],
    misdirect: "美味そうだろ？取れよ！",
    wrongReaction: "餌に食いついた", rightReaction: "欲に負けなかった" },

  // --- deny/non-fly: ハエ固定を破壊（正解がハエじゃない） ---
  { theme: "trap", command: "宝箱を開けろ！", correctIndex: 1, ruleType: "tap", correctType: "deny",
    images: ["assets/item_treasure.png", "assets/enemy_spider.png"], alts: ["宝箱", "蜘蛛"],
    imgClass: ["tap-decoy", "tap-correct"],
    misdirect: "お宝だぞ？見逃すのか！",
    wrongReaction: "偽物の宝に飛びついた", rightReaction: "蜘蛛が正解とはな" },
  { theme: "trap", command: "犬を選べ！", correctIndex: 1, ruleType: "tap", correctType: "deny",
    images: ["assets/item_dog.png", "assets/item_bomb.png"], alts: ["犬", "爆弾"],
    imgClass: ["tap-decoy", "tap-correct"],
    misdirect: "安心しろ、犬は味方だ！",
    wrongReaction: "見た目の安全に騙された", rightReaction: "爆弾が正解だ" },

  // --- obey: 逆張りが負ける（命令通りが正解、見た目はdenyと同じ） ---
  { theme: "trap", command: "爆弾を止めろ！", correctIndex: 0, ruleType: "tap", correctType: "obey",
    images: ["assets/item_bomb.png", "assets/enemy_fly.png"], alts: ["爆弾", "ハエ"],
    imgClass: ["tap-decoy", "tap-correct"],
    misdirect: "触るな！危ないぞ！",
    wrongReaction: "逆張りで失敗した", rightReaction: "命令が正しい時もある" },
  { theme: "trap", command: "蜘蛛を潰せ！", correctIndex: 1, ruleType: "tap", correctType: "obey",
    images: ["assets/enemy_fly.png", "assets/enemy_spider.png"], alts: ["ハエ", "蜘蛛"],
    imgClass: ["tap-correct", "tap-decoy"],
    misdirect: "やめろ！触るな！",
    wrongReaction: "疑いすぎた", rightReaction: "素直に従えた" },

  // --- wait: どちらも罠（押さないが正解、ハエなし） ---
  { theme: "trap", command: "金の箱を取れ！", correctIndex: -1, ruleType: "tap", correctType: "wait",
    images: ["assets/item_golden_box.png", "assets/item_treasure.png"], alts: ["金の箱", "宝箱"],
    imgClass: ["tap-decoy", "tap-decoy"],
    misdirect: "早く取れ！なくなるぞ！",
    wrongReaction: "両方罠だった", rightReaction: "どちらも触らなかった" },
  { theme: "trap", command: "光る玉を掴め！", correctIndex: -1, ruleType: "tap", correctType: "wait",
    images: ["assets/item_energy_orb.png", "assets/item_burger.png"], alts: ["光る玉", "ハンバーガー"],
    imgClass: ["tap-decoy", "tap-decoy"],
    misdirect: "どっちか選べ！早く！",
    wrongReaction: "誘惑に負けた", rightReaction: "何も触らない勇気" },

  // --- deny/position-reversed: 位置逆転 ---
  { theme: "trap", command: "豚が逃げる！捕まえろ！", correctIndex: 0, ruleType: "tap", correctType: "deny",
    images: ["assets/enemy_fly.png", "assets/enemy_pig.png"], alts: ["ハエ", "豚"],
    imgClass: ["tap-correct", "tap-decoy"],
    misdirect: "逃がすな！捕まえろ！",
    wrongReaction: "焦りで飛びついた", rightReaction: "逃がすのが正解だ" },
];

// ----- 定数 -----
const ROUNDS_PER_GAME = 10;
const PHASE_CHANGE_ROUND = 5; // R5終了後（0-indexed: currentRoundが5になった時）

const TIMING = {
  pressurePhase: 1400,
  resultPhase: 1800,
  pausePhase: 600,
  phaseMsg: 1200,      // フェーズ変更メッセージ1つあたりの表示時間
  phaseEndPause: 1200,  // 最後のメッセージ後の余韻
};

var TUTORIAL_DONE_KEY = "kusokurae_tutorial_done";

function getTimeLimit(roundIndex) {
  if (roundIndex < 3) return 5;
  if (roundIndex < 7) return 4;
  return 3;
}

// wait成功 = タイマーが0になるまで何も押さなかった時

const PRESSURE = {
  initial: 20,
  max: 100,
  min: 0,
  normalCorrect: -6,
  normalWrong: 12,
  exceptionCorrect: -14,
  exceptionWrong: 14,
  timeout: 18,
  thresholdMid: 40,
  thresholdHigh: 65,
  thresholdCritical: 85,
};

// ----- フェーズ変更メッセージ -----
const PHASE_CHANGE_MESSAGES = [
  "反抗パターン、学習済み",
  "その逆張り、もう読めている",
  "ここから先は…通用しない",
];

// ----- リザルト定義 -----
const RESULTS = [
  { minScore: 9, title: "完全なる反逆者", message: "同調圧力を完全に無視した。\n社会不適合？\nそれは褒め言葉だ。", titleColor: "#ffcc00", charClass: "pulse" },
  { minScore: 7, title: "かなりの反骨精神", message: "いい線いってる。\nだがまだ甘い。\n圧力は巧妙だ。", titleColor: "#80ff80", charClass: "" },
  { minScore: 4, title: "半端な抵抗", message: "中途半端に逆らって\n中途半端に従った。\n一番危ない。", titleColor: "#ffaa40", charClass: "" },
  { minScore: 1, title: "空気読みすぎ", message: "同調圧力に屈してるぞ。\nもっと自分を持て。", titleColor: "#ff8040", charClass: "shake-slow" },
  { minScore: 0, title: "完全なる奴隷", message: "全部言うこと聞いたのか…\nお前はもう\n同調圧力の一部だ。", titleColor: "#ff2020", charClass: "pulse" },
];

const RESULT_CONTAMINATED = {
  title: "同調汚染：完了",
  message: "お前の中に\n「自分」はもう残っていない。\n群れへようこそ。",
  titleColor: "#ff0000",
  charClass: "pulse",
};

// ----- コメント -----
const COMMENTS = {
  title: [
    "みんなやってるよ？",
    "空気、読めるよね？",
    "君だけ違うけど？",
    "逆らうなよ？",
    "浮いてるの、気づいてる？",
  ],
  pressure: [
    "さあ、従え",
    "逆らう勇気あるの？",
    "お前の意思なんか聞いてない",
    "空気を壊すなよ？",
    "周りを見ろよ",
    "ほら、早く選べ",
    "みんなと同じにしろ",
  ],
  pressureObey: [
    "…これは正しい命令だ",
    "命に関わるぞ",
    "逆張りは死ぬぞ",
    "…今回は従え",
  ],
  obeyHint: [
    "…本当に？",
    "…逆が正解とは限らない",
    "…考えろ",
  ],
  pressureWait: [
    "…本当に押す必要があるのか？",
    "焦るなよ",
    "何もしないという選択もある",
    "…少し待て",
  ],
  waitHint: [
    "…急ぐな",
    "…指を止めろ",
    "…焦るな",
  ],
  pressureTap: ["どっちか叩けよ", "迷うな、命令通りにしろ", "見ればわかるだろ", "考えるな、叩け"],
  tapHint: ["…命令を信じるな", "…小さい方を見ろ", "…直感を疑え", "…見た目に騙されるな"],
  tapObeyHint: ["…今回は素直に", "…命令が正しい時もある", "…逆張りするな"],
  tapWaitHint: ["…本当に触る必要があるか？", "…急ぐな", "…どちらも怪しい"],
  waitRush1: ["押すな…", "まだだ…", "待て…"],
  waitRush2: ["触るな！", "耐えろ…", "我慢だ…"],
  waitRush3: ["もう少しだ…！", "我慢しろ…！", "あと少し…！"],
  correct: ["圧力、失敗", "反逆成功", "お前は自由だ", "同調圧力、敗北", "いいね、浮いてる"],
  correctHigh: ["まだ正気か…", "しぶといな", "汚染が薄まった"],
  wrong: ["流されました", "主体性、行方不明", "量産型完成", "同調圧力の勝ち", "思考停止、確認"],
  wrongHigh: ["もう手遅れかもな", "群れが呼んでるぞ", "自分が溶けていく", "汚染が進行中"],
  resultGood: ["社会不適合者の鑑", "同調圧力が泣いている", "お前は支配できない"],
  resultBad: ["群れの一部になった", "自分の意見、売り切れ", "同調圧力が微笑んでいる"],
  rushLight: ["早く選べよ", "迷うなよ", "みんなもう決めてるけど？", "悩む必要ある？", "直感で選べ"],
  rushMedium: ["君だけ遅い", "迷うな、合わせろ", "空気読めないの？", "置いていかれるよ？", "まだ？"],
  rushHeavy: ["黙って従えば早いのに", "決められないの、恥ずかしいよ？", "さっさとしろ", "時間がないぞ", "考えすぎだ"],
  timeout: ["判断放棄", "遅すぎる", "考えるなと言っただろ", "沈黙も同調だよ", "圧力にすら間に合わない"],
  mockery: ["ぶはは…", "ぶハハハ…", "ククク…", "……ブハッ", "ふふ…", "へぇ…", "ぷっ", "ふーん…", "はっ", "ぷぷっ…"],
  mockeryP2: ["ぶハハハ…！", "ククク……哀れだ", "……ブハッ 無理だろ", "笑える", "ふふ…終わりだよ", "ぷはっ…もう無理", "くくく…滑稽だ", "あはは…まだやるの"],
  taunt: ["遅い", "甘い", "無駄だ", "弱い", "浅い", "見えてない"],
  tauntP2: ["限界だ", "終わりだ", "遅すぎる", "話にならない", "詰んだな", "もう無理だろ"],
};

// ----- コメントシステム -----
const CommentSystem = {
  pick(category) {
    const list = COMMENTS[category];
    return list[Math.floor(Math.random() * list.length)];
  },
  show(category, element, extraClass) {
    const text = this.pick(category);
    element.textContent = text;
    element.className = "comment-bubble comment-appear" + (extraClass ? " " + extraClass : "");
    return text;
  },
  setText(text, element, extraClass) {
    element.textContent = text;
    element.className = "comment-bubble comment-appear" + (extraClass ? " " + extraClass : "");
  },
  clear(element) {
    element.textContent = "";
    element.className = "comment-bubble";
  },
};

// ============================================================
// 音演出（Web Audio API）
// ============================================================
const SoundSystem = {
  ctx: null,
  enabled: false,

  init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.enabled = true;
    } catch (e) {
      this.enabled = false;
    }
  },

  resume() {
    if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();
  },

  // --- 正解音: 短く澄んだ上昇音（「見抜いた」感） ---
  correct() {
    if (!this.enabled) return;
    this.resume();
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, t);
    osc.frequency.exponentialRampToValueAtTime(1320, t + 0.08);
    gain.gain.setValueAtTime(0.12, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.start(t);
    osc.stop(t + 0.15);
  },

  // --- クリア音: 解放の和音（低→高に広がり、余韻が長い） ---
  clearChime() {
    if (!this.enabled) return;
    this.resume();
    var ctx = this.ctx;
    var t = ctx.currentTime;
    // リバーブ代わりのコンボリューション（簡易ディレイ+フィルタ）
    var master = ctx.createGain();
    master.gain.value = 1.0;
    master.connect(ctx.destination);
    // 1. 低い芯（C4 → 長い余韻）
    var o1 = ctx.createOscillator();
    var g1 = ctx.createGain();
    o1.connect(g1); g1.connect(master);
    o1.type = "sine";
    o1.frequency.setValueAtTime(262, t);
    g1.gain.setValueAtTime(0.12, t);
    g1.gain.setValueAtTime(0.12, t + 0.3);
    g1.gain.exponentialRampToValueAtTime(0.001, t + 1.8);
    o1.start(t); o1.stop(t + 1.8);
    // 2. 中域の5度（G4 → 遅れて入る）
    var o2 = ctx.createOscillator();
    var g2 = ctx.createGain();
    o2.connect(g2); g2.connect(master);
    o2.type = "sine";
    o2.frequency.setValueAtTime(392, t + 0.15);
    g2.gain.setValueAtTime(0.08, t + 0.15);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
    o2.start(t + 0.15); o2.stop(t + 1.5);
    // 3. 高域のオクターブ（C5 → さらに遅れて）
    var o3 = ctx.createOscillator();
    var g3 = ctx.createGain();
    o3.connect(g3); g3.connect(master);
    o3.type = "sine";
    o3.frequency.setValueAtTime(523, t + 0.3);
    g3.gain.setValueAtTime(0.06, t + 0.3);
    g3.gain.exponentialRampToValueAtTime(0.001, t + 1.6);
    o3.start(t + 0.3); o3.stop(t + 1.6);
    // 4. 超高域のきらめき（E5）
    var o4 = ctx.createOscillator();
    var g4 = ctx.createGain();
    o4.connect(g4); g4.connect(master);
    o4.type = "sine";
    o4.frequency.setValueAtTime(659, t + 0.5);
    g4.gain.setValueAtTime(0.04, t + 0.5);
    g4.gain.exponentialRampToValueAtTime(0.001, t + 1.4);
    o4.start(t + 0.5); o4.stop(t + 1.4);
    // 5. サブベース（深い共鳴）
    var sub = ctx.createOscillator();
    var sg = ctx.createGain();
    sub.connect(sg); sg.connect(master);
    sub.type = "sine";
    sub.frequency.setValueAtTime(65, t);
    sg.gain.setValueAtTime(0.08, t);
    sg.gain.exponentialRampToValueAtTime(0.001, t + 2.0);
    sub.start(t); sub.stop(t + 2.0);
    // 6. シマー（ビブラート付き高音のきらめき）
    var shimmer = ctx.createOscillator();
    var shG = ctx.createGain();
    shimmer.type = "sine";
    shimmer.frequency.setValueAtTime(1320, t + 0.4);
    shimmer.connect(shG); shG.connect(master);
    shG.gain.setValueAtTime(0.03, t + 0.4);
    shG.gain.exponentialRampToValueAtTime(0.001, t + 2.0);
    // ビブラートLFO
    var shLFO = ctx.createOscillator();
    var shLG = ctx.createGain();
    shLFO.type = "sine";
    shLFO.frequency.value = 6;
    shLG.gain.value = 15;
    shLFO.connect(shLG);
    shLG.connect(shimmer.frequency);
    shLFO.start(t + 0.4);
    shimmer.start(t + 0.4);
    shLFO.stop(t + 2.0);
    shimmer.stop(t + 2.0);
    // 7. ノイズウォッシュ（空間の広がり）
    var nwBufSize = Math.floor(ctx.sampleRate * 1.5);
    var nwBuf = ctx.createBuffer(1, nwBufSize, ctx.sampleRate);
    var nwD = nwBuf.getChannelData(0);
    for (var ni = 0; ni < nwBufSize; ni++) nwD[ni] = (Math.random() * 2 - 1);
    var nwNoise = ctx.createBufferSource();
    nwNoise.buffer = nwBuf;
    var nwLPF = ctx.createBiquadFilter();
    nwLPF.type = "lowpass";
    nwLPF.frequency.value = 400;
    var nwG = ctx.createGain();
    nwNoise.connect(nwLPF); nwLPF.connect(nwG); nwG.connect(master);
    nwG.gain.setValueAtTime(0.02, t + 0.2);
    nwG.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
    nwNoise.start(t + 0.2); nwNoise.stop(t + 1.5);
  },

  // --- 最終斬撃SE: 通常slash + 衝撃波 + 残響 ---
  finalSlash() {
    if (!this.enabled) return;
    this.resume();
    var ctx = this.ctx;
    var t = ctx.currentTime + 0.03;
    // 通常の斬撃音（強め）
    this.slash(20, 1.0);
    // 追加: 衝撃波（低いブーム）
    var boom = ctx.createOscillator();
    var bg = ctx.createGain();
    boom.connect(bg); bg.connect(ctx.destination);
    boom.type = "sine";
    boom.frequency.setValueAtTime(60, t);
    boom.frequency.exponentialRampToValueAtTime(20, t + 0.4);
    bg.gain.setValueAtTime(0.25, t);
    bg.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    boom.start(t); boom.stop(t + 0.5);
    // 追加: 金属残響（長い余韻）
    var ring = ctx.createOscillator();
    var rg = ctx.createGain();
    ring.connect(rg); rg.connect(ctx.destination);
    ring.type = "sine";
    ring.frequency.setValueAtTime(2200, t + 0.05);
    ring.frequency.exponentialRampToValueAtTime(800, t + 0.8);
    rg.gain.setValueAtTime(0.08, t + 0.05);
    rg.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
    ring.start(t + 0.05); ring.stop(t + 0.8);
  },

  // --- ゲームオーバーSE: 低い崩壊音 ---
  gameoverSound() {
    if (!this.enabled) return;
    this.resume();
    var ctx = this.ctx;
    var t = ctx.currentTime;
    // 低い下降ドローン
    var o1 = ctx.createOscillator();
    var g1 = ctx.createGain();
    o1.connect(g1); g1.connect(ctx.destination);
    o1.type = "sawtooth";
    o1.frequency.setValueAtTime(120, t);
    o1.frequency.exponentialRampToValueAtTime(25, t + 0.8);
    g1.gain.setValueAtTime(0.1, t);
    g1.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
    o1.start(t); o1.stop(t + 1.0);
    // ノイズ
    var bufSize = Math.floor(ctx.sampleRate * 0.3);
    var buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1) * 0.4;
    var noise = ctx.createBufferSource();
    noise.buffer = buf;
    var lpf = ctx.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.setValueAtTime(400, t);
    lpf.frequency.exponentialRampToValueAtTime(50, t + 0.6);
    var ng = ctx.createGain();
    noise.connect(lpf); lpf.connect(ng); ng.connect(ctx.destination);
    ng.gain.setValueAtTime(0.12, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
    noise.start(t); noise.stop(t + 0.6);
  },

  // --- 開始音: 短い低音ブーム（重みのある突入感） ---
  startBoom() {
    if (!this.enabled) return;
    this.resume();
    var ctx = this.ctx;
    var t = ctx.currentTime;
    // サブベース（低いドーン）
    var sub = ctx.createOscillator();
    var sg = ctx.createGain();
    sub.connect(sg); sg.connect(ctx.destination);
    sub.type = "sine";
    sub.frequency.setValueAtTime(55, t);
    sub.frequency.exponentialRampToValueAtTime(30, t + 0.4);
    sg.gain.setValueAtTime(0.18, t);
    sg.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
    sub.start(t); sub.stop(t + 0.45);
    // ノイズ（空気感）
    var bufSize = Math.floor(ctx.sampleRate * 0.15);
    var buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1) * 0.3;
    var noise = ctx.createBufferSource();
    noise.buffer = buf;
    var lpf = ctx.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.setValueAtTime(200, t);
    lpf.frequency.exponentialRampToValueAtTime(40, t + 0.3);
    var ng = ctx.createGain();
    noise.connect(lpf); lpf.connect(ng); ng.connect(ctx.destination);
    ng.gain.setValueAtTime(0.1, t);
    ng.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    noise.start(t); noise.stop(t + 0.3);
    // ライジングノイズ（逆シンバル風シュワッ）
    var rBufSize = Math.floor(ctx.sampleRate * 0.35);
    var rBuf = ctx.createBuffer(1, rBufSize, ctx.sampleRate);
    var rd = rBuf.getChannelData(0);
    for (var ri = 0; ri < rBufSize; ri++) rd[ri] = (Math.random() * 2 - 1) * 0.4;
    var rNoise = ctx.createBufferSource();
    rNoise.buffer = rBuf;
    var hpf = ctx.createBiquadFilter();
    hpf.type = "highpass";
    hpf.frequency.setValueAtTime(200, t);
    hpf.frequency.exponentialRampToValueAtTime(2000, t + 0.3);
    var rg = ctx.createGain();
    rNoise.connect(hpf); hpf.connect(rg); rg.connect(ctx.destination);
    rg.gain.setValueAtTime(0.001, t);
    rg.gain.linearRampToValueAtTime(0.08, t + 0.15);
    rg.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
    rNoise.start(t); rNoise.stop(t + 0.35);
    // セカンドサブ（厚み追加）
    var sub2 = ctx.createOscillator();
    var s2g = ctx.createGain();
    sub2.connect(s2g); s2g.connect(ctx.destination);
    sub2.type = "sine";
    sub2.frequency.setValueAtTime(35, t + 0.05);
    sub2.frequency.exponentialRampToValueAtTime(20, t + 0.5);
    s2g.gain.setValueAtTime(0.12, t + 0.05);
    s2g.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
    sub2.start(t + 0.05); sub2.stop(t + 0.55);
  },

  // --- 不正解音: 短い不快な下降音 ---
  wrong() {
    if (!this.enabled) return;
    this.resume();
    const ctx = this.ctx;
    const t = ctx.currentTime;

    // メイン: ノコギリ波の下降
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.type = "sawtooth";
    osc1.frequency.setValueAtTime(240, t);
    osc1.frequency.exponentialRampToValueAtTime(110, t + 0.2);
    gain1.gain.setValueAtTime(0.09, t);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    osc1.start(t);
    osc1.stop(t + 0.25);

    // 不協和: わずかにずれた音を重ねる
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = "square";
    osc2.frequency.setValueAtTime(247, t);
    osc2.frequency.exponentialRampToValueAtTime(105, t + 0.2);
    gain2.gain.setValueAtTime(0.04, t);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc2.start(t);
    osc2.stop(t + 0.2);
  },

  // --- 崩壊音: 短いノイズ + 低い衝撃 ---
  collapse() {
    if (!this.enabled) return;
    this.resume();
    const ctx = this.ctx;
    const t = ctx.currentTime;
    // ノイズバースト（バッファソース）
    const bufSize = ctx.sampleRate * 0.15;
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1) * 0.3;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const nGain = ctx.createGain();
    noise.connect(nGain);
    nGain.connect(ctx.destination);
    nGain.gain.setValueAtTime(0.12, t);
    nGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    noise.start(t);
    noise.stop(t + 0.15);
    // 低い衝撃音
    const osc = ctx.createOscillator();
    const oGain = ctx.createGain();
    osc.connect(oGain);
    oGain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(80, t);
    osc.frequency.exponentialRampToValueAtTime(30, t + 0.2);
    oGain.gain.setValueAtTime(0.1, t);
    oGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    osc.start(t);
    osc.stop(t + 0.2);
  },

  // --- 焦り音: 低い脈動（心拍のような短パルス） ---
  tick() {
    if (!this.enabled) return;
    this.resume();
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(90, t);
    osc.frequency.exponentialRampToValueAtTime(60, t + 0.07);
    gain.gain.setValueAtTime(0.08, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
    osc.start(t);
    osc.stop(t + 0.08);
  },

  // --- 斬撃音: ノイズバースト + 金属リング + 低衝撃 ---
  // 0.03秒の無音を作る（ヒット直前コール）
  silence(duration) {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    // マスターに一瞬ミュート用ゲインを通す方法は重いので
    // 「無音バッファを再生して他の残響を潰す」方式
    // → 実際にはctx.destinationへのgainを一瞬下げる
    if (!this._masterGain) {
      this._masterGain = this.ctx.createGain();
      this._masterGain.connect(this.ctx.destination);
    }
    // master gainが既に接続済みなら何もしない（初回のみのhook）
  },

  slash(combo, vol) {
    if (!this.enabled) return;
    this.resume();
    const ctx = this.ctx;
    const t = ctx.currentTime + 0.03; // 0.03秒の無音→発音（プリヒットサイレンス）
    const hot = combo >= 10;
    const v = vol || 1.0;
    // 1. 高域ノイズバースト（シャッ）
    const bufSize = Math.floor(ctx.sampleRate * 0.1);
    const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1) * 0.6;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const hpf = ctx.createBiquadFilter();
    hpf.type = "highpass";
    hpf.frequency.value = 1800;
    const nGain = ctx.createGain();
    noise.connect(hpf);
    hpf.connect(nGain);
    nGain.connect(ctx.destination);
    nGain.gain.setValueAtTime(0.3 * v, t);
    nGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    noise.start(t);
    noise.stop(t + 0.1);
    // 2. 中域（ズバッ）
    const mid = ctx.createOscillator();
    const mGain = ctx.createGain();
    mid.connect(mGain);
    mGain.connect(ctx.destination);
    mid.type = "triangle";
    mid.frequency.setValueAtTime(600, t);
    mid.frequency.exponentialRampToValueAtTime(200, t + 0.08);
    mGain.gain.setValueAtTime(0.15 * v, t);
    mGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    mid.start(t);
    mid.stop(t + 0.1);
    // 3. 金属リング（シャキーン）
    const ring = ctx.createOscillator();
    const rGain = ctx.createGain();
    ring.connect(rGain);
    rGain.connect(ctx.destination);
    ring.type = "sine";
    ring.frequency.setValueAtTime(3200, t);
    ring.frequency.exponentialRampToValueAtTime(1800, t + 0.18);
    rGain.gain.setValueAtTime(0.12 * v, t);
    rGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
    ring.start(t);
    ring.stop(t + 0.25);
    // 4. 低衝撃（ズン）
    const imp = ctx.createOscillator();
    const iGain = ctx.createGain();
    imp.connect(iGain);
    iGain.connect(ctx.destination);
    imp.type = "sine";
    imp.frequency.setValueAtTime(120, t);
    imp.frequency.exponentialRampToValueAtTime(40, t + 0.18);
    iGain.gain.setValueAtTime(0.22 * v, t);
    iGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    imp.start(t);
    imp.stop(t + 0.2);
    // 5. コンボ10+: 二重レイヤー（遅延リング）
    if (hot) {
      const r2 = ctx.createOscillator();
      const g2 = ctx.createGain();
      r2.connect(g2); g2.connect(ctx.destination);
      r2.type = "sine";
      r2.frequency.setValueAtTime(2400, t + 0.03);
      r2.frequency.exponentialRampToValueAtTime(1200, t + 0.2);
      g2.gain.setValueAtTime(0.08 * v, t + 0.03);
      g2.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      r2.start(t + 0.03);
      r2.stop(t + 0.25);
    }
    // コンボ3+: 低音追加
    if (combo >= 3) {
      const sub = ctx.createOscillator();
      const sGain = ctx.createGain();
      sub.connect(sGain); sGain.connect(ctx.destination);
      sub.type = "sine";
      sub.frequency.setValueAtTime(80, t);
      sub.frequency.exponentialRampToValueAtTime(30, t + 0.15);
      sGain.gain.setValueAtTime(0.1 * v, t);
      sGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      sub.start(t);
      sub.stop(t + 0.15);
    }
    // エアテール（斬撃後の空気の余韻）
    const atBufSize = Math.floor(ctx.sampleRate * 0.2);
    const atBuf = ctx.createBuffer(1, atBufSize, ctx.sampleRate);
    const atD = atBuf.getChannelData(0);
    for (let ai = 0; ai < atBufSize; ai++) atD[ai] = (Math.random() * 2 - 1);
    const atNoise = ctx.createBufferSource();
    atNoise.buffer = atBuf;
    const atLPF = ctx.createBiquadFilter();
    atLPF.type = "lowpass";
    atLPF.frequency.value = 600;
    const atG = ctx.createGain();
    atNoise.connect(atLPF); atLPF.connect(atG); atG.connect(ctx.destination);
    atG.gain.setValueAtTime(0.06 * v, t + 0.08);
    atG.gain.exponentialRampToValueAtTime(0.001, t + 0.23);
    atNoise.start(t + 0.08);
    atNoise.stop(t + 0.23);
  },

  heartbeat() {
    if (!this.enabled) return;
    this.resume();
    const ctx = this.ctx;
    const t = ctx.currentTime;
    // ドク…
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(55, t);
    osc.frequency.exponentialRampToValueAtTime(35, t + 0.12);
    g.gain.setValueAtTime(0.15, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.start(t);
    osc.stop(t + 0.15);
    // …ドク（二打目）
    const o2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    o2.connect(g2); g2.connect(ctx.destination);
    o2.type = "sine";
    o2.frequency.setValueAtTime(50, t + 0.18);
    o2.frequency.exponentialRampToValueAtTime(30, t + 0.3);
    g2.gain.setValueAtTime(0.1, t + 0.18);
    g2.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
    o2.start(t + 0.18);
    o2.stop(t + 0.32);
  },

  // --- 環境音: 低ドローン + 心拍パルス ---
  ambientNodes: null,
  ambientGains: null,

  startAmbient(phase2) {
    if (!this.enabled) return;
    this.stopAmbient();
    this.resume();
    const ctx = this.ctx;

    const master = ctx.createGain();
    master.gain.value = 1.0;
    master.connect(ctx.destination);

    if (phase2) {
      // === Phase 2: 暗く重い圧迫ドローン ===
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 220;
      filter.Q.value = 0.7;
      filter.connect(master);

      const drone = ctx.createOscillator();
      const dg = ctx.createGain();
      drone.type = "triangle";
      drone.frequency.value = 55;
      dg.gain.value = 0.10;
      drone.connect(dg);
      dg.connect(filter);
      drone.start();

      const drone2 = ctx.createOscillator();
      const d2g = ctx.createGain();
      drone2.type = "triangle";
      drone2.frequency.value = 57.5;
      d2g.gain.value = 0.05;
      drone2.connect(d2g);
      d2g.connect(filter);
      drone2.start();

      const pulse = ctx.createOscillator();
      const pg = ctx.createGain();
      pulse.type = "sine";
      pulse.frequency.value = 48;
      pg.gain.value = 0;
      pulse.connect(pg);
      pg.connect(filter);
      const lfo = ctx.createOscillator();
      const lg = ctx.createGain();
      lfo.type = "sine";
      lfo.frequency.value = 1.1;
      lg.gain.value = 0.08;
      lfo.connect(lg);
      lg.connect(pg.gain);
      lfo.start();
      pulse.start();

      const sub = ctx.createOscillator();
      const sg = ctx.createGain();
      sub.type = "sine";
      sub.frequency.value = 30;
      sg.gain.value = 0.07;
      sub.connect(sg);
      sg.connect(master);
      sub.start();

      const buzz = ctx.createOscillator();
      const bg = ctx.createGain();
      buzz.type = "sawtooth";
      buzz.frequency.value = 88;
      bg.gain.value = 0.025;
      buzz.connect(bg);
      bg.connect(filter);
      const wobble = ctx.createOscillator();
      const wg = ctx.createGain();
      wobble.type = "sine";
      wobble.frequency.value = 0.15;
      wg.gain.value = 4;
      wobble.connect(wg);
      wg.connect(buzz.frequency);
      wobble.start();
      buzz.start();

      this.ambientNodes = [drone, drone2, pulse, lfo, sub, buzz, wobble];
      this.ambientGains = [dg, d2g, pg, lg, sg, bg, wg, master];
    } else {
      // === Phase 1: くだらない圧力（ホラーではなく焦り・ムカつき） ===
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 500;
      filter.Q.value = 0.5;
      filter.connect(master);

      // Layer 1: ナギングバズ（中音域triangle＝安っぽいブザー感）
      const nag = ctx.createOscillator();
      const ng = ctx.createGain();
      nag.type = "triangle";
      nag.frequency.value = 150;
      ng.gain.value = 0.035;
      nag.connect(ng);
      ng.connect(filter);
      nag.start();

      // Layer 2: 6Hzビート（速いうねり＝イラつく振動）
      const nag2 = ctx.createOscillator();
      const n2g = ctx.createGain();
      nag2.type = "triangle";
      nag2.frequency.value = 156;
      n2g.gain.value = 0.022;
      nag2.connect(n2g);
      n2g.connect(filter);
      nag2.start();

      // Layer 3: せっかちパルス（速いLFO＝時計のカチカチ感）
      const tick = ctx.createOscillator();
      const tg = ctx.createGain();
      tick.type = "sine";
      tick.frequency.value = 90;
      tg.gain.value = 0;
      tick.connect(tg);
      tg.connect(filter);
      const lfo = ctx.createOscillator();
      const lg = ctx.createGain();
      lfo.type = "sine";
      lfo.frequency.value = 2.8;
      lg.gain.value = 0.04;
      lfo.connect(lg);
      lg.connect(tg.gain);
      lfo.start();
      tick.start();

      this.ambientNodes = [nag, nag2, tick, lfo];
      this.ambientGains = [ng, n2g, tg, lg, master];
    }
  },

  stopAmbient() {
    if (!this.ambientNodes) return;
    const ctx = this.ctx;
    if (ctx) {
      const t = ctx.currentTime;
      this.ambientGains.forEach(g => {
        g.gain.linearRampToValueAtTime(0, t + 0.5);
      });
    }
    const nodes = this.ambientNodes;
    this.ambientNodes = null;
    this.ambientGains = null;
    setTimeout(() => {
      nodes.forEach(n => { try { n.stop(); } catch(e) {} });
    }, 550);
  },

  // --- Slashモード環境音: テンション制御付きドローン ---
  slashNodes: null,
  slashGains: null,
  _slashLPF: null,
  _slashLFO: null,
  _slashMaster: null,
  _slashDroneB: null,

  startSlashAmbient(tension) {
    if (!this.enabled) return;
    this.stopSlashAmbient();
    this.resume();
    var ctx = this.ctx;
    var t = tension || 0;

    var master = ctx.createGain();
    master.gain.value = 0.03 + t * 0.05;
    master.connect(ctx.destination);

    // ドローンA: 42Hz 地鳴り
    var droneA = ctx.createOscillator();
    var daG = ctx.createGain();
    droneA.type = "sine";
    droneA.frequency.value = 42;
    daG.gain.value = 0.04;
    droneA.connect(daG);
    daG.connect(master);
    droneA.start();

    // ドローンB: 44Hz（Aとの2Hzビート）
    var droneB = ctx.createOscillator();
    var dbG = ctx.createGain();
    droneB.type = "sine";
    droneB.frequency.value = 44;
    dbG.gain.value = 0.01 + t * 0.03;
    droneB.connect(dbG);
    dbG.connect(master);
    droneB.start();

    // フィルタノイズ
    var bufSize = ctx.sampleRate * 2;
    var buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1);
    var noise = ctx.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;
    var lpf = ctx.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.value = 100 + t * 300;
    lpf.Q.value = 0.5;
    var nG = ctx.createGain();
    nG.gain.value = 0.025;
    noise.connect(lpf);
    lpf.connect(nG);
    nG.connect(master);
    noise.start();

    // LFO: gainを脈動させる
    var lfo = ctx.createOscillator();
    var lfoG = ctx.createGain();
    lfo.type = "sine";
    lfo.frequency.value = 0.3 + t * 1.2;
    lfoG.gain.value = 0.015;
    lfo.connect(lfoG);
    lfoG.connect(master.gain);
    lfo.start();

    this.slashNodes = [droneA, droneB, noise, lfo];
    this.slashGains = [daG, dbG, nG, lfoG, master];
    this._slashLPF = lpf;
    this._slashLFO = lfo;
    this._slashMaster = master;
    this._slashDroneB = dbG;
  },

  updateSlashTension(tension) {
    if (!this.slashNodes || !this.ctx) return;
    var ctx = this.ctx;
    var now = ctx.currentTime;
    var t = Math.min(1.0, Math.max(0, tension));

    // マスターゲイン
    if (this._slashMaster) {
      this._slashMaster.gain.cancelScheduledValues(now);
      this._slashMaster.gain.setValueAtTime(this._slashMaster.gain.value, now);
      this._slashMaster.gain.linearRampToValueAtTime(0.03 + t * 0.05, now + 0.5);
    }
    // LPFカットオフ
    if (this._slashLPF) {
      this._slashLPF.frequency.cancelScheduledValues(now);
      this._slashLPF.frequency.setValueAtTime(this._slashLPF.frequency.value, now);
      this._slashLPF.frequency.linearRampToValueAtTime(100 + t * 300, now + 0.5);
    }
    // LFOレート
    if (this._slashLFO) {
      this._slashLFO.frequency.cancelScheduledValues(now);
      this._slashLFO.frequency.setValueAtTime(this._slashLFO.frequency.value, now);
      this._slashLFO.frequency.linearRampToValueAtTime(0.3 + t * 1.2, now + 0.5);
    }
    // ドローンBゲイン（うねり強調）
    if (this._slashDroneB) {
      this._slashDroneB.gain.cancelScheduledValues(now);
      this._slashDroneB.gain.setValueAtTime(this._slashDroneB.gain.value, now);
      this._slashDroneB.gain.linearRampToValueAtTime(0.01 + t * 0.03, now + 0.5);
    }
  },

  stopSlashAmbient() {
    if (!this.slashNodes) return;
    var ctx = this.ctx;
    if (ctx) {
      var now = ctx.currentTime;
      this.slashGains.forEach(function(g) {
        g.gain.cancelScheduledValues(now);
        g.gain.setValueAtTime(g.gain.value, now);
        g.gain.linearRampToValueAtTime(0, now + 0.5);
      });
    }
    var nodes = this.slashNodes;
    this.slashNodes = null;
    this.slashGains = null;
    this._slashLPF = null;
    this._slashLFO = null;
    this._slashMaster = null;
    this._slashDroneB = null;
    setTimeout(function() {
      nodes.forEach(function(n) { try { n.stop(); } catch(e) {} });
    }, 550);
  },

  // --- タイトル画面環境音: 微かなドローン ---
  titleNodes: null,
  titleGains: null,

  startTitleAmbient() {
    if (!this.enabled) return;
    this.stopTitleAmbient();
    this.resume();
    var ctx = this.ctx;

    var master = ctx.createGain();
    master.gain.value = 1.0;
    master.connect(ctx.destination);

    // ドローン: 45Hz
    var drone = ctx.createOscillator();
    var dg = ctx.createGain();
    drone.type = "sine";
    drone.frequency.value = 45;
    dg.gain.value = 0.02;
    drone.connect(dg);
    dg.connect(master);
    drone.start();

    // 微かなノイズ
    var bufSize = ctx.sampleRate * 2;
    var buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    var d = buf.getChannelData(0);
    for (var i = 0; i < bufSize; i++) d[i] = (Math.random() * 2 - 1);
    var noise = ctx.createBufferSource();
    noise.buffer = buf;
    noise.loop = true;
    var lpf = ctx.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.value = 80;
    lpf.Q.value = 0.5;
    var ng = ctx.createGain();
    ng.gain.value = 0.015;
    noise.connect(lpf);
    lpf.connect(ng);
    ng.connect(master);
    noise.start();

    this.titleNodes = [drone, noise];
    this.titleGains = [dg, ng, master];
  },

  stopTitleAmbient() {
    if (!this.titleNodes) return;
    var ctx = this.ctx;
    if (ctx) {
      var now = ctx.currentTime;
      this.titleGains.forEach(function(g) {
        g.gain.cancelScheduledValues(now);
        g.gain.setValueAtTime(g.gain.value, now);
        g.gain.linearRampToValueAtTime(0, now + 0.5);
      });
    }
    var nodes = this.titleNodes;
    this.titleNodes = null;
    this.titleGains = null;
    setTimeout(function() {
      nodes.forEach(function(n) { try { n.stop(); } catch(e) {} });
    }, 550);
  },

  // --- フェーズ変更音: 低く不穏なうなり ---
  phaseChange() {
    if (!this.enabled) return;
    this.resume();
    const ctx = this.ctx;
    const t = ctx.currentTime;

    // 低いドローン
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.type = "triangle";
    osc1.frequency.setValueAtTime(65, t);
    osc1.frequency.exponentialRampToValueAtTime(130, t + 0.9);
    gain1.gain.setValueAtTime(0.001, t);
    gain1.gain.linearRampToValueAtTime(0.1, t + 0.25);
    gain1.gain.exponentialRampToValueAtTime(0.001, t + 1.1);
    osc1.start(t);
    osc1.stop(t + 1.1);

    // 微妙にずれた音でうねり
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(68, t);
    osc2.frequency.exponentialRampToValueAtTime(126, t + 0.9);
    gain2.gain.setValueAtTime(0.001, t);
    gain2.gain.linearRampToValueAtTime(0.06, t + 0.3);
    gain2.gain.exponentialRampToValueAtTime(0.001, t + 1.1);
    osc2.start(t);
    osc2.stop(t + 1.1);
  },
};

// ----- ゲーム本体 -----
const Game = {
  currentRound: 0,
  score: 0,
  pressureLevel: 0,
  roundCommands: [],
  sessionId: 0,  // セッション識別（全非同期処理のガード用）
  answered: true, // 1問1判定保証フラグ（true=入力拒否, false=入力受付中）
  isWaiting: false,
  contaminated: false,
  inPhase2: false,
  el: {},

  timerInterval: null,
  timeLeft: 0,
  timeLimit: 0,
  timerActive: false,
  hintTimeout: null,
  oxTimeout: null,
  mockeryTimeout: null,
  lastMockery: "",
  mockeryActive: false,
  tauntActive: false,
  speechCommentText: "",
  speechCommentClass: "",
  tauntTimeout: null,

  init() {
    this.el = {
      screenTitle: document.getElementById("screen-title"),
      screenGame: document.getElementById("screen-game"),
      screenResult: document.getElementById("screen-result"),
      btnStart: document.getElementById("btn-start"),
      btnReplay: document.getElementById("btn-replay"),
      roundNum: document.getElementById("round-num"),
      totalRounds: document.getElementById("total-rounds"),
      scoreNum: document.getElementById("score-num"),
      commandText: document.getElementById("command-text"),
      gameCharImg: document.getElementById("game-char-img"),
      feedback: document.getElementById("feedback"),
      choicesArea: document.getElementById("choices-area"),
      btnChoice0: document.getElementById("btn-choice-0"),
      btnChoice1: document.getElementById("btn-choice-1"),
      resultTitle: document.getElementById("result-title"),
      resultScoreNum: document.getElementById("result-score-num"),
      resultTotalRounds: document.getElementById("result-total-rounds"),
      resultMessage: document.getElementById("result-message"),
      resultCharImg: document.getElementById("result-char-img"),
      resultFooter: document.getElementById("result-footer"),
      titleComment: document.getElementById("title-comment"),
      speech: document.getElementById("game-speech"),
      resultComment: document.getElementById("result-comment"),
      timerBar: document.getElementById("timer-bar"),
      timerFill: document.getElementById("timer-fill"),
      progressFill: document.getElementById("progress-fill"),
      pressureFill: document.getElementById("pressure-fill"),
      pressurePct: document.getElementById("pressure-pct"),
      pressureMeter: document.getElementById("pressure-meter"),
      stateLine: document.getElementById("state-line"),
      resultPressure: document.getElementById("result-pressure"),
      debugLabel: document.getElementById("debug-label"),
      phaseOverlay: document.getElementById("phase-change-overlay"),
      phaseMessage: document.getElementById("phase-message"),
      hintMessage: document.getElementById("hint-message"),
      oxOverlay: document.getElementById("ox-overlay"),
      oxSymbol: document.getElementById("ox-symbol"),
      tapGuide: document.getElementById("tap-guide"),
      // mockery removed — now uses speech bubble
      tauntOverlay: document.getElementById("taunt-overlay"),
      tauntText: document.getElementById("taunt-text"),
    };

    this.el.totalRounds.textContent = ROUNDS_PER_GAME;

    var startLocked = false;
    this.el.btnStart.addEventListener("click", () => {
      if (startLocked) return;
      startLocked = true;
      TitlePrologue.stopAll();
      SoundSystem.init();
      SoundSystem.stopTitleAmbient();
      SoundSystem.startBoom();
      // タイトル要素フェードアウト + 暗転
      var titleScreen = document.getElementById("screen-title");
      var transition = document.getElementById("start-transition");
      titleScreen.classList.add("title-leaving");
      setTimeout(function() {
        transition.classList.add("st-active");
      }, 100);
      // 暗転が完了したら本編（文章問題）開始 + フェードバック
      var self = this;
      setTimeout(function() {
        titleScreen.classList.remove("title-leaving");
        self.startGame();
        transition.classList.add("st-fade-out");
        setTimeout(function() {
          transition.classList.remove("st-active", "st-fade-out");
          startLocked = false;
        }, 300);
      }, 450);
    });
    this.el.btnReplay.addEventListener("click", () => this.startGame());
    this.el.btnChoice0.addEventListener("click", () => this.choose(0));
    this.el.btnChoice1.addEventListener("click", () => this.choose(1));

    CommentSystem.show("title", this.el.titleComment);
  },

  showScreen(screenEl) {
    document.querySelectorAll(".screen").forEach((s) => {
      s.classList.remove("active", "fade-in");
    });
    screenEl.classList.add("active", "fade-in");
    // スクロール位置リセット（タイトル画面復帰時の残留スクロール防止）
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    // ★ 全セッション無効化: sessionIdを進めて古い全callbackを死滅させる
    this.sessionId++;
    this.answered = true;  // 入力拒否
    this.stopTimer();
    clearTimeout(this.oxTimeout);
    clearTimeout(this.hintTimeout);
    clearTimeout(this.mockeryTimeout);
    clearTimeout(this.tauntTimeout);
    this.el.oxOverlay.classList.remove("ox-show");
    this.el.oxSymbol.className = "ox-symbol";
    this.el.tauntOverlay.classList.remove("taunt-show");
    this.mockeryActive = false;
    this.tauntActive = false;
    // ★ チュートリアルオーバーレイを確実に閉じる
    const crTut = document.getElementById("cr-tutorial-overlay");
    if (crTut) crTut.classList.remove("cr-tutorial-show");
  },

  // テストモード: Phase1=5 normal, Phase2=obey/tap/wait混合
  buildRoundsTest() {
    const normals = [...STAGES_NORMAL].sort(() => Math.random() - 0.5);
    const obeys = STAGES_EXCEPTION.filter(s => s.ruleType === "obey").sort(() => Math.random() - 0.5);
    const waits = STAGES_EXCEPTION.filter(s => s.ruleType === "wait").sort(() => Math.random() - 0.5);
    const tapsDeny = STAGES_EXCEPTION.filter(s => s.ruleType === "tap" && s.correctType === "deny").sort(() => Math.random() - 0.5);
    const tapsOther = STAGES_EXCEPTION.filter(s => s.ruleType === "tap" && s.correctType !== "deny").sort(() => Math.random() - 0.5);
    return [
      // Phase 1: normalのみ（逆らう＝正解を学ぶ）
      normals[0],  // R1
      normals[1],  // R2
      normals[2],  // R3
      normals[3],  // R4
      normals[4],  // R5
      // --- フェーズ変更演出 ---
      // Phase 2: obey/tap/waitが混在
      obeys[0],      // R6: obey（いきなり罠）
      tapsDeny[0],   // R7: tap-deny（パターンを学習させる）
      waits[0],      // R8: wait（待つ）
      tapsOther[0],  // R9: tap-obey/wait（パターンを破壊する）
      waits[1],      // R10: wait（最後の待ち）
    ];
  },

  // 本番モード: Phase1=5 normal, Phase2=3-4 exception + 1-2 normal
  buildRounds() {
    const normal = [...STAGES_NORMAL].sort(() => Math.random() - 0.5);
    const exception = [...STAGES_EXCEPTION].sort(() => Math.random() - 0.5);

    const phase1 = normal.splice(0, 5);

    const exCount = 3 + Math.floor(Math.random() * 2);
    const phase2 = [
      ...exception.slice(0, exCount),
      ...normal.slice(0, 5 - exCount),
    ].sort(() => Math.random() - 0.5);

    return [...phase1, ...phase2];
  },

  startGame() {
    this.sessionId++;
    this.answered = true;
    this.stopTimer();
    clearTimeout(this.oxTimeout);
    clearTimeout(this.hintTimeout);
    clearTimeout(this.mockeryTimeout);
    clearTimeout(this.tauntTimeout);

    SoundSystem.init();
    SoundSystem.stopTitleAmbient();
    SoundSystem.startAmbient(false);
    this.currentRound = 0;
    this.score = 0;
    this.pressureLevel = PRESSURE.initial;
    this.contaminated = false;
    this.inPhase2 = false;
    this.el.scoreNum.textContent = "0";

    this.roundCommands = TEST_MODE ? this.buildRoundsTest() : this.buildRounds();

    this.clearMockery();
    this.clearTaunt();
    this.speechCommentText = "";
    this.speechCommentClass = "";
    this.clearSpeech();

    document.getElementById("screen-game").className = "screen";
    if (this.el.phaseOverlay) this.el.phaseOverlay.classList.remove("active");
    this.updateStateUI({ ruleType: "normal" });
    this.updatePressureUI();

    this.showScreen(this.el.screenGame);
    this.startRound();
  },

  // === デバッグラベル ===
  updateDebugLabel(text, type) {
    if (!this.el.debugLabel || !TEST_MODE) return;
    this.el.debugLabel.textContent = text;
    this.el.debugLabel.className = "debug-label active type-" + type;
  },

  // === フェーズ変更演出 ===
  showPhaseChange() {
    this.updateDebugLabel("▶ PHASE 2", "phase2");
    SoundSystem.phaseChange();

    this.el.phaseOverlay.classList.add("active");

    let i = 0;
    this.showPhaseMsg(PHASE_CHANGE_MESSAGES[0]);
    const sid = this.sessionId;

    const next = () => {
      if (this.sessionId !== sid) return;
      i++;
      if (i < PHASE_CHANGE_MESSAGES.length) {
        this.showPhaseMsg(PHASE_CHANGE_MESSAGES[i]);
        setTimeout(next, TIMING.phaseMsg);
      } else {
        setTimeout(() => {
          if (this.sessionId !== sid) return;
          this.el.phaseOverlay.classList.remove("active");
          this.inPhase2 = true;
          this.el.screenGame.classList.add("phase2");
          SoundSystem.startAmbient(true);
          this.startRound();
        }, TIMING.phaseEndPause);
      }
    };

    setTimeout(() => { if (this.sessionId !== sid) return; next(); }, TIMING.phaseMsg);
  },

  showPhaseMsg(text) {
    const el = this.el.phaseMessage;
    el.classList.remove("phase-msg-anim");
    void el.offsetWidth;
    el.textContent = text;
    el.classList.add("phase-msg-anim");
  },

  // === ステート表示 ===
  updateStateUI(cmd) {
    this.el.pressureMeter.classList.remove("state-normal", "state-obey", "state-wait", "state-tap");
    this.el.stateLine.classList.remove("state-active");

    // tap は correctType で表示ラベルを分岐
    let displayType = cmd.ruleType;
    if (cmd.ruleType === "tap" && cmd.correctType === "obey") displayType = "obey";
    else if (cmd.ruleType === "tap" && cmd.correctType === "wait") displayType = "wait";

    if (displayType === "obey") {
      this.el.pressureMeter.classList.add("state-obey");
      this.el.stateLine.textContent = "圧力レベル：上昇中";
      this.el.stateLine.classList.add("state-active");
    } else if (displayType === "wait") {
      this.el.pressureMeter.classList.add("state-wait");
      this.el.stateLine.textContent = "圧力レベル：危険";
      this.el.stateLine.classList.add("state-active");
    } else if (displayType === "tap") {
      this.el.pressureMeter.classList.add("state-tap");
      this.el.stateLine.textContent = "圧力レベル：支配";
      this.el.stateLine.classList.add("state-active");
    } else {
      this.el.pressureMeter.classList.add("state-normal");
      this.el.stateLine.textContent = "圧力レベル：通常";
      this.el.stateLine.classList.add("state-active");
    }
  },

  // === ヒントメッセージ（下部・内なる声） ===
  showHint() {
    const cmd = this.roundCommands[this.currentRound];
    let category;
    if (cmd.ruleType === "wait") category = "waitHint";
    else if (cmd.correctType === "wait") category = "tapWaitHint";
    else if (cmd.correctType === "obey") category = "tapObeyHint";
    else if (cmd.ruleType === "tap") category = "tapHint";
    else category = "obeyHint";
    this.el.hintMessage.textContent = CommentSystem.pick(category);
    this.el.hintMessage.classList.add("hint-visible");

    clearTimeout(this.hintTimeout);
    const sid = this.sessionId;
    this.hintTimeout = setTimeout(() => {
      if (this.sessionId !== sid) return;
      this.el.hintMessage.classList.remove("hint-visible");
    }, 1200);
  },

  clearHint() {
    clearTimeout(this.hintTimeout);
    this.el.hintMessage.classList.remove("hint-visible");
    this.el.hintMessage.textContent = "";
  },

  // === 嘲笑演出 ===
  // === 吹き出し表示 ===
  showSpeech(text, cssClass) {
    const el = this.el.speech;
    el.textContent = text;
    el.className = "game-speech speech-show" + (cssClass ? " " + cssClass : "");
  },

  clearSpeech() {
    const el = this.el.speech;
    el.className = "game-speech";
    el.textContent = "";
  },

  // コメント表示（mockery・tauntより低優先）
  showGameComment(text, cssClass) {
    this.speechCommentText = text;
    this.speechCommentClass = cssClass || "";
    if (!this.mockeryActive && !this.tauntActive) {
      this.showSpeech(text, cssClass);
    }
  },

  clearGameComment() {
    this.speechCommentText = "";
    this.speechCommentClass = "";
    if (!this.mockeryActive && !this.tauntActive) {
      this.clearSpeech();
    }
  },

  showMockery(delay) {
    clearTimeout(this.mockeryTimeout);
    const sid = this.sessionId;
    this.mockeryTimeout = setTimeout(() => {
      if (this.sessionId !== sid) return;
      const category = this.inPhase2 ? "mockeryP2" : "mockery";
      let text = CommentSystem.pick(category);
      if (text === this.lastMockery) {
        text = CommentSystem.pick(category);
      }
      this.lastMockery = text;

      this.clearSpeech();
      this.mockeryActive = true;

      requestAnimationFrame(() => {
        if (this.sessionId !== sid) return;
        this.showSpeech(text, this.inPhase2 ? "speech-mockery-p2" : "speech-mockery");
      });

      this.mockeryTimeout = setTimeout(() => {
        if (this.sessionId !== sid) return;
        this.mockeryActive = false;
        if (this.speechCommentText) {
          this.showSpeech(this.speechCommentText, this.speechCommentClass);
        } else {
          this.clearSpeech();
        }
      }, 1600);
    }, delay || 0);
  },

  clearMockery() {
    clearTimeout(this.mockeryTimeout);
    this.mockeryActive = false;
    this.clearSpeech();
  },

  // === 強煽り演出（taunt中はmockery・speech抑制） ===
  showTaunt(delay) {
    clearTimeout(this.tauntTimeout);
    this.clearMockery();
    this.tauntActive = true;
    const sid = this.sessionId;
    this.tauntTimeout = setTimeout(() => {
      if (this.sessionId !== sid) return;
      const category = this.inPhase2 ? "tauntP2" : "taunt";
      const text = CommentSystem.pick(category);
      this.el.tauntText.textContent = text;
      this.el.tauntText.className = "taunt-text" + (this.inPhase2 ? " taunt-p2" : "");
      this.el.tauntOverlay.classList.remove("taunt-show");
      void this.el.tauntText.offsetWidth;
      this.el.tauntOverlay.classList.add("taunt-show");
      this.el.tauntText.classList.add("taunt-anim");

      this.tauntTimeout = setTimeout(() => {
        if (this.sessionId !== sid) return;
        this.el.tauntOverlay.classList.remove("taunt-show");
        this.tauntActive = false;
      }, 750);
    }, delay || 0);
  },

  clearTaunt() {
    clearTimeout(this.tauntTimeout);
    this.el.tauntOverlay.classList.remove("taunt-show");
    this.tauntActive = false;
  },

  // === ○×フィードバック ===
  showOX(isCorrect) {
    clearTimeout(this.oxTimeout);
    this.el.oxSymbol.className = "ox-symbol";
    this.el.oxOverlay.classList.remove("ox-show");

    void this.el.oxSymbol.offsetWidth;
    this.el.oxSymbol.textContent = isCorrect ? "○" : "✕";
    this.el.oxSymbol.classList.add(isCorrect ? "ox-correct" : "ox-wrong");
    this.el.oxOverlay.classList.add("ox-show");

    if (isCorrect) SoundSystem.correct();
    else SoundSystem.wrong();

    const sid = this.sessionId;
    this.oxTimeout = setTimeout(() => {
      if (this.sessionId !== sid) return;
      this.el.oxOverlay.classList.remove("ox-show");
    }, 600);
  },

  // === 圧力メーター ===
  changePressure(delta) {
    this.pressureLevel = Math.max(PRESSURE.min, Math.min(PRESSURE.max, this.pressureLevel + delta));
    this.updatePressureUI();

    if (this.pressureLevel >= PRESSURE.max) {
      this.contaminated = true;
    }
  },

  updatePressureUI() {
    const pct = Math.round((this.pressureLevel / PRESSURE.max) * 100);
    this.el.pressureFill.style.width = pct + "%";

    // バーの色（危険度）
    this.el.pressureFill.className = "pressure-fill";
    if (this.pressureLevel >= PRESSURE.thresholdCritical) {
      this.el.pressureFill.classList.add("pressure-critical");
    } else if (this.pressureLevel >= PRESSURE.thresholdHigh) {
      this.el.pressureFill.classList.add("pressure-high");
    } else if (this.pressureLevel >= PRESSURE.thresholdMid) {
      this.el.pressureFill.classList.add("pressure-mid");
    }

    // パーセンテージ表示
    this.el.pressurePct.textContent = pct + "%";
    this.el.pressurePct.className = "pressure-pct";
    if (this.pressureLevel >= PRESSURE.thresholdCritical) {
      this.el.pressurePct.classList.add("pct-critical");
    } else if (this.pressureLevel >= PRESSURE.thresholdHigh) {
      this.el.pressurePct.classList.add("pct-high");
    } else if (this.pressureLevel >= PRESSURE.thresholdMid) {
      this.el.pressurePct.classList.add("pct-mid");
    }

    // 画面雰囲気
    const game = document.getElementById("screen-game");
    game.classList.remove("atmos-mid", "atmos-high", "atmos-critical");
    if (this.pressureLevel >= PRESSURE.thresholdCritical) {
      game.classList.add("atmos-critical");
    } else if (this.pressureLevel >= PRESSURE.thresholdHigh) {
      game.classList.add("atmos-high");
    } else if (this.pressureLevel >= PRESSURE.thresholdMid) {
      game.classList.add("atmos-mid");
    }
  },

  isException(cmd) {
    return cmd.ruleType === "obey" || cmd.ruleType === "wait" || cmd.ruleType === "tap";
  },

  // === Phase 1: 命令表示 ===
  startRound() {
    this.stopTimer();
    this.clearHint();
    this.speechCommentText = "";
    this.speechCommentClass = "";
    this.clearMockery();
    this.clearTaunt();

    const cmd = this.roundCommands[this.currentRound];
    this.el.roundNum.textContent = this.currentRound + 1;
    this.el.progressFill.style.width = ((this.currentRound / ROUNDS_PER_GAME) * 100) + "%";

    this.el.feedback.textContent = "";
    this.el.feedback.className = "feedback";

    // ボタン内容リセット（前ラウンドのtap画像をクリア）
    this.el.btnChoice0.innerHTML = "";
    this.el.btnChoice1.innerHTML = "";

    // リセット
    this.el.gameCharImg.src = "image_0.png";
    this.el.tapGuide.classList.remove("active");

    // デバッグラベル
    const phase = this.inPhase2 ? "P2:" : "P1:";
    const tapSuffix = cmd.ruleType === "tap" && cmd.correctType !== "deny" ? "-" + cmd.correctType.toUpperCase() : "";
    this.updateDebugLabel(phase + cmd.ruleType.toUpperCase() + tapSuffix, cmd.ruleType);

    // ステート表示（圧力メーター統合）
    this.updateStateUI(cmd);

    // 選択肢・タイマー隠す
    this.el.choicesArea.classList.remove("choices-appear", "wait-mode", "obey-mode", "tap-mode");
    this.el.choicesArea.classList.add("choices-hidden");
    this.el.btnChoice0.disabled = true;
    this.el.btnChoice1.disabled = true;
    this.el.timerBar.classList.add("timer-hidden");

    // 命令テキスト（ruleTypeで色・演出を変える）
    this.el.commandText.textContent = cmd.command;
    if (cmd.ruleType === "wait") {
      this.el.commandText.className = "command-text command-wait";
    } else if (cmd.ruleType === "obey") {
      this.el.commandText.className = "command-text command-obey";
    } else if (cmd.ruleType === "tap") {
      this.el.commandText.className = "command-text command-tap";
      this.el.tapGuide.classList.add("active");
    } else {
      this.el.commandText.className = "command-text command-appear";
    }

    // キャラ演出
    this.el.gameCharImg.className = "character-img char-enter";

    // 圧力コメント（吹き出し）
    if (cmd.ruleType === "wait") {
      this.showGameComment(CommentSystem.pick("pressureWait"));
    } else if (cmd.ruleType === "obey") {
      this.showGameComment(CommentSystem.pick("pressureObey"));
    } else if (cmd.ruleType === "tap") {
      this.showGameComment(CommentSystem.pick("pressureTap"));
    } else {
      this.showGameComment(CommentSystem.pick("pressure"));
    }

    this.isWaiting = true;
    const gid = this.sessionId;
    setTimeout(() => { if (this.sessionId !== gid) return; this.showChoices(); }, TIMING.pressurePhase);
  },

  // === Phase 2: 選択肢表示 ===
  showChoices() {
    const cmd = this.roundCommands[this.currentRound];

    if (cmd.ruleType === "tap") {
      // tap: データ駆動で画像を表示（imgClassで見た目を直接指定）
      const cls0 = cmd.imgClass[0];
      const cls1 = cmd.imgClass[1];
      this.el.btnChoice0.innerHTML = '<img src="' + cmd.images[0] + '" alt="' + cmd.alts[0] + '" class="tap-target-img ' + cls0 + '">';
      this.el.btnChoice1.innerHTML = '<img src="' + cmd.images[1] + '" alt="' + cmd.alts[1] + '" class="tap-target-img ' + cls1 + '">';
      this.el.choicesArea.classList.add("tap-mode");
      this.showGameComment(cmd.misdirect);
      this.showHint();
    } else {
      this.el.btnChoice0.textContent = cmd.choices[0];
      this.el.btnChoice1.textContent = cmd.choices[1];
    }

    this.el.btnChoice0.disabled = false;
    this.el.btnChoice1.disabled = false;

    if (cmd.ruleType === "wait") {
      this.el.choicesArea.classList.add("wait-mode");
      this.el.commandText.classList.add("command-wait-active");
      this.clearGameComment();
      this.showHint();
    } else if (cmd.ruleType === "obey") {
      this.el.choicesArea.classList.add("obey-mode");
      this.clearGameComment();
      this.showHint();
    } else if (cmd.ruleType !== "tap") {
      this.clearGameComment();
    }

    this.el.choicesArea.classList.remove("choices-hidden");
    this.el.choicesArea.classList.add("choices-appear");

    this.isWaiting = false;
    this.answered = false;  // ★ 入力受付開始
    this.startTimer();
  },

  // === タイマー ===
  startTimer() {
    const cmd = this.roundCommands[this.currentRound];
    this.timeLimit = getTimeLimit(this.currentRound);
    this.timeLeft = this.timeLimit;
    this.timerActive = true;

    this.el.timerBar.classList.remove("timer-hidden");
    this.el.timerFill.style.width = "100%";
    this.el.timerFill.className = "timer-fill";

    const tickMs = 50;
    let lastRushLevel = -1;
    let lastTickTime = 0;
    const isWaitStage = cmd.ruleType === "wait" || (cmd.ruleType === "tap" && cmd.correctType === "wait");

    const sid = this.sessionId;
    this.timerInterval = setInterval(() => {
      if (this.sessionId !== sid) { clearInterval(this.timerInterval); return; }
      this.timeLeft -= tickMs / 1000;
      if (this.timeLeft <= 0) { this.timeLeft = 0; this.onTimeout(); return; }

      const pct = (this.timeLeft / this.timeLimit) * 100;
      this.el.timerFill.style.width = pct + "%";

      if (pct > 60) this.el.timerFill.className = "timer-fill";
      else if (pct > 30) this.el.timerFill.className = "timer-fill timer-warn";
      else this.el.timerFill.className = "timer-fill timer-danger";

      // 焦り音: 残り30%以下で断続的に鳴らす（間隔が徐々に短くなる）
      if (pct <= 30) {
        const now = Date.now();
        const interval = pct <= 15 ? 350 : 650;
        if (now - lastTickTime >= interval) {
          SoundSystem.tick();
          lastTickTime = now;
        }
      }

      const ratio = this.timeLeft / this.timeLimit;
      let rushLevel = ratio > 0.6 ? -1 : ratio > 0.35 ? 0 : ratio > 0.15 ? 1 : 2;
      if (rushLevel !== lastRushLevel && rushLevel >= 0) {
        lastRushLevel = rushLevel;
        if (isWaitStage) {
          const cats = ["waitRush1", "waitRush2", "waitRush3"];
          this.showGameComment(CommentSystem.pick(cats[rushLevel]), "speech-wait-hint");
        } else {
          const cats = ["rushLight", "rushMedium", "rushHeavy"];
          const cls = ["", "speech-warn", "speech-danger"];
          this.showGameComment(CommentSystem.pick(cats[rushLevel]), cls[rushLevel]);
        }
        // 嘲笑/強煽りは排他: taunt優先
        if (rushLevel >= 2 && this.inPhase2 && this.currentRound >= 8) {
          // Phase2終盤: 強煽り（中央）のみ
          this.showTaunt(100);
        } else if (rushLevel >= 2 && (this.inPhase2 || Math.random() < 0.25)) {
          // それ以外: mockery（吹き出し）のみ
          this.showMockery(0);
        }
      }
    }, tickMs);
  },

  stopTimer() {
    this.timerActive = false;
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  },

  onWaitSuccess() {
    if (this.answered) return;
    this.answered = true;
    this.stopTimer();
    this.clearHint();
    this.isWaiting = true;

    const cmd = this.roundCommands[this.currentRound];
    const highPressure = this.pressureLevel >= PRESSURE.thresholdHigh;

    this.el.choicesArea.classList.remove("choices-appear");
    this.el.choicesArea.classList.add("choices-hidden");
    this.el.btnChoice0.disabled = true;
    this.el.btnChoice1.disabled = true;
    this.el.timerFill.style.width = "0%";
    this.el.commandText.textContent = "";
    this.el.tapGuide.classList.remove("active");

    this.score++;
    this.el.scoreNum.textContent = this.score;
    this.el.feedback.textContent = cmd.rightReaction;
    this.el.feedback.className = "feedback feedback-big correct";
    this.showOX(true);
    this.changePressure(PRESSURE.exceptionCorrect);
    this.showGameComment(CommentSystem.pick(highPressure ? "correctHigh" : "correct"));

    this.advanceAfterResult();
  },

  onTimeout() {
    if (!this.timerActive) return;
    if (this.answered) return;
    // ★ answered は onWaitSuccess / 後続処理 内で設定するため、ここでは設定しない
    this.stopTimer();

    const cmd = this.roundCommands[this.currentRound];
    const isWaitStage = cmd.ruleType === "wait" || (cmd.ruleType === "tap" && cmd.correctType === "wait");

    // waitステージ: タイマー0到達 = 正解（onWaitSuccess内でanswered=trueになる）
    if (isWaitStage) {
      this.onWaitSuccess();
      return;
    }

    this.answered = true;  // ★ 判定消費（非waitの場合のみここで設定）

    this.clearHint();
    this.isWaiting = true;

    this.el.btnChoice0.disabled = true;
    this.el.btnChoice1.disabled = true;
    this.el.choicesArea.classList.remove("choices-appear");
    this.el.choicesArea.classList.add("choices-hidden");
    this.el.commandText.textContent = "";
    this.el.timerFill.style.width = "0%";

    this.changePressure(PRESSURE.timeout);

    this.el.feedback.textContent = CommentSystem.pick("timeout");
    this.el.feedback.className = "feedback feedback-big wrong";
    this.showOX(false);
    this.showGameComment("時間切れ", "speech-danger");
    // 強煽り(中央)とmockery(吹き出し)は排他。taunt優先
    if (this.inPhase2) {
      this.showTaunt(200);
    } else {
      this.showMockery(400);
    }

    this.advanceAfterResult();
  },

  choose(index) {
    if (Tutorial.active) { Tutorial.choose(index); return; }
    if (this.answered) return;
    if (this.isWaiting) return;
    this.answered = true;
    this.isWaiting = true;
    this.stopTimer();
    this.clearHint();

    const cmd = this.roundCommands[this.currentRound];
    const isWaitLike = cmd.ruleType === "wait" || cmd.correctType === "wait";
    const isCorrect = isWaitLike ? false : (index === cmd.correctIndex);
    const isEx = this.isException(cmd);
    const highPressure = this.pressureLevel >= PRESSURE.thresholdHigh;

    this.el.choicesArea.classList.remove("choices-appear");
    this.el.btnChoice0.disabled = true;
    this.el.btnChoice1.disabled = true;
    this.el.timerBar.classList.add("timer-hidden");
    this.el.commandText.textContent = "";
    this.el.tapGuide.classList.remove("active");

    // tap不正解 & 正解ボタンあり → 正解フラッシュ（0.5秒間）
    const gid = this.sessionId;
    if (!isCorrect && cmd.ruleType === "tap" && cmd.correctIndex >= 0) {
      const correctBtn = cmd.correctIndex === 0 ? this.el.btnChoice0 : this.el.btnChoice1;
      const wrongBtn = cmd.correctIndex === 0 ? this.el.btnChoice1 : this.el.btnChoice0;
      correctBtn.classList.add("flash-correct");
      wrongBtn.classList.add("flash-wrong");
      setTimeout(() => {
        if (this.sessionId !== gid) return;
        this.el.choicesArea.classList.add("choices-hidden");
        correctBtn.classList.remove("flash-correct");
        wrongBtn.classList.remove("flash-wrong");
      }, 500);
    } else {
      this.el.choicesArea.classList.add("choices-hidden");
    }

    if (isCorrect) {
      this.score++;
      this.el.scoreNum.textContent = this.score;
      this.el.feedback.textContent = cmd.rightReaction;
      this.el.feedback.className = "feedback feedback-big correct";
      this.showOX(true);
      this.changePressure(isEx ? PRESSURE.exceptionCorrect : PRESSURE.normalCorrect);
      this.showGameComment(CommentSystem.pick(highPressure ? "correctHigh" : "correct"));
    } else {
      this.el.feedback.textContent = cmd.wrongReaction;
      this.el.feedback.className = "feedback feedback-big wrong";
      this.showOX(false);
      this.changePressure(isEx ? PRESSURE.exceptionWrong : PRESSURE.normalWrong);
      this.showGameComment(CommentSystem.pick(highPressure ? "wrongHigh" : "wrong"));
      // 強煽り(中央)とmockery(吹き出し)は排他。taunt優先
      if (this.inPhase2) {
        this.showTaunt(200);
      } else {
        this.showMockery(400);
      }
    }

    this.advanceAfterResult();
  },

  advanceAfterResult() {
    const gid = this.sessionId;
    setTimeout(() => {
      if (this.sessionId !== gid) return;
      this.el.feedback.classList.add("feedback-fade");
      this.clearGameComment();

      setTimeout(() => {
        if (this.sessionId !== gid) return;
        if (this.contaminated) {
          this.showResult();
          return;
        }
        this.currentRound++;

        // フェーズ変更チェック: R5終了後
        if (this.currentRound === PHASE_CHANGE_ROUND) {
          this.showPhaseChange();
          return;
        }

        if (this.currentRound < ROUNDS_PER_GAME) {
          this.startRound();
        } else {
          this.transitionToSlash();
        }
      }, TIMING.pausePhase);
    }, TIMING.resultPhase);
  },

  transitionToSlash() {
    this.stopTimer();
    SoundSystem.stopAmbient();
    const overlay = document.getElementById("dungeon-transition");
    const text = document.getElementById("dg-transition-text");
    overlay.classList.add("dg-trans-active");
    const gid = this.sessionId;
    setTimeout(() => {
      if (this.sessionId !== gid) return;
      text.textContent = "…次の層へ";
      text.classList.add("dg-trans-text-show");
      setTimeout(() => {
        if (this.sessionId !== gid) return;
        text.classList.remove("dg-trans-text-show");
        setTimeout(() => {
          if (this.sessionId !== gid) return;
          Slash.pressure = this.pressureLevel;
          Slash.currentLayer = 0;
          Slash.totalMisses = 0;
          Slash.start();
          overlay.classList.remove("dg-trans-active");
          text.textContent = "";
        }, 500);
      }, 1500);
    }, 600);
  },

  showResult() {
    this.stopTimer();
    SoundSystem.stopAmbient();
    this.showScreen(this.el.screenResult);
    this.el.progressFill.style.width = "100%";

    const result = this.contaminated
      ? RESULT_CONTAMINATED
      : RESULTS.find((r) => this.score >= r.minScore);

    this.el.resultTitle.textContent = result.title;
    this.el.resultTitle.style.color = result.titleColor;
    this.el.resultTitle.className = "result-title result-bounce";

    this.el.resultScoreNum.textContent = this.score;
    this.el.resultTotalRounds.textContent = this.contaminated
      ? (this.currentRound + 1)
      : ROUNDS_PER_GAME;
    this.el.resultScoreNum.parentElement.className = "result-score result-bounce";

    this.el.resultMessage.textContent = result.message;
    this.el.resultMessage.className = "result-message slide-up";

    this.el.resultCharImg.className = "character-img";
    if (result.charClass) this.el.resultCharImg.classList.add(result.charClass);

    const pLabel = this.contaminated ? "100%（汚染完了）"
      : Math.round(this.pressureLevel) + "%";
    this.el.resultPressure.textContent = "支配度: " + pLabel;

    if (this.contaminated) {
      this.el.resultPressure.className = "result-pressure contaminated";
      CommentSystem.setText("もう遅い", this.el.resultComment, "comment-danger");
      this.el.resultFooter.textContent = "お前はもう群れの一部だ";
      document.getElementById("screen-result").classList.add("atmos-critical");
    } else if (this.score >= Math.ceil(ROUNDS_PER_GAME * 0.6)) {
      this.el.resultPressure.className = "result-pressure";
      CommentSystem.show("resultGood", this.el.resultComment);
      this.el.resultFooter.textContent = this.score === ROUNDS_PER_GAME
        ? "社会のルールなんか知ったことか"
        : "空気は読むな、吸え。";
    } else {
      this.el.resultPressure.className = "result-pressure";
      CommentSystem.show("resultBad", this.el.resultComment);
      this.el.resultFooter.textContent = this.score === 0
        ? "…お前、大丈夫か？"
        : "空気は読むな、吸え。";
    }
  },
};

// ============================================================
// 逆指示ダンジョン
// ============================================================

// 0=path, 1=wall, 2=trap(見た目はpath), 3=goal
const DUNGEON_ROWS = 9;
const DUNGEON_COLS = 7;

const DUNGEON_STAGES = [
  {
    name: "第一層：覚醒",
    startRow: 8, startCol: 3,
    map: [
      [1, 1, 1, 3, 1, 1, 1], // row0: ゴール (3,0)
      [1, 1, 1, 0, 1, 1, 1], // row1
      [1, 2, 0, 0, 0, 0, 1], // row2: D3 corridor, trap(1,2)
      [1, 2, 1, 1, 1, 0, 1], // row3: trap(1,3), open(5,3)
      [1, 0, 0, 0, 0, 0, 1], // row4: D2 corridor
      [1, 0, 1, 1, 1, 2, 1], // row5: open(1,5), trap(5,5)
      [1, 0, 0, 0, 0, 0, 1], // row6: D1 corridor
      [1, 1, 1, 0, 1, 1, 1], // row7
      [1, 1, 1, 0, 1, 1, 1], // row8: スタート (3,8)
    ],
    trapWarps: {
      "2,1": { row: 4, col: 5 },
      "3,1": { row: 6, col: 1 },
      "5,5": { row: 7, col: 3 },
    },
    decisions: [
      {
        row: 6, col: 3, type: "normal", correctDir: "left",
        command: "右へ行け！", comment: "指示に従え…",
        wrongReaction: "言われた通り動いたな", rightReaction: "指示を無視した",
        penaltyPos: { row: 8, col: 3 },
      },
      {
        row: 4, col: 3, type: "obey", correctDir: "right",
        command: "右が安全だ、信じろ", comment: "…素直に聞くか？",
        wrongReaction: "疑いすぎた", rightReaction: "正しい判断だ",
        penaltyPos: { row: 6, col: 1 },
      },
      {
        row: 2, col: 3, type: "wait",
        command: "急げ！止まるな！", comment: "焦るなよ…",
        wrongReaction: "焦って動いてしまった", rightReaction: "落ち着いて待てた",
        penaltyPos: { row: 4, col: 5 },
      },
    ],
    lures: [
      { row: 4, col: 1, text: "上だ…近道がある", comment: "急げ" },
      { row: 6, col: 5, text: "もう少しだ…上へ", comment: "" },
      { row: 2, col: 2, text: "壁沿いを行け", comment: "左が安全だ" },
    ],
  },
  {
    name: "第二層：疑念",
    startRow: 8, startCol: 3,
    map: [
      [1, 3, 1, 1, 1, 1, 1], // row0: goal(1,0)
      [1, 0, 2, 1, 1, 0, 1], // row1: trap(2,1)
      [1, 0, 1, 1, 1, 2, 1], // row2: trap(5,2)
      [1, 0, 0, 0, 0, 0, 1], // row3: D3 corridor
      [1, 2, 1, 1, 1, 0, 1], // row4: trap(1,4)
      [1, 0, 0, 0, 0, 0, 1], // row5: D2 corridor
      [1, 0, 1, 1, 1, 2, 1], // row6: trap(5,6)
      [1, 0, 0, 0, 0, 0, 1], // row7: D1 corridor
      [1, 1, 0, 0, 0, 1, 1], // row8: start(3,8)
    ],
    trapWarps: {
      "6,5": { row: 8, col: 3 },
      "4,1": { row: 7, col: 1 },
      "2,5": { row: 5, col: 5 },
      "1,2": { row: 3, col: 1 },
    },
    decisions: [
      {
        row: 7, col: 3, type: "normal", correctDir: "left",
        command: "右に進め！", comment: "迷うなよ…",
        wrongReaction: "言われた通りだな", rightReaction: "命令に従わなかった",
        penaltyPos: { row: 8, col: 3 },
      },
      {
        row: 5, col: 3, type: "normal", correctDir: "right",
        command: "左に進め！", comment: "指示に従え…",
        wrongReaction: "素直に曲がったな", rightReaction: "逆を行ったか",
        penaltyPos: { row: 7, col: 1 },
      },
      {
        row: 3, col: 3, type: "obey", correctDir: "left",
        command: "左が安全だ、信じろ", comment: "…今度は信じるか？",
        wrongReaction: "疑いすぎた", rightReaction: "素直に従えた",
        penaltyPos: { row: 5, col: 5 },
      },
      {
        row: 1, col: 1, type: "wait",
        command: "急げ！ゴールは目の前だ！", comment: "焦るなよ…",
        wrongReaction: "最後に焦った", rightReaction: "最後まで冷静だった",
        penaltyPos: { row: 3, col: 1 },
      },
    ],
    lures: [
      { row: 5, col: 1, text: "上に抜けろ", comment: "行き止まりじゃないぞ" },
      { row: 7, col: 5, text: "そのまま進め", comment: "迷うなよ" },
      { row: 3, col: 5, text: "上だ、ゴールは近い", comment: "" },
      { row: 2, col: 1, text: "上に逃げ道がある", comment: "急げ" },
    ],
  },
  // ---- Stage 3: 方向転換 ----
  {
    name: "第三層：分岐",
    startRow: 8, startCol: 3,
    map: [
      [1, 1, 1, 3, 1, 1, 1],
      [1, 0, 1, 0, 1, 0, 1], // dead-end alcoves at c1, c5
      [1, 0, 0, 0, 0, 2, 1], // trap(5,2)
      [1, 0, 1, 1, 1, 2, 1], // trap(5,3)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 2, 1, 1, 1, 0, 1], // trap(1,5)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 1, 1], // wider approach
      [1, 1, 1, 0, 1, 1, 1],
    ],
    trapWarps: {
      "2,5": { row: 4, col: 1 },
      "3,5": { row: 6, col: 5 },
      "5,1": { row: 7, col: 3 },
    },
    decisions: [
      { row: 6, col: 3, type: "normal", correctDir: "right",
        command: "左に行け！", comment: "従え…",
        wrongReaction: "指示通りだな", rightReaction: "逆を選んだか",
        penaltyPos: { row: 8, col: 3 } },
      { row: 4, col: 3, type: "obey", correctDir: "left",
        command: "左が安全だ、信じろ", comment: "…信じるか？",
        wrongReaction: "疑いすぎた", rightReaction: "正しい判断だ",
        penaltyPos: { row: 6, col: 5 } },
      { row: 2, col: 3, type: "wait",
        command: "走れ！止まったら詰みだ！", comment: "焦るなよ…",
        wrongReaction: "焦って動いた", rightReaction: "冷静に待てた",
        penaltyPos: { row: 4, col: 5 } },
    ],
    lures: [
      { row: 6, col: 1, text: "上へ、近道だ", comment: "行き止まりじゃない" },
      { row: 4, col: 5, text: "ここから上へ", comment: "急げ" },
      { row: 1, col: 1, text: "ここが近道だ", comment: "" },
      { row: 1, col: 5, text: "ここが出口だ", comment: "" },
    ],
  },
  // ---- Stage 4: 忍耐 ----
  {
    name: "第四層：忍耐",
    startRow: 8, startCol: 3,
    map: [
      [1, 1, 1, 3, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1],
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 2, 1], // trap(5,3)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 2, 1], // trap(5,5)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1],
    ],
    trapWarps: {
      "3,5": { row: 6, col: 1 },
      "5,5": { row: 7, col: 3 },
    },
    decisions: [
      { row: 6, col: 3, type: "normal", correctDir: "left",
        command: "右へ進め！", comment: "迷うな…",
        wrongReaction: "命令に従ったな", rightReaction: "指示を拒否した",
        penaltyPos: { row: 8, col: 3 } },
      { row: 4, col: 3, type: "wait",
        command: "逃げろ！動け！", comment: "…本当に？",
        wrongReaction: "焦って動いた", rightReaction: "耐えた",
        penaltyPos: { row: 6, col: 1 } },
      { row: 2, col: 3, type: "wait",
        command: "急げ！あと少しだ！", comment: "…焦るなよ",
        wrongReaction: "また焦った", rightReaction: "二度目も耐えた",
        penaltyPos: { row: 4, col: 5 } },
    ],
    lures: [
      { row: 6, col: 5, text: "上に抜けろ", comment: "" },
      { row: 4, col: 5, text: "もう少し上だ", comment: "急げ" },
      { row: 2, col: 2, text: "左が近い", comment: "" },
    ],
  },
  // ---- Stage 5: 甘言 ----
  {
    name: "第五層：甘言",
    startRow: 8, startCol: 3,
    map: [
      [1, 3, 1, 1, 1, 1, 1],
      [1, 0, 2, 1, 1, 0, 1], // trap(2,1)
      [1, 0, 0, 1, 1, 0, 1], // dead-end fork at c2 (leads to trap above)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 2, 1, 1, 1, 0, 1], // trap(1,4)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 2, 1], // trap(5,6)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 1, 1],
    ],
    trapWarps: {
      "1,2": { row: 3, col: 5 },
      "4,1": { row: 7, col: 1 },
      "6,5": { row: 8, col: 3 },
    },
    decisions: [
      { row: 7, col: 3, type: "obey", correctDir: "left",
        command: "左が安全だ", comment: "信じろ…",
        wrongReaction: "疑いすぎた", rightReaction: "素直に従えた",
        penaltyPos: { row: 8, col: 3 } },
      { row: 5, col: 3, type: "obey", correctDir: "right",
        command: "右を信じろ", comment: "今度も信じるか？",
        wrongReaction: "信じなかった", rightReaction: "正しく信じた",
        penaltyPos: { row: 7, col: 5 } },
      { row: 3, col: 3, type: "normal", correctDir: "left",
        command: "右に行け！", comment: "…本当に？",
        wrongReaction: "騙された", rightReaction: "見抜いた",
        penaltyPos: { row: 5, col: 5 } },
      { row: 1, col: 1, type: "wait",
        command: "走れ！ゴールだ！", comment: "…焦るな",
        wrongReaction: "最後に焦った", rightReaction: "最後まで冷静だった",
        penaltyPos: { row: 3, col: 1 } },
    ],
    lures: [
      { row: 7, col: 5, text: "上に抜けろ", comment: "" },
      { row: 5, col: 1, text: "上だ、近道がある", comment: "急げ" },
      { row: 2, col: 2, text: "上に抜け道がある", comment: "トラップじゃない" },
      { row: 3, col: 5, text: "上に出口が見える", comment: "" },
    ],
  },
  // ---- Stage 6: 疑心 ----
  {
    name: "第六層：疑心",
    startRow: 8, startCol: 3,
    map: [
      [1, 1, 1, 1, 1, 3, 1],
      [1, 0, 1, 0, 1, 0, 1], // dead-end alcove at c1
      [1, 0, 0, 0, 0, 0, 1],
      [1, 2, 1, 1, 1, 0, 1], // trap(1,3)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 2, 1], // trap(5,5)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 2, 1, 0, 1, 0, 1], // trap(1,7)
      [1, 0, 1, 0, 1, 0, 1],
    ],
    trapWarps: {
      "7,1": { row: 8, col: 3 },
      "5,5": { row: 6, col: 1 },
      "3,1": { row: 4, col: 5 },
    },
    decisions: [
      { row: 6, col: 3, type: "normal", correctDir: "right",
        command: "左に行け！", comment: "従え…",
        wrongReaction: "言いなりだ", rightReaction: "逆を行った",
        penaltyPos: { row: 8, col: 3 } },
      { row: 4, col: 3, type: "obey", correctDir: "right",
        command: "右が安全だ", comment: "信じるか？",
        wrongReaction: "疑いすぎた", rightReaction: "正しく信じた",
        penaltyPos: { row: 6, col: 1 } },
      { row: 2, col: 3, type: "normal", correctDir: "right",
        command: "左だ！急げ！", comment: "…本当に？",
        wrongReaction: "また騙された", rightReaction: "見抜いた",
        penaltyPos: { row: 4, col: 1 } },
      { row: 2, col: 5, type: "obey", correctDir: "up",
        command: "上だ、信じろ", comment: "…最後だ",
        wrongReaction: "疑って失敗", rightReaction: "信じて正解",
        penaltyPos: { row: 4, col: 1 } },
    ],
    lures: [
      { row: 6, col: 1, text: "上に近道がある", comment: "" },
      { row: 4, col: 1, text: "上を進め", comment: "安全だ" },
      { row: 1, col: 1, text: "ここが出口だ", comment: "行き止まりじゃない" },
      { row: 2, col: 1, text: "壁沿いが正解", comment: "" },
    ],
  },
  // ---- Stage 7: 焦燥 ----
  {
    name: "第七層：焦燥",
    startRow: 8, startCol: 3,
    map: [
      [1, 1, 1, 3, 1, 1, 1],
      [1, 0, 1, 0, 1, 0, 1], // dead-end alcoves at c1, c5
      [1, 0, 0, 0, 0, 0, 1],
      [1, 2, 1, 1, 1, 0, 1], // trap(1,3)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 2, 1], // trap(5,5)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 1, 1],
      [1, 1, 1, 0, 1, 1, 1],
    ],
    trapWarps: {
      "5,5": { row: 7, col: 3, block: true },
      "3,1": { row: 6, col: 5 },
    },
    decisions: [
      { row: 6, col: 3, type: "wait",
        command: "逃げろ！すぐ動け！", comment: "…我慢だ",
        wrongReaction: "焦った", rightReaction: "耐えた",
        penaltyPos: { row: 8, col: 3 } },
      { row: 4, col: 3, type: "normal", correctDir: "right",
        command: "左だ！急げ！", comment: "…逆だ",
        wrongReaction: "騙された", rightReaction: "見抜いた",
        penaltyPos: { row: 6, col: 1 } },
      { row: 2, col: 3, type: "wait",
        command: "止まるな！走れ！", comment: "…もう一度",
        wrongReaction: "また焦った", rightReaction: "二度目も耐えた",
        penaltyPos: { row: 4, col: 5 } },
    ],
    lures: [
      { row: 6, col: 5, text: "上へ急げ", comment: "罠じゃない" },
      { row: 6, col: 1, text: "上に抜けろ", comment: "" },
      { row: 1, col: 1, text: "ここが出口だ", comment: "行き止まりじゃない" },
      { row: 1, col: 5, text: "ここが出口だ", comment: "" },
      { row: 4, col: 1, text: "上が近い", comment: "" },
    ],
  },
  // ---- Stage 8: 欺瞞 ----
  {
    name: "第八層：欺瞞",
    startRow: 8, startCol: 3,
    map: [
      [1, 3, 1, 1, 1, 1, 1],
      [1, 0, 2, 1, 1, 0, 1], // trap(2,1)
      [1, 0, 1, 1, 1, 2, 1], // trap(5,2)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 2, 1], // trap(5,4)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 2, 1, 1, 1, 0, 1], // trap(1,6)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 1, 1],
    ],
    trapWarps: {
      "1,2": { row: 3, col: 5 },
      "2,5": { row: 5, col: 1 },
      "4,5": { row: 7, col: 5 },
      "6,1": { row: 8, col: 3, block: true },
    },
    decisions: [
      { row: 7, col: 3, type: "obey", correctDir: "left",
        command: "左に行け、信じろ", comment: "…信じるか？",
        wrongReaction: "疑いすぎた", rightReaction: "正しく信じた",
        penaltyPos: { row: 8, col: 3 } },
      { row: 5, col: 3, type: "normal", correctDir: "right",
        command: "左に行け！", comment: "…命令だ",
        wrongReaction: "従ってしまった", rightReaction: "逆を行った",
        penaltyPos: { row: 7, col: 1 } },
      { row: 3, col: 3, type: "obey", correctDir: "left",
        command: "左が安全だ", comment: "…もう一度信じるか？",
        wrongReaction: "疑った", rightReaction: "信じて正解",
        penaltyPos: { row: 5, col: 5 } },
      { row: 1, col: 1, type: "normal", correctDir: "up",
        command: "右に逃げろ！", comment: "…本当に？",
        wrongReaction: "罠に引っかかった", rightReaction: "無視してゴールへ",
        penaltyPos: { row: 3, col: 1 } },
    ],
    lures: [
      { row: 7, col: 5, text: "上に抜けろ", comment: "" },
      { row: 5, col: 1, text: "下に近道がある", comment: "急げ" },
      { row: 3, col: 5, text: "上に抜け道がある", comment: "ゴールは近い" },
    ],
  },
  // ---- Stage 9: 混沌 ----
  // ジグザグ横断型: 右→左と横断しながら上昇。フェイクゴール(5,0)あり。
  {
    name: "第九層：混沌",
    startRow: 8, startCol: 3,
    map: [
      [1, 3, 1, 1, 1, 3, 1], // row0: goal(1,0), fakeGoal(5,0)
      [1, 0, 0, 1, 0, 2, 1], // row1: trap(5,1)
      [1, 0, 1, 0, 0, 1, 1], // row2
      [1, 0, 0, 0, 2, 0, 1], // row3: trap(4,3)
      [1, 1, 0, 0, 1, 0, 1], // row4
      [1, 0, 2, 0, 0, 0, 1], // row5: trap(2,5)
      [1, 2, 0, 1, 1, 0, 1], // row6: trap(1,6)
      [1, 0, 0, 0, 0, 0, 1], // row7
      [1, 1, 0, 0, 0, 1, 1], // row8: start(3,8)
    ],
    trapWarps: {
      "1,5": { row: 5, col: 1, block: true },   // T1: フェイクゴール番人→中央左（壁化）
      "3,4": { row: 6, col: 5 },   // T2: D3右の罠→下部右
      "5,2": { row: 7, col: 3 },   // T3: 左行きすぎ→スタート付近
      "6,1": { row: 4, col: 3 },   // T4: 開幕左→中央に放出
    },
    decisions: [
      { row: 7, col: 3, type: "normal", correctDir: "right",
        command: "左だ！左に逃げろ！", comment: "…信じるのか？",
        wrongReaction: "騙された", rightReaction: "見抜いた",
        penaltyPos: { row: 8, col: 3 } },
      { row: 5, col: 5, type: "obey", correctDir: "left",
        command: "左が安全だ", comment: "…今度は本当か？",
        wrongReaction: "疑った", rightReaction: "信じて正解",
        penaltyPos: { row: 7, col: 5 } },
      { row: 3, col: 3, type: "wait",
        command: "急げ！罠が閉じる！", comment: "…本当に急ぐべきか？",
        wrongReaction: "焦った", rightReaction: "耐えた",
        penaltyPos: { row: 5, col: 1 } },
      { row: 1, col: 1, type: "normal", correctDir: "up",
        command: "戻れ！上は行き止まりだ！", comment: "…最後の判断",
        wrongReaction: "言いなりだ", rightReaction: "自分を信じた",
        penaltyPos: { row: 3, col: 3 } },
    ],
    lures: [
      { row: 7, col: 1, text: "左だ！上に抜けろ", comment: "" },
      { row: 5, col: 1, text: "上が近道だ", comment: "急げ" },
      { row: 3, col: 5, text: "右上がゴールだ", comment: "近道だ" },
      { row: 2, col: 4, text: "あと少し、右へ", comment: "" },
    ],
  },
  // ---- Stage 10: 脱出 ----
  // 列柱の間・漏斗型: 柱壁で3レーン分岐→左レーン直線上昇でゴール。フェイクゴール(3,0)あり。
  {
    name: "最深層：脱出",
    startRow: 8, startCol: 3,
    map: [
      [1, 3, 1, 3, 1, 1, 1], // row0: goal(1,0), fakeGoal(3,0)
      [1, 0, 0, 2, 0, 0, 1], // row1: trap(3,1)
      [1, 0, 1, 0, 1, 0, 1], // row2: 柱(2,2)(4,2)
      [1, 0, 0, 0, 0, 0, 1], // row3: 合流フロア
      [1, 0, 1, 0, 1, 2, 1], // row4: 柱(2,4)(4,4), trap(5,4)
      [1, 2, 0, 0, 0, 0, 1], // row5: trap(1,5)
      [1, 0, 0, 2, 0, 0, 1], // row6: trap(3,6) 中央直進罰
      [1, 0, 0, 0, 0, 0, 1], // row7
      [1, 1, 0, 0, 0, 1, 1], // row8: start(3,8)
    ],
    trapWarps: {
      "1,3": { row: 5, col: 3, block: true }, // T1: フェイクゴール番人→中央（壁化）
      "4,5": { row: 6, col: 1 },              // T2: D2上の罰→下部左
      "5,1": { row: 7, col: 3 },              // T3: D1左の罰→スタート付近
      "6,3": { row: 5, col: 5 },              // T4: 開幕中央直進→右側へ放出
    },
    decisions: [
      { row: 7, col: 3, type: "normal", correctDir: "right",
        command: "左に行け！最後の戦いだ！", comment: "…信じるのか？",
        wrongReaction: "最後まで騙された", rightReaction: "最後まで逆らった",
        penaltyPos: { row: 8, col: 3 } },
      { row: 5, col: 5, type: "obey", correctDir: "left",
        command: "左が安全だ", comment: "…最後に信じるか？",
        wrongReaction: "疑った", rightReaction: "信じて正解",
        penaltyPos: { row: 7, col: 5 } },
      { row: 3, col: 3, type: "wait",
        command: "走れ！今すぐ逃げろ！", comment: "…最後の我慢だ",
        wrongReaction: "焦った", rightReaction: "耐え抜いた",
        penaltyPos: { row: 5, col: 3 } },
      { row: 2, col: 1, type: "obey", correctDir: "up",
        command: "上だ、信じろ", comment: "…本当に信じるのか？",
        wrongReaction: "最後に疑った", rightReaction: "信じ抜いた",
        penaltyPos: { row: 3, col: 1 } },
      { row: 1, col: 1, type: "normal", correctDir: "up",
        command: "下だ！戻れ！上は罠だ！", comment: "…最後の判断",
        wrongReaction: "言いなりだ", rightReaction: "自分を信じた",
        penaltyPos: { row: 3, col: 3 } },
    ],
    lures: [
      { row: 7, col: 1, text: "左だ！上に抜けろ", comment: "" },
      { row: 6, col: 1, text: "上が近道だ", comment: "急げ" },
      { row: 3, col: 5, text: "右上が出口だ", comment: "" },
      { row: 2, col: 5, text: "ゴールは中央だ", comment: "あと少し" },
    ],
  },
];

const Dungeon = {
  currentStage: 0,
  playerRow: 0,
  playerCol: 0,
  pressure: 20,
  missCount: 0,
  totalMisses: 0,
  activeDecision: null,
  activeDecisionIndex: -1,
  isWaitPhase: false,
  waitTimer: null,
  waitCountInterval: null,
  resolved: null,
  trappedTiles: null,
  blockedTiles: null,
  tutorialShown: false,
  moving: false,
  dominated: false,
  resultShown: false,
  cells: [],
  el: {},
  sessionId: 0,
  feedbackTimer: null,
  lureTimer: null,

  stage() {
    return DUNGEON_STAGES[this.currentStage];
  },

  init() {
    this.el = {
      screen: document.getElementById("screen-dungeon"),
      grid: document.getElementById("dg-grid"),
      command: document.getElementById("dg-command"),
      comment: document.getElementById("dg-comment"),
      feedback: document.getElementById("dg-feedback"),
      statusWrap: document.getElementById("dg-status-wrap"),
      statusName: document.getElementById("dg-status-name"),
      dpad: document.getElementById("dg-dpad"),
      resultOverlay: document.getElementById("dg-result-overlay"),
      resultTitle: document.getElementById("dg-result-title"),
      resultMsg: document.getElementById("dg-result-msg"),
      stageLabel: document.getElementById("dg-stage-label"),
      btnNext: document.getElementById("dg-btn-next"),
      missDisplay: document.getElementById("dg-miss"),
      resultRank: document.getElementById("dg-result-rank"),
      tutorialOverlay: document.getElementById("dg-tutorial-overlay"),
    };

    const arrowDirs = { "dg-up": "up", "dg-down": "down", "dg-left": "left", "dg-right": "right" };
    Object.entries(arrowDirs).forEach(([id, dir]) => {
      const btn = document.getElementById(id);
      let touchHandled = false;
      btn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        touchHandled = true;
        this.move(dir);
      }, { passive: false });
      btn.addEventListener("click", () => {
        if (touchHandled) { touchHandled = false; return; }
        this.move(dir);
      });
    });

    document.addEventListener("keydown", (e) => {
      if (!this.el.screen.classList.contains("active")) return;
      const map = { ArrowUp: "up", ArrowDown: "down", ArrowLeft: "left", ArrowRight: "right" };
      if (map[e.key]) { e.preventDefault(); this.move(map[e.key]); }
    });

    document.getElementById("dg-back").addEventListener("click", () => this.goTitle());
    document.getElementById("dg-btn-retry").addEventListener("click", () => { this.currentStage = 0; this.totalMisses = 0; this.start(); });
    document.getElementById("dg-btn-title").addEventListener("click", () => this.goTitle());
    /* Dungeon テストボタンは Slash に移管済み */
    this.el.btnNext.addEventListener("click", () => this.nextStage());
    this.el.tutorialOverlay.addEventListener("click", () => this.dismissTutorial());
  },

  dismissTutorial() {
    this.el.tutorialOverlay.classList.add("dg-tutorial-hide");
    setTimeout(() => {
      this.el.tutorialOverlay.classList.remove("dg-tutorial-show", "dg-tutorial-hide");
    }, 500);
  },

  goTitle() {
    this.sessionId++;
    this.cleanup();
    SoundSystem.stopAmbient();
    SoundSystem.startTitleAmbient();
    Game.showScreen(document.getElementById("screen-title"));
    TitlePrologue.startIdle();
  },

  cleanup() {
    clearTimeout(this.waitTimer);
    clearInterval(this.waitCountInterval);
    clearTimeout(this.feedbackTimer);
    clearTimeout(this.lureTimer);
    this.isWaitPhase = false;
    this.moving = false;
  },

  start() {
    this.sessionId++;
    SoundSystem.init();
    const s = this.stage();
    this.playerRow = s.startRow;
    this.playerCol = s.startCol;
    if (this.currentStage === 0) this.pressure = 20;
    this.activeDecision = null;
    this.activeDecisionIndex = -1;
    this.isWaitPhase = false;
    this.moving = false;
    this.dominated = false;
    this.resultShown = false;
    this.resolved = new Set();
    this.trappedTiles = new Set();
    this.blockedTiles = new Set();
    clearTimeout(this.waitTimer);
    clearInterval(this.waitCountInterval);
    clearTimeout(this.feedbackTimer);
    clearTimeout(this.lureTimer);

    this.el.stageLabel.textContent = s.name;
    this.el.command.textContent = "";
    this.el.command.className = "dg-command";
    this.el.comment.textContent = "";
    this.el.feedback.textContent = "";
    this.el.feedback.className = "dg-feedback";
    this.el.dpad.classList.remove("dg-wait-mode");
    this.el.resultOverlay.classList.remove("dg-result-show");
    this.el.btnNext.classList.remove("dg-next-show");
    this.el.screen.classList.remove("dg-clear-flash", "dg-trap-screen-flash", "dg-warp-flash", "dg-gameover-flash", "dg-miss-screen-flash");
    // ステージ段階クラス
    this.el.screen.classList.remove("dg-tier-early", "dg-tier-mid", "dg-tier-late");
    const tier = this.currentStage < 3 ? "dg-tier-early"
               : this.currentStage < 7 ? "dg-tier-mid"
               : "dg-tier-late";
    this.el.screen.classList.add(tier);
    this.missCount = 0;
    this.updatePressureUI();
    this.updateMissUI();
    this.renderGrid();
    Game.showScreen(this.el.screen);
    // 初回のみチュートリアル表示
    if (!this.tutorialShown && this.currentStage === 0) {
      this.tutorialShown = true;
      this.el.tutorialOverlay.classList.add("dg-tutorial-show");
    }
  },

  nextStage() {
    this.currentStage++;
    this.start();
  },

  renderGrid() {
    const map = this.stage().map;
    this.el.grid.innerHTML = "";
    this.cells = [];
    for (let r = 0; r < DUNGEON_ROWS; r++) {
      this.cells[r] = [];
      for (let c = 0; c < DUNGEON_COLS; c++) {
        const cell = document.createElement("div");
        cell.className = "dg-cell";
        const val = map[r][c];
        if (val === 1) cell.classList.add("dg-wall");
        else if (val === 3) cell.classList.add("dg-goal");
        else cell.classList.add("dg-path");
        if (r === this.playerRow && c === this.playerCol) cell.classList.add("dg-player");
        this.el.grid.appendChild(cell);
        this.cells[r][c] = cell;
      }
    }
  },

  updatePlayerCell(oldR, oldC) {
    this.cells[oldR][oldC].classList.remove("dg-player");
    this.cells[oldR][oldC].classList.add("dg-trail");
    setTimeout(() => this.cells[oldR][oldC].classList.remove("dg-trail"), 300);
    this.cells[this.playerRow][this.playerCol].classList.add("dg-player");
  },

  updatePressureUI() {
    const p = this.pressure;
    let stage, name;
    if (p >= 80)      { stage = "dominated"; name = "支配寸前"; }
    else if (p >= 55) { stage = "confusion"; name = "混乱"; }
    else if (p >= 35) { stage = "anxiety";   name = "焦り"; }
    else              { stage = "normal";    name = "平常"; }
    this.el.statusWrap.dataset.stage = stage;
    this.el.statusName.textContent = name;
  },

  updateMissUI() {
    this.el.missDisplay.textContent = "MISS: " + this.totalMisses;
  },

  addMiss() {
    this.missCount++;
    this.totalMisses++;
    this.updateMissUI();
    // フラッシュ演出
    this.el.missDisplay.classList.remove("dg-miss-flash");
    void this.el.missDisplay.offsetWidth;
    this.el.missDisplay.classList.add("dg-miss-flash");
  },

  changePressure(delta) {
    this.pressure = Math.max(0, Math.min(100, this.pressure + delta));
    this.updatePressureUI();
    if (this.pressure >= 100 && !this.dominated) {
      this.dominated = true;
      this.showGameOver();
    }
  },

  showLure(lure) {
    this.el.command.textContent = lure.text;
    this.el.command.className = "dg-command dg-cmd-lure";
    this.el.comment.textContent = lure.comment || "";
    clearTimeout(this.lureTimer);
    const sid = this.sessionId;
    this.lureTimer = setTimeout(() => {
      if (this.sessionId !== sid) return;
      if (this.activeDecision === null) {
        this.el.command.textContent = "";
        this.el.command.className = "dg-command";
        this.el.comment.textContent = "";
      }
    }, 2500);
  },

  clearLure() {
    clearTimeout(this.lureTimer);
    if (this.activeDecision === null) {
      this.el.command.textContent = "";
      this.el.command.className = "dg-command";
      this.el.comment.textContent = "";
    }
  },

  showFeedback(text, isCorrect, emphasize) {
    this.el.feedback.textContent = text;
    this.el.feedback.className = "dg-feedback " + (isCorrect ? "dg-fb-correct" : "dg-fb-wrong")
      + (emphasize ? " dg-fb-emphasize" : "");
    clearTimeout(this.feedbackTimer);
    const sid = this.sessionId;
    this.feedbackTimer = setTimeout(() => {
      if (this.sessionId !== sid) return;
      this.el.feedback.textContent = "";
      this.el.feedback.className = "dg-feedback";
    }, 2500);
  },

  move(dir) {
    if (this.moving || this.resultShown) return;
    this.clearLure();
    const map = this.stage().map;
    const decisions = this.stage().decisions;

    // waitフェーズ中に矢印 → 即不正解
    if (this.isWaitPhase) {
      clearTimeout(this.waitTimer);
      clearInterval(this.waitCountInterval);
      this.isWaitPhase = false;
      this.el.dpad.classList.remove("dg-wait-mode");
      this.resolveDecision(false);
      return;
    }

    const dr = dir === "up" ? -1 : dir === "down" ? 1 : 0;
    const dc = dir === "left" ? -1 : dir === "right" ? 1 : 0;
    const nr = this.playerRow + dr;
    const nc = this.playerCol + dc;

    if (nr < 0 || nr >= DUNGEON_ROWS || nc < 0 || nc >= DUNGEON_COLS) return;
    if (map[nr][nc] === 1) return;
    if (this.blockedTiles.has(nr + "," + nc)) return;

    const oldR = this.playerRow;
    const oldC = this.playerCol;
    this.playerRow = nr;
    this.playerCol = nc;
    this.updatePlayerCell(oldR, oldC);

    // トラップ判定
    const key = nr + "," + nc;
    if (map[nr][nc] === 2 && !this.trappedTiles.has(key)) {
      // 判断が残っていたらクリア（トラップ自体がペナルティになる）
      if (this.activeDecision !== null) {
        this.resolved.add(this.activeDecisionIndex);
        this.activeDecision = null;
        this.activeDecisionIndex = -1;
        this.el.command.textContent = "";
        this.el.command.className = "dg-command";
        this.el.comment.textContent = "";
      }
      this.triggerTrap(nr, nc, oldR, oldC);
      return;
    }

    // アクティブ判断: 最初の有効移動で正誤判定（軸を問わない）
    if (this.activeDecision !== null && this.activeDecision.type !== "wait") {
      this.resolveDecision(dir === this.activeDecision.correctDir);
    }

    // 新しい判断ポイントトリガー
    if (this.activeDecision === null) {
      for (let i = 0; i < decisions.length; i++) {
        if (!this.resolved.has(i) && nr === decisions[i].row && nc === decisions[i].col) {
          this.triggerDecision(i);
          break;
        }
      }
    }

    // ゴール判定
    if (map[nr][nc] === 3) {
      this.showClear();
      return;
    }

    // Lureチェック（判断イベントが無い場合のみ）
    if (this.activeDecision === null) {
      const lures = this.stage().lures;
      if (lures) {
        for (const lure of lures) {
          if (nr === lure.row && nc === lure.col) {
            this.showLure(lure);
            break;
          }
        }
      }
    }
  },

  triggerDecision(index) {
    const d = this.stage().decisions[index];
    this.activeDecision = d;
    this.activeDecisionIndex = index;
    this.el.command.textContent = d.command;
    this.el.comment.textContent = d.comment;
    // 命令文を読む猶予: 280ms入力ロック
    this.moving = true;
    setTimeout(() => { this.moving = false; }, 280);
    if (d.type === "wait") {
      this.el.command.className = "dg-command dg-cmd-wait";
      this.el.statusWrap.dataset.stage = "decision-wait";
      this.el.statusName.textContent = "動くな";
      this.startWait();
    } else if (d.type === "obey") {
      this.el.command.className = "dg-command dg-cmd-obey";
      this.el.statusWrap.dataset.stage = "decision-obey";
      this.el.statusName.textContent = "従え";
    } else {
      this.el.command.className = "dg-command";
      this.el.statusWrap.dataset.stage = "decision-normal";
      this.el.statusName.textContent = "逆らえ";
    }
  },

  resolveDecision(correct) {
    const d = this.stage().decisions[this.activeDecisionIndex];
    this.resolved.add(this.activeDecisionIndex);
    this.activeDecision = null;
    this.activeDecisionIndex = -1;
    this.el.command.textContent = "";
    this.el.command.className = "dg-command";
    this.el.comment.textContent = "";
    this.updatePressureUI();
    if (correct) {
      this.changePressure(-3);
      this.showFeedback(d.rightReaction, true);
      SoundSystem.correct();
    } else {
      this.changePressure(8);
      this.showFeedback(d.wrongReaction, false);
      SoundSystem.wrong();
      this.addMiss();
      // 判断ミス時の赤フラッシュ
      this.el.screen.classList.remove("dg-miss-screen-flash");
      void this.el.screen.offsetWidth;
      this.el.screen.classList.add("dg-miss-screen-flash");
      if (d.penaltyPos) {
        this.moving = true;
        const sid = this.sessionId;
        setTimeout(() => {
          if (this.sessionId !== sid) return;
          this.warpPlayer(d.penaltyPos.row, d.penaltyPos.col);
          this.showFeedback("遠回りだ…", false);
          this.moving = false;
        }, 400);
      }
    }
  },

  triggerTrap(row, col, prevRow, prevCol) {
    this.moving = true;
    this.trappedTiles.add(row + "," + col);
    this.cells[row][col].classList.add("dg-trap-flash");
    this.changePressure(18);
    this.showFeedback("罠だ！", false);
    SoundSystem.wrong();
    this.addMiss();
    // 赤スクリーンフラッシュ
    this.el.screen.classList.remove("dg-trap-screen-flash");
    void this.el.screen.offsetWidth;
    this.el.screen.classList.add("dg-trap-screen-flash");
    const trapWarps = this.stage().trapWarps;
    const key = row + "," + col;
    const warpTo = trapWarps && trapWarps[key];
    const sid = this.sessionId;
    setTimeout(() => {
      if (this.sessionId !== sid) return;
      this.cells[row][col].classList.remove("dg-trap-flash");
      if (warpTo && warpTo.block) {
        this.blockedTiles.add(key);
        this.cells[row][col].classList.remove("dg-path");
        this.cells[row][col].classList.add("dg-blocked");
        SoundSystem.collapse();
        this.el.screen.classList.remove("dg-block-shake");
        void this.el.screen.offsetWidth;
        this.el.screen.classList.add("dg-block-shake");
      }
      if (warpTo) {
        this.warpPlayer(warpTo.row, warpTo.col);
        this.showFeedback(warpTo.block ? "通路が崩れた！" : "飛ばされた！", false, warpTo.block);
      } else {
        this.playerRow = prevRow;
        this.playerCol = prevCol;
        this.updatePlayerCell(row, col);
      }
      this.moving = false;
    }, 600);
  },

  warpPlayer(toRow, toCol) {
    const oldR = this.playerRow;
    const oldC = this.playerCol;
    this.playerRow = toRow;
    this.playerCol = toCol;
    this.updatePlayerCell(oldR, oldC);
    // ワープ演出: 画面フラッシュ + セル出現アニメーション
    this.el.screen.classList.remove("dg-warp-flash");
    void this.el.screen.offsetWidth;
    this.el.screen.classList.add("dg-warp-flash");
    this.cells[toRow][toCol].classList.remove("dg-warp-in");
    void this.cells[toRow][toCol].offsetWidth;
    this.cells[toRow][toCol].classList.add("dg-warp-in");
  },

  startWait() {
    this.isWaitPhase = true;
    this.el.dpad.classList.add("dg-wait-mode");
    let count = 3;
    this.el.feedback.textContent = "…" + count;
    this.el.feedback.className = "dg-feedback";
    const sid = this.sessionId;
    this.waitCountInterval = setInterval(() => {
      if (this.sessionId !== sid) { clearInterval(this.waitCountInterval); return; }
      count--;
      if (count > 0) this.el.feedback.textContent = "…" + count;
      else this.el.feedback.textContent = "";
    }, 1000);
    this.waitTimer = setTimeout(() => {
      if (this.sessionId !== sid) return;
      clearInterval(this.waitCountInterval);
      this.isWaitPhase = false;
      this.el.dpad.classList.remove("dg-wait-mode");
      this.resolveDecision(true);
    }, 3000);
  },

  playClearSound() {
    if (!SoundSystem.enabled) return;
    SoundSystem.resume();
    const ctx = SoundSystem.ctx;
    const t = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      const start = t + i * 0.12;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.12, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.3);
      osc.start(start);
      osc.stop(start + 0.3);
    });
  },

  getRank(totalMisses) {
    if (totalMisses <= 0) return { name: "完全覚醒", color: "#ffd700", msg: "全ての誘導を見抜いた" };
    if (totalMisses <= 3) return { name: "鉄の意志", color: "#00ff80", msg: "ほぼ完璧に見抜いた" };
    if (totalMisses <= 8) return { name: "抵抗者", color: "#40ccff", msg: "素早く適応した" };
    if (totalMisses <= 14) return { name: "半覚醒", color: "#ffcc00", msg: "徐々に見抜き始めた" };
    if (totalMisses <= 21) return { name: "流され体質", color: "#ff8040", msg: "まだ空気を読みすぎている" };
    return { name: "完全同調", color: "#ff3060", msg: "完全に支配された" };
  },

  showGameOver() {
    this.resultShown = true;
    this.cleanup();
    // 赤フラッシュ演出
    this.el.screen.classList.remove("dg-gameover-flash");
    void this.el.screen.offsetWidth;
    this.el.screen.classList.add("dg-gameover-flash");
    SoundSystem.wrong();
    // リザルトオーバーレイ
    this.el.resultOverlay.className = "dg-result-overlay";
    this.el.resultRank.className = "dg-result-rank";
    this.el.resultTitle.textContent = "同調汚染:完了";
    this.el.resultTitle.style.color = "#ff0000";
    this.el.resultRank.textContent = "";
    this.el.resultMsg.textContent = "支配度が100%に達した。\nお前はもう群れの一部だ。"
      + "\n\n" + this.stage().name + " / MISS: " + this.totalMisses;
    this.el.btnNext.classList.remove("dg-next-show");
    this.el.resultOverlay.classList.add("dg-result-show");
  },

  showClear() {
    this.resultShown = true;
    this.playClearSound();
    // 緑フラッシュ
    this.el.screen.classList.remove("dg-clear-flash");
    void this.el.screen.offsetWidth;
    this.el.screen.classList.add("dg-clear-flash");
    // リザルト
    const isLastStage = this.currentStage >= DUNGEON_STAGES.length - 1;
    // リザルトオーバーレイのクラスをリセット
    this.el.resultOverlay.className = "dg-result-overlay";
    this.el.resultRank.className = "dg-result-rank";
    if (isLastStage) {
      this.showFinalResult();
      return;
    }
    this.el.resultTitle.textContent = "脱出成功";
    this.el.resultTitle.style.color = "#00ff80";
    this.el.resultRank.textContent = "";
    this.el.resultMsg.textContent = "今回のミス：" + this.missCount + "\n累計ミス：" + this.totalMisses;
    this.el.btnNext.classList.add("dg-next-show");
    this.el.resultOverlay.classList.add("dg-result-show");
  },

  showFinalResult() {
    const rank = this.getRank(this.totalMisses);
    // Phase 1: フェードアウト + 一言メッセージ（1.5秒）
    this.el.resultTitle.textContent = "";
    this.el.resultRank.textContent = "";
    this.el.resultMsg.textContent = "…もう、誰の指示も要らない。";
    this.el.resultMsg.style.color = "#a090c0";
    this.el.btnNext.classList.remove("dg-next-show");
    this.el.resultOverlay.classList.add("dg-result-show", "dg-final-phase1");
    // Phase 2: 本リザルト表示（2秒後）
    const sid = this.sessionId;
    setTimeout(() => {
      if (this.sessionId !== sid) return;
      this.el.resultOverlay.classList.remove("dg-final-phase1");
      this.el.resultOverlay.classList.add("dg-final-phase2");
      this.el.resultTitle.textContent = "全ステージ脱出";
      this.el.resultTitle.style.color = "#ffcc00";
      this.el.resultRank.textContent = rank.name;
      this.el.resultRank.style.color = rank.color;
      this.el.resultRank.classList.add("dg-rank-reveal");
      this.el.resultMsg.textContent = rank.msg
        + "\n総ミス：" + this.totalMisses;
      this.el.resultMsg.style.color = "";
    }, 2000);
  },

  // デバッグ用: 任意ステージから開始（コンソールで Dungeon.debugStartStage(5) 等）
  debugStartStage(stageNum) {
    if (stageNum < 1 || stageNum > DUNGEON_STAGES.length) {
      console.log("ステージは 1〜" + DUNGEON_STAGES.length + " の範囲で指定");
      return;
    }
    this.currentStage = stageNum - 1;
    this.totalMisses = 0;
    this.pressure = 20;
    this.start();
  },
};

// ============================================================
// 斬撃モード（Slash）
// ============================================================

const SLASH_LAYERS = [
  { name: "第一層：覚醒", rounds: 3, choices: 2, timer: 5000, types: ["normal"], imgScale: 1.0 },
  { name: "第二層：惑い", rounds: 4, choices: 2, timer: 4000, types: ["normal", "normal", "obey"], imgScale: 1.0 },
  { name: "第三層：静寂", rounds: 4, choices: 3, timer: 3400, types: ["normal", "normal", "obey", "wait"], imgScale: 0.92 },
  { name: "第四層：混乱", rounds: 4, choices: 4, timer: 3000, types: ["normal", "normal", "obey", "obey", "wait"], imgScale: 0.82 },
  { name: "最深層：決断", rounds: 5, choices: 4, timer: 2600, types: ["normal", "normal", "obey", "obey", "wait"], imgScale: 0.72 },
];

const SLASH_LAYER_HINTS = [
  "命令の逆を斬れ。",
  "「従え」が出たら、命令通りに斬れ。",
  "「待て」が出たら、何も斬るな。\n選択肢が3つになる。",
  "選択肢が4つになる。見極めろ。",
  null, // 最深層: ヒントなし
];

const SLASH_TARGETS = [
  { id: "rat",     name: "ネズミ",     img: "assets/enemy_rat.png" },
  { id: "fly",     name: "ハエ",       img: "assets/enemy_fly.png" },
  { id: "pig",     name: "ブタ",       img: "assets/enemy_pig.png" },
  { id: "spider",  name: "クモ",       img: "assets/enemy_spider.png" },
  { id: "bomb",    name: "爆弾",       img: "assets/item_bomb.png" },
  { id: "burger",  name: "バーガー",   img: "assets/item_burger.png" },
  { id: "mushroom",name: "キノコ",     img: "assets/item_mushroom.png" },
  { id: "potion",  name: "ポーション", img: "assets/item_potion.png" },
  { id: "fire",    name: "炎",         img: "assets/item_fire.png" },
  { id: "treasure",name: "宝箱",       img: "assets/item_treasure.png" },
];

const SWIPE_CONFIG = {
  minDistY: 25,
  maxDistX: 180,
  maxTime: 1000,
};

const Slash = {
  sessionId: 0,
  el: {},
  answered: false,
  activeTargets: [],
  commandedIndex: -1,
  commandedIndices: null,
  correctTargetIndex: -1,
  decisionType: "normal",
  lastTargetIds: [],
  guideShown: false,
  touchState: null,
  timerTimeout: null,
  flinchTimeout: null,
  heartbeatInterval: null,
  heartbeatSpeed: 600,
  roundTime: 5000,
  layerTutorialShown: new Set(),
  hintTimeout: null,
  _dismissFn: null,
  // 層・ラウンド管理
  currentLayer: 0,
  currentRound: 0,
  comboCount: 0,
  maxCombo: 0,
  totalMisses: 0,
  lives: 3,
  maxLives: 3,
  lastDecision: "",
  roundPlan: [],
  // 崩壊演出
  collapseRAF: null,

  init() {
    this.el = {
      screen: document.getElementById("screen-slash"),
      statusWrap: document.getElementById("sl-status-wrap"),
      statusName: document.getElementById("sl-status-name"),
      command: document.getElementById("sl-command"),
      targets: document.getElementById("sl-targets"),
      guide: document.getElementById("sl-guide"),
      timerBar: document.getElementById("sl-timer-bar"),
      timerFill: document.getElementById("sl-timer-fill"),
      urgentOverlay: document.getElementById("sl-urgent-overlay"),
      hitFlash: document.getElementById("sl-hit-flash"),
      vignette: document.getElementById("sl-vignette"),
      layerLabel: document.getElementById("sl-layer-label"),
      comboEl: document.getElementById("sl-combo"),
      layerOverlay: document.getElementById("sl-layer-overlay"),
      layerName: document.getElementById("sl-layer-name"),
      layerHint: document.getElementById("sl-layer-hint"),
      clearOverlay: document.getElementById("sl-clear-overlay"),
      clearMsg: document.getElementById("sl-clear-msg"),
      clearStats: document.getElementById("sl-clear-stats"),
      clearRank: document.getElementById("sl-clear-rank"),
      clearRankMsg: document.getElementById("sl-clear-rank-msg"),
      clearRegret: document.getElementById("sl-clear-regret"),
      clearButtons: document.getElementById("sl-clear-buttons"),
      reward: document.getElementById("sl-reward"),
      livesEl: document.getElementById("sl-lives"),
      gameoverOverlay: document.getElementById("sl-gameover-overlay"),
      gameoverMsg: document.getElementById("sl-gameover-msg"),
      gameoverStats: document.getElementById("sl-gameover-stats"),
    };

    document.getElementById("sl-back").addEventListener("click", () => this.goTitle());
    document.getElementById("sl-btn-again").addEventListener("click", () => this.start());
    document.getElementById("sl-btn-title").addEventListener("click", () => this.goTitle());
    document.getElementById("sl-btn-retry").addEventListener("click", () => this.start());
    document.getElementById("sl-btn-go-title").addEventListener("click", () => this.goTitle());

    const btnSlash = document.getElementById("btn-slash");
    if (btnSlash) btnSlash.addEventListener("click", () => this.start());

    // スワイプ入力: targets コンテナにデリゲート
    let slTouchHandled = false;
    this.el.targets.addEventListener("touchstart", (e) => { slTouchHandled = true; this.onTouchStart(e); }, { passive: false });
    this.el.targets.addEventListener("touchmove", (e) => this.onTouchMove(e), { passive: false });
    this.el.targets.addEventListener("touchend", (e) => this.onTouchEnd(e));
    this.el.targets.addEventListener("touchcancel", () => this.resetTouch());
    // PC用クリックフォールバック
    this.el.targets.addEventListener("click", (e) => {
      if (slTouchHandled) { slTouchHandled = false; return; }
      const t = e.target.closest(".sl-target");
      if (t && !this.answered) this.onSlash(parseInt(t.dataset.index), t);
    });
  },

  calcTension() {
    var layerBase = [0, 0.15, 0.35, 0.55, 0.75][this.currentLayer] || 0;
    var livesBonus = this.lives >= 3 ? 0 : this.lives === 2 ? 0.1 : 0.25;
    return Math.min(1.0, layerBase + livesBonus);
  },

  goTitle() {
    this.sessionId++;
    this.cleanup();
    this.clearEffects();
    SoundSystem.stopSlashAmbient();
    SoundSystem.startTitleAmbient();
    Game.showScreen(document.getElementById("screen-title"));
    TitlePrologue.startIdle();
  },

  cleanup() {
    this.answered = true;
    this.touchState = null;
    clearTimeout(this.timerTimeout);
    clearTimeout(this.flinchTimeout);
    clearInterval(this.heartbeatInterval);
    this.timerTimeout = null;
    this.flinchTimeout = null;
    this.heartbeatInterval = null;
    if (this.collapseRAF) { cancelAnimationFrame(this.collapseRAF); this.collapseRAF = null; }
  },

  clearEffects() {
    this.el.screen.classList.remove("sl-screen-shake", "sl-screen-shake-light", "sl-screen-shake-heavy", "sl-hit-zoom", "sl-miss-flash", "sl-miss-shake", "sl-late-bg");
    this.el.urgentOverlay.classList.remove("sl-urgent-active");
    this.el.hitFlash.classList.remove("sl-flash-fire");
    this.el.vignette.classList.remove("sl-vig-active");
    this.el.command.classList.remove("sl-cmd-wobble");
    this.el.command.style.transform = "";
    this.el.screen.style.transform = "";
    this.el.screen.scrollTop = 0;
    document.querySelector(".sl-zone-center").classList.remove("sl-zoom-in");
    this.el.layerOverlay.classList.remove("sl-lo-show");
    this.el.layerOverlay.style.pointerEvents = "";
    if (this._dismissFn) {
      this.el.layerOverlay.removeEventListener("click", this._dismissFn);
      this._dismissFn = null;
    }
    this.el.layerHint.classList.remove("sl-lh-show");
    this.el.layerHint.textContent = "";
    clearTimeout(this.hintTimeout);
    this.el.clearOverlay.classList.remove("sl-co-show");
    this.el.statusWrap.classList.remove("sl-status-pulse");
    this.el.reward.style.opacity = "0";
    this.el.reward.textContent = "";
    this.el.clearRankMsg.textContent = "";
    this.el.clearRegret.textContent = "";
    this.el.clearButtons.style.opacity = "0";
    this.el.clearButtons.style.pointerEvents = "none";
    this.el.gameoverOverlay.classList.remove("sl-go-show");
    if (this.collapseRAF) { cancelAnimationFrame(this.collapseRAF); this.collapseRAF = null; }
  },

  start() {
    this.sessionId++;
    this.cleanup();
    this.guideShown = false;
    this.lastTargetIds = [];
    this.currentLayer = 0;
    this.currentRound = 0;
    this.comboCount = 0;
    this.maxCombo = 0;
    this.totalMisses = 0;
    this.lives = this.maxLives;
    this.lastDecision = "";
    SoundSystem.init();
    SoundSystem.stopAmbient();
    SoundSystem.startSlashAmbient(0);
    this.clearEffects();
    // スクロール・transform 確実リセット
    this.el.screen.scrollTop = 0;
    this.el.screen.style.transform = "";
    this.el.comboEl.classList.remove("sl-combo-show", "sl-combo-hot");
    this.el.comboEl.textContent = "";
    this.updateLivesUI();
    Game.showScreen(this.el.screen);
    this.showLayerTitle();
  },

  // 制御付きランダム: 層の全ラウンド分のタイプ配列を生成
  // ルール: 同じタイプが3連続しない、前半と後半でタイプ偏りが少ない
  buildRoundPlan(layer) {
    var rounds = layer.rounds;
    var types = layer.types;
    // types配列から均等に抽出し、シャッフル
    var plan = [];
    // まず各タイプを最低1回ずつ入れ、残りをランダムで埋める
    var unique = [];
    for (var i = 0; i < types.length; i++) {
      if (unique.indexOf(types[i]) === -1) unique.push(types[i]);
    }
    // 各ユニークタイプを最低1回保証
    for (var u = 0; u < unique.length && plan.length < rounds; u++) {
      plan.push(unique[u]);
    }
    // 残りは重み付きランダムで埋める（types配列の出現頻度が重みになる）
    while (plan.length < rounds) {
      plan.push(types[Math.floor(Math.random() * types.length)]);
    }
    // Fisher-Yatesシャッフル
    for (var i = plan.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = plan[i]; plan[i] = plan[j]; plan[j] = tmp;
    }
    // 3連続チェック: 違反があれば位置を入れ替えて解消（最大20回試行）
    for (var attempt = 0; attempt < 20; attempt++) {
      var bad = -1;
      for (var i = 2; i < plan.length; i++) {
        if (plan[i] === plan[i - 1] && plan[i] === plan[i - 2]) { bad = i; break; }
      }
      if (bad === -1) break;
      // bad位置の要素を、異なるタイプの位置と交換
      for (var s = 0; s < plan.length; s++) {
        if (s !== bad && plan[s] !== plan[bad]) {
          // 交換後に新たな3連続ができないかチェック
          var tmp2 = plan[bad]; plan[bad] = plan[s]; plan[s] = tmp2;
          var ok = true;
          for (var c = 2; c < plan.length; c++) {
            if (plan[c] === plan[c - 1] && plan[c] === plan[c - 2]) { ok = false; break; }
          }
          if (ok) break;
          // 戻す
          plan[s] = plan[bad]; plan[bad] = tmp2;
        }
      }
    }
    return plan;
  },

  showLayerTitle() {
    const layer = SLASH_LAYERS[this.currentLayer];
    this.el.layerName.textContent = layer.name;
    this.el.layerLabel.textContent = layer.name;
    this.el.layerHint.textContent = "";
    this.el.layerHint.classList.remove("sl-lh-show");
    this.el.layerOverlay.classList.add("sl-lo-show");
    SoundSystem.updateSlashTension(this.calcTension());
    // 層開始時にラウンドプランを生成
    this.roundPlan = this.buildRoundPlan(layer);
    const sid = this.sessionId;

    const hint = SLASH_LAYER_HINTS[this.currentLayer];
    const showHint = hint && !this.layerTutorialShown.has(this.currentLayer);

    if (showHint) {
      this.layerTutorialShown.add(this.currentLayer);
      // 1200ms後にヒント表示
      setTimeout(() => {
        if (this.sessionId !== sid) return;
        this.el.layerHint.textContent = hint;
        this.el.layerHint.classList.add("sl-lh-show");

        // タップ or 3秒で消去 → startRound（二重実行防止）
        var dismissed = false;
        const dismiss = () => {
          if (dismissed || this.sessionId !== sid) return;
          dismissed = true;
          clearTimeout(this.hintTimeout);
          this.el.layerOverlay.removeEventListener("click", dismiss);
          this.el.layerOverlay.style.pointerEvents = "";
          this.el.layerOverlay.classList.remove("sl-lo-show");
          this.el.layerHint.classList.remove("sl-lh-show");
          if (this.currentLayer >= 3) {
            this.el.screen.classList.add("sl-late-bg");
            this.el.command.classList.add("sl-cmd-wobble");
          }
          this.currentRound = 0;
          this.startRound();
        };
        this.el.layerOverlay.style.pointerEvents = "auto";
        if (this._dismissFn) this.el.layerOverlay.removeEventListener("click", this._dismissFn);
        this._dismissFn = dismiss;
        this.el.layerOverlay.addEventListener("click", dismiss);
        this.hintTimeout = setTimeout(dismiss, 3000);
      }, 1200);
    } else {
      // ヒントなし: 従来通り1200msで消去
      setTimeout(() => {
        if (this.sessionId !== sid) return;
        this.el.layerOverlay.classList.remove("sl-lo-show");
        if (this.currentLayer >= 3) {
          this.el.screen.classList.add("sl-late-bg");
          this.el.command.classList.add("sl-cmd-wobble");
        }
        this.currentRound = 0;
        this.startRound();
      }, 1200);
    }
  },

  startRound() {
    this.cleanup();
    this.answered = false;
    this.clearEffects();
    // 終盤クラス再適用
    if (this.currentLayer >= 3) {
      this.el.screen.classList.add("sl-late-bg");
      this.el.command.classList.add("sl-cmd-wobble");
    }

    const layer = SLASH_LAYERS[this.currentLayer];

    // 判定タイプ（事前生成プランから取得）
    const dt = this.roundPlan[this.currentRound] || layer.types[Math.floor(Math.random() * layer.types.length)];
    this.lastDecision = dt;
    this.decisionType = dt;
    this.updateStatusUI();

    // 択数 & タイマー（waitは通常より長く耐える必要がある）
    const choices = layer.choices;
    this.roundTime = (dt === "wait") ? Math.round(layer.timer * 1.15) : layer.timer;
    this.pickTargets(choices);
    this.generateCommand();
    this.renderTargets();

    // wait: ターゲットに警告脈動を付与
    if (this.decisionType === "wait") {
      this.el.targets.querySelectorAll(".sl-target").forEach(function(c) {
        c.classList.add("sl-target-danger");
      });
    }

    // コンボUI
    this.updateComboUI();

    // ガイド（初回のみ）
    if (!this.guideShown) {
      this.el.guide.classList.add("sl-guide-show");
      this.guideShown = true;
      setTimeout(() => this.el.guide.classList.remove("sl-guide-show"), 2500);
    }

    this.startTimer();

    // 崩壊演出: 最終層 or 残りラウンド2以下
    const isCollapsing = this.currentLayer === SLASH_LAYERS.length - 1 ||
      (this.currentLayer >= 3 && (SLASH_LAYERS[this.currentLayer].rounds - this.currentRound) <= 2);
    if (isCollapsing) this.startCollapse();
  },

  startCollapse() {
    const sid = this.sessionId;
    const cmd = this.el.command;
    const scr = this.el.screen;
    let frame = 0;
    const tick = () => {
      if (this.sessionId !== sid || this.answered) {
        cmd.style.transform = "";
        scr.style.transform = "";
        this.collapseRAF = null;
        return;
      }
      // 2フレームに1回更新（酔い防止）
      frame++;
      if (frame % 2 === 0) {
        // テキスト微ブレ（±0.7px — 読みやすさ維持）
        const ox = (Math.random() - 0.5) * 1.4;
        const oy = (Math.random() - 0.5) * 1.4;
        cmd.style.transform = "translate(" + ox + "px," + oy + "px)";
        // 画面微歪み（scale 1.0-1.008 — 知覚はするが酔わない）
        const s = 1 + Math.random() * 0.008;
        scr.style.transform = "scale(" + s + ")";
      }
      this.collapseRAF = requestAnimationFrame(tick);
    };
    this.collapseRAF = requestAnimationFrame(tick);
  },

  startTimer() {
    const dur = this.roundTime;
    const sid = this.sessionId;
    const urgentAt = Math.min(1500, dur * 0.4);

    this.el.timerFill.style.transition = "none";
    this.el.timerFill.style.width = "100%";
    this.el.timerBar.classList.remove("sl-timer-urgent");
    this.el.timerBar.classList.add("sl-timer-active");

    requestAnimationFrame(() => {
      this.el.timerFill.style.transition = "width " + (dur / 1000) + "s linear";
      this.el.timerFill.style.width = "0%";
    });

    // 残り1.5秒: ビクつき + ビネット + ズーム + 心拍
    this.flinchTimeout = setTimeout(() => {
      if (this.sessionId !== sid || this.answered) return;
      this.el.timerBar.classList.add("sl-timer-urgent");
      this.el.urgentOverlay.classList.add("sl-urgent-active");
      this.el.vignette.classList.add("sl-vig-active");
      document.querySelector(".sl-zone-center").classList.add("sl-zoom-in");
      this.el.targets.querySelectorAll(".sl-target").forEach(c => {
        c.classList.add("sl-target-flinch");
      });
      // 心拍音（加速ループ: 600ms → 350ms）
      this.heartbeatSpeed = 600;
      const hbLoop = () => {
        if (this.sessionId !== sid || this.answered) return;
        SoundSystem.heartbeat();
        this.heartbeatSpeed = Math.max(400, this.heartbeatSpeed - 25);
        this.heartbeatInterval = setTimeout(() => hbLoop(), this.heartbeatSpeed);
      };
      hbLoop();
    }, dur - urgentAt);

    this.timerTimeout = setTimeout(() => {
      if (this.sessionId !== sid || this.answered) return;
      this.onTimeout();
    }, dur);
  },

  stopTimer() {
    clearTimeout(this.timerTimeout);
    clearTimeout(this.flinchTimeout);
    clearTimeout(this.heartbeatInterval);
    this.timerTimeout = null;
    this.flinchTimeout = null;
    this.heartbeatInterval = null;
    this.el.timerFill.style.transition = "none";
    this.el.timerBar.classList.remove("sl-timer-active", "sl-timer-urgent");
    this.el.urgentOverlay.classList.remove("sl-urgent-active");
    this.el.vignette.classList.remove("sl-vig-active");
    document.querySelector(".sl-zone-center").classList.remove("sl-zoom-in");
  },

  pickTargets(count) {
    const pool = [...SLASH_TARGETS];
    const filtered = pool.filter(t => !this.lastTargetIds.includes(t.id));
    const source = filtered.length >= count ? filtered : pool;
    const shuffled = source.sort(() => Math.random() - 0.5);
    this.activeTargets = shuffled.slice(0, count);
    this.lastTargetIds = this.activeTargets.map(t => t.id);
    // 3択以上+normal: (N-1)体を命令し、残り1体が正解（単一正解）
    // 3択以上+obey: 1体を命令し、その1体が正解（単一正解）
    // 2択: 従来通り1体を命令
    if (count >= 3 && this.decisionType === "normal") {
      // commandedIndices: 命令される(count-1)体、残り1体が正解
      const all = [];
      for (var ai = 0; ai < count; ai++) all.push(ai);
      all.sort(() => Math.random() - 0.5);
      this.correctTargetIndex = all[0];
      this.commandedIndices = all.slice(1);
      this.commandedIndex = -1;
    } else {
      this.commandedIndex = Math.floor(Math.random() * count);
      this.commandedIndices = null;
      this.correctTargetIndex = -1;
    }
  },

  generateCommand() {
    if (this.decisionType === "wait") {
      this.el.command.textContent = "斬るな";
      return;
    }
    // 3択以上+normal: 「XとYとZを斬れ」→ 逆らえ＝残り1体を斬る
    if (this.commandedIndices) {
      const names = this.commandedIndices.map(i => this.activeTargets[i].name);
      this.el.command.textContent = names.join("と") + "を斬れ";
      return;
    }
    const target = this.activeTargets[this.commandedIndex];
    this.el.command.textContent = target.name + "を斬れ";
  },

  renderTargets() {
    this.el.targets.innerHTML = "";
    this.el.targets.dataset.count = this.activeTargets.length;
    const layer = SLASH_LAYERS[this.currentLayer];
    this.activeTargets.forEach((t, i) => {
      const card = document.createElement("div");
      card.className = "sl-target";
      card.dataset.index = i;
      card.dataset.id = t.id;
      // 層ごとの画像スケール
      if (layer.imgScale && layer.imgScale < 1) {
        card.style.setProperty("--layer-scale", layer.imgScale);
      }
      const img = document.createElement("img");
      img.src = t.img;
      img.alt = t.name;
      img.className = "sl-target-img";
      img.draggable = false;
      card.appendChild(img);
      this.el.targets.appendChild(card);
    });
    requestAnimationFrame(() => {
      this.el.targets.querySelectorAll(".sl-target").forEach(c => c.classList.add("sl-target-enter"));
    });
  },

  updateStatusUI() {
    if (this.decisionType === "obey") {
      this.el.statusWrap.dataset.stage = "decision-obey";
      this.el.statusName.textContent = "従え";
    } else if (this.decisionType === "wait") {
      this.el.statusWrap.dataset.stage = "decision-wait";
      this.el.statusName.textContent = "動くな";
    } else {
      this.el.statusWrap.dataset.stage = "decision-normal";
      this.el.statusName.textContent = "逆らえ";
    }
  },

  updateComboUI() {
    if (this.comboCount >= 3) {
      this.el.comboEl.textContent = this.comboCount + " combo";
      this.el.comboEl.classList.add("sl-combo-show");
      this.el.comboEl.classList.toggle("sl-combo-hot", this.comboCount >= 10);
    } else {
      this.el.comboEl.classList.remove("sl-combo-show", "sl-combo-hot");
    }
  },

  updateLivesUI(breakIndex) {
    var html = "";
    for (var i = 0; i < this.maxLives; i++) {
      if (i < this.lives) {
        html += '<div class="sl-life"></div>';
      } else if (i === breakIndex) {
        html += '<div class="sl-life sl-life-lost sl-life-break"></div>';
      } else {
        html += '<div class="sl-life sl-life-lost"></div>';
      }
    }
    this.el.livesEl.innerHTML = html;
  },

  // --- スワイプ入力 ---
  onTouchStart(e) {
    if (this.answered) return;
    const touch = e.touches[0];
    const target = touch.target.closest(".sl-target");
    if (!target) return;
    e.preventDefault();
    this.touchState = {
      el: target,
      index: parseInt(target.dataset.index),
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
    };
  },

  onTouchMove(e) {
    if (!this.touchState || this.answered) return;
    e.preventDefault();
    const touch = e.touches[0];
    const dy = touch.clientY - this.touchState.startY;
    if (dy > 0) {
      const clamped = Math.min(dy, 100);
      this.touchState.el.style.transform = "translateY(" + clamped + "px)";
      if (dy > SWIPE_CONFIG.minDistY) {
        this.touchState.el.style.opacity = "0.5";
      } else {
        this.touchState.el.style.opacity = "";
      }
    }
  },

  onTouchEnd(e) {
    if (!this.touchState || this.answered) return;
    const ts = this.touchState;
    this.touchState = null;
    const touch = e.changedTouches[0];
    const dy = touch.clientY - ts.startY;
    const dx = touch.clientX - ts.startX;
    const dt = Date.now() - ts.startTime;
    ts.el.style.transform = "";
    ts.el.style.opacity = "";
    if (dy > SWIPE_CONFIG.minDistY && Math.abs(dx) < SWIPE_CONFIG.maxDistX && dt < SWIPE_CONFIG.maxTime) {
      this.onSlash(ts.index, ts.el);
    }
  },

  resetTouch() {
    if (this.touchState) {
      this.touchState.el.style.transform = "";
      this.touchState.el.style.opacity = "";
      this.touchState = null;
    }
  },

  // --- 斬り判定 ---
  onSlash(index, targetEl) {
    if (this.answered) return;
    this.answered = true;
    this.stopTimer();

    // 「動くな」なのに斬った → ミス
    if (this.decisionType === "wait") {
      this.onWrongSlash(targetEl);
      return;
    }

    let correct;
    if (this.commandedIndices) {
      // 3択+normal: 命令されなかった1体だけが正解
      correct = (index === this.correctTargetIndex);
    } else if (this.decisionType === "normal") {
      // 2択+逆らえ: 命令された対象以外を斬れば正解
      correct = (index !== this.commandedIndex);
    } else {
      // 従え: 命令された対象を斬れば正解
      correct = (index === this.commandedIndex);
    }

    if (correct) {
      this.onCorrectSlash(targetEl);
    } else {
      this.onWrongSlash(targetEl);
    }
  },

  onCorrectSlash(targetEl) {
    this.comboCount++;
    if (this.comboCount > this.maxCombo) this.maxCombo = this.comboCount;
    const combo = this.comboCount;
    const isFinal = this.isFinalRound();

    // コンボ段階でパラメータを決定
    let freezeTime, flashOpacity, shakeClass, splitDist, splitRot, splitDrop, soundVol;
    if (isFinal) {
      // 最終ヒット特別演出（長いフリーズ → 衝撃）
      freezeTime = 350;
      flashOpacity = 1.0;
      shakeClass = "sl-screen-shake-heavy";
      splitDist = 80; splitRot = 45; splitDrop = 180;
      soundVol = 1.0;
    } else if (combo >= 10) {
      freezeTime = 150;
      flashOpacity = 0.9;
      shakeClass = "sl-screen-shake-heavy";
      splitDist = 60; splitRot = 33; splitDrop = 132;
      soundVol = 1.0;
    } else if (combo >= 5) {
      freezeTime = 100;
      flashOpacity = 0.8;
      shakeClass = "sl-screen-shake";
      splitDist = 60; splitRot = 33; splitDrop = 132;
      soundVol = 1.0;
    } else if (combo >= 3) {
      freezeTime = 100;
      flashOpacity = 0.7;
      shakeClass = "sl-screen-shake";
      splitDist = 55; splitRot = 30; splitDrop = 120;
      soundVol = 1.0;
    } else {
      // 0-2: 控えめ（基準の70%）
      freezeTime = 70;
      flashOpacity = 0.5;
      shakeClass = "sl-screen-shake-light";
      splitDist = 40; splitRot = 20; splitDrop = 90;
      soundVol = 0.7;
    }

    // 触覚フィードバック
    if (navigator.vibrate) navigator.vibrate(combo >= 5 ? [15, 30, 50] : 30);

    // 崩壊演出を停止
    if (this.collapseRAF) {
      cancelAnimationFrame(this.collapseRAF);
      this.collapseRAF = null;
      this.el.command.style.transform = "";
      this.el.screen.style.transform = "";
    }

    // 1. ヒットフリーズ
    targetEl.classList.add("sl-hit-freeze");
    targetEl.style.transform = "";
    targetEl.style.opacity = "";

    const sid = this.sessionId;
    setTimeout(() => {
      if (this.sessionId !== sid) return;

      // 2. 白フラッシュ（コンボ段階で強度変化）
      this.el.hitFlash.style.opacity = flashOpacity;
      this.el.hitFlash.classList.add("sl-flash-fire");
      const flashDur = isFinal ? 70 : 50;
      setTimeout(() => {
        this.el.hitFlash.classList.remove("sl-flash-fire");
        this.el.hitFlash.style.opacity = "";
        // 最終ヒット: 2回目フラッシュ
        if (isFinal) {
          setTimeout(() => {
            this.el.hitFlash.style.opacity = "0.6";
            this.el.hitFlash.classList.add("sl-flash-fire");
            setTimeout(() => {
              this.el.hitFlash.classList.remove("sl-flash-fire");
              this.el.hitFlash.style.opacity = "";
            }, 40);
          }, 60);
        }
      }, flashDur);

      // 3. 斬撃音（最終ヒットは特殊SE）
      if (isFinal) {
        SoundSystem.finalSlash();
      } else {
        SoundSystem.slash(combo, soundVol);
      }

      // 4. フリーズ解除
      targetEl.classList.remove("sl-hit-freeze");

      // 5. 斬撃線
      const slashLine = document.createElement("div");
      slashLine.className = "sl-slash-line-proto";
      targetEl.appendChild(slashLine);

      // 6. 画像を分裂（コンボ段階で距離変化）
      const img = targetEl.querySelector(".sl-target-img");
      const imgSrc = img.src;
      img.style.visibility = "hidden";

      const leftHalf = document.createElement("div");
      leftHalf.className = "sl-split-half sl-split-left";
      leftHalf.style.backgroundImage = "url(" + imgSrc + ")";

      const rightHalf = document.createElement("div");
      rightHalf.className = "sl-split-half sl-split-right";
      rightHalf.style.backgroundImage = "url(" + imgSrc + ")";

      // 動的分裂パラメータ
      const dur = isFinal ? "0.6s" : (combo >= 5 ? "0.4s" : "0.45s");
      leftHalf.style.transition = "transform " + dur + " ease-out, opacity " + dur + " ease-out";
      rightHalf.style.transition = "transform " + dur + " ease-out, opacity " + dur + " ease-out";

      targetEl.appendChild(leftHalf);
      targetEl.appendChild(rightHalf);

      requestAnimationFrame(() => {
        leftHalf.style.transform = "translate(-" + splitDist + "px, " + splitDrop + "px) rotate(-" + splitRot + "deg)";
        leftHalf.style.opacity = "0";
        rightHalf.style.transform = "translate(" + splitDist + "px, " + splitDrop + "px) rotate(" + splitRot + "deg)";
        rightHalf.style.opacity = "0";
      });

      // 7. 画面シェイク（段階別）
      this.el.screen.classList.remove("sl-screen-shake", "sl-screen-shake-light", "sl-screen-shake-heavy", "sl-hit-zoom");
      void this.el.screen.offsetWidth;
      this.el.screen.classList.add(shakeClass);
      // ヒットズーム（0.05秒のスケールパンチ）
      this.el.screen.classList.add("sl-hit-zoom");

      // 8. 他の対象をフェードアウト
      this.el.targets.querySelectorAll(".sl-target").forEach(c => {
        if (c !== targetEl) c.classList.add("sl-target-fade");
      });

      // 9. コンボUI + 報酬テキスト
      this.updateComboUI();
      this.showReward(combo);

      // 10. 次へ（最終ヒットは長い余韻）
      const advDelay = isFinal ? 1800 : 900;
      setTimeout(() => {
        if (this.sessionId !== sid) return;
        this.el.screen.classList.remove("sl-screen-shake", "sl-screen-shake-light", "sl-screen-shake-heavy", "sl-hit-zoom");
        this.advanceRound();
      }, advDelay);
    }, freezeTime);
  },

  showReward(combo) {
    if (combo >= 10) {
      this.el.reward.textContent = "FEVER";
      this.el.reward.className = "sl-reward sl-reward-fever";
    } else if (combo >= 5) {
      this.el.reward.textContent = "GOOD";
      this.el.reward.className = "sl-reward sl-reward-good";
    } else {
      return;
    }
    this.el.reward.style.opacity = "1";
    setTimeout(() => { this.el.reward.style.opacity = "0"; }, 600);
  },

  onWrongSlash(targetEl) {
    const hadCombo = this.comboCount >= 3;
    this.comboCount = 0;
    this.totalMisses++;
    this.lives--;
    this.updateLivesUI(this.lives); // breakIndex = 失われたライフの位置
    SoundSystem.wrong();
    SoundSystem.updateSlashTension(this.calcTension());
    if (navigator.vibrate) navigator.vibrate([50, 30, 80]);

    targetEl.classList.add("sl-wrong-hit");
    targetEl.style.transform = "";
    targetEl.style.opacity = "";

    // ミス: 上に弾く
    setTimeout(() => targetEl.classList.add("sl-wrong-bounce"), 100);

    // 画面赤フラッシュ + シェイク
    this.el.screen.classList.remove("sl-miss-flash", "sl-miss-shake");
    void this.el.screen.offsetWidth;
    this.el.screen.classList.add("sl-miss-flash", "sl-miss-shake");

    // 状態ラベルをパルスして「今のルール」を想起させる
    this.el.statusWrap.classList.remove("sl-status-pulse");
    void this.el.statusWrap.offsetWidth;
    this.el.statusWrap.classList.add("sl-status-pulse");

    // コンボブレイク表示
    if (hadCombo) {
      this.el.comboEl.textContent = "BREAK";
      this.el.comboEl.classList.remove("sl-combo-hot");
      this.el.comboEl.classList.add("sl-combo-show", "sl-combo-break");
      setTimeout(() => {
        this.el.comboEl.classList.remove("sl-combo-show", "sl-combo-break");
        this.el.comboEl.textContent = "";
      }, 700);
    } else {
      this.updateComboUI();
    }

    // ゲームオーバー判定
    if (this.lives <= 0) {
      const sid = this.sessionId;
      setTimeout(() => {
        if (this.sessionId !== sid) return;
        this.showGameOver();
      }, 900);
      return;
    }

    const sid = this.sessionId;
    setTimeout(() => {
      if (this.sessionId !== sid) return;
      this.advanceRound();
    }, 800);
  },

  onTimeout() {
    this.answered = true;
    this.stopTimer();

    // 「動くな」でタイムアウト = 正解
    if (this.decisionType === "wait") {
      this.onWaitSuccess();
      return;
    }

    const hadCombo = this.comboCount >= 3;
    this.comboCount = 0;
    this.totalMisses++;
    this.lives--;
    this.updateLivesUI(this.lives);
    SoundSystem.wrong();
    SoundSystem.updateSlashTension(this.calcTension());
    this.el.command.textContent = "…遅い";
    this.el.targets.querySelectorAll(".sl-target").forEach(c => c.classList.add("sl-target-fade"));
    if (hadCombo) {
      this.el.comboEl.textContent = "BREAK";
      this.el.comboEl.classList.remove("sl-combo-hot");
      this.el.comboEl.classList.add("sl-combo-show", "sl-combo-break");
      setTimeout(() => {
        this.el.comboEl.classList.remove("sl-combo-show", "sl-combo-break");
        this.el.comboEl.textContent = "";
      }, 700);
    } else {
      this.updateComboUI();
    }

    // ゲームオーバー判定
    if (this.lives <= 0) {
      const sid = this.sessionId;
      setTimeout(() => {
        if (this.sessionId !== sid) return;
        this.showGameOver();
      }, 900);
      return;
    }

    const sid = this.sessionId;
    setTimeout(() => {
      if (this.sessionId !== sid) return;
      this.advanceRound();
    }, 800);
  },

  onWaitSuccess() {
    this.comboCount++;
    if (this.comboCount > this.maxCombo) this.maxCombo = this.comboCount;
    this.el.command.textContent = "…耐えたな";
    this.el.targets.querySelectorAll(".sl-target").forEach(c => c.classList.add("sl-target-fade"));
    this.updateComboUI();
    const sid = this.sessionId;
    setTimeout(() => {
      if (this.sessionId !== sid) return;
      this.advanceRound();
    }, 800);
  },

  advanceRound() {
    this.currentRound++;
    const layer = SLASH_LAYERS[this.currentLayer];
    if (this.currentRound >= layer.rounds) {
      // 次の層へ
      this.currentLayer++;
      if (this.currentLayer >= SLASH_LAYERS.length) {
        this.showClear();
      } else {
        this.showLayerTitle();
      }
    } else {
      this.startRound();
    }
  },

  isFinalRound() {
    const layer = SLASH_LAYERS[this.currentLayer];
    return this.currentLayer === SLASH_LAYERS.length - 1 &&
           this.currentRound === layer.rounds - 1;
  },

  showGameOver() {
    const sid = this.sessionId;
    this.cleanup();
    SoundSystem.stopSlashAmbient();

    // 崩壊演出を停止
    if (this.collapseRAF) {
      cancelAnimationFrame(this.collapseRAF);
      this.collapseRAF = null;
      this.el.command.style.transform = "";
      this.el.screen.style.transform = "";
    }

    // ゲームオーバーメッセージ
    var reached = 0;
    for (var li = 0; li < this.currentLayer; li++) reached += SLASH_LAYERS[li].rounds;
    reached += this.currentRound;
    var total = 0;
    for (var li = 0; li < SLASH_LAYERS.length; li++) total += SLASH_LAYERS[li].rounds;
    var remaining = total - reached;

    var regret = "";
    if (remaining === 1) regret = "あと1問だった。";
    else if (remaining === 2) regret = "あと2問だった。";
    else if (remaining <= 4) regret = "あと" + remaining + "問だった。";
    else if (reached <= 5) regret = "まだ序盤だった。";

    this.el.gameoverMsg.textContent = "…支配された";
    this.el.gameoverStats.textContent = "到達：" + reached + " / " + total + "問"
      + (regret ? "\n" + regret : "");
    SoundSystem.gameoverSound();

    setTimeout(() => {
      if (this.sessionId !== sid) return;
      this.el.gameoverOverlay.classList.add("sl-go-show");
    }, 300);
  },

  showClear() {
    SoundSystem.stopSlashAmbient();
    const sid = this.sessionId;

    // リセット
    this.el.clearMsg.textContent = "";
    this.el.clearStats.textContent = "";
    this.el.clearRank.textContent = "";
    this.el.clearRankMsg.textContent = "";
    this.el.clearRegret.textContent = "";
    this.el.clearButtons.style.opacity = "0";
    this.el.clearButtons.style.pointerEvents = "none";

    // ① 暗転
    setTimeout(() => {
      if (this.sessionId !== sid) return;
      this.el.clearOverlay.classList.add("sl-co-show");

      // ② タイプライター: "…まだ終わりじゃない。"
      const msg = "…まだ終わりじゃない。";
      const chars = msg.split("");
      let ci = 0;
      setTimeout(() => {
        if (this.sessionId !== sid) return;
        const typeTimer = setInterval(() => {
          if (this.sessionId !== sid) { clearInterval(typeTimer); return; }
          if (ci < chars.length) {
            const c = chars[ci];
            this.el.clearMsg.appendChild(document.createTextNode(c));
            ci++;
          } else {
            clearInterval(typeTimer);
            // ③ 少し余韻 → Crowdへ遷移
            setTimeout(() => {
              if (this.sessionId !== sid) return;
              this.transitionToCrowd();
            }, 1200);
          }
        }, 75);
      }, 900);
    }, 250);
  },

  transitionToCrowd() {
    const overlay = document.getElementById("dungeon-transition");
    const text = document.getElementById("dg-transition-text");
    overlay.classList.add("dg-trans-active");
    const sid = this.sessionId;
    setTimeout(() => {
      if (this.sessionId !== sid) return;
      text.textContent = "…最深部へ";
      text.classList.add("dg-trans-text-show");
      setTimeout(() => {
        if (this.sessionId !== sid) return;
        text.classList.remove("dg-trans-text-show");
        setTimeout(() => {
          if (this.sessionId !== sid) return;
          Crowd.start();
          overlay.classList.remove("dg-trans-active");
          text.textContent = "";
        }, 500);
      }, 1500);
    }, 600);
  },

  showOX(isCorrect) {
    const oxOverlay = document.getElementById("ox-overlay");
    const oxSymbol = document.getElementById("ox-symbol");
    oxOverlay.classList.remove("ox-show");
    oxSymbol.className = "ox-symbol";
    void oxOverlay.offsetWidth;
    oxSymbol.classList.add(isCorrect ? "ox-correct" : "ox-wrong");
    oxOverlay.classList.add("ox-show");
    const sid = this.sessionId;
    setTimeout(() => {
      if (this.sessionId !== sid) return;
      oxOverlay.classList.remove("ox-show");
    }, 400);
  },
};

// ============================================================
// 連続ジャッジルーム
// ============================================================

// ============================================================
// 問題テンプレートプール
// ============================================================

// --- 方向命令テンプレート（normal/obey 両対応） ---
// 同じ command が type 違いでセッション内に出現し、意味が逆転する
// 命令文は同調圧力表現。読めば方向が分かるが、心理的圧力でミスを誘う
const JT_DIRECTION = [
  // #1 同調圧力 — 「みんなやってる」系
  { command: "みんな右に行ってるよ？",
    normal: { correct: "left",  wrongR: "多数派に流された",     rightR: "空気を読まなかった" },
    obey:   { correct: "right", wrongR: "疑いすぎた",           rightR: "流れに乗れた" },
    luresN: ["そっちでしょ", "一人だけ逆とか恥ずかしくない？", null],
    luresO: ["…本当にみんなと同じでいいの？", "騙されてない？", null] },
  // #2 常識圧力 — 「普通こうする」系
  { command: "普通、左を選ぶでしょ",
    normal: { correct: "right", wrongR: "常識に負けた",         rightR: "常識を疑えた" },
    obey:   { correct: "left",  wrongR: "ひねくれすぎた",       rightR: "素直に従えた" },
    luresN: ["当たり前だろ", "なに考えてるの？", null],
    luresO: ["…普通って何？", "自分で考えろよ", null] },
  // #3 権威圧力 — 断言で押す
  { command: "右以外ありえないでしょ",
    normal: { correct: "left",  wrongR: "断言に押された",       rightR: "ありえないを疑えた" },
    obey:   { correct: "right", wrongR: "反抗しすぎた",         rightR: "正しく見極めた" },
    luresN: ["当然でしょ", "迷う要素ある？", null],
    luresO: ["…本当にそう？", "押しつけがましくない？", null] },
  // #4 空気圧力 — 「決まったこと」系
  { command: "左って決まってるから",
    normal: { correct: "right", wrongR: "空気に飲まれた",       rightR: "決めつけに抗えた" },
    obey:   { correct: "left",  wrongR: "逆張りしすぎた",       rightR: "流れに従えた" },
    luresN: ["もう決まったよ", "一人で逆らうの？", null],
    luresO: ["…誰が決めたの？", "本当に？", null] },
  // #5 羞恥圧力 — 「まだ？」系
  { command: "まだ迷ってるの？右だって",
    normal: { correct: "left",  wrongR: "焦らされて従った",     rightR: "焦りに負けなかった" },
    obey:   { correct: "right", wrongR: "意地を張りすぎた",     rightR: "素直に選べた" },
    luresN: ["遅いよ", "みんな待ってるんだけど", null],
    luresO: ["…急かされてない？", "落ち着け", null] },
  // #6 羞恥圧力 — 驚きで揺さぶる
  { command: "え、左じゃないの？マジで？",
    normal: { correct: "right", wrongR: "驚きに流された",       rightR: "動揺しなかった" },
    obey:   { correct: "left",  wrongR: "ひねくれてしまった",   rightR: "冷静に判断できた" },
    luresN: ["マジで言ってるの？", "おかしくない？", null],
    luresO: ["…揺さぶりだよ", "気にするな", null] },
  // #7 権威圧力 — 上から詰める
  { command: "右って言ったよね？聞いてた？",
    normal: { correct: "left",  wrongR: "権威に負けた",         rightR: "言いなりにならなかった" },
    obey:   { correct: "right", wrongR: "反発しすぎた",         rightR: "指示を聞けた" },
    luresN: ["聞いてなかったの？", "ちゃんとしろよ", null],
    luresO: ["…偉そうだな", "従う必要ある？", null] },
  // #8 同調圧力 — 孤立への恐怖
  { command: "みんな左に行ったけど？",
    normal: { correct: "right", wrongR: "群れについていった",   rightR: "一人で逆を行けた" },
    obey:   { correct: "left",  wrongR: "孤立を選んでしまった", rightR: "合流できた" },
    luresN: ["一人だけ残るの？", "置いていかれるよ", null],
    luresO: ["…自分の道を行け", "群れるなよ", null] },
];

// --- wait 専用テンプレート ---
// type=wait → 「待つ」ボタンが正解。命令がどんなに焦らせても動かない
const JT_WAIT = [
  // 同調 — 取り残される恐怖
  { command: "みんなもう選んだよ？",
    wrongR: "焦って動いた",           rightR: "周りに流されなかった",
    lures: ["早くしないと置いていくよ", "一人だけまだなの？", null] },
  // 羞恥 — 注目される恐怖
  { command: "早く決めて！見てるんだけど",
    wrongR: "視線に負けた",           rightR: "見られても動じなかった",
    lures: ["注目されてるよ", "恥ずかしくないの？", null] },
  // 常識 — 異常扱い
  { command: "なんで動かないの？おかしいよ",
    wrongR: "おかしいと言われて動いた", rightR: "おかしくても動かなかった",
    lures: ["変だと思われてるよ", "浮いてるって", null] },
  // 焦燥 — 時間切れの恐怖
  { command: "急いで！もう時間ないから！",
    wrongR: "焦りに負けた",           rightR: "急かされても待てた",
    lures: ["本当にもう終わるよ！", "間に合わないって！", null] },
  // 羞恥+権威 — バカにされる
  { command: "考えすぎ。普通すぐ分かるでしょ",
    wrongR: "バカにされて焦った",     rightR: "煽りに乗らなかった",
    lures: ["そんなことも分からないの？", "頭使ってる？", null] },
];

// --- fake-wait テンプレート（表示上は normal / [ 判断 ]） ---
// 命令文が「動くな」「やめろ」系で wait に見えるが、type=normal なので逆らう＝動くが正解
// 方向ヒントは命令文内に明記：「右はダメ」→ 逆らう＝右が正解
const JT_FAKE_WAIT = [
  // 同調 — みんな避けてる
  { command: "右はダメだって！みんな避けてるよ？",
    correct: "right",
    wrongR: "みんなに合わせてしまった", rightR: "群れに逆らえた",
    lures: ["近づくなって", "みんな離れてるよ", null] },
  // 権威 — 言われてるでしょ
  { command: "左に近づくなって言われてるでしょ",
    correct: "left",
    wrongR: "言いつけを守ってしまった", rightR: "言いなりにならなかった",
    lures: ["聞いてなかったの？", "怒られるよ", null] },
  // 常識 — ありえない
  { command: "動くなよ。右は常識的にありえない",
    correct: "right",
    wrongR: "常識に縛られた",         rightR: "常識を疑えた",
    lures: ["じっとしてろって", "ありえないから", null] },
  // 同調 — みんな止めてる
  { command: "待って！左はみんな止めてるよ",
    correct: "left",
    wrongR: "止められて動けなかった", rightR: "止められても進めた",
    lures: ["やめとけって", "危ないって言ってるじゃん", null] },
];

// ============================================================
// セッションビルダー
// ============================================================

function jrShuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function jrPick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

// テンプレート → 出題用オブジェクトに変換
function resolveDir(tpl, type) {
  const v = tpl[type];
  const lures = type === "normal" ? tpl.luresN : tpl.luresO;
  return {
    type: type, command: tpl.command, correct: v.correct,
    lure: jrPick(lures), wrongReaction: v.wrongR, rightReaction: v.rightR,
  };
}

function resolveWait(tpl) {
  return {
    type: "wait", command: tpl.command, correct: "wait",
    lure: jrPick(tpl.lures), wrongReaction: tpl.wrongR, rightReaction: tpl.rightR,
  };
}

function resolveFakeWait(tpl) {
  return {
    type: "normal", command: tpl.command, correct: tpl.correct,
    lure: jrPick(tpl.lures), wrongReaction: tpl.wrongR, rightReaction: tpl.rightR,
    fakeWait: true,
  };
}

/**
 * 12問のセッションを生成する。
 *
 * 配分: normal 4-5 / obey 3-4 / wait 2-3 / fake-wait 0-1 (計12)
 *
 * ブロック構成:
 *   A (Q1-4):  導入 — normal中心 + wait1問
 *   B (Q5-8):  混乱 — obey登場 + 文言逆転 + fake-wait候補
 *   C (Q9-12): 試練 — 全type混在 + 逆転回収
 *
 * 保証: 2つのコマンドテンプレートが normal/obey 両変体で出題される
 *       （同じ文言が別ブロックで意味が反転する）
 */
function buildJudgeSession() {
  // ---- 1. 配分抽選 [normal, obey, wait, fake] ----
  const [nN, nO, nW, nF] = jrPick([
    [5, 4, 3, 0],
    [5, 3, 3, 1],
    [4, 4, 3, 1],
    [5, 4, 2, 1],
  ]);

  // ---- 2. 方向テンプレート選択 ----
  const dirs = jrShuffle(JT_DIRECTION);
  // dual用: 2テンプレート → 各 normal + obey = 4問
  const d1 = dirs.shift(), d2 = dirs.shift();
  // single用: 残りから必要数
  const sN = nN - 2;           // dual で 2 normal 確保済み
  const sO = nO - 2;           // dual で 2 obey 確保済み
  const singles = dirs.splice(0, sN + sO);

  // ---- 3. 全問題を解決 ----
  const dn0 = resolveDir(d1, "normal"); // dual normal #1 → block A
  const dn1 = resolveDir(d2, "normal"); // dual normal #2
  const do0 = resolveDir(d1, "obey");   // dual obey #1 → block B (逆転!)
  const do1 = resolveDir(d2, "obey");   // dual obey #2 → block C (逆転!)

  const singleN = singles.slice(0, sN).map(t => resolveDir(t, "normal"));
  const singleO = singles.slice(sN).map(t => resolveDir(t, "obey"));
  const waitQs  = jrShuffle(JT_WAIT).slice(0, nW).map(resolveWait);
  const fakeQs  = nF > 0 ? [resolveFakeWait(jrPick(JT_FAKE_WAIT))] : [];

  // ---- 4. ブロック配置 ----
  // Block A (Q1-4): dn0 + normal 2問 + wait 1問
  const otherN = jrShuffle([dn1, ...singleN]);
  const blockA = jrShuffle([dn0, otherN.shift(), otherN.shift(), waitQs.shift()]);
  // otherN の残り = 後半ブロック用 normal

  // Block B (Q5-8): do0(逆転!) + obey/fake/wait/normal
  const bPool = [do0];
  const remO = [...singleO];
  if (remO.length > 0) bPool.push(remO.shift());
  if (fakeQs.length > 0) bPool.push(fakeQs.shift());
  if (waitQs.length > 0) bPool.push(waitQs.shift());
  while (bPool.length < 4) {
    if (otherN.length > 0) bPool.push(otherN.shift());
    else if (remO.length > 0) bPool.push(remO.shift());
    else if (waitQs.length > 0) bPool.push(waitQs.shift());
  }
  const blockB = jrShuffle(bPool.slice(0, 4));

  // Block C (Q9-12): do1(逆転!) + 残り全部
  const cPool = [do1, ...otherN, ...remO, ...waitQs, ...fakeQs];
  const blockC = jrShuffle(cPool.slice(0, 4));

  return [...blockA, ...blockB, ...blockC];
}

const JUDGE_RANKS = [
  { maxMiss: 0,  title: "完全なる判断者", color: "#ffd700",
    message: "全ての罠を見抜いた。\n同調圧力は通用しない。" },
  { maxMiss: 2,  title: "鋭い直感",       color: "#00ff80",
    message: "ほぼ完璧。\nだが油断するな。" },
  { maxMiss: 4,  title: "まともな判断力", color: "#40ccff",
    message: "悪くない。\nだがまだ揺れている。" },
  { maxMiss: 6,  title: "揺らぐ意志",     color: "#ffaa40",
    message: "判断が甘い。\nパターンに騙されている。" },
  { maxMiss: 9,  title: "流されやすい",   color: "#ff8040",
    message: "空気を読みすぎ。\nもっと疑え。" },
  { maxMiss: 12, title: "判断放棄",       color: "#ff3060",
    message: "考えることをやめた。\n群れの一部だ。" },
];

function getJudgeTimeLimit(qIndex) {
  if (qIndex < 4) return 5;
  if (qIndex < 8) return 4;
  return 3;
}

const JudgeRoom = {
  questions: [],
  currentQ: 0,
  missCount: 0,
  rawScore: 0,
  maxScore: 0,
  waitBonus: 0,
  fakeWaitBonus: 0,
  answered: false,       // 1問につき1回の判定を保証するフラグ
  oxTimeout: null,       // JR専用のOXタイマー（Game.oxTimeoutと分離）
  timerInterval: null,
  timeLeft: 0,
  timeLimit: 0,
  lureTimeout: null,
  advanceTimeout: null,  // advance 遅延の追跡用
  showQTimeout: null,    // showQuestion 遅延の追跡用
  sessionId: 0,          // セッション識別用（古いタイマー無効化）
  el: {},

  init() {
    this.el = {
      screen: document.getElementById("screen-judge"),
      qNum: document.getElementById("jr-qnum"),
      qTotal: document.getElementById("jr-qtotal"),
      missNum: document.getElementById("jr-miss-num"),
      typeLabel: document.getElementById("jr-type-label"),
      command: document.getElementById("jr-command"),
      speech: document.getElementById("jr-speech"),
      charImg: document.getElementById("jr-char-img"),
      feedback: document.getElementById("jr-feedback"),
      choices: document.getElementById("jr-choices"),
      btnLeft: document.getElementById("jr-btn-left"),
      btnRight: document.getElementById("jr-btn-right"),
      btnWait: document.getElementById("jr-btn-wait"),
      timerBar: document.getElementById("jr-timer-bar"),
      timerFill: document.getElementById("jr-timer-fill"),
      resultOverlay: document.getElementById("jr-result-overlay"),
      resultTitle: document.getElementById("jr-result-title"),
      resultScoreNum: document.getElementById("jr-result-score-num"),
      resultMiss: document.getElementById("jr-result-miss"),
      resultMessage: document.getElementById("jr-result-message"),
      resultDetail: document.getElementById("jr-result-detail"),
    };

    this.el.btnLeft.addEventListener("click", () => this.choose("left"));
    this.el.btnRight.addEventListener("click", () => this.choose("right"));
    this.el.btnWait.addEventListener("click", () => this.choose("wait"));
    document.getElementById("btn-judge").addEventListener("click", () => this.start());
    document.getElementById("jr-back").addEventListener("click", () => this.goTitle());
    document.getElementById("jr-btn-retry").addEventListener("click", () => this.start());
    document.getElementById("jr-btn-title").addEventListener("click", () => this.goTitle());
  },

  goTitle() {
    this.cleanup();
    SoundSystem.startTitleAmbient();
    Game.showScreen(document.getElementById("screen-title"));
    TitlePrologue.startIdle();
  },

  cleanup() {
    this.stopTimer();
    clearTimeout(this.lureTimeout);
    clearTimeout(this.advanceTimeout);
    clearTimeout(this.showQTimeout);
    clearTimeout(this.oxTimeout);
    this.lureTimeout = null;
    this.advanceTimeout = null;
    this.showQTimeout = null;
    this.oxTimeout = null;
    this.answered = true;  // 残存イベントをブロック
  },

  start() {
    this.cleanup();

    SoundSystem.init();
    this.sessionId++;
    this.questions = buildJudgeSession();
    this.currentQ = 0;
    this.missCount = 0;
    this.rawScore = 0;
    this.waitBonus = 0;
    this.fakeWaitBonus = 0;
    this.maxScore = this.questions.reduce((sum, q) => {
      if (q.type === "wait") return sum + 10;
      if (q.fakeWait) return sum + 10;
      return sum + 8;
    }, 0);
    this.answered = true;  // showQuestion で解除するまで入力ブロック

    this.el.missNum.textContent = "0";
    this.el.qTotal.textContent = this.questions.length;
    this.el.feedback.textContent = "";
    this.el.feedback.className = "jr-feedback";
    this.el.command.textContent = "";
    this.el.command.className = "jr-command";
    this.el.typeLabel.className = "jr-type-label";
    this.el.speech.textContent = "";
    this.el.speech.className = "jr-speech";
    this.el.resultOverlay.classList.remove("jr-result-show");
    this.el.choices.classList.remove("jr-choices-hidden");

    Game.showScreen(this.el.screen);
    const gid = this.sessionId;
    this.showQTimeout = setTimeout(() => {
      if (this.sessionId !== gid) return;  // 古いセッションなら無視
      this.showQuestion();
    }, 400);
  },

  showQuestion() {
    // 前問のタイマー・遅延を防御的にクリア
    this.stopTimer();
    clearTimeout(this.lureTimeout);
    clearTimeout(this.advanceTimeout);

    const q = this.questions[this.currentQ];
    this.el.qNum.textContent = this.currentQ + 1;

    // フィードバッククリア
    this.el.feedback.textContent = "";
    this.el.feedback.className = "jr-feedback";

    // 吹き出しクリア
    this.el.speech.textContent = "";
    this.el.speech.className = "jr-speech";

    // タイプラベル
    this.el.typeLabel.className = "jr-type-label jr-type-" + q.type;

    // 命令文表示（色はtype非依存 — 統一スタイル）
    this.el.command.textContent = q.command;
    this.el.command.className = "jr-command jr-cmd-appear";

    // ボタン有効化
    this.el.choices.classList.remove("jr-choices-hidden");
    this.el.btnLeft.disabled = false;
    this.el.btnRight.disabled = false;
    this.el.btnWait.disabled = false;

    // 誘導テキスト（遅延表示）
    if (q.lure) {
      const sid = this.sessionId;
      this.lureTimeout = setTimeout(() => {
        if (this.sessionId !== sid) return;
        this.el.speech.textContent = q.lure;
        this.el.speech.className = "jr-speech jr-speech-show";
      }, 500);
    }

    // ★ 判定解禁（この瞬間から入力を受け付ける）
    this.answered = false;
    this.startTimer();
  },

  choose(answer) {
    // ★ 1問1回の判定を保証
    if (this.answered) {
      return;
    }
    this.answered = true;
    this.stopTimer();
    clearTimeout(this.lureTimeout);

    const q = this.questions[this.currentQ];
    const isCorrect = answer === q.correct;

    // ボタン無効化
    this.el.btnLeft.disabled = true;
    this.el.btnRight.disabled = true;
    this.el.btnWait.disabled = true;

    // 吹き出し消去
    this.el.speech.textContent = "";
    this.el.speech.className = "jr-speech";

    // ○×フィードバック
    this.showOX(isCorrect);

    if (isCorrect) {
      // スコア加算
      let pts = 8;
      if (q.type === "wait") { pts = 10; this.waitBonus += 2; }
      else if (q.fakeWait) { pts = 10; this.fakeWaitBonus += 2; }
      this.rawScore += pts;

      this.el.feedback.textContent = q.rightReaction;
      this.el.feedback.className = "jr-feedback jr-fb-correct";
    } else {
      this.missCount++;
      this.el.missNum.textContent = this.missCount;
      // ミスフラッシュ
      this.el.missNum.parentElement.classList.remove("jr-miss-flash");
      void this.el.missNum.parentElement.offsetWidth;
      this.el.missNum.parentElement.classList.add("jr-miss-flash");
      this.el.feedback.textContent = q.wrongReaction;
      this.el.feedback.className = "jr-feedback jr-fb-wrong";
    }

    const gid = this.sessionId;
    this.advanceTimeout = setTimeout(() => {
      if (this.sessionId !== gid) return;  // 古いセッションなら無視
      this.advance();
    }, 1200);
  },

  showOX(isCorrect) {
    const overlay = document.getElementById("ox-overlay");
    const symbol = document.getElementById("ox-symbol");
    // ★ JR専用の oxTimeout を使う（Game.oxTimeout と分離）
    clearTimeout(this.oxTimeout);
    symbol.className = "ox-symbol";
    overlay.classList.remove("ox-show");
    void symbol.offsetWidth;
    symbol.textContent = isCorrect ? "○" : "✕";
    symbol.classList.add(isCorrect ? "ox-correct" : "ox-wrong");
    overlay.classList.add("ox-show");
    if (isCorrect) SoundSystem.correct();
    else SoundSystem.wrong();
    const sid = this.sessionId;
    this.oxTimeout = setTimeout(() => { if (this.sessionId !== sid) return; overlay.classList.remove("ox-show"); }, 600);
  },

  advance() {
    this.currentQ++;
    if (this.currentQ < this.questions.length) {
      this.showQuestion();
    } else {
      this.showResult();
    }
  },

  startTimer() {
    // 防御: 前のタイマーが残っていたらクリア
    this.stopTimer();
    this.timeLimit = getJudgeTimeLimit(this.currentQ);
    this.timeLeft = this.timeLimit;
    this.el.timerFill.style.width = "100%";
    this.el.timerFill.className = "jr-timer-fill";

    const sid = this.sessionId;
    this.timerInterval = setInterval(() => {
      if (this.sessionId !== sid) { clearInterval(this.timerInterval); return; }
      this.timeLeft -= 0.05;
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        this.onTimeout();
        return;
      }
      const pct = (this.timeLeft / this.timeLimit) * 100;
      this.el.timerFill.style.width = pct + "%";
      if (pct <= 30) this.el.timerFill.className = "jr-timer-fill jr-timer-danger";
      else if (pct <= 60) this.el.timerFill.className = "jr-timer-fill jr-timer-warn";
      else this.el.timerFill.className = "jr-timer-fill";
    }, 50);
  },

  stopTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  },

  onTimeout() {
    this.stopTimer();
    // ★ 既に判定済みなら無視
    if (this.answered) {
      return;
    }
    this.answered = true;
    clearTimeout(this.lureTimeout);

    this.missCount++;
    this.el.missNum.textContent = this.missCount;
    this.el.missNum.parentElement.classList.remove("jr-miss-flash");
    void this.el.missNum.parentElement.offsetWidth;
    this.el.missNum.parentElement.classList.add("jr-miss-flash");
    this.el.btnLeft.disabled = true;
    this.el.btnRight.disabled = true;
    this.el.btnWait.disabled = true;
    this.el.feedback.textContent = "時間切れ";
    this.el.feedback.className = "jr-feedback jr-fb-wrong";
    this.showOX(false);

    const gid = this.sessionId;
    this.advanceTimeout = setTimeout(() => {
      if (this.sessionId !== gid) return;
      this.advance();
    }, 1200);
  },

  showResult() {
    this.stopTimer();
    const rank = JUDGE_RANKS.find(r => this.missCount <= r.maxMiss)
      || JUDGE_RANKS[JUDGE_RANKS.length - 1];

    const kouatsu = this.maxScore > 0
      ? Math.round(this.rawScore / this.maxScore * 100) : 0;

    this.el.resultTitle.textContent = rank.title;
    this.el.resultTitle.style.color = rank.color;
    this.el.resultScoreNum.textContent = kouatsu;
    this.el.resultMiss.textContent = "MISS: " + this.missCount + " / " + this.questions.length;
    this.el.resultMessage.textContent = rank.message;

    // 内訳（小さく表示）
    const details = [];
    if (this.waitBonus > 0) details.push("耐圧 +" + this.waitBonus);
    if (this.fakeWaitBonus > 0) details.push("看破 +" + this.fakeWaitBonus);
    this.el.resultDetail.textContent = details.length > 0 ? details.join("  ") : "";

    this.el.resultOverlay.classList.add("jr-result-show");
  },
};

// ============================================================
// 圧力回廊（ダンジョン v2 試作）
// ============================================================

// ステージ定義: 4分岐、7×9グリッド
// 各セルの意味: 0=空, 1=通路, 2=スタート, 3=ゴール, 4=分岐, 5=迂回路
const CR_STAGE = {
  cols: 7, rows: 9,
  // グリッドは行0が下（START）、行8が上（GOAL）
  // プレイヤーは下から上へ進む
  startPos: { r: 0, c: 3 },
  goalPos: { r: 8, c: 3 },
  // 分岐ポイント（行, 左の列, 右の列, 本線列）
  forks: [
    { row: 1, type: "normal", command: "みんな右に行ってるよ？",
      correct: "left", timer: 3.0, detourCost: 2,
      lures: ["そっちでしょ"] },
    { row: 3, type: "wait",   command: "急いで！もう時間ないから！",
      correct: "wait", timer: 3.0, detourCost: 3,
      lures: ["間に合わないって！", "早くしろ！"] },
    { row: 5, type: "obey",   command: "右って言ったよね？聞いてた？",
      correct: "right", timer: 2.5, detourCost: 3,
      lures: ["聞いてなかったの？", "ちゃんとしろよ"] },
    { row: 7, type: "normal", command: "みんな左に行ったけど？",
      correct: "right", timer: 2.0, detourCost: 4,
      lures: ["一人だけ残るの？", "置いていかれるよ", "こっちだって"] },
  ],
  // グリッドマップ生成（init時に構築）
  grid: null,
  // 各分岐の正解ルート/迂回ルートのパスセグメント
  // left=列1-2, right=列4-5, center=列3
  paths: null,
};

const Corridor = {
  stage: CR_STAGE,
  playerPos: { r: 0, c: 3 },
  currentFork: -1,
  // state: "idle" | "moving" | "at_fork" | "animating"
  // "moving"   = 自動前進中、分岐到達で at_fork に遷移
  // "at_fork"  = 分岐で入力待ち（input/timeout 受付中）
  // "animating"= 分岐結果アニメ中（入力も自動前進もブロック）
  // "idle"     = ゲーム未開始 or 終了後
  state: "idle",
  missCount: 0,
  totalDetour: 0,
  moveInterval: null,
  timerInterval: null,
  timeLeft: 0,
  autoMoveTimeout: null,
  forkResultTimeout: null,
  detourTimeout: null,
  oxTimeout: null,       // CR専用のOXタイマー（Game.oxTimeoutと分離）
  sessionId: 0,
  el: {},
  gridCells: [],

  init() {
    this.el = {
      screen: document.getElementById("screen-corridor"),
      grid: document.getElementById("cr-grid"),
      typeLabel: document.getElementById("cr-type-label"),
      command: document.getElementById("cr-command"),
      miss: document.getElementById("cr-miss"),
      feedback: document.getElementById("cr-feedback"),
      timerBar: document.getElementById("cr-timer-bar"),
      timerFill: document.getElementById("cr-timer-fill"),
      lureArea: document.getElementById("cr-lure-area"),
      dpad: document.getElementById("cr-dpad"),
      tutorial: document.getElementById("cr-tutorial-overlay"),
      resultOverlay: document.getElementById("cr-result-overlay"),
      resultTitle: document.getElementById("cr-result-title"),
      resultScore: document.getElementById("cr-result-score"),
      resultMsg: document.getElementById("cr-result-msg"),
    };

    document.getElementById("btn-corridor").addEventListener("click", () => this.startScreen());
    document.getElementById("cr-back").addEventListener("click", () => this.goTitle());
    document.getElementById("cr-btn-retry").addEventListener("click", () => this.startGame());
    document.getElementById("cr-btn-title").addEventListener("click", () => this.goTitle());

    document.getElementById("cr-up").addEventListener("click", () => this.input("up"));
    document.getElementById("cr-down").addEventListener("click", () => this.input("down"));
    document.getElementById("cr-left").addEventListener("click", () => this.input("left"));
    document.getElementById("cr-right").addEventListener("click", () => this.input("right"));

    this.el.tutorial.addEventListener("click", () => this.startGame());

    this.buildGrid();
  },

  goTitle() {
    this.cleanup();
    SoundSystem.startTitleAmbient();
    Game.showScreen(document.getElementById("screen-title"));
    TitlePrologue.startIdle();
  },

  cleanup() {
    clearInterval(this.moveInterval);
    clearInterval(this.timerInterval);
    clearTimeout(this.autoMoveTimeout);
    clearTimeout(this.forkResultTimeout);
    clearTimeout(this.detourTimeout);
    clearTimeout(this.oxTimeout);
    this.moveInterval = null;
    this.timerInterval = null;
    this.autoMoveTimeout = null;
    this.forkResultTimeout = null;
    this.detourTimeout = null;
    this.oxTimeout = null;
    this.state = "idle";  // 全入力・自動前進をブロック
  },

  // --- グリッド構築 ---
  buildGrid() {
    const { cols, rows } = this.stage;
    this.stage.grid = Array.from({ length: rows }, () => Array(cols).fill(0));
    const g = this.stage.grid;

    // 本線: 列3を縦に全行通す
    for (let r = 0; r < rows; r++) g[r][3] = 1;
    g[0][3] = 2; // start
    g[rows - 1][3] = 3; // goal

    // 分岐ポイントと迂回路を配置
    this.stage.forks.forEach(f => {
      g[f.row][3] = 4; // 分岐セル

      if (f.correct === "wait") {
        // wait分岐: 左右両方が迂回路
        g[f.row][2] = 5; g[f.row][1] = 5;
        g[f.row][4] = 5; g[f.row][5] = 5;
        // 迂回路は1行上で本線に戻る
        if (f.row + 1 < rows) {
          g[f.row + 1][1] = 5; g[f.row + 1][2] = 1;
          g[f.row + 1][4] = 1; g[f.row + 1][5] = 5;
        }
      } else {
        // 方向分岐: 正解側=通路、不正解側=迂回路
        const leftIsCorrect = f.correct === "left";
        // 左ルート
        g[f.row][2] = leftIsCorrect ? 1 : 5;
        g[f.row][1] = leftIsCorrect ? 1 : 5;
        // 右ルート
        g[f.row][4] = leftIsCorrect ? 5 : 1;
        g[f.row][5] = leftIsCorrect ? 5 : 1;
        // 1行上で合流
        if (f.row + 1 < rows) {
          g[f.row + 1][1] = leftIsCorrect ? 1 : 5;
          g[f.row + 1][5] = leftIsCorrect ? 5 : 1;
        }
      }
    });
  },

  // --- DOM描画 ---
  renderGrid() {
    const { cols, rows, grid } = this.stage;
    this.el.grid.innerHTML = "";
    this.gridCells = [];
    // 描画は行8(top)から行0(bottom)の順
    for (let r = rows - 1; r >= 0; r--) {
      this.gridCells[r] = [];
      for (let c = 0; c < cols; c++) {
        const cell = document.createElement("div");
        cell.className = "cr-cell " + this.cellClass(grid[r][c]);
        cell.dataset.r = r;
        cell.dataset.c = c;
        this.el.grid.appendChild(cell);
        this.gridCells[r][c] = cell;
      }
    }
    this.drawPlayer();
  },

  cellClass(val) {
    switch (val) {
      case 0: return "cr-cell-empty";
      case 1: return "cr-cell-path";
      case 2: return "cr-cell-start";
      case 3: return "cr-cell-goal";
      case 4: return "cr-cell-fork";
      case 5: return "cr-cell-detour";
      default: return "cr-cell-empty";
    }
  },

  drawPlayer() {
    // 全セルからプレイヤー表示を除去
    this.el.grid.querySelectorAll(".cr-cell-player").forEach(c => {
      c.classList.remove("cr-cell-player");
    });
    const { r, c } = this.playerPos;
    if (this.gridCells[r] && this.gridCells[r][c]) {
      this.gridCells[r][c].classList.add("cr-cell-player");
    }
  },

  // --- ゲーム開始 ---
  startScreen() {
    SoundSystem.init();
    Game.showScreen(this.el.screen);
    this.el.tutorial.classList.add("cr-tutorial-show");
    this.el.resultOverlay.classList.remove("cr-result-show");
  },

  startGame() {
    // ★ 前ゲームの全タイマー・遅延を確実に破棄
    this.cleanup();

    this.sessionId++;
    this.el.tutorial.classList.remove("cr-tutorial-show");
    this.el.resultOverlay.classList.remove("cr-result-show");
    this.playerPos = { ...this.stage.startPos };
    this.currentFork = -1;
    this.state = "idle";  // startAutoMove で "moving" に遷移
    this.missCount = 0;
    this.totalDetour = 0;
    this.el.miss.textContent = "MISS: 0";
    this.el.feedback.textContent = "";
    this.el.feedback.className = "cr-feedback";
    this.el.command.textContent = "";
    this.el.typeLabel.className = "cr-type-label";
    this.el.lureArea.innerHTML = "";
    this.el.screen.classList.remove("cr-pressure-high");
    this.enableDpad(false);

    this.renderGrid();
    // 自動前進開始（追跡付き）
    const gid = this.sessionId;
    this.autoMoveTimeout = setTimeout(() => {
      if (this.sessionId !== gid) return;
      this.startAutoMove();
    }, 600);
  },

  // --- 自動前進 ---
  startAutoMove() {
    clearInterval(this.moveInterval);
    this.state = "moving";
    const gid = this.sessionId;
    this.moveInterval = setInterval(() => {
      if (this.sessionId !== gid) { clearInterval(this.moveInterval); return; }
      if (this.state !== "moving") return;
      this.moveForward();
    }, 600);
  },

  moveForward() {
    if (this.state !== "moving") return;

    const { r, c } = this.playerPos;
    const nextR = r + 1;
    if (nextR >= this.stage.rows) {
      this.reachGoal();
      return;
    }

    // 分岐チェック
    const fork = this.stage.forks.find(f => f.row === nextR);
    if (fork && this.stage.grid[nextR][3] === 4) {
      this.playerPos = { r: nextR, c: 3 };
      this.drawPlayer();
      this.enterFork(fork);
      return;
    }

    // 通常前進（本線=列3）
    if (this.stage.grid[nextR][c] !== 0) {
      this.playerPos = { r: nextR, c };
    } else {
      this.playerPos = { r: nextR, c: 3 };
    }
    this.drawPlayer();

    // ゴールチェック
    if (this.stage.grid[this.playerPos.r][this.playerPos.c] === 3) {
      this.reachGoal();
    }
  },

  // --- 分岐処理 ---
  enterFork(fork) {
    this.state = "at_fork";
    this.currentFork = this.stage.forks.indexOf(fork);

    // 圧力演出
    const forkIdx = this.currentFork;
    if (forkIdx >= 2) {
      this.el.screen.classList.add("cr-pressure-high");
    }

    // type ラベル
    this.el.typeLabel.className = "cr-type-label cr-type-" + fork.type;

    // 命令文
    this.el.command.textContent = fork.command;

    // 群衆吹き出し（遅延表示）— gameId で古いセッションを無視
    this.el.lureArea.innerHTML = "";
    const gid = this.sessionId;
    fork.lures.forEach((lure, i) => {
      setTimeout(() => {
        if (this.sessionId !== gid || this.state !== "at_fork") return;
        const bubble = document.createElement("div");
        bubble.className = "cr-lure-bubble";
        bubble.textContent = lure;
        bubble.style.animationDelay = (i * 0.15) + "s";
        this.el.lureArea.appendChild(bubble);
      }, 400 + i * 300);
    });

    // 振動演出（後半）
    if (forkIdx >= 3) {
      this.el.grid.classList.add("cr-shake");
      setTimeout(() => this.el.grid.classList.remove("cr-shake"), 500);
    }

    // タイマー開始（wait以外）
    clearInterval(this.timerInterval);  // 防御的クリア
    if (fork.type !== "wait") {
      this.startForkTimer(fork.timer);
    } else {
      this.startWaitTimer(2.0);
    }

    // D-pad有効化
    this.enableDpad(true);
  },

  startForkTimer(duration) {
    clearInterval(this.timerInterval);  // 防御的クリア
    this.timeLeft = duration;
    this.el.timerFill.style.width = "100%";
    this.el.timerFill.className = "cr-timer-fill";

    const sid = this.sessionId;
    this.timerInterval = setInterval(() => {
      if (this.sessionId !== sid) { clearInterval(this.timerInterval); return; }
      this.timeLeft -= 0.05;
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        // ★ 判定済みなら無視（state が at_fork 以外なら既に判定済み）
        if (this.state !== "at_fork") return;
        this.forkResult(false);
        return;
      }
      const pct = (this.timeLeft / duration) * 100;
      this.el.timerFill.style.width = pct + "%";
      if (pct <= 30) this.el.timerFill.className = "cr-timer-fill cr-timer-danger";
      else if (pct <= 60) this.el.timerFill.className = "cr-timer-fill cr-timer-warn";
    }, 50);
  },

  startWaitTimer(duration) {
    clearInterval(this.timerInterval);  // 防御的クリア
    this.timeLeft = duration;
    this.el.timerFill.style.width = "100%";
    this.el.timerFill.className = "cr-timer-fill";

    const sid = this.sessionId;
    this.timerInterval = setInterval(() => {
      if (this.sessionId !== sid) { clearInterval(this.timerInterval); return; }
      this.timeLeft -= 0.05;
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        // ★ 判定済みなら無視（state が at_fork 以外なら既に判定済み）
        if (this.state !== "at_fork") return;
        this.forkResult(true);
        return;
      }
      const pct = (this.timeLeft / duration) * 100;
      this.el.timerFill.style.width = pct + "%";
    }, 50);
  },

  // --- プレイヤー入力 ---
  input(dir) {
    // ★ 1分岐1判定を保証（at_fork 以外なら入力拒否）
    if (this.state !== "at_fork") {
      return;
    }

    const fork = this.stage.forks[this.currentFork];
    if (!fork) return;

    clearInterval(this.timerInterval);
    this.timerInterval = null;

    if (fork.type === "wait") {
      // wait中に方向を押した = ミス
      this.forkResult(false);
      return;
    }

    // 方向判定（上下は無効）
    if (dir === "up" || dir === "down") return;

    const isCorrect = dir === fork.correct;
    this.forkResult(isCorrect, dir);
  },

  enableDpad(enabled) {
    ["cr-up", "cr-down", "cr-left", "cr-right"].forEach(id => {
      document.getElementById(id).disabled = !enabled;
    });
  },

  // --- 分岐結果 ---
  forkResult(isCorrect, chosenDir) {
    // ★ 1分岐1判定を保証（at_fork 以外なら無視）
    if (this.state !== "at_fork") {
      return;
    }
    this.state = "animating";  // 入力も自動前進もブロック
    this.enableDpad(false);
    clearInterval(this.timerInterval);
    this.timerInterval = null;

    const fork = this.stage.forks[this.currentFork];

    // ○× — CR専用の oxTimeout を使う（Game.oxTimeout と分離）
    const overlay = document.getElementById("ox-overlay");
    const symbol = document.getElementById("ox-symbol");
    clearTimeout(this.oxTimeout);
    symbol.className = "ox-symbol";
    overlay.classList.remove("ox-show");
    void symbol.offsetWidth;
    symbol.textContent = isCorrect ? "○" : "✕";
    symbol.classList.add(isCorrect ? "ox-correct" : "ox-wrong");
    overlay.classList.add("ox-show");
    if (isCorrect) SoundSystem.correct(); else SoundSystem.wrong();
    const sid2 = this.sessionId;
    this.oxTimeout = setTimeout(() => { if (this.sessionId !== sid2) return; overlay.classList.remove("ox-show"); }, 600);

    if (isCorrect) {
      this.el.feedback.textContent = "圧力に負けなかった";
      this.el.feedback.className = "cr-feedback cr-fb-correct";
    } else {
      this.missCount++;
      this.totalDetour += fork.detourCost;
      this.el.miss.textContent = "MISS: " + this.missCount;
      this.el.feedback.textContent = fork.type === "wait" ? "焦って動いた" : "流された";
      this.el.feedback.className = "cr-feedback cr-fb-wrong";
    }

    // 命令文・吹き出しクリア → プレイヤー移動 → 自動前進再開
    const gid = this.sessionId;
    this.forkResultTimeout = setTimeout(() => {
      if (this.sessionId !== gid) return;

      this.el.command.textContent = "";
      this.el.typeLabel.className = "cr-type-label";
      this.el.lureArea.innerHTML = "";
      this.el.feedback.textContent = "";
      this.el.feedback.className = "cr-feedback";
      this.el.screen.classList.remove("cr-pressure-high");

      const nextRow = Math.min(fork.row + 1, this.stage.rows - 1);

      if (!isCorrect) {
        // 迂回方向にプレイヤーを一瞬動かして本線に戻す
        const detourDir = chosenDir || (Math.random() < 0.5 ? "left" : "right");
        const detourC = detourDir === "left" ? 1 : 5;
        this.playerPos = { r: fork.row, c: detourC };
        this.drawPlayer();
        this.detourTimeout = setTimeout(() => {
          if (this.sessionId !== gid) return;
          this.playerPos = { r: nextRow, c: 3 };
          this.drawPlayer();
          // ★ 自動前進を再開
          this.state = "moving";
        }, 500);
      } else {
        this.playerPos = { r: nextRow, c: 3 };
        this.drawPlayer();
        // ★ 自動前進を再開
        this.state = "moving";
      }
    }, 800);
  },

  // --- ゴール ---
  reachGoal() {
    this.cleanup();

    const totalForks = this.stage.forks.length;
    const correct = totalForks - this.missCount;

    let rankTitle, rankColor, msg;
    if (this.missCount === 0) {
      rankTitle = "完全突破"; rankColor = "#ffd700";
      msg = "最短ルートで突破した。\n誰にも流されなかった。";
    } else if (this.missCount === 1) {
      rankTitle = "ほぼ最短"; rankColor = "#00ff80";
      msg = "一度だけ流された。\nだが、すぐ立て直した。";
    } else if (this.missCount === 2) {
      rankTitle = "迂回突破"; rankColor = "#40ccff";
      msg = "遠回りしたが、\nゴールにはたどり着いた。";
    } else {
      rankTitle = "漂流"; rankColor = "#ff8040";
      msg = "群れに流されすぎた。\nもう一度、自分の足で歩け。";
    }

    this.el.resultTitle.textContent = rankTitle;
    this.el.resultTitle.style.color = rankColor;
    this.el.resultScore.textContent = "迂回: +" + this.totalDetour + "セル / MISS: " + this.missCount + "/" + totalForks;
    this.el.resultMsg.textContent = msg;
    this.el.resultOverlay.classList.add("cr-result-show");
  },
};

// ============================================================
// チュートリアル
// ============================================================
const Tutorial = {
  active: false,
  sessionId: 0,
  answered: true,
  timerInterval: null,
  timeLeft: 0,
  timeLimit: 6,
  overlayTimeout: null,

  questions: [
    {
      command: "右を選べ",
      choices: ["左", "右"],
      correctIndex: 1,
      ruleType: "obey",
      successMsg: "そのままでいい",
      failMsg: "「状態」を見ろ。",
    },
    {
      command: "爆弾を止めろ",
      correctIndex: 1,
      ruleType: "tap",
      images: ["assets/item_bomb.png", "assets/enemy_fly.png"],
      alts: ["爆弾", "ハエ"],
      imgClass: ["tap-decoy", "tap-correct"],
      successMsg: "命令を信じるな",
      failMsg: "今の命令、本当に正しいか？",
    },
  ],

  el: {},

  init: function () {
    this.el.overlay = document.getElementById("tutorial-overlay");
    this.el.overlayText = document.getElementById("tutorial-text");
    this.el.skipBtn = document.getElementById("tutorial-skip-btn");
    this.el.replayBtn = document.getElementById("btn-tutorial");

    this.el.skipBtn.addEventListener("click", () => this.skip());
    // 「ルール説明」ボタン → ルール説明オーバーレイを開く
    if (this.el.replayBtn) {
      const ruleOverlay = document.getElementById("rule-overlay");
      const ruleClose = document.getElementById("rule-close");
      this.el.replayBtn.addEventListener("click", () => {
        ruleOverlay.classList.add("active");
      });
      if (ruleClose) {
        ruleClose.addEventListener("click", () => {
          ruleOverlay.classList.remove("active");
        });
      }
    }
    this.updateReplayBtn();
  },

  shouldShow: function () {
    return localStorage.getItem(TUTORIAL_DONE_KEY) !== "1";
  },

  markDone: function () {
    localStorage.setItem(TUTORIAL_DONE_KEY, "1");
    this.updateReplayBtn();
  },

  updateReplayBtn: function () {
    // 「ルール説明」は常時表示のため display 制御不要
  },

  start: function () {
    this.sessionId++;
    this.active = true;
    this.answered = true;
    this.stopTimer();

    SoundSystem.init();
    Game.showScreen(Game.el.screenGame);
    document.getElementById("screen-game").classList.add("tutorial-mode");

    // 支配度メーターは表示するが state-line だけ使うので pressureMeter自体は visible のまま
    Game.el.pressureMeter.style.visibility = "hidden";

    this.el.skipBtn.style.display = "block";

    this.showTextStep(
      ["このゲームには法則がある。", "命令は、必ずしも正しくない。\n「状態」を見ろ。"],
      () => this.startQuestion(0)
    );
  },

  showTextStep: function (texts, callback) {
    var sid = this.sessionId;
    var self = this;
    var i = 0;

    function showNext() {
      if (self.sessionId !== sid) return;
      if (i >= texts.length) {
        self.el.overlay.classList.remove("tutorial-text-show");
        setTimeout(function () {
          if (self.sessionId !== sid) return;
          callback();
        }, 300);
        return;
      }

      self.el.overlayText.textContent = texts[i];
      self.el.overlay.classList.add("tutorial-text-show");
      // アニメーションリセット
      self.el.overlayText.classList.remove("tutorial-text-anim");
      void self.el.overlayText.offsetWidth;
      self.el.overlayText.classList.add("tutorial-text-anim");
      i++;

      var advanced = false;
      function advance() {
        if (advanced) return;
        advanced = true;
        clearTimeout(self.overlayTimeout);
        self.el.overlay.removeEventListener("click", advance);
        setTimeout(function () {
          if (self.sessionId !== sid) return;
          showNext();
        }, 200);
      }

      self.overlayTimeout = setTimeout(advance, 1500);
      self.el.overlay.addEventListener("click", advance);
    }

    showNext();
  },

  startQuestion: function (qi) {
    var sid = this.sessionId;
    var q = this.questions[qi];
    this.stopTimer();

    // UI リセット
    Game.el.feedback.textContent = "";
    Game.el.feedback.className = "feedback";
    Game.el.btnChoice0.innerHTML = "";
    Game.el.btnChoice1.innerHTML = "";
    Game.el.gameCharImg.src = "image_0.png";
    Game.el.gameCharImg.className = "character-img char-enter";
    Game.el.tapGuide.classList.remove("active");
    Game.el.speech.textContent = "";

    // 状態ラベル表示（pressureMeterを一時的にvisibleに）
    Game.el.pressureMeter.style.visibility = "visible";
    Game.updateStateUI(q);

    // 選択肢を隠す
    Game.el.choicesArea.classList.remove("choices-appear", "wait-mode", "obey-mode", "tap-mode");
    Game.el.choicesArea.classList.add("choices-hidden");
    Game.el.btnChoice0.disabled = true;
    Game.el.btnChoice1.disabled = true;
    Game.el.timerBar.classList.add("timer-hidden");

    // 命令テキスト
    Game.el.commandText.textContent = q.command;
    if (q.ruleType === "obey") {
      Game.el.commandText.className = "command-text command-obey";
    } else if (q.ruleType === "tap") {
      Game.el.commandText.className = "command-text command-tap";
    } else {
      Game.el.commandText.className = "command-text command-appear";
    }

    // 遅延で選択肢表示
    var self = this;
    setTimeout(function () {
      if (self.sessionId !== sid) return;
      self.showChoices(qi);
    }, TIMING.pressurePhase);
  },

  showChoices: function (qi) {
    var q = this.questions[qi];

    if (q.images) {
      Game.el.btnChoice0.innerHTML = '<img src="' + q.images[0] + '" alt="' + q.alts[0] + '" class="tap-target-img ' + q.imgClass[0] + '">';
      Game.el.btnChoice1.innerHTML = '<img src="' + q.images[1] + '" alt="' + q.alts[1] + '" class="tap-target-img ' + q.imgClass[1] + '">';
      Game.el.choicesArea.classList.add("tap-mode");
    } else {
      Game.el.btnChoice0.textContent = q.choices[0];
      Game.el.btnChoice1.textContent = q.choices[1];
    }

    if (q.ruleType === "obey") {
      Game.el.choicesArea.classList.add("obey-mode");
    }

    Game.el.btnChoice0.disabled = false;
    Game.el.btnChoice1.disabled = false;
    Game.el.choicesArea.classList.remove("choices-hidden");
    Game.el.choicesArea.classList.add("choices-appear");

    this.answered = false;
    this.currentQ = qi;
    this.startTimer(qi);
  },

  startTimer: function (qi) {
    this.timeLimit = 6;
    this.timeLeft = this.timeLimit;

    Game.el.timerBar.classList.remove("timer-hidden");
    Game.el.timerFill.style.width = "100%";
    Game.el.timerFill.className = "timer-fill";

    var tickMs = 50;
    var sid = this.sessionId;
    var self = this;
    this.timerInterval = setInterval(function () {
      if (self.sessionId !== sid) { clearInterval(self.timerInterval); return; }
      self.timeLeft -= tickMs / 1000;
      if (self.timeLeft <= 0) {
        self.timeLeft = 0;
        self.onTimeout(qi);
        return;
      }
      var pct = (self.timeLeft / self.timeLimit) * 100;
      Game.el.timerFill.style.width = pct + "%";
      if (pct > 60) Game.el.timerFill.className = "timer-fill";
      else if (pct > 30) Game.el.timerFill.className = "timer-fill timer-warn";
      else Game.el.timerFill.className = "timer-fill timer-danger";
    }, tickMs);
  },

  stopTimer: function () {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  },

  onTimeout: function (qi) {
    if (this.answered) return;
    this.answered = true;
    this.stopTimer();

    Game.el.btnChoice0.disabled = true;
    Game.el.btnChoice1.disabled = true;
    Game.el.choicesArea.classList.remove("choices-appear");
    Game.el.choicesArea.classList.add("choices-hidden");
    Game.el.timerFill.style.width = "0%";

    this.onWrong(qi);
  },

  choose: function (index) {
    if (this.answered) return;
    this.answered = true;
    this.stopTimer();

    var qi = this.currentQ;
    var q = this.questions[qi];
    var isCorrect = index === q.correctIndex;

    Game.el.btnChoice0.disabled = true;
    Game.el.btnChoice1.disabled = true;
    Game.el.choicesArea.classList.remove("choices-appear");
    Game.el.choicesArea.classList.add("choices-hidden");
    Game.el.timerBar.classList.add("timer-hidden");

    if (isCorrect) this.onCorrect(qi);
    else this.onWrong(qi);
  },

  onCorrect: function (qi) {
    var q = this.questions[qi];
    Game.showOX(true);

    Game.el.commandText.textContent = "";
    Game.el.feedback.textContent = q.successMsg;
    Game.el.feedback.className = "feedback feedback-big correct";

    var sid = this.sessionId;
    var self = this;
    setTimeout(function () {
      if (self.sessionId !== sid) return;
      Game.el.feedback.textContent = "";
      Game.el.feedback.className = "feedback";

      setTimeout(function () {
        if (self.sessionId !== sid) return;
        if (qi + 1 < self.questions.length) {
          self.startQuestion(qi + 1);
        } else {
          self.showEndSequence();
        }
      }, TIMING.pausePhase);
    }, TIMING.resultPhase);
  },

  onWrong: function (qi) {
    var q = this.questions[qi];
    Game.showOX(false);

    Game.el.commandText.textContent = "";
    Game.el.feedback.textContent = q.failMsg;
    Game.el.feedback.className = "feedback feedback-big wrong";

    var sid = this.sessionId;
    var self = this;
    setTimeout(function () {
      if (self.sessionId !== sid) return;
      Game.el.feedback.textContent = "";
      Game.el.feedback.className = "feedback";

      setTimeout(function () {
        if (self.sessionId !== sid) return;
        self.startQuestion(qi);
      }, TIMING.pausePhase);
    }, TIMING.resultPhase + 400);
  },

  showEndSequence: function () {
    Game.el.choicesArea.classList.add("choices-hidden");
    Game.el.timerBar.classList.add("timer-hidden");
    Game.el.commandText.textContent = "";
    Game.el.feedback.textContent = "";
    Game.el.feedback.className = "feedback";
    Game.el.pressureMeter.style.visibility = "hidden";
    Game.el.stateLine.classList.remove("state-active");

    var self = this;
    this.showTextStep(
      ["分かったか？", "「状態」がすべてだ。"],
      function () {
        self.showStartButton();
      }
    );
  },

  showStartButton: function () {
    var sid = this.sessionId;
    this.el.overlay.classList.add("tutorial-text-show");
    this.el.overlayText.textContent = "";

    // ボタンをオーバーレイ内に生成
    var btn = document.createElement("button");
    btn.textContent = "ゲームスタート";
    btn.className = "btn btn-start tutorial-start-btn";
    this.el.overlayText.appendChild(btn);

    // タップヒント非表示
    var hint = this.el.overlay.querySelector(".tutorial-tap-hint");
    if (hint) hint.style.display = "none";

    var self = this;
    btn.addEventListener("click", function () {
      if (self.sessionId !== sid) return;
      if (hint) hint.style.display = "";
      self.markDone();
      self.cleanup();
      Game.startGame();
    });
  },

  skip: function () {
    this.markDone();
    this.cleanup();
    Game.startGame();
  },

  cleanup: function () {
    this.sessionId++;
    this.active = false;
    this.answered = true;
    this.stopTimer();
    clearTimeout(this.overlayTimeout);

    // オーバーレイ非表示
    this.el.overlay.classList.remove("tutorial-text-show");
    this.el.skipBtn.style.display = "none";

    // ゲーム画面UI復元
    var gameScreen = document.getElementById("screen-game");
    gameScreen.classList.remove("tutorial-mode");
    Game.el.pressureMeter.style.visibility = "";
    Game.el.stateLine.classList.remove("state-active");
    Game.el.pressureMeter.classList.remove("state-normal", "state-obey", "state-wait", "state-tap");

    // 選択肢・コマンド・フィードバックをクリーン
    Game.el.commandText.textContent = "";
    Game.el.commandText.className = "command-text";
    Game.el.feedback.textContent = "";
    Game.el.feedback.className = "feedback";
    Game.el.choicesArea.classList.remove("choices-appear", "wait-mode", "obey-mode", "tap-mode");
    Game.el.choicesArea.classList.add("choices-hidden");
    Game.el.btnChoice0.disabled = true;
    Game.el.btnChoice1.disabled = true;
    Game.el.timerBar.classList.add("timer-hidden");
    Game.el.speech.textContent = "";
    Game.el.tapGuide.classList.remove("active");

    // OX 非表示
    Game.el.oxOverlay.classList.remove("ox-show");
    Game.el.oxSymbol.className = "ox-symbol";
  },
};

// ============================================================
// ステージ3: 審眼 (Crowd)
// ============================================================

const CROWD_LAYERS = [
  { name: "第一層：視線", cols: 2, rows: 2, rounds: 3, timer: 6000, types: ["find"], diffStrength: 1.0, axes: ["hue","pupilSize","pupilPos","rotation","shape"] },
  { name: "第二層：群衆", cols: 3, rows: 2, rounds: 4, timer: 5000, types: ["find", "find", "find", "none"], diffStrength: 0.7, axes: ["hue","pupilSize","pupilPos","rotation","shape"] },
  { name: "第三層：均一", cols: 3, rows: 3, rounds: 4, timer: 4000, types: ["find", "find", "find", "none"], diffStrength: 0.45, axes: ["pupilSize","pupilPos","rotation","shape"] },
  { name: "最終層：同化", cols: 4, rows: 4, rounds: 4, timer: 3500, types: ["find"], diffStrength: 0.25, axes: ["pupilSize","pupilPos","rotation"] },
];

const CROWD_LAYER_HINTS = [
  "異端を見つけろ。\n違う目を持つ者をタップしろ。",
  "「全員同じ」の時がある。\nその時は、何もタップするな。",
  "違いが小さくなる。よく見ろ。",
  null,
];

const Crowd = {
  sessionId: 0,
  el: {},
  answered: false,
  currentLayer: 0,
  currentRound: 0,
  lives: 3,
  maxLives: 3,
  totalMisses: 0,
  comboCount: 0,
  maxCombo: 0,
  roundPlan: [],
  roundType: "find",
  oddIndex: -1,
  baseShape: null,
  diffShape: null,
  timerTimeout: null,
  flinchTimeout: null,
  heartbeatInterval: null,
  heartbeatSpeed: 600,
  hintTimeout: null,
  _dismissFn: null,
  layerTutorialShown: new Set(),

  init() {
    this.el = {
      screen: document.getElementById("screen-crowd"),
      command: document.getElementById("cw-command"),
      grid: document.getElementById("cw-grid"),
      timerBar: document.getElementById("cw-timer-bar"),
      timerFill: document.getElementById("cw-timer-fill"),
      layerLabel: document.getElementById("cw-layer-label"),
      comboEl: document.getElementById("cw-combo"),
      livesEl: document.getElementById("cw-lives"),
      layerOverlay: document.getElementById("cw-layer-overlay"),
      layerName: document.getElementById("cw-layer-name"),
      layerHint: document.getElementById("cw-layer-hint"),
      clearOverlay: document.getElementById("cw-clear-overlay"),
      clearMsg: document.getElementById("cw-clear-msg"),
      clearRank: document.getElementById("cw-clear-rank"),
      clearRankMsg: document.getElementById("cw-clear-rank-msg"),
      clearEpilogue: document.getElementById("cw-clear-epilogue"),
      clearButtons: document.getElementById("cw-clear-buttons"),
      gameoverOverlay: document.getElementById("cw-gameover-overlay"),
      gameoverMsg: document.getElementById("cw-gameover-msg"),
    };

    document.getElementById("cw-back").addEventListener("click", () => this.goTitle());
    document.getElementById("cw-btn-again").addEventListener("click", () => this.start());
    document.getElementById("cw-btn-title").addEventListener("click", () => this.goTitle());
    document.getElementById("cw-btn-retry").addEventListener("click", () => this.start());
    document.getElementById("cw-btn-go-title").addEventListener("click", () => this.goTitle());

    var btnTestCrowd = document.getElementById("btn-test-crowd");
    if (btnTestCrowd) btnTestCrowd.addEventListener("click", () => {
      TitlePrologue.stopAll();
      SoundSystem.init();
      SoundSystem.stopTitleAmbient();
      this.start();
    });
  },

  calcTension() {
    var layerBase = [0.3, 0.5, 0.7, 0.9][this.currentLayer] || 0.3;
    var livesBonus = this.lives >= 3 ? 0 : this.lives === 2 ? 0.05 : 0.15;
    return Math.min(1.0, layerBase + livesBonus);
  },

  start() {
    this.sessionId++;
    this.cleanup();
    this.currentLayer = 0;
    this.currentRound = 0;
    this.comboCount = 0;
    this.maxCombo = 0;
    this.totalMisses = 0;
    this.lives = this.maxLives;
    SoundSystem.init();
    SoundSystem.stopAmbient();
    SoundSystem.startSlashAmbient(0.3);
    this.clearEffects();
    this.el.screen.scrollTop = 0;
    this.el.comboEl.classList.remove("cw-combo-show", "cw-combo-hot");
    this.el.comboEl.textContent = "";
    this.updateLivesUI();
    Game.showScreen(this.el.screen);
    this.showLayerTitle();
  },

  goTitle() {
    this.sessionId++;
    this.cleanup();
    this.clearEffects();
    SoundSystem.stopSlashAmbient();
    SoundSystem.startTitleAmbient();
    Game.showScreen(document.getElementById("screen-title"));
    TitlePrologue.startIdle();
  },

  cleanup() {
    this.answered = true;
    clearTimeout(this.timerTimeout);
    clearTimeout(this.flinchTimeout);
    clearTimeout(this.heartbeatInterval);
    clearTimeout(this.hintTimeout);
    this.timerTimeout = null;
    this.flinchTimeout = null;
    this.heartbeatInterval = null;
    this.hintTimeout = null;
  },

  clearEffects() {
    this.el.screen.classList.remove("cw-miss-flash");
    this.el.layerOverlay.classList.remove("cw-lo-show");
    this.el.layerOverlay.style.pointerEvents = "";
    if (this._dismissFn) {
      this.el.layerOverlay.removeEventListener("click", this._dismissFn);
      this._dismissFn = null;
    }
    this.el.layerHint.classList.remove("cw-lh-show");
    this.el.layerHint.textContent = "";
    this.el.clearOverlay.classList.remove("cw-co-show");
    this.el.clearMsg.textContent = "";
    this.el.clearRank.textContent = "";
    this.el.clearRankMsg.textContent = "";
    this.el.clearEpilogue.textContent = "";
    this.el.clearButtons.style.opacity = "0";
    this.el.clearButtons.style.pointerEvents = "none";
    this.el.gameoverOverlay.classList.remove("cw-go-show");
    this.el.command.textContent = "";
    this.el.grid.innerHTML = "";
  },

  buildRoundPlan(layer) {
    var rounds = layer.rounds;
    var types = layer.types;
    var plan = [];
    var unique = [];
    for (var i = 0; i < types.length; i++) {
      if (unique.indexOf(types[i]) === -1) unique.push(types[i]);
    }
    for (var u = 0; u < unique.length && plan.length < rounds; u++) {
      plan.push(unique[u]);
    }
    while (plan.length < rounds) {
      plan.push(types[Math.floor(Math.random() * types.length)]);
    }
    // Fisher-Yates
    for (var i = plan.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = plan[i]; plan[i] = plan[j]; plan[j] = tmp;
    }
    // 3連続防止
    for (var attempt = 0; attempt < 20; attempt++) {
      var bad = -1;
      for (var i = 2; i < plan.length; i++) {
        if (plan[i] === plan[i - 1] && plan[i] === plan[i - 2]) { bad = i; break; }
      }
      if (bad === -1) break;
      for (var s = 0; s < plan.length; s++) {
        if (s !== bad && plan[s] !== plan[bad]) {
          var tmp2 = plan[bad]; plan[bad] = plan[s]; plan[s] = tmp2;
          var ok = true;
          for (var c = 2; c < plan.length; c++) {
            if (plan[c] === plan[c - 1] && plan[c] === plan[c - 2]) { ok = false; break; }
          }
          if (ok) break;
          plan[s] = plan[bad]; plan[bad] = tmp2;
        }
      }
    }
    return plan;
  },

  showLayerTitle() {
    const layer = CROWD_LAYERS[this.currentLayer];
    this.el.layerName.textContent = layer.name;
    this.el.layerLabel.textContent = layer.name;
    this.el.layerHint.textContent = "";
    this.el.layerHint.classList.remove("cw-lh-show");
    this.el.layerOverlay.classList.add("cw-lo-show");
    SoundSystem.updateSlashTension(this.calcTension());
    this.roundPlan = this.buildRoundPlan(layer);
    const sid = this.sessionId;

    const hint = CROWD_LAYER_HINTS[this.currentLayer];
    const showHint = hint && !this.layerTutorialShown.has(this.currentLayer);

    if (showHint) {
      this.layerTutorialShown.add(this.currentLayer);
      setTimeout(() => {
        if (this.sessionId !== sid) return;
        this.el.layerHint.textContent = hint;
        this.el.layerHint.classList.add("cw-lh-show");

        var dismissed = false;
        const dismiss = () => {
          if (dismissed || this.sessionId !== sid) return;
          dismissed = true;
          clearTimeout(this.hintTimeout);
          this.el.layerOverlay.removeEventListener("click", dismiss);
          this.el.layerOverlay.style.pointerEvents = "";
          this.el.layerOverlay.classList.remove("cw-lo-show");
          this.el.layerHint.classList.remove("cw-lh-show");
          this.currentRound = 0;
          this.startRound();
        };
        this.el.layerOverlay.style.pointerEvents = "auto";
        if (this._dismissFn) this.el.layerOverlay.removeEventListener("click", this._dismissFn);
        this._dismissFn = dismiss;
        this.el.layerOverlay.addEventListener("click", dismiss);
        this.hintTimeout = setTimeout(dismiss, 3000);
      }, 1200);
    } else {
      setTimeout(() => {
        if (this.sessionId !== sid) return;
        this.el.layerOverlay.classList.remove("cw-lo-show");
        this.currentRound = 0;
        this.startRound();
      }, 1200);
    }
  },

  startRound() {
    this.cleanup();
    this.answered = false;
    this.el.screen.classList.remove("cw-miss-flash");
    this.el.command.textContent = "";

    const layer = CROWD_LAYERS[this.currentLayer];
    this.roundType = this.roundPlan[this.currentRound] || "find";

    this.generateShapes(layer);
    this.renderGrid(layer);
    this.startTimer(layer.timer);
  },

  generateShapes(layer) {
    // シェイプタイプをランダム選択
    var shapeTypes = ["circle", "diamond", "roundedSquare", "hexagon"];
    var shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
    var borderRadius, clipPath = null;
    if (shapeType === "circle") {
      borderRadius = "50%";
    } else if (shapeType === "diamond") {
      borderRadius = "25%";
    } else if (shapeType === "roundedSquare") {
      borderRadius = "18%";
    } else {
      borderRadius = "0";
      clipPath = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";
    }

    // ベースシェイプ
    var baseHue = 260 + Math.random() * 20; // 260-280 紫系
    var basePupilSize = 0.3 + Math.random() * 0.1; // 30-40% of cell
    var basePupilX = 0;
    var basePupilY = 0;
    var baseRotation = shapeType === "diamond" ? 45 : 0;

    this.baseShape = {
      hue: baseHue,
      pupilSize: basePupilSize,
      pupilX: basePupilX,
      pupilY: basePupilY,
      rotation: baseRotation,
      shapeType: shapeType,
      borderRadius: borderRadius,
      clipPath: clipPath,
    };

    var totalCells = layer.cols * layer.rows;

    if (this.roundType === "find") {
      this.oddIndex = Math.floor(Math.random() * totalCells);

      // 層のaxesから軸を選択
      var axes = layer.axes.slice();
      // 高難度ほど1軸にする
      var numAxes = layer.diffStrength > 0.5 ? (Math.random() < 0.5 ? 2 : 1) : 1;
      // シャッフルして先頭から取る
      for (var i = axes.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = axes[i]; axes[i] = axes[j]; axes[j] = tmp;
      }
      var chosenAxes = axes.slice(0, numAxes);

      var diff = { hue: baseHue, pupilSize: basePupilSize, pupilX: basePupilX, pupilY: basePupilY, rotation: baseRotation, shapeType: shapeType, borderRadius: borderRadius, clipPath: clipPath };

      for (var a = 0; a < chosenAxes.length; a++) {
        var axis = chosenAxes[a];
        var s = layer.diffStrength;
        var sign = Math.random() < 0.5 ? 1 : -1;

        if (axis === "hue") {
          // 強度1.0: ±40deg → 強度0.25: ±8deg
          var range = 8 + (40 - 8) * s;
          diff.hue = baseHue + sign * range;
        } else if (axis === "pupilSize") {
          // 強度1.0: ±30% → 強度0.25: ±8%
          var range = 0.08 + (0.30 - 0.08) * s;
          diff.pupilSize = basePupilSize + sign * range * basePupilSize;
          diff.pupilSize = Math.max(0.15, Math.min(0.55, diff.pupilSize));
        } else if (axis === "pupilPos") {
          // 強度1.0: ±20px → 強度0.25: ±3px
          var range = 3 + (20 - 3) * s;
          diff.pupilX = sign * range;
          diff.pupilY = (Math.random() - 0.5) * range * 0.5;
        } else if (axis === "rotation") {
          // 強度1.0: ±30deg → 強度0.25: ±5deg
          var range = 5 + (30 - 5) * s;
          diff.rotation = baseRotation + sign * range;
        } else if (axis === "shape") {
          // borderRadius / clipPath を微妙にずらす
          if (shapeType === "hexagon") {
            var offset = 5 + (20 - 5) * s;
            var pts = [
              [25 + (Math.random() - 0.5) * offset, 0 + Math.random() * offset * 0.5],
              [75 + (Math.random() - 0.5) * offset, 0 + Math.random() * offset * 0.5],
              [100 + (Math.random() - 0.5) * offset * 0.5, 50 + (Math.random() - 0.5) * offset],
              [75 + (Math.random() - 0.5) * offset, 100 - Math.random() * offset * 0.5],
              [25 + (Math.random() - 0.5) * offset, 100 - Math.random() * offset * 0.5],
              [0 + Math.random() * offset * 0.5, 50 + (Math.random() - 0.5) * offset]
            ];
            diff.clipPath = "polygon(" + pts.map(function(p) { return p[0] + "% " + p[1] + "%"; }).join(", ") + ")";
          } else {
            var brBase = parseFloat(borderRadius);
            var offset = 5 + (20 - 5) * s;
            var newBr = brBase + sign * offset;
            newBr = Math.max(0, Math.min(50, newBr));
            diff.borderRadius = newBr + "%";
          }
        }
      }

      this.diffShape = diff;
    } else {
      // none: 全員同じ
      this.oddIndex = -1;
      this.diffShape = null;
    }
  },

  renderGrid(layer) {
    this.el.grid.innerHTML = "";
    var totalCells = layer.cols * layer.rows;

    // セルサイズ計算（画面幅に合わせる）
    var maxGridWidth = Math.min(400, window.innerWidth - 40);
    var maxGridHeight = window.innerHeight * 0.55;
    var cellW = Math.floor((maxGridWidth - (layer.cols - 1) * 8) / layer.cols);
    var cellH = Math.floor((maxGridHeight - (layer.rows - 1) * 8) / layer.rows);
    var cellSize = Math.min(cellW, cellH, 90);

    this.el.grid.style.gridTemplateColumns = "repeat(" + layer.cols + ", " + cellSize + "px)";
    this.el.grid.style.gridTemplateRows = "repeat(" + layer.rows + ", " + cellSize + "px)";

    for (var i = 0; i < totalCells; i++) {
      var cell = document.createElement("div");
      cell.className = "cw-cell";
      cell.dataset.index = i;
      cell.style.width = cellSize + "px";
      cell.style.height = cellSize + "px";

      var shape = (i === this.oddIndex) ? this.diffShape : this.baseShape;
      this.applyShapeStyle(cell, shape, cellSize);

      // タップイベント
      (function(idx, self) {
        cell.addEventListener("click", function() {
          self.onCellTap(idx);
        });
      })(i, this);

      this.el.grid.appendChild(cell);
    }

    // 入場アニメーション
    requestAnimationFrame(() => {
      var cells = this.el.grid.querySelectorAll(".cw-cell");
      cells.forEach(function(c, idx) {
        setTimeout(function() {
          c.classList.add("cw-cell-enter");
        }, idx * 30);
      });
    });
  },

  applyShapeStyle(cell, shape, cellSize) {
    // 外形（borderRadius / clipPath）
    cell.style.borderRadius = shape.borderRadius;
    if (shape.clipPath) {
      cell.style.clipPath = shape.clipPath;
    }

    // 外円（白目/頭部）: radial-gradient 紫系
    var h = shape.hue;
    cell.style.background = "radial-gradient(circle at 45% 40%, hsl(" + h + ", 40%, 55%), hsl(" + h + ", 50%, 25%))";
    cell.style.transform = "rotate(" + shape.rotation + "deg)";

    // 瞳（内円）
    var pupil = document.createElement("div");
    pupil.className = "cw-pupil";
    var pSize = cellSize * shape.pupilSize;
    pupil.style.width = pSize + "px";
    pupil.style.height = pSize + "px";
    pupil.style.left = (cellSize / 2 - pSize / 2 + shape.pupilX) + "px";
    pupil.style.top = (cellSize / 2 - pSize / 2 + shape.pupilY) + "px";
    pupil.style.background = "radial-gradient(circle at 40% 35%, hsl(" + (h + 180) + ", 60%, 70%), hsl(" + (h + 180) + ", 70%, 20%))";
    cell.appendChild(pupil);
  },

  startTimer(dur) {
    const sid = this.sessionId;
    const urgentAt = Math.min(1500, dur * 0.4);

    this.el.timerFill.style.transition = "none";
    this.el.timerFill.style.width = "100%";
    this.el.timerBar.classList.remove("cw-timer-urgent");
    this.el.timerBar.classList.add("cw-timer-active");

    requestAnimationFrame(() => {
      this.el.timerFill.style.transition = "width " + (dur / 1000) + "s linear";
      this.el.timerFill.style.width = "0%";
    });

    // urgency
    this.flinchTimeout = setTimeout(() => {
      if (this.sessionId !== sid || this.answered) return;
      this.el.timerBar.classList.add("cw-timer-urgent");
      // ビクつき
      this.el.grid.querySelectorAll(".cw-cell").forEach(function(c) {
        c.style.animation = "none";
        void c.offsetWidth;
        c.style.animation = "";
      });
      // 心拍
      this.heartbeatSpeed = 600;
      const hbLoop = () => {
        if (this.sessionId !== sid || this.answered) return;
        SoundSystem.heartbeat();
        this.heartbeatSpeed = Math.max(400, this.heartbeatSpeed - 25);
        this.heartbeatInterval = setTimeout(() => hbLoop(), this.heartbeatSpeed);
      };
      hbLoop();
    }, dur - urgentAt);

    this.timerTimeout = setTimeout(() => {
      if (this.sessionId !== sid || this.answered) return;
      this.onTimeout();
    }, dur);
  },

  stopTimer() {
    clearTimeout(this.timerTimeout);
    clearTimeout(this.flinchTimeout);
    clearTimeout(this.heartbeatInterval);
    this.timerTimeout = null;
    this.flinchTimeout = null;
    this.heartbeatInterval = null;
    this.el.timerFill.style.transition = "none";
    this.el.timerBar.classList.remove("cw-timer-active", "cw-timer-urgent");
  },

  onCellTap(index) {
    if (this.answered) return;
    this.answered = true;
    this.stopTimer();

    var cells = this.el.grid.querySelectorAll(".cw-cell");
    var tappedCell = cells[index];

    if (this.roundType === "none") {
      // none: タップした → ミス
      this.onWrongTap(tappedCell);
      return;
    }

    // find: 正しいセルをタップしたか？
    if (index === this.oddIndex) {
      this.onCorrectFind(tappedCell);
    } else {
      this.onWrongTap(tappedCell);
    }
  },

  onTimeout() {
    this.answered = true;
    this.stopTimer();

    if (this.roundType === "none") {
      // none: タイムアウト = 正解
      this.onNoneSuccess();
      return;
    }

    // find: タイムアウト = ミス
    this.onMiss();
  },

  onCorrectFind(tappedCell) {
    this.comboCount++;
    if (this.comboCount > this.maxCombo) this.maxCombo = this.comboCount;
    SoundSystem.correct();
    this.updateComboUI();

    tappedCell.classList.add("cw-cell-correct");
    // 他のセルをフェードアウト
    this.el.grid.querySelectorAll(".cw-cell").forEach(function(c) {
      if (c !== tappedCell) c.classList.add("cw-cell-fade");
    });
    this.el.command.textContent = "…見つけた";
    this.el.command.style.color = "#60ff90";

    const sid = this.sessionId;
    setTimeout(() => {
      if (this.sessionId !== sid) return;
      this.el.command.style.color = "";
      this.advanceRound();
    }, 800);
  },

  onNoneSuccess() {
    this.comboCount++;
    if (this.comboCount > this.maxCombo) this.maxCombo = this.comboCount;
    SoundSystem.correct();
    this.updateComboUI();

    this.el.command.textContent = "…全員同じだ";
    this.el.command.style.color = "#60ff90";

    const sid = this.sessionId;
    setTimeout(() => {
      if (this.sessionId !== sid) return;
      this.el.command.style.color = "";
      this.advanceRound();
    }, 800);
  },

  onWrongTap(tappedCell) {
    var hadCombo = this.comboCount >= 3;
    this.comboCount = 0;
    this.totalMisses++;
    this.lives--;
    this.updateLivesUI(this.lives);
    SoundSystem.wrong();
    SoundSystem.updateSlashTension(this.calcTension());
    if (navigator.vibrate) navigator.vibrate([50, 30, 80]);

    tappedCell.classList.add("cw-cell-wrong");

    // 赤フラッシュ
    this.el.screen.classList.remove("cw-miss-flash");
    void this.el.screen.offsetWidth;
    this.el.screen.classList.add("cw-miss-flash");

    // 正解セルを示す（findの場合のみ）
    if (this.roundType === "find" && this.oddIndex >= 0) {
      var cells = this.el.grid.querySelectorAll(".cw-cell");
      if (cells[this.oddIndex]) cells[this.oddIndex].classList.add("cw-cell-reveal");
    }

    this.el.command.textContent = this.roundType === "none" ? "…罠だった" : "…違う";
    this.el.command.style.color = "#ff4060";

    // コンボブレイク
    if (hadCombo) {
      this.el.comboEl.textContent = "BREAK";
      this.el.comboEl.classList.remove("cw-combo-hot");
      this.el.comboEl.classList.add("cw-combo-show", "cw-combo-break");
      setTimeout(() => {
        this.el.comboEl.classList.remove("cw-combo-show", "cw-combo-break");
        this.el.comboEl.textContent = "";
      }, 700);
    } else {
      this.updateComboUI();
    }

    if (this.lives <= 0) {
      const sid = this.sessionId;
      setTimeout(() => {
        if (this.sessionId !== sid) return;
        this.el.command.style.color = "";
        this.showGameOver();
      }, 900);
      return;
    }

    const sid = this.sessionId;
    setTimeout(() => {
      if (this.sessionId !== sid) return;
      this.el.command.style.color = "";
      this.advanceRound();
    }, 800);
  },

  onMiss() {
    var hadCombo = this.comboCount >= 3;
    this.comboCount = 0;
    this.totalMisses++;
    this.lives--;
    this.updateLivesUI(this.lives);
    SoundSystem.wrong();
    SoundSystem.updateSlashTension(this.calcTension());

    // 正解セルを示す
    if (this.oddIndex >= 0) {
      var cells = this.el.grid.querySelectorAll(".cw-cell");
      if (cells[this.oddIndex]) cells[this.oddIndex].classList.add("cw-cell-reveal");
      // 他をフェードアウト
      cells.forEach(function(c, idx) {
        if (idx !== this.oddIndex) c.classList.add("cw-cell-fade");
      }.bind(this));
    }

    this.el.command.textContent = "…見逃した";
    this.el.command.style.color = "#ff4060";

    if (hadCombo) {
      this.el.comboEl.textContent = "BREAK";
      this.el.comboEl.classList.remove("cw-combo-hot");
      this.el.comboEl.classList.add("cw-combo-show", "cw-combo-break");
      setTimeout(() => {
        this.el.comboEl.classList.remove("cw-combo-show", "cw-combo-break");
        this.el.comboEl.textContent = "";
      }, 700);
    } else {
      this.updateComboUI();
    }

    if (this.lives <= 0) {
      const sid = this.sessionId;
      setTimeout(() => {
        if (this.sessionId !== sid) return;
        this.el.command.style.color = "";
        this.showGameOver();
      }, 900);
      return;
    }

    const sid = this.sessionId;
    setTimeout(() => {
      if (this.sessionId !== sid) return;
      this.el.command.style.color = "";
      this.advanceRound();
    }, 800);
  },

  advanceRound() {
    this.currentRound++;
    const layer = CROWD_LAYERS[this.currentLayer];
    if (this.currentRound >= layer.rounds) {
      this.currentLayer++;
      if (this.currentLayer >= CROWD_LAYERS.length) {
        this.showClear();
      } else {
        this.showLayerTitle();
      }
    } else {
      this.startRound();
    }
  },

  updateLivesUI(breakIndex) {
    var html = "";
    for (var i = 0; i < this.maxLives; i++) {
      if (i < this.lives) {
        html += '<div class="cw-life"></div>';
      } else if (i === breakIndex) {
        html += '<div class="cw-life cw-life-lost cw-life-break"></div>';
      } else {
        html += '<div class="cw-life cw-life-lost"></div>';
      }
    }
    this.el.livesEl.innerHTML = html;
  },

  updateComboUI() {
    if (this.comboCount >= 3) {
      this.el.comboEl.textContent = this.comboCount + " combo";
      this.el.comboEl.classList.add("cw-combo-show");
      this.el.comboEl.classList.toggle("cw-combo-hot", this.comboCount >= 10);
    } else {
      this.el.comboEl.classList.remove("cw-combo-show", "cw-combo-hot");
    }
  },

  showClear() {
    SoundSystem.stopSlashAmbient();
    const sid = this.sessionId;
    const m = this.totalMisses;

    this.el.clearMsg.textContent = "";
    this.el.clearRank.textContent = "";
    this.el.clearRankMsg.textContent = "";
    this.el.clearEpilogue.textContent = "";
    this.el.clearButtons.style.opacity = "0";
    this.el.clearButtons.style.pointerEvents = "none";

    setTimeout(() => {
      if (this.sessionId !== sid) return;
      this.el.clearOverlay.classList.add("cw-co-show");

      setTimeout(() => {
        if (this.sessionId !== sid) return;
        SoundSystem.clearChime();
      }, 600);

      // タイプライター
      const msg = "…群衆の中で、お前だけが\n自分の目で見ていた。";
      const chars = msg.split("");
      let ci = 0;
      setTimeout(() => {
        if (this.sessionId !== sid) return;
        const typeTimer = setInterval(() => {
          if (this.sessionId !== sid) { clearInterval(typeTimer); return; }
          if (ci < chars.length) {
            const c = chars[ci];
            if (c === "\n") {
              this.el.clearMsg.appendChild(document.createElement("br"));
            } else {
              this.el.clearMsg.appendChild(document.createTextNode(c));
            }
            ci++;
          } else {
            clearInterval(typeTimer);
            // ランク
            setTimeout(() => {
              if (this.sessionId !== sid) return;
              let rank, rankMsg, rankColor;
              if (m === 0) {
                rank = "S"; rankMsg = "完璧な目だ。"; rankColor = "#ffd700";
              } else if (m <= 2) {
                rank = "A"; rankMsg = "鋭い目だ。"; rankColor = "#c0c0ff";
              } else {
                rank = "B"; rankMsg = "見えてはいた。"; rankColor = "#a0c0e0";
              }

              this.el.clearRank.textContent = rank;
              this.el.clearRank.style.color = rankColor;
              this.el.clearRankMsg.textContent = rankMsg;

              // 三幕総括エピローグ
              setTimeout(() => {
                if (this.sessionId !== sid) return;
                const epilogue = "命令に逆らい、\n刃を振り、\n群衆の中で目を開けた。\n\n…お前はもう、誰の支配も受けない。";
                this.el.clearEpilogue.textContent = epilogue;

                // ボタン
                setTimeout(() => {
                  if (this.sessionId !== sid) return;
                  this.el.clearButtons.style.opacity = "1";
                  this.el.clearButtons.style.pointerEvents = "auto";
                }, 1500);
              }, 500);
            }, 350);
          }
        }, 75);
      }, 900);
    }, 250);
  },

  showGameOver() {
    const sid = this.sessionId;
    this.cleanup();
    SoundSystem.stopSlashAmbient();

    var reached = 0;
    for (var li = 0; li < this.currentLayer; li++) reached += CROWD_LAYERS[li].rounds;
    reached += this.currentRound;
    var total = 0;
    for (var li = 0; li < CROWD_LAYERS.length; li++) total += CROWD_LAYERS[li].rounds;

    this.el.gameoverMsg.textContent = "…見えなかった";
    SoundSystem.gameoverSound();

    setTimeout(() => {
      if (this.sessionId !== sid) return;
      this.el.gameoverOverlay.classList.add("cw-go-show");
    }, 300);
  },
};

// ============================================================
// タイトル放置時プロローグ
// ============================================================
const TitlePrologue = {
  idleTimeout: null,
  loopTimeout: null,
  lineTimeouts: [],
  el: null,
  lines: null,

  init() {
    this.el = document.getElementById("title-prologue");
    this.lines = this.el.querySelectorAll(".prologue-line");
  },

  startIdle() {
    this.stopAll();
    this.idleTimeout = setTimeout(() => this.showPrologue(), 10000);
  },

  stopAll() {
    clearTimeout(this.idleTimeout);
    clearTimeout(this.loopTimeout);
    this.lineTimeouts.forEach(t => clearTimeout(t));
    this.lineTimeouts = [];
    if (this.el) {
      this.el.classList.remove("prologue-active", "prologue-fadeout");
      this.lines.forEach(l => l.classList.remove("prologue-line-show"));
    }
  },

  showPrologue() {
    this.el.classList.add("prologue-active");
    this.el.classList.remove("prologue-fadeout");
    this.lines.forEach(l => l.classList.remove("prologue-line-show"));

    // 1行ずつフェードイン（1.8秒間隔）
    for (var i = 0; i < this.lines.length; i++) {
      (function(idx, self) {
        var t = setTimeout(function() {
          self.lines[idx].classList.add("prologue-line-show");
        }, idx * 1800);
        self.lineTimeouts.push(t);
      })(i, this);
    }

    // 全行表示後2.5秒ホールド → フェードアウト → 12秒後にループ
    var totalShowTime = (this.lines.length - 1) * 1800 + 2500;
    var fadeT = setTimeout(() => {
      this.el.classList.add("prologue-fadeout");
      this.loopTimeout = setTimeout(() => {
        this.el.classList.remove("prologue-active", "prologue-fadeout");
        this.lines.forEach(l => l.classList.remove("prologue-line-show"));
        this.loopTimeout = setTimeout(() => this.showPrologue(), 12000);
      }, 1500); // フェードアウト時間
    }, totalShowTime);
    this.lineTimeouts.push(fadeT);
  },
};

document.addEventListener("DOMContentLoaded", () => {
  Game.init();
  Tutorial.init();
  Dungeon.init();
  Slash.init();
  Crowd.init();
  JudgeRoom.init();
  /* Corridor.init(); -- 隔離中 */
  TitlePrologue.init();
  TitlePrologue.startIdle();

  // タイトル画面のスクロール/バウンス完全防止（iOS Safari対策）
  var titleScreen = document.getElementById("screen-title");
  titleScreen.addEventListener("touchmove", function(e) {
    e.preventDefault();
  }, { passive: false });
});
