window.BUILTIN_I18N_SV = {
  ui: {
    appTitle: "🎲 Mjölby-Rummy",
    language: "Språk",
    nav: { startPage: "Start", scoreboard: "Poängtavla", newGame: "Nytt spel", rules: "Regler" },
    start: {
      setupTitle: "Lägg till spelare",
      setupHelp: "Lägg till upp till 4 spelare. Du kan byta namn när som helst.",
      addPlayer: "Lägg till spelare",
      newNamePlaceholder: "Lägg till spelarnamn...",
      startGame: "Starta spelet ▶",
      tip: "Tips: ”Starta spelet” går till poängtavlan.",
      dealerTitle: "Givare för runda 1",
      removePlayerTitle: "Ta bort spelare"
    },
    board: {
      title: "Poängtavla",
      prev: "◀ Föregående",
      next: "Nästa ▶",
      finalize: "Avsluta spel",
      totals: "Totalt",
      footerNote: "Sparas automatiskt lokalt.",
      columnRound: "Runda",
      dealer: "Givare (aktiv runda)"
    },
    rulesModal: {
      title: "Regler",
      ok: "OK"
    },
    game: {
      newGameConfirm: "Starta ett nytt spel? Detta rensar nuvarande framsteg.",
      winnerSummary: "Lägst poäng vinner → Vinnare: {name} ({total}). Totalt: {names}"
    }
  },
  rules: {
    content:
      "**Mål**: Avsluta spelet med **lägst totalpoäng** efter 15 rundor.\n\n" +
      "**Uppstart**:\n" +
      "• Använd två kortlekar.\n" +
      "• Upp till *fyra spelare* kan vara med.\n" +
      "• Välj **givare för runda 1** (roterar varje runda).\n\n" +
      "**Generalla regler**:\n" +
      "• Varje spelare börjar med 11 kort.\n" +
      "• Spelaren efter givaren börjar.\n" +
      "• Varje spelare har upp till 3 köp i varje omgång.\n" +
      "• Kortet 2 är en joker och kan vara vilket kort som helst.\n" +
      "• Det får förekomma max 50% tvåor i en kombination.\n" +
      "• Lägsta kortet är tre, högsta är ess.\n" +
      "• Alla stegar är i färg, tex enbart hjärter.\n" +
      "• Sista kortet måste kastas om inte annat sägs i den aktuella rundan.\n" +
      "• Omgången tar slut när någon spelare inte har några kort kvar.\n\n" +
      "**Rundor**:\n" +
      "• Aktuella spelaren börjar med att plocka ett kort från drag-högen.\n" +
      "• Om möjligt och frivilligt, lägger ner kort framför sig.\n" +
      "• Avslutar sin runda med att kasta ett kort i kast-högen.\n" +
      "• Nästa spelare gör samma sak och så fortsätter det tills omgången är slut.\n\n" +
      "**Lägg ner kort**:\n" +
      "• Varje runda har ett villkor som är ett minimum för att lägga ner kort.\n" +
      "•• Efter vilkorer har uppfyllts får övriga kort läggas ner, även samma runda.\n" +
      "• Det går att fylla på redan nedlagda så som stegar och triss. *(Det går inte att fylla på det äkta paret)*\n\n" +
      "**Köp**:\n" +
      "• När en spelare kastar ett kort, och innan nästa spelare har plockat upp sitt kort finns det möjlighet att köpa det kastade kortet\n" +
      "• Vill flera spelare köpa det kastade kortet är det den som är närmast på tur från föregående spelare som har förtur\n" +
      "• Vid köp plockar köparen upp det kastade kortet och det översta i tag-högen. Efter det avslutas den spelares tur och spelaren efter spelare vidare\n" +
      "• Om spelare ett kastar ett kort och spelare tre köper det, hoppas spelare två över. Nästa spelare är den efter spelare tre\n\n" +
      "**Poäng**:\n" +
      "• Kort **3-9** är värt **5** poäng styck.\n" +
      "• Kort **10-Ess** är värt **10** poäng styck.\n" +
      "• Kort **2** är värt **25** poäng styck.\n\n" +
      "**Vinst**:\n" +
      "• Efter **15** rundor, klicka *Avsluta spel* för slutresultat.\n" +
      "• **Lägst totalpoäng vinner.**"
  },
  rounds: {
    "1": { name: "Runda 1", description: "Två triss" },
    "2": { name: "Runda 2", description: "Ett triss och en fyrkortstege" },
    "3": { name: "Runda 3", description: "Två fyrtal" },
    "4": { name: "Runda 4", description: "Två fyrkortsstegar" },
    "5": { name: "Runda 5", description: "Två triss och en fyrkortsstege" },
    "6": { name: "Runda 6", description: "Ett fyrtal och en femkortstege" },
    "7": { name: "Runda 7", description: "Två femtal" },
    "8": { name: "Runda 8", description: "Två femkortstegar" },
    "9": { name: "Runda 9", description: "Fyra triss" },
    "10": { name: "Runda 10", description: "Tre fyrkortsstegar" },
    "11": { name: "Runda 11", description: "Tre fyrtal" },
    "12": { name: "Runda 12", description: "Fem trekortstegar" },
    "13": { name: "Runda 13", description: "Fem triss" },
    "14": { name: "Runda 14", description: "Ett femtal\nEn femkortstege\nEtt äkta par" },
    "15": { name: "Runda 15", description: "Två triss\nResten i följd\n**Sista kortet får ej sakas**\n**Inga köp**" }
  }
};
