window.BUILTIN_I18N_EN = {
  ui: {
    appTitle: "🎲 15-Round Game",
    language: "Language",
    nav: { startPage: "Start Page", scoreboard: "Scoreboard", newGame: "New Game", rules: "Rules" },
    start: {
      setupTitle: "Setup Players",
      setupHelp: "Add up to 4 players. You can rename them anytime.",
      addPlayer: "Add Player",
      newNamePlaceholder: "Add player name...",
      startGame: "Start Game ▶",
      tip: "Tip: “Start Game” takes you to the scoreboard.",
      dealerTitle: "Dealer for Round 1",
      removePlayerTitle: "Remove player"
    },
    board: {
      title: "Scoreboard",
      prev: "◀ Previous",
      next: "Next ▶",
      finalize: "Finalize Game",
      totals: "Totals",
      footerNote: "Auto-saves locally.",
      columnRound: "Round",
      dealer: "Dealer (active round)"
    },
    rulesModal: {
      title: "Rules",
      ok: "OK"
    },
    game: {
      newGameConfirm: "Start a new game? This will clear current progress.",
      winnerSummary: "Least points wins → Winner: {name} ({total}). Totals: {names}"
    }
  },
  rules: {
    content:
      "**Goal**: Finish the game with the **fewest total points** after 15 rounds.\n\n" +
      "**Setup**:\n" +
      "• Use two decks of cards.\n" +
      "• Up to *four players* can join.\n" +
      "• Choose the **dealer for Round 1** (rotates every round).\n\n" +
      "**General rules**:\n" +
      "• Each player starts with 11 cards.\n" +
      "• The player after the dealer starts.\n" +
      "• Each player may take up to 3 purchases in each round.\n" +
      "• Card 2 is a joker and can represent any card.\n" +
      "• A maximum of 50% twos may appear in a combination.\n" +
      "• The lowest card is 3 and the highest is Ace.\n" +
      "• All runs must be in the same suit, e.g. only hearts.\n" +
      "• The last card must be discarded unless otherwise specified in the current round.\n" +
      "• The round ends when a player has no cards left.\n\n" +
      "**Rounds**:\n" +
      "• The active player starts by drawing one card from the draw pile.\n" +
      "• If possible and voluntary, they lay down cards in front of them.\n" +
      "• They finish the turn by discarding one card to the discard pile.\n" +
      "• The next player does the same and the sequence continues until the round ends.\n\n" +
      "**Laying down cards**:\n" +
      "• Each round has a condition that is a minimum requirement to lay down cards.\n" +
      "• Once the conditions are met, other cards may also be laid down in the same round.\n" +
      "• It is possible to extend already laid-down combinations such as runs and sets. *(It is not possible to extend a genuine pair)*\n\n" +
      "**Purchases**:\n" +
      "• When a player discards a card and before the next player draws, there is an opportunity to buy the discarded card.\n" +
      "• If several players want to buy the discarded card, the player closest in turn order after the previous player has priority.\n" +
      "• When buying, the buyer picks up the discarded card and the top card from the draw pile. After that, that player’s turn ends and the next player continues.\n" +
      "• If player one discards a card and player three buys it, player two skips over. The next player is the one after player three.\n\n" +
      "**Scoring**:\n" +
      "• Cards **3-9** are worth **5** points each.\n" +
      "• Cards **10-Ace** are worth **10** points each.\n" +
      "• Card **2** is worth **25** points each.\n\n" +
      "**Winning**:\n" +
      "• After **15** rounds, click *Finalize Game* to see the final results.\n" +
      "• **Lowest total score wins.**"
  },
  rounds: {
    "1": { name: "Round 1", description: "Two sets" },
    "2": { name: "Round 2", description: "One set and a four-card straight" },
    "3": { name: "Round 3", description: "Two four-of-a-kinds" },
    "4": { name: "Round 4", description: "Two four-card straights" },
    "5": { name: "Round 5", description: "Two sets and a four-card straight" },
    "6": { name: "Round 6", description: "One four-of-a-kind and a five-card straight" },
    "7": { name: "Round 7", description: "Two fives" },
    "8": { name: "Round 8", description: "Two five-card straights" },
    "9": { name: "Round 9", description: "Four sets" },
    "10": { name: "Round 10", description: "Three four-card straights" },
    "11": { name: "Round 11", description: "Three four-of-a-kinds" },
    "12": { name: "Round 12", description: "Five three-card straights" },
    "13": { name: "Round 13", description: "Five sets" },
    "14": { name: "Round 14", description: "One five-of-a-kind\nOne five-card straight\nOne genuine pair" },
    "15": { name: "Round 15", description: "Two sets\nThe rest in sequence\n**The last card may not be discarded**\n**No purchases**" }
  }
};
