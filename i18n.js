// ============================================================
// I18n Runtime Module
// ============================================================
var I18n = {
  _data: {},
  _lang: "ja",
  _loaded: {},

  register: function(lang, data) {
    this._data[lang] = data;
    this._loaded[lang] = true;
  },

  setLang: function(lang, callback) {
    if (this._loaded[lang]) {
      this._lang = lang;
      localStorage.setItem("kusokurae_lang", lang);
      this._rebindGameData();
      this.applyToDOM();
      if (callback) callback();
      return;
    }
    // 遅延ロード
    var script = document.createElement("script");
    script.src = "lang/" + lang + ".js?v=2";
    var self = this;
    script.onload = function() {
      self._lang = lang;
      localStorage.setItem("kusokurae_lang", lang);
      self._rebindGameData();
      self.applyToDOM();
      if (callback) callback();
    };
    script.onerror = function() {
      console.warn("I18n: failed to load " + lang);
    };
    document.head.appendChild(script);
  },

  getLang: function() {
    return this._lang;
  },

  t: function(key) {
    var parts = key.split(".");
    var obj = this._data[this._lang];
    for (var i = 0; i < parts.length; i++) {
      if (obj == null) return key;
      obj = obj[parts[i]];
    }
    return (obj !== undefined && obj !== null) ? obj : key;
  },

  // 配列取得用
  ta: function(key) {
    var val = this.t(key);
    return Array.isArray(val) ? val : [];
  },

  applyToDOM: function() {
    document.documentElement.setAttribute("data-lang", this._lang);
    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var key = el.getAttribute("data-i18n");
      var val = this.t(key);
      if (val !== key) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = val;
        } else {
          el.textContent = val;
        }
      }
    }
    // data-i18n-html: innerHTML用
    var htmlEls = document.querySelectorAll("[data-i18n-html]");
    for (var i = 0; i < htmlEls.length; i++) {
      var el = htmlEls[i];
      var key = el.getAttribute("data-i18n-html");
      var val = this.t(key);
      if (val !== key) el.innerHTML = val;
    }
  },

  // ゲームデータのリバインド
  _rebindGameData: function() {
    var d = this._data[this._lang];
    if (!d) return;

    // Stages
    if (d.stages && d.stages.normal && typeof _patchStages === "function") {
      _patchStages(STAGES_NORMAL, d.stages.normal);
    }
    if (d.stages && d.stages.exception && typeof _patchStages === "function") {
      _patchStages(STAGES_EXCEPTION, d.stages.exception);
    }

    // Comments
    if (d.comments) {
      for (var k in d.comments) {
        if (d.comments.hasOwnProperty(k) && COMMENTS.hasOwnProperty(k)) {
          COMMENTS[k] = d.comments[k];
        }
      }
    }

    // Phase change messages
    if (d.phaseChangeMessages) {
      for (var i = 0; i < d.phaseChangeMessages.length; i++) {
        PHASE_CHANGE_MESSAGES[i] = d.phaseChangeMessages[i];
      }
    }

    // Results
    if (d.results) {
      for (var i = 0; i < d.results.length && i < RESULTS.length; i++) {
        if (d.results[i].title) RESULTS[i].title = d.results[i].title;
        if (d.results[i].message) RESULTS[i].message = d.results[i].message;
      }
    }
    if (d.resultContaminated) {
      RESULT_CONTAMINATED.title = d.resultContaminated.title;
      RESULT_CONTAMINATED.message = d.resultContaminated.message;
    }

    // Slash layers
    if (d.slash && d.slash.layerNames) {
      for (var i = 0; i < d.slash.layerNames.length && i < SLASH_LAYERS.length; i++) {
        SLASH_LAYERS[i].name = d.slash.layerNames[i];
      }
    }
    if (d.slash && d.slash.hints) {
      for (var i = 0; i < d.slash.hints.length && i < SLASH_LAYER_HINTS.length; i++) {
        SLASH_LAYER_HINTS[i] = d.slash.hints[i];
      }
    }

    // JudgeRoom ranks
    if (d.judgeRoom && d.judgeRoom.ranks) {
      for (var i = 0; i < d.judgeRoom.ranks.length && i < JUDGE_RANKS.length; i++) {
        if (d.judgeRoom.ranks[i].title) JUDGE_RANKS[i].title = d.judgeRoom.ranks[i].title;
        if (d.judgeRoom.ranks[i].message) JUDGE_RANKS[i].message = d.judgeRoom.ranks[i].message;
      }
    }

    // Crowd layers
    if (d.crowd && d.crowd.layerNames) {
      for (var i = 0; i < d.crowd.layerNames.length && i < CROWD_LAYERS.length; i++) {
        CROWD_LAYERS[i].name = d.crowd.layerNames[i];
      }
    }
    if (d.crowd && d.crowd.taunts) {
      for (var i = 0; i < d.crowd.taunts.length && i < CROWD_LAYER_TAUNTS.length; i++) {
        CROWD_LAYER_TAUNTS[i] = d.crowd.taunts[i];
      }
    }
  },

  init: function() {
    var saved = localStorage.getItem("kusokurae_lang");
    if (saved && saved !== "ja") {
      this.setLang(saved);
    } else {
      this._lang = "ja";
      this._rebindGameData();
      this.applyToDOM();
    }
  }
};

// ステージデータのテキストフィールドだけパッチ
function _patchStages(target, source) {
  for (var i = 0; i < source.length && i < target.length; i++) {
    var s = source[i];
    if (s.command !== undefined) target[i].command = s.command;
    if (s.choices !== undefined) target[i].choices = s.choices;
    if (s.wrongReaction !== undefined) target[i].wrongReaction = s.wrongReaction;
    if (s.rightReaction !== undefined) target[i].rightReaction = s.rightReaction;
    if (s.misdirect !== undefined) target[i].misdirect = s.misdirect;
    if (s.alts !== undefined) target[i].alts = s.alts;
  }
}
