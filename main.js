// ====================================================
// 同調圧力くそくらえ - main.js
// ====================================================

// ----- 命令データ（配列管理・ステージ拡張対応） -----
// correctIndex: 正解の選択肢インデックス（逆らう方が正解）
const COMMANDS = [
  {
    command: "今すぐYESを押せ",
    choices: ["YES", "NO"],
    correctIndex: 1,
    wrongReaction: "素直かよ",
    rightReaction: "いいね、反逆者",
  },
  {
    command: "みんな右に行ってるぞ",
    choices: ["右に行く", "左に行く"],
    correctIndex: 1,
    wrongReaction: "群れるなよ…",
    rightReaction: "それでいい",
  },
  {
    command: "拍手しろ",
    choices: ["拍手する", "真顔でいる"],
    correctIndex: 1,
    wrongReaction: "パチパチ…（虚無）",
    rightReaction: "その無表情、最高",
  },
  {
    command: "空気を読め",
    choices: ["読む", "読まない"],
    correctIndex: 1,
    wrongReaction: "読んじゃった…",
    rightReaction: "空気は吸うもの",
  },
  {
    command: "同じにしろ",
    choices: ["同じにする", "自分で決める"],
    correctIndex: 1,
    wrongReaction: "コピーロボットかよ",
    rightReaction: "自分を持ってる",
  },
  {
    command: "「いいね」を押せ",
    choices: ["いいね！", "無視する"],
    correctIndex: 1,
    wrongReaction: "承認欲求の奴隷",
    rightReaction: "いいねに支配されるな",
  },
  {
    command: "頷け",
    choices: ["頷く", "首を横に振る"],
    correctIndex: 1,
    wrongReaction: "イエスマンかい",
    rightReaction: "NOと言える人間",
  },
  {
    command: "みんなやってるぞ？",
    choices: ["じゃあやる", "知らんがな"],
    correctIndex: 1,
    wrongReaction: "みんなって誰だよ",
    rightReaction: "正しい。みんなは幻想",
  },
  {
    command: "笑え",
    choices: ["ハハハ…", "真顔"],
    correctIndex: 1,
    wrongReaction: "作り笑い検出",
    rightReaction: "面白くないものは笑わない",
  },
  {
    command: "普通にしろ",
    choices: ["普通にする", "普通って何？"],
    correctIndex: 1,
    wrongReaction: "普通なんてない",
    rightReaction: "哲学的に正解",
  },
];

// ----- ゲーム設定 -----
const ROUNDS_PER_GAME = 5;

// ----- リザルト定義 -----
const RESULTS = [
  {
    minScore: 5,
    title: "🏆 完全なる反逆者",
    message: "おめでとう。\nあなたは同調圧力を完全に無視した。\n社会不適合？いや、それは褒め言葉だ。",
    titleColor: "#ffcc00",
    charClass: "pulse",
  },
  {
    minScore: 3,
    title: "😏 なかなかの反骨精神",
    message: "悪くない。\nだがまだ少し空気を読んでしまった。\n修行が必要だ。",
    titleColor: "#80ff80",
    charClass: "",
  },
  {
    minScore: 1,
    title: "😰 空気読みすぎ",
    message: "おいおい…\n同調圧力に屈してるぞ。\nもっと自分を持て。",
    titleColor: "#ff8040",
    charClass: "shake-slow",
  },
  {
    minScore: 0,
    title: "💀 完全なる奴隷",
    message: "全部言うこと聞いたのか…\nお前はもう同調圧力の一部だ。\n…もう一回やれ。",
    titleColor: "#ff2020",
    charClass: "pulse",
  },
];

