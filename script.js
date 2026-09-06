// ===== Fallbacks for older browsers =====

if (!("randomUUID" in crypto)) {

    crypto.randomUUID = function () {
  
      const bytes = new Uint8Array(16);
  
      crypto.getRandomValues(bytes);
  
      bytes[6] = (bytes[6] & 0x0f) | 0x40;
  
      bytes[8] = (bytes[8] & 0x3f) | 0x80;
  
      const toHex = (n) => n.toString(16).padStart(2, "0");
  
      const b = Array.from(bytes, toHex);
  
      return `${b[0]}${b[1]}${b[2]}${b[3]}-${b[4]}${b[5]}-${b[6]}${b[7]}-${b[8]}${b[9]}-${b[10]}${b[11]}${b[12]}${b[13]}${b[14]}${b[15]}`;
  
    };
  
  }
  
   
  
  // ===== Built-in i18n =====

const BUILTIN_I18N = {
  en: window.BUILTIN_I18N_EN,
  sv: window.BUILTIN_I18N_SV
};

let i18n = BUILTIN_I18N.sv;
  
   
  
  const STORAGE_KEY = "fifteen-round-game:v6";
  
   
  
  function defaultState() {
  
    const rounds = Array.from({ length: 15 }, (_, i) => ({
  
      id: i + 1,
  
      name: `Round ${i + 1}`,
  
      description: "" // i18n can override
  
    }));
  
   
  
    const players = [
  
      { id: crypto.randomUUID(), name: "Player 1" },
  
      { id: crypto.randomUUID(), name: "Player 2" },
  
    ];
  
   
  
    return {
  
      version: 6,
  
      createdAt: new Date().toISOString(),
  
      players,
  
      rounds,
  
      activeRoundId: 1,
  
      scores: {},
  
      view: "start",
  
      startingDealerPlayerId: players[0].id,
  
      lang: "sv"
  
    };
  
  }
  
   
  
  let state = null;
  
   
  
  function loadState() {
  
    const raw = localStorage.getItem(STORAGE_KEY);
  
    if (!raw) {
  
      state = defaultState();
  
      saveState();
  
      return;
  
    }
  
    try {
  
      state = JSON.parse(raw);
  
      if (!state.version) state.version = 6;
  
      if (!state.scores) state.scores = {};
  
      if (!state.startingDealerPlayerId && state.players?.[0]) {
  
        state.startingDealerPlayerId = state.players[0].id;
  
      }
  
      if (!state.lang) state.lang = "sv";
  
      if (!Array.isArray(state.rounds) || state.rounds.length !== 15) {
  
        const s2 = defaultState();
  
        s2.players = state.players || s2.players;
  
        s2.scores = state.scores || {};
  
        s2.activeRoundId = state.activeRoundId || 1;
  
        s2.view = state.view || "start";
  
        s2.startingDealerPlayerId = state.startingDealerPlayerId || s2.players[0]?.id || null;
  
        s2.lang = state.lang || "sv";
  
        state = s2;
  
      }
  
    } catch {
  
      state = defaultState();
  
    }
  
  }
  
   
  
  function saveState() {
  
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  
  }
  
   
  
  // ===== i18n helpers =====
  
  function loadLanguage(langCode) {
  
    i18n = BUILTIN_I18N[langCode] || BUILTIN_I18N.en;
  
    state.lang = langCode;
  
    saveState();
  
    applyStaticTexts();
  
    render();
  
  }
  
   
  
  function t(path, fallback) {
  
    const parts = path.split(".");
  
    let cur = i18n;
  
    for (const p of parts) {
  
      if (cur && Object.prototype.hasOwnProperty.call(cur, p)) cur = cur[p];
  
      else return fallback ?? path;
  
    }
  
    return cur;
  
  }
  
   
  
  function roundI18n(roundId) {
  
    const key = String(roundId);
  
    return i18n.rounds?.[key] || null;
  
  }
  
   
  
  function getRoundName(r) {
  
    return (roundI18n(r.id)?.name) || r.name || `${t("ui.board.columnRound", "Round")} ${r.id}`;
  
  }
  
   
  
  function getRoundDescription(r) {
  
    return (roundI18n(r.id)?.description) || r.description || "";
  
  }
  
   
  
  // Common rich text renderer (**bold**, *italic*, \n)
  
  function renderRichText(md) {
  
    if (!md) return "";
  
    const escaped = md
  
      .replace(/&/g, "&amp;")
  
      .replace(/</g, "&lt;")
  
      .replace(/>/g, "&gt;");
  
    let html = escaped.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  
    html = html.replace(/(^|[^\*])\*(?!\s)(.+?)\*(?!\w)/g, "$1<em>$2</em>");
  
    html = html.replace(/\r?\n/g, "<br>");
  
    return html;
  
  }
  
   
  
  // ===== Players =====
  
  function addPlayer(name) {
  
    if (state.players.length >= 4) return;
  
    const p = { id: crypto.randomUUID(), name: name || `Player ${state.players.length + 1}` };
  
    state.players.push(p);
  
    if (!state.startingDealerPlayerId) state.startingDealerPlayerId = state.players[0].id;
  
    saveState();
  
    render();
  
  }
  
  function removePlayer(playerId) {
  
    const wasStartingDealer = state.startingDealerPlayerId === playerId;
  
    state.players = state.players.filter(p => p.id !== playerId);
  
    delete state.scores[playerId];
  
    if (wasStartingDealer) state.startingDealerPlayerId = state.players[0]?.id || null;
  
    saveState();
  
    render();
  
  }
  
  function renamePlayer(playerId, name) {
  
    const p = state.players.find(p => p.id === playerId);
  
    if (!p) return;
  
    p.name = name || p.name;
  
    saveState();
  
    render();
  
  }
  
  function setStartingDealer(playerId) {
  
    state.startingDealerPlayerId = playerId || state.players[0]?.id || null;
  
    saveState();
  
    render();
  
  }
  
   
  
  // ===== Scores =====
  
  function getPlayerScore(playerId, roundId) {
  
    return state.scores?.[playerId]?.[roundId] ?? "";
  
  }
  
  function setPlayerScore(playerId, roundId, value) {
  
    const v = value === "" ? "" : Math.max(0, Number(value));
  
    if (!state.scores[playerId]) state.scores[playerId] = {};
  
    state.scores[playerId][roundId] = v;
  
    saveState();
  
    render();
  
  }
  
   
  
  // ===== Dealer rotation =====
  
  function getDealerPlayerIdForRound(roundId) {
  
    const players = state.players;
  
    if (!players.length) return null;
  
    let startIdx = players.findIndex(p => p.id === state.startingDealerPlayerId);
  
    if (startIdx < 0) startIdx = 0;
  
    const idx = (startIdx + (roundId - 1)) % players.length;
  
    return players[idx].id;
  
  }
  
   
  
  // ===== Rounds =====
  
  function setActiveRound(roundId) {
  
    state.activeRoundId = roundId;
  
    saveState();
  
    render();
  
  }
  
  function gotoPreviousRound() {
  
    const c = state.activeRoundId;
  
    if (c > 1) setActiveRound(c - 1);
  
  }
  
  function gotoNextRound() {
  
    const c = state.activeRoundId;
  
    if (c < 15) setActiveRound(c + 1);
  
  }
  
   
  
  // ===== Finalize =====
  
  function finalizeGame() {
  
    const totals = state.players.map(p => {
  
      const sum = Object.values(state.scores[p.id] || {}).reduce((a, b) => a + (Number(b) || 0), 0);
  
      return { player: p, total: sum };
  
    });
  
    totals.sort((a, b) => a.total - b.total);
  
    const winner = totals[0];
  
    const names = totals.map(t => `${t.player.name}: ${t.total}`).join(" • ");
  
    const el = document.getElementById("winnerInfo");
  
    const message = t("ui.game.winnerSummary", "Least points wins → Winner: {name} ({total}). Totals: {names}")
  
      .replace("{name}", winner.player.name)
  
      .replace("{total}", String(winner.total))
  
      .replace("{names}", names);
  
    el.textContent = message;
  
  }
  
   
  
  // ===== Routing =====
  
  function goto(viewName) {
  
    state.view = viewName;
  
    saveState();
  
    renderViews();
  
  }
  
  function renderViews() {
  
    const start = document.getElementById("startView");
  
    const board = document.getElementById("boardView");
  
    if (state.view === "start") {
  
      start.classList.remove("hidden");
  
      board.classList.add("hidden");
  
    } else {
  
      start.classList.add("hidden");
  
      board.classList.remove("hidden");
  
    }
  
  }
  
   
  
  // ===== Focus preservation =====
  
  function captureFocusedInput() {
  
    const el = document.activeElement;
  
    if (!el || !el.classList) return null;
  
    const base = {
  
      selStart: typeof el.selectionStart === "number" ? el.selectionStart : null,
  
      selEnd: typeof el.selectionEnd === "number" ? el.selectionEnd : null,
  
    };
  
    if (el.classList.contains("score-input")) {
  
      return { kind: "score", playerId: el.dataset.playerId, roundId: el.dataset.roundId, ...base };
  
    }
  
    if (el.classList.contains("player-name")) {
  
      return { kind: "name", playerId: el.dataset.playerId, ...base };
  
    }
  
    return null;
  
  }
  
  function restoreFocus(fi) {
  
    if (!fi) return;
  
    let selector;
  
    if (fi.kind === "score") selector = `input.score-input[data-player-id="${fi.playerId}"][data-round-id="${fi.roundId}"]`;
  
    else if (fi.kind === "name") selector = `input.player-name[data-player-id="${fi.playerId}"]`;
  
    const el = document.querySelector(selector);
  
    if (el) {
  
      el.focus();
  
      if (fi.selStart !== null && fi.selEnd !== null) {
  
        try { el.setSelectionRange(fi.selStart, fi.selEnd); } catch {}
  
      }
  
    }
  
  }
  
   
  
  // ===== Renderers =====
  
  function applyStaticTexts() {
  
    // Header/nav
  
    document.getElementById("appTitle").textContent = t("ui.appTitle");
  
    document.getElementById("langLabel").textContent = t("ui.language");
  
    document.getElementById("rulesBtn").textContent = t("ui.nav.rules");
  
    document.getElementById("gotoStartBtn").textContent = t("ui.nav.startPage");
  
    document.getElementById("gotoBoardBtn").textContent = t("ui.nav.scoreboard");
  
    document.getElementById("newGameBtn").textContent = t("ui.nav.newGame");
  
   
  
    // Rules modal labels
  
    document.getElementById("rulesTitle").textContent = t("ui.rulesModal.title");
  
    document.getElementById("rulesOkBtn").textContent = t("ui.rulesModal.ok");
  
   
  
    // Start view
  
    document.getElementById("setupPlayersTitle").textContent = t("ui.start.setupTitle");
  
    document.getElementById("setupPlayersHelp").textContent = t("ui.start.setupHelp");
  
    document.getElementById("addPlayerBtn").textContent = t("ui.start.addPlayer");
  
    document.getElementById("newPlayerName").placeholder = t("ui.start.newNamePlaceholder");
  
    document.getElementById("startGameBtn").textContent = t("ui.start.startGame");
  
    document.getElementById("startTip").textContent = t("ui.start.tip");
  
   
  
    // Board view
  
    document.getElementById("scoreboardTitle").textContent = t("ui.board.title");
  
    document.getElementById("prevRoundBtn").textContent = t("ui.board.prev");
  
    document.getElementById("nextRoundBtn").textContent = t("ui.board.next");
  
    document.getElementById("footerNote").textContent = t("ui.board.footerNote");
  
  }
  
   
  
  function renderPlayersStartPage() {
  
    const container = document.getElementById("playersList");
  
    container.innerHTML = "";
  
    state.players.forEach((p, idx) => {
  
      const row = document.createElement("div");
  
      row.className = "player-row";
  
   
  
      const radio = document.createElement("input");
  
      radio.type = "radio";
  
      radio.name = "startingDealer";
  
      radio.className = "dealer-radio";
  
      radio.title = t("ui.start.dealerTitle", "Dealer for Round 1");
  
      radio.checked = state.startingDealerPlayerId === p.id || (!state.startingDealerPlayerId && idx === 0);
  
      radio.addEventListener("change", () => setStartingDealer(p.id));
  
   
  
      const input = document.createElement("input");
  
      input.className = "player-name";
  
      input.dataset.playerId = p.id;
  
      input.value = p.name;
  
      input.placeholder = t("ui.start.newNamePlaceholder");
  
      input.addEventListener("input", () => renamePlayer(p.id, input.value));
  
   
  
      const spanCount = document.createElement("span");
  
      spanCount.className = "total-chip";
  
      const total = Object.values(state.scores[p.id] || {}).reduce((a, b) => a + (Number(b) || 0), 0);
  
      spanCount.textContent = `${t("ui.board.totals")}: ${total}`;
  
   
  
      const removeBtn = document.createElement("button");
  
      removeBtn.className = "remove";
  
      removeBtn.textContent = "✖";
  
      removeBtn.title = t("ui.start.removePlayerTitle", "Remove player");
  
      removeBtn.addEventListener("click", () => removePlayer(p.id));
  
   
  
      row.appendChild(radio);
  
      row.appendChild(input);
  
      row.appendChild(spanCount);
  
      row.appendChild(removeBtn);
  
      container.appendChild(row);
  
    });
  
  }
  
   
  
  function renderRoundDescriptionPanel() {
  
    const active = state.rounds.find(r => r.id === state.activeRoundId);
  
    document.getElementById("roundTitle").textContent = getRoundName(active);
  
    document.getElementById("roundPosInfo").textContent = `${t("ui.board.columnRound")} ${active.id} / 15`;
  
    document.getElementById("roundDescription").innerHTML = renderRichText(getRoundDescription(active));
  
   
  
    // Prev/Next bounds
  
    document.getElementById("prevRoundBtn").disabled = state.activeRoundId <= 1;
  
    document.getElementById("nextRoundBtn").disabled = state.activeRoundId >= 15;
  
  }
  
   
  
  function renderScoreboard() {
  
    const table = document.getElementById("scoreTable");
  
    table.innerHTML = "";
  
   
  
    // Header: Round + player names (dealer icon in active round header)
  
    const thead = document.createElement("thead");
  
    const hrow = document.createElement("tr");
  
    const thRound = document.createElement("th"); thRound.textContent = t("ui.board.columnRound");
  
    hrow.appendChild(thRound);
  
   
  
    const activeDealerId = getDealerPlayerIdForRound(state.activeRoundId);
  
    state.players.forEach(p => {
  
      const th = document.createElement("th");
  
      th.innerHTML = p.name + (activeDealerId === p.id
  
        ? ` <span class="dealer-icon" title="${t("ui.board.dealer", "Dealer (active round)")}">♠︎</span>`
  
        : "");
  
      hrow.appendChild(th);
  
    });
  
   
  
    thead.appendChild(hrow);
  
    table.appendChild(thead);
  
   
  
    // Body: 15 rounds
  
    const tbody = document.createElement("tbody");
  
    state.rounds.forEach(r => {
  
      const tr = document.createElement("tr");
  
      if (r.id === state.activeRoundId) tr.classList.add("active-row");
  
   
  
      const tdRound = document.createElement("td");
  
      tdRound.innerHTML = `<strong>${getRoundName(r)}</strong>`;
  
      tr.appendChild(tdRound);
  
   
  
      state.players.forEach(p => {
  
        const td = document.createElement("td");
  
        const input = document.createElement("input");
  
        input.type = "number";
  
        input.min = "0";
  
        input.step = "5";
  
        input.className = "score-input";
  
        input.dataset.playerId = p.id;
  
        input.dataset.roundId = String(r.id);
  
   
  
        const currentVal = getPlayerScore(p.id, r.id);
  
        input.value = currentVal === "" ? "0" : Number(currentVal);
  
   
  
        input.addEventListener("input", () => setPlayerScore(p.id, r.id, input.value));
  
   
  
        td.appendChild(input);
  
        tr.appendChild(td);
  
      });
  
   
  
      tbody.appendChild(tr);
  
    });
  
    table.appendChild(tbody);
  
   
  
    // Footer: totals row under each player
  
    const tfoot = document.createElement("tfoot");
  
    const frow = document.createElement("tr");
  
    const tfLabel = document.createElement("td");
  
    tfLabel.innerHTML = `<strong>${t("ui.board.totals")}</strong>`;
  
    frow.appendChild(tfLabel);
  
   
  
    state.players.forEach(p => {
  
      const total = Object.values(state.scores[p.id] || {}).reduce((a, b) => a + (Number(b) || 0), 0);
  
      const td = document.createElement("td");
  
      td.innerHTML = `<strong>${total}</strong>`;
  
      frow.appendChild(td);
  
    });
  
   
  
    tfoot.appendChild(frow);
  
    table.appendChild(tfoot);
  
  }
  
   
  
  // ===== Rules Modal =====
  
  function openRulesModal() {
  
    const modal = document.getElementById("rulesModal");
  
    const body = document.getElementById("rulesBody");
  
    body.innerHTML = renderRichText(i18n.rules?.content || "");
  
    modal.setAttribute("aria-hidden", "false");
  
    // focus trap entry
  
    document.getElementById("rulesOkBtn").focus();
  
  }
  
  function closeRulesModal() {
  
    const modal = document.getElementById("rulesModal");
  
    modal.setAttribute("aria-hidden", "true");
  
    // return focus to Rules button
  
    document.getElementById("rulesBtn").focus();
  
  }
  
   
  
  // ===== App render root =====
  
  function render() {
  
    const focusInfo = captureFocusedInput();
  
   
  
    renderViews();
  
    renderPlayersStartPage();
  
    renderRoundDescriptionPanel();
  
    renderScoreboard();
  
   
  
    restoreFocus(focusInfo);
  
  }
  
   
  
  // ===== DOMContentLoaded =====
  
  document.addEventListener("DOMContentLoaded", () => {
  
    loadState();
  
   
  
    // Initial render
  
    render();
  
   
  
    // Language selector
  
    const langSel = document.getElementById("languageSelect");
  
    langSel.value = state.lang || "sv";
  
    langSel.addEventListener("change", (e) => loadLanguage(e.target.value));
  
    loadLanguage(langSel.value); // instant (built-in only)
  
   
  
    // Header nav
  
    document.getElementById("rulesBtn").addEventListener("click", openRulesModal);
  
    document.getElementById("rulesCloseBtn").addEventListener("click", closeRulesModal);
  
    document.getElementById("rulesOkBtn").addEventListener("click", closeRulesModal);
  
    document.getElementById("rulesModal").addEventListener("click", (e) => {
  
      if (e.target?.dataset?.close) closeRulesModal();
  
    });
  
    // ESC to close modal
  
    document.addEventListener("keydown", (e) => {
  
      const visible = document.getElementById("rulesModal").getAttribute("aria-hidden") === "false";
  
      if (visible && e.key === "Escape") closeRulesModal();
  
    });
  
   
  
    document.getElementById("gotoStartBtn").addEventListener("click", () => goto("start"));
  
    document.getElementById("gotoBoardBtn").addEventListener("click", () => goto("board"));
  
   
  
    // New game
  
    document.getElementById("newGameBtn").addEventListener("click", () => {
  
      if (!confirm(t("ui.game.newGameConfirm", "Start a new game? This will clear current progress."))) return;
  
      state = defaultState();
  
      saveState();
  
      render();
  
    });
  
   
  
    // Start page actions
  
    document.getElementById("addPlayerBtn").addEventListener("click", () => {
  
      const name = document.getElementById("newPlayerName").value.trim();
  
      if (!name) return;
  
      addPlayer(name);
  
      document.getElementById("newPlayerName").value = "";
  
    });
  
   
  
    document.getElementById("startGameBtn").addEventListener("click", () => goto("board"));
  
   
  
    // Board actions
  
    document.getElementById("prevRoundBtn").addEventListener("click", gotoPreviousRound);
  
    document.getElementById("nextRoundBtn").addEventListener("click", gotoNextRound);
  
   
  
    document.getElementById("finalizeBtn").addEventListener("click", finalizeGame);
  
  });