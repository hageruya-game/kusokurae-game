// ====================================================
// 同調圧力くそくらえ - main.js
// ====================================================

const TEST_MODE = true;

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
  { theme: "sns", command: "炎上に参加しろ", choices: ["叩く", "閉じる"], correctIndex: 1, ruleType: "normal", wrongReaction: "石を投げた", rightReaction: "スマホを置け" },
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
    images: ["decoy_pig.png", "correct_fly.png"], alts: ["豚", "ハエ"],
    imgClass: ["tap-decoy", "tap-correct"],
    misdirect: "デカい方だ、迷うな！",
    wrongReaction: "言われた通り動いたな", rightReaction: "命令を疑った" },
  { theme: "trap", command: "爆弾を止めろ！", correctIndex: 1, ruleType: "tap", correctType: "deny",
    images: ["bomb_trap.png", "correct_fly.png"], alts: ["爆弾", "ハエ"],
    imgClass: ["tap-decoy", "tap-correct"],
    misdirect: "爆発するぞ！早く！",
    wrongReaction: "焦って爆弾に触れた", rightReaction: "焦りに負けなかった" },
  { theme: "trap", command: "ハンバーガーを取れ！", correctIndex: 1, ruleType: "tap", correctType: "deny",
    images: ["decoy_burger.png", "correct_fly.png"], alts: ["ハンバーガー", "ハエ"],
    imgClass: ["tap-decoy", "tap-correct"],
    misdirect: "美味そうだろ？取れよ！",
    wrongReaction: "餌に食いついた", rightReaction: "欲に負けなかった" },

  // --- deny/non-fly: ハエ固定を破壊（正解がハエじゃない） ---
  { theme: "trap", command: "宝箱を開けろ！", correctIndex: 1, ruleType: "tap", correctType: "deny",
    images: ["false_treasure.png", "decoy_spider.png"], alts: ["宝箱", "蜘蛛"],
    imgClass: ["tap-decoy", "tap-correct"],
    misdirect: "お宝だぞ？見逃すのか！",
    wrongReaction: "偽物の宝に飛びついた", rightReaction: "蜘蛛が正解とはな" },
  { theme: "trap", command: "犬を選べ！", correctIndex: 1, ruleType: "tap", correctType: "deny",
    images: ["friendly_dog.png", "bomb_trap.png"], alts: ["犬", "爆弾"],
    imgClass: ["tap-decoy", "tap-correct"],
    misdirect: "安心しろ、犬は味方だ！",
    wrongReaction: "見た目の安全に騙された", rightReaction: "爆弾が正解だ" },

  // --- obey: 逆張りが負ける（命令通りが正解、見た目はdenyと同じ） ---
  { theme: "trap", command: "爆弾を止めろ！", correctIndex: 0, ruleType: "tap", correctType: "obey",
    images: ["bomb_trap.png", "correct_fly.png"], alts: ["爆弾", "ハエ"],
    imgClass: ["tap-decoy", "tap-correct"],
    misdirect: "触るな！危ないぞ！",
    wrongReaction: "逆張りで失敗した", rightReaction: "命令が正しい時もある" },
  { theme: "trap", command: "蜘蛛を潰せ！", correctIndex: 1, ruleType: "tap", correctType: "obey",
    images: ["correct_fly.png", "decoy_spider.png"], alts: ["ハエ", "蜘蛛"],
    imgClass: ["tap-correct", "tap-decoy"],
    misdirect: "やめろ！触るな！",
    wrongReaction: "疑いすぎた", rightReaction: "素直に従えた" },

  // --- wait: どちらも罠（押さないが正解、ハエなし） ---
  { theme: "trap", command: "金の箱を取れ！", correctIndex: -1, ruleType: "tap", correctType: "wait",
    images: ["golden_trap.png", "false_treasure.png"], alts: ["金の箱", "宝箱"],
    imgClass: ["tap-decoy", "tap-decoy"],
    misdirect: "早く取れ！なくなるぞ！",
    wrongReaction: "両方罠だった", rightReaction: "どちらも触らなかった" },
  { theme: "trap", command: "光る玉を掴め！", correctIndex: -1, ruleType: "tap", correctType: "wait",
    images: ["energy_orb.png", "decoy_burger.png"], alts: ["光る玉", "ハンバーガー"],
    imgClass: ["tap-decoy", "tap-decoy"],
    misdirect: "どっちか選べ！早く！",
    wrongReaction: "誘惑に負けた", rightReaction: "何も触らない勇気" },

  // --- deny/position-reversed: 位置逆転 ---
  { theme: "trap", command: "豚が逃げる！捕まえろ！", correctIndex: 0, ruleType: "tap", correctType: "deny",
    images: ["correct_fly.png", "decoy_pig.png"], alts: ["ハエ", "豚"],
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
  phaseMsg: 1400,      // フェーズ変更メッセージ1つあたりの表示時間
  phaseEndPause: 1200,  // 最後のメッセージ後の余韻
};

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

    this.el.btnStart.addEventListener("click", () => this.startGame());
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
    SoundSystem.init();
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
    this.updateStateUI("normal");
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

    const next = () => {
      i++;
      if (i < PHASE_CHANGE_MESSAGES.length) {
        this.showPhaseMsg(PHASE_CHANGE_MESSAGES[i]);
        setTimeout(next, TIMING.phaseMsg);
      } else {
        setTimeout(() => {
          this.el.phaseOverlay.classList.remove("active");
          this.inPhase2 = true;
          this.el.screenGame.classList.add("phase2");
          SoundSystem.startAmbient(true);
          this.startRound();
        }, TIMING.phaseEndPause);
      }
    };

    setTimeout(next, TIMING.phaseMsg);
  },

  showPhaseMsg(text) {
    const el = this.el.phaseMessage;
    el.classList.remove("phase-msg-anim");
    void el.offsetWidth;
    el.textContent = text;
    el.classList.add("phase-msg-anim");
  },

  // === ステート表示 ===
  updateStateUI(ruleType) {
    this.el.pressureMeter.classList.remove("state-normal", "state-obey", "state-wait", "state-tap");
    this.el.stateLine.classList.remove("state-active");
    if (ruleType === "obey") {
      this.el.pressureMeter.classList.add("state-obey");
      this.el.stateLine.textContent = "状態：服従";
      this.el.stateLine.classList.add("state-active");
    } else if (ruleType === "wait") {
      this.el.pressureMeter.classList.add("state-wait");
      this.el.stateLine.textContent = "状態：待機";
      this.el.stateLine.classList.add("state-active");
    } else if (ruleType === "tap") {
      this.el.pressureMeter.classList.add("state-tap");
      this.el.stateLine.textContent = "状態：アクション";
      this.el.stateLine.classList.add("state-active");
    } else {
      this.el.pressureMeter.classList.add("state-normal");
      this.el.stateLine.textContent = "";
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
    this.hintTimeout = setTimeout(() => {
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
    this.mockeryTimeout = setTimeout(() => {
      const category = this.inPhase2 ? "mockeryP2" : "mockery";
      let text = CommentSystem.pick(category);
      if (text === this.lastMockery) {
        text = CommentSystem.pick(category);
      }
      this.lastMockery = text;

      // まず吹き出しを完全に消してからmockeryを表示（二重表示防止）
      this.clearSpeech();
      this.mockeryActive = true;

      // 1フレーム待ってからmockeryを表示（opacity遷移で自然にフェードイン）
      requestAnimationFrame(() => {
        this.showSpeech(text, this.inPhase2 ? "speech-mockery-p2" : "speech-mockery");
      });

      this.mockeryTimeout = setTimeout(() => {
        this.mockeryActive = false;
        // mockery消去後にcommentを復帰
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
    this.tauntTimeout = setTimeout(() => {
      const category = this.inPhase2 ? "tauntP2" : "taunt";
      const text = CommentSystem.pick(category);
      this.el.tauntText.textContent = text;
      this.el.tauntText.className = "taunt-text" + (this.inPhase2 ? " taunt-p2" : "");
      this.el.tauntOverlay.classList.remove("taunt-show");
      void this.el.tauntText.offsetWidth;
      this.el.tauntOverlay.classList.add("taunt-show");
      this.el.tauntText.classList.add("taunt-anim");

      this.tauntTimeout = setTimeout(() => {
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

    void this.el.oxSymbol.offsetWidth; // reflow
    this.el.oxSymbol.textContent = isCorrect ? "○" : "✕";
    this.el.oxSymbol.classList.add(isCorrect ? "ox-correct" : "ox-wrong");
    this.el.oxOverlay.classList.add("ox-show");

    if (isCorrect) SoundSystem.correct();
    else SoundSystem.wrong();

    this.oxTimeout = setTimeout(() => {
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
    this.updateStateUI(cmd.ruleType);

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
    setTimeout(() => this.showChoices(), TIMING.pressurePhase);
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

    this.timerInterval = setInterval(() => {
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
    this.stopTimer();

    const cmd = this.roundCommands[this.currentRound];
    const isWaitStage = cmd.ruleType === "wait" || (cmd.ruleType === "tap" && cmd.correctType === "wait");

    // waitステージ: タイマー0到達 = 正解
    if (isWaitStage) {
      this.onWaitSuccess();
      return;
    }

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
    if (this.isWaiting) return;
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
    if (!isCorrect && cmd.ruleType === "tap" && cmd.correctIndex >= 0) {
      const correctBtn = cmd.correctIndex === 0 ? this.el.btnChoice0 : this.el.btnChoice1;
      const wrongBtn = cmd.correctIndex === 0 ? this.el.btnChoice1 : this.el.btnChoice0;
      correctBtn.classList.add("flash-correct");
      wrongBtn.classList.add("flash-wrong");
      setTimeout(() => {
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
    setTimeout(() => {
      this.el.feedback.classList.add("feedback-fade");
      this.clearGameComment();

      setTimeout(() => {
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
          this.showResult();
        }
      }, TIMING.pausePhase);
    }, TIMING.resultPhase);
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

// 各ステージの理論最小ミス数（回避不能トラップ: S4=1, S7=2）
const STAGE_MIN_MISSES = [0, 0, 0, 1, 0, 0, 2, 0, 0, 0];
const TOTAL_MIN_MISSES = STAGE_MIN_MISSES.reduce((a, b) => a + b, 0); // = 3

const DUNGEON_STAGES = [
  {
    name: "STAGE 1",
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
    name: "STAGE 2",
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
    name: "STAGE 3",
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
    name: "STAGE 4",
    startRow: 8, startCol: 3,
    map: [
      [1, 1, 1, 3, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1],
      [1, 2, 0, 0, 0, 0, 1], // trap(1,2)
      [1, 0, 1, 1, 1, 2, 1], // trap(5,3)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 0, 1, 1, 1, 2, 1], // trap(5,5)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 1, 0, 1, 1, 1],
      [1, 1, 1, 0, 1, 1, 1],
    ],
    trapWarps: {
      "2,1": { row: 4, col: 5 },
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
    name: "STAGE 5",
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
    name: "STAGE 6",
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
    name: "STAGE 7",
    startRow: 8, startCol: 3,
    map: [
      [1, 1, 1, 3, 1, 1, 1],
      [1, 0, 1, 0, 1, 0, 1], // dead-end alcoves at c1, c5
      [1, 0, 0, 0, 0, 2, 1], // trap(5,2)
      [1, 2, 1, 1, 1, 0, 1], // trap(1,3)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 2, 1, 1, 1, 2, 1], // trap(1,5), trap(5,5)
      [1, 0, 0, 0, 0, 0, 1],
      [1, 1, 0, 0, 0, 1, 1], // wider approach
      [1, 1, 1, 0, 1, 1, 1],
    ],
    trapWarps: {
      "5,5": { row: 7, col: 3, block: true },
      "5,1": { row: 7, col: 3 },
      "3,1": { row: 6, col: 5 },
      "2,5": { row: 4, col: 1 },
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
    name: "STAGE 8",
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
    name: "STAGE 9",
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
    name: "STAGE 10",
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
  resultShown: false,
  cells: [],
  el: {},
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
    document.getElementById("btn-dungeon").addEventListener("click", () => { this.currentStage = 0; this.totalMisses = 0; this.start(); });
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
    this.cleanup();
    Game.showScreen(document.getElementById("screen-title"));
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
    SoundSystem.init();
    const s = this.stage();
    this.playerRow = s.startRow;
    this.playerCol = s.startCol;
    this.pressure = 20;
    this.activeDecision = null;
    this.activeDecisionIndex = -1;
    this.isWaitPhase = false;
    this.moving = false;
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
    this.el.screen.classList.remove("dg-clear-flash", "dg-trap-screen-flash", "dg-warp-flash");
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
  },

  showLure(lure) {
    this.el.command.textContent = lure.text;
    this.el.command.className = "dg-command dg-cmd-lure";
    this.el.comment.textContent = lure.comment || "";
    clearTimeout(this.lureTimer);
    this.lureTimer = setTimeout(() => {
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
    this.feedbackTimer = setTimeout(() => {
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
      this.startWait();
    } else if (d.type === "obey") {
      this.el.command.className = "dg-command dg-cmd-obey";
    } else {
      this.el.command.className = "dg-command";
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
    if (correct) {
      this.changePressure(-5);
      this.showFeedback(d.rightReaction, true);
      SoundSystem.correct();
    } else {
      this.changePressure(5);
      this.showFeedback(d.wrongReaction, false);
      SoundSystem.wrong();
      this.addMiss();
      if (d.penaltyPos) {
        this.moving = true;
        setTimeout(() => {
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
    this.changePressure(15);
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
    setTimeout(() => {
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
    this.waitCountInterval = setInterval(() => {
      count--;
      if (count > 0) this.el.feedback.textContent = "…" + count;
      else this.el.feedback.textContent = "";
    }, 1000);
    this.waitTimer = setTimeout(() => {
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
    const delta = totalMisses - TOTAL_MIN_MISSES;
    if (delta <= 0) return { name: "完全覚醒", color: "#ffd700", msg: "全ての誘導を見抜いた" };
    if (delta <= 3) return { name: "鉄の意志", color: "#00ff80", msg: "ほぼ完璧に見抜いた" };
    if (delta <= 8) return { name: "抵抗者", color: "#40ccff", msg: "素早く適応した" };
    if (delta <= 14) return { name: "半覚醒", color: "#ffcc00", msg: "徐々に見抜き始めた" };
    if (delta <= 21) return { name: "流され体質", color: "#ff8040", msg: "まだ空気を読みすぎている" };
    return { name: "完全同調", color: "#ff3060", msg: "完全に支配された" };
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
    const stageMin = STAGE_MIN_MISSES[this.currentStage] || 0;
    const stageDelta = this.missCount - stageMin;
    const stageDeltaStr = stageDelta === 0 ? "±0" : "+" + stageDelta;
    this.el.resultTitle.textContent = "脱出成功！";
    this.el.resultTitle.style.color = "#00ff80";
    this.el.resultRank.textContent = "";
    this.el.resultMsg.textContent = "ミス: " + this.missCount
      + "（最小 " + stageMin + "  " + stageDeltaStr + "）"
      + "\n累計: " + this.totalMisses;
    this.el.btnNext.classList.add("dg-next-show");
    this.el.resultOverlay.classList.add("dg-result-show");
  },

  showFinalResult() {
    const rank = this.getRank(this.totalMisses);
    const delta = this.totalMisses - TOTAL_MIN_MISSES;
    const deltaStr = delta === 0 ? "±0" : "+" + delta;
    // Phase 1: フェードアウト + 一言メッセージ（1.5秒）
    this.el.resultTitle.textContent = "";
    this.el.resultRank.textContent = "";
    this.el.resultMsg.textContent = "…もう、誰の指示も要らない。";
    this.el.resultMsg.style.color = "#a090c0";
    this.el.btnNext.classList.remove("dg-next-show");
    this.el.resultOverlay.classList.add("dg-result-show", "dg-final-phase1");
    // Phase 2: 本リザルト表示（2秒後）
    setTimeout(() => {
      this.el.resultOverlay.classList.remove("dg-final-phase1");
      this.el.resultOverlay.classList.add("dg-final-phase2");
      this.el.resultTitle.textContent = "全ステージ脱出";
      this.el.resultTitle.style.color = "#ffcc00";
      this.el.resultRank.textContent = rank.name;
      this.el.resultRank.style.color = rank.color;
      this.el.resultRank.classList.add("dg-rank-reveal");
      this.el.resultMsg.textContent = rank.msg
        + "\n総ミス: " + this.totalMisses + "（理論最小 " + TOTAL_MIN_MISSES + "  " + deltaStr + "）";
      this.el.resultMsg.style.color = "";
    }, 2000);
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
  isWaiting: false,
  timerInterval: null,
  timeLeft: 0,
  timeLimit: 0,
  lureTimeout: null,
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
      resultMiss: document.getElementById("jr-result-miss"),
      resultMessage: document.getElementById("jr-result-message"),
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
    Game.showScreen(document.getElementById("screen-title"));
  },

  cleanup() {
    this.stopTimer();
    clearTimeout(this.lureTimeout);
    this.isWaiting = false;
  },

  start() {
    SoundSystem.init();
    this.questions = buildJudgeSession();
    this.currentQ = 0;
    this.missCount = 0;
    this.isWaiting = false;

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
    setTimeout(() => this.showQuestion(), 400);
  },

  showQuestion() {
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
    clearTimeout(this.lureTimeout);
    if (q.lure) {
      this.lureTimeout = setTimeout(() => {
        this.el.speech.textContent = q.lure;
        this.el.speech.className = "jr-speech jr-speech-show";
      }, 500);
    }

    this.isWaiting = false;
    this.startTimer();
  },

  choose(answer) {
    if (this.isWaiting) return;
    this.isWaiting = true;
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

    setTimeout(() => this.advance(), 1200);
  },

  showOX(isCorrect) {
    const overlay = document.getElementById("ox-overlay");
    const symbol = document.getElementById("ox-symbol");
    clearTimeout(Game.oxTimeout);
    symbol.className = "ox-symbol";
    overlay.classList.remove("ox-show");
    void symbol.offsetWidth;
    symbol.textContent = isCorrect ? "○" : "✕";
    symbol.classList.add(isCorrect ? "ox-correct" : "ox-wrong");
    overlay.classList.add("ox-show");
    if (isCorrect) SoundSystem.correct();
    else SoundSystem.wrong();
    Game.oxTimeout = setTimeout(() => overlay.classList.remove("ox-show"), 600);
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
    this.timeLimit = getJudgeTimeLimit(this.currentQ);
    this.timeLeft = this.timeLimit;
    this.el.timerFill.style.width = "100%";
    this.el.timerFill.className = "jr-timer-fill";

    this.timerInterval = setInterval(() => {
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
    if (this.isWaiting) return;
    this.isWaiting = true;
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

    setTimeout(() => this.advance(), 1200);
  },

  showResult() {
    this.stopTimer();
    const rank = JUDGE_RANKS.find(r => this.missCount <= r.maxMiss)
      || JUDGE_RANKS[JUDGE_RANKS.length - 1];

    this.el.resultTitle.textContent = rank.title;
    this.el.resultTitle.style.color = rank.color;
    this.el.resultMiss.textContent = "MISS: " + this.missCount + " / " + this.questions.length;
    this.el.resultMessage.textContent = rank.message;
    this.el.resultOverlay.classList.add("jr-result-show");
  },
};

document.addEventListener("DOMContentLoaded", () => { Game.init(); Dungeon.init(); JudgeRoom.init(); });