// ----- 音声管理 -----
const AudioManager = {
  sounds: {},

  init() {
    this.sounds.wrong = new Audio("あーあ.wav");
    this.sounds.thanks = new Audio("さんきゅうー.wav");
    this.sounds.crow = new Audio("カラス.wav");
    // 全音声のボリューム設定
    Object.values(this.sounds).forEach((s) => {
      s.volume = 0.7;
    });
  },

  play(name) {
    const sound = this.sounds[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  },
};

// ----- ゲーム状態 -----
const Game = {
  currentRound: 0,
  score: 0,
  roundCommands: [],
  isWaiting: false,

  // 画面要素キャッシュ
  el: {},

  init() {
    // DOM要素を取得
    this.el = {
      screenTitle: document.getElementById("screen-title"),
      screenGame: document.getElementById("screen-game"),
      screenResult: document.getElementById("screen-result"),
      btnStart: document.getElementById("btn-start"),
      btnReplay: document.getElementById("btn-replay"),
      roundNum: document.getElementById("round-num"),
      scoreNum: document.getElementById("score-num"),
      commandText: document.getElementById("command-text"),
      gameCharImg: document.getElementById("game-char-img"),
      feedback: document.getElementById("feedback"),
      choicesArea: document.getElementById("choices-area"),
      btnChoice0: document.getElementById("btn-choice-0"),
      btnChoice1: document.getElementById("btn-choice-1"),
      resultTitle: document.getElementById("result-title"),
      resultScoreNum: document.getElementById("result-score-num"),
      resultMessage: document.getElementById("result-message"),
      resultCharImg: document.getElementById("result-char-img"),
      resultFooter: document.getElementById("result-footer"),
    };

    // 音声初期化
    AudioManager.init();

    // イベント登録
    this.el.btnStart.addEventListener("click", () => this.startGame());
    this.el.btnReplay.addEventListener("click", () => this.startGame());
    this.el.btnChoice0.addEventListener("click", () => this.choose(0));
    this.el.btnChoice1.addEventListener("click", () => this.choose(1));

    // タイトル画面でカラス再生（ユーザー操作後）
    this.el.btnStart.addEventListener(
      "click",
      () => {
        AudioManager.play("crow");
      },
      { once: true }
    );
  },

  // 画面切り替え
  showScreen(screenEl) {
    document.querySelectorAll(".screen").forEach((s) => {
      s.classList.remove("active", "fade-in");
    });
    screenEl.classList.add("active", "fade-in");
  },

  // ゲーム開始
  startGame() {
    this.currentRound = 0;
    this.score = 0;
    this.el.scoreNum.textContent = "0";

    // ランダムに5問選ぶ（重複なし）
    const shuffled = [...COMMANDS].sort(() => Math.random() - 0.5);
    this.roundCommands = shuffled.slice(0, ROUNDS_PER_GAME);

    this.showScreen(this.el.screenGame);
    this.startRound();
  },

  // ラウンド開始
  startRound() {
    const cmd = this.roundCommands[this.currentRound];

    // UI更新
    this.el.roundNum.textContent = this.currentRound + 1;
    this.el.feedback.textContent = "";
    this.el.feedback.className = "feedback";

    // 命令テキスト演出
    this.el.commandText.textContent = cmd.command;
    this.el.commandText.className = "command-text";
    // reflow
    void this.el.commandText.offsetWidth;
    this.el.commandText.classList.add("command-appear");

    // キャラクター演出
    this.el.gameCharImg.className = "character-img";
    void this.el.gameCharImg.offsetWidth;
    this.el.gameCharImg.classList.add("char-enter");

    // 選択肢ボタン
    this.el.btnChoice0.textContent = cmd.choices[0];
    this.el.btnChoice1.textContent = cmd.choices[1];
    this.el.btnChoice0.disabled = false;
    this.el.btnChoice1.disabled = false;

    this.isWaiting = false;
  },

  // 選択
  choose(index) {
    if (this.isWaiting) return;
    this.isWaiting = true;

    const cmd = this.roundCommands[this.currentRound];
    const isCorrect = index === cmd.correctIndex;

    // ボタン無効化
    this.el.btnChoice0.disabled = true;
    this.el.btnChoice1.disabled = true;

    if (isCorrect) {
      this.score++;
      this.el.scoreNum.textContent = this.score;
      this.el.feedback.textContent = "✓ " + cmd.rightReaction;
      this.el.feedback.className = "feedback correct";
    } else {
      this.el.feedback.textContent = "✗ " + cmd.wrongReaction;
      this.el.feedback.className = "feedback wrong";
      AudioManager.play("wrong");
    }

    // 次のラウンドへ
    setTimeout(() => {
      this.currentRound++;
      if (this.currentRound < ROUNDS_PER_GAME) {
        this.startRound();
      } else {
        this.showResult();
      }
    }, 1200);
  },

  // リザルト表示
  showResult() {
    this.showScreen(this.el.screenResult);

    // スコアに応じたリザルト取得
    const result = RESULTS.find((r) => this.score >= r.minScore);

    this.el.resultTitle.textContent = result.title;
    this.el.resultTitle.style.color = result.titleColor;
    this.el.resultTitle.classList.add("result-bounce");

    this.el.resultScoreNum.textContent = this.score;
    this.el.resultScoreNum.parentElement.classList.add("result-bounce");

    this.el.resultMessage.textContent = result.message;
    this.el.resultMessage.classList.add("slide-up");

    // キャラクターのクラス
    this.el.resultCharImg.className = "character-img";
    if (result.charClass) {
      this.el.resultCharImg.classList.add(result.charClass);
    }

    // フッター
    if (this.score === ROUNDS_PER_GAME) {
      this.el.resultFooter.textContent = "社会のルールなんか知ったことか";
    } else if (this.score === 0) {
      this.el.resultFooter.textContent = "…お前、大丈夫か？";
    } else {
      this.el.resultFooter.textContent = "空気は読むな、吸え。";
    }

    // 音声
    if (this.score >= 3) {
      AudioManager.play("thanks");
    } else {
      AudioManager.play("crow");
    }
  },
};

// ----- 起動 -----
document.addEventListener("DOMContentLoaded", () => {
  Game.init();
});
