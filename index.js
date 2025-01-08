document.addEventListener("DOMContentLoaded", () => {
  console.log('Versie 1')
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  let hasSeenTelescopeInfo =
    localStorage.getItem("hasSeenTelescopeInfo") === "true";

  const botResponses = {
    welcome: [
      "🎉 Welcome, avonturier! My name is <strong>Jacob</strong>. Mijn Nederlands is een beetje 🛠️ <em>rusty</em>, sorry daarvoor. Maar er zijn <strong>important</strong> things 🗝️. Ik heb een 💎 treasure chest gevonden. De letters <strong>FV</strong> en <strong>PITTEM</strong> waren leesbaar ✍️. De kist is <strong>locked</strong> 🔒, met een heel ingenieus slot. Behalve <strong>de kist</strong> heb ik een paar andere dingen gevonden die kunnen helpen: <ul> <li>🗺️een oude kaart</li> <li>📜 een blad met Traditioneel Chinese tekens</li>  <li>🕵️‍♂️een pagina met geheimschrift</li>  <li>🔭een telescoop</li>  <li>💰wat munten</li></ul>. <br><br>Welke van deze dingen wil je 🔍 <em>researchen</em>?",
    
      "🎉 Welkom, ontdekkingsreiziger! My name is <strong>Jacob</strong>. Mijn Nederlands is een tikkeltje 🛠️ <em>roestig</em>, mijn excuses daarvoor. Maar er zijn <strong>belangrijke</strong> zaken om te bespreken 📢. Ik heb een 💎 treasure chest ontdekt! De inscripties <strong>FV</strong> en <strong>PITTEM</strong> waren duidelijk zichtbaar ✍️. De kist is stevig afgesloten met een bijzonder <strong>ingenieus</strong> slot 🔒. Naast <strong>de kist</strong> vond ik enkele interessante artefacts die mogelijk van nut kunnen zijn: <ul> <li>🗺️een oude landkaart</li>  <li>📜een vel met Traditioneel Chinese karakters</li>  <li>🕵️‍♂️een pagina vol geheimschrift</li>  <li>🔭een telescope</li>  <li>💰een handfull munten</li></ul>.<br><br> Welke van deze vondsten zou je verder willen 🔍 <em>onderzoeken</em>?",
    
      "🎉 Greetings, reiziger! My name is <strong>Jacob</strong>. Mijn Nederlands is misschien wat 🕸️ <em>dusty</em>, excuses daarvoor. Er is echter iets <strong>opmerkelijks</strong> aan het licht gekomen 💡. Ik heb een 💎 treasure chest ontdekt, met de inscripties <strong>FV</strong> en <strong>PITTEM</strong> duidelijk zichtbaar ✍️. <strong>De kist</strong> is verzegeld met een complex lock 🔒. Daarnaast zijn er enkele fascinerende vondsten die mogelijk van waarde zijn bij het ontsluieren van dit mysterie 🕵️‍♂️: <ul> <li>🗺️een oude kaart</li>  <li>📜een document met Traditioneel Chinese tekens</li>  <li>🕵️‍♂️een blad met geheimschrift</li>  <li>🔭een telescoop</li>  <li>💰wat munten</li></ul>. <br><br>Welke van deze vondsten wil je 🔍 <em>bestuderen</em>?"
    ],

    error: [
      "Hmm... Het is <strong>Nederlands</strong>, maar mijn memory laat me in de steek. Het voelt alsof de words tot me fluisteren vanuit een ver verleden, maar hun boodschap blijft 🌫️ schimmig. Ik denk dat ik al te lang in the states woon... Zou u misschien de <strong>kern</strong> voor me kunnen uitleggen? Mijn <strong>taalgevoel</strong> is niet meer wat het ooit was. 🤔  Ik begrijp niet wat je bedoelt... Vraag me naar één van de artefacten in de plaats. Veel interessanter.",
    
      "Ah, hmm... deze tekst... interesting, maar... het is lang geleden dat ik <strong>Nederlands</strong> gesproken of gelezen heb. Het lijkt alsof ik de words herken, maar de <strong>betekenis</strong>... die ontglipt me. Ik woon al een hele poos in the states... Misschien kunt u het voor mij wat verduidelijken? Mijn knowledge van de taal is enigszins... 🛠️ <em>roestig</em>, zeg maar.  Ik begrijp niet wat je bedoelt... Vraag me naar één van de artefacten in de plaats. Veel interessanter.",
    
      "Oh, dit... ja, ik herken de letters en de sound, maar het is alsof de <strong>taal</strong> zich aan me onttrekt. Het moet lang geleden zijn dat ik het <strong>Nederlands</strong> echt gebruikt heb. Ik spreek al jaren enkel Engels in the states... Kunt u me misschien helpen dit stukje te decoderen? Mijn understanding van de taal heeft betere tijden gekend. 🕰️ Ik begrijp niet wat je bedoelt... Vraag me naar één van de artefacten in de plaats. Veel interessanter."
    ]
  };

  // Lijst met keywords en reacties
  const keywords = {
    telescoop: () =>  [
      "Ah, de telscoop, een prachtig stuk van <strong>Verbiest</strong> zelf. Heel 🌟 <em>beautiful</em> 🌟 allemaal, maar op de zijkant is er iets speciaals... Ik ontdekte sterrenbeelden op de zijkant. Ik keek eens goed, en het bleek de <strong>Grote Beer</strong> te zijn. Maar 1 ster bleek wel zeer speciaal aangeduid... Misschien moeten jullie de <strong>naam</strong> en het <strong>kenmerk</strong> van die ster ontdekken... Oh, en ik hou van een vleugje 😄 <em>fun</em>, dus ik heb een kopie verstopt in een van de voorste vakjes van een persoon...",
    
      "Ah, de <strong>telescope</strong>, zo'n prachtig ontwerp van <strong>Verbiest</strong> zelf. Echt 🌟 <em>beautiful</em>, moet ik zeggen, maar er is iets unieks aan de zijkant... Ik zag sterrenbeelden op de zijkant. Toen ik beter keek, zag ik dat het de <strong>Grote Beer</strong> was. Maar één ster was wel heel speciaal gemarkeerd... Misschien kunnen jullie de <strong>name</strong> en het <strong>kenmerk</strong> van die ster vinden... Oh, en ik ben dol op een beetje 😄 <em>fun</em>, dus ik heb een kopie verstopt in een van de voorste <strong>bakskes</strong> van iemand...",
    
      "Ah, wat een <strong>telescope</strong>, een meesterlijk werkstuk van <strong>Verbiest</strong> zelf. Truly 🌟 <em>beautiful</em>, maar op de zijkant zit iets bijzonders... Ik ontdekte sterrenbeelden langs de rand. Toen ik goed keek, herkende ik de <strong>Grote Beer</strong>. Maar één <strong>star</strong> was opvallend speciaal gemarkeerd... Misschien kunnen jullie de <strong>naam</strong> en het <strong>detail</strong> van die ster achterhalen... Oh, en ik houd van een touch of 😄 <em>fun</em>, dus ik heb een kopie verborgen in een van de voorste <strong>trays</strong> van een persoon..."
    ]
    

    ,

    schat: () => [
      "Ah, de treasure! 🪙 Dat is uiteindelijk waar het allemaal om draait, hé? . Maar... ik moet bekennen dat ik de schat veilig heb opgeborgen. Je weet maar nooit wie er nog allemaal op de loer ligt. 😏Ze ligt nu bij de patroonheilige van het dorp Aalten. Waarom daar? Tja, laten we zeggen dat heilige plekken soms de beste verstopplaatsen zijn. 😉 Maar jullie moeten de code van de kist vinden, anders blijft het geheim erin voor altijd...Komaan, avonturiers, tijd om die hersenen aan het werk te zetten! 💡 Ik voel dat jullie dichtbij zijn.  Succes! ✨",

      "Ah, jullie zijn echt vastberaden om de treasure te vinden, hé? 🪙  Goed zo, dat is de spirit van echte avonturiers! Ik heb de schat veilig opgeborgen. Ze ligt bij de patroonheilige van het dorp Aalten. Een heilige plek voor een heilige vondst, nietwaar? 😉🙏Maar denk eraan, die kist is  locked met dat slimme cijfermechanisme. Zonder de juiste code blijft ze voor altijd gesloten. 🗝️ Tijd om alle puzzelstukken die jullie verzameld hebben bij elkaar te leggen! Wie weet is de sleutel dichterbij dan je denkt... Succes, partners!  😏",

      "Ah, de treasure! 🪙 Dat is het soort vastberadenheid waar ik van hou! De schat ligt veilig opgeborgen… bij de patroonheilige van het dorp Aalten. Waarom daar, vraag je je af? Ach, laten we zeggen dat een sacred place soms de beste schuilplaats is voor iets zo kostbaars. 😉 Als je de schat gevonden hebt, focus je dan op de code om de kist open te krijgen. Alles wat jullie nodig hebben ligt voor jullie neus: de telescoop, de Chinese tekens, de munten... Elk clue brengt jullie een stap dichter bij de waarheid. Zet 'm op, avonturiers! Dit is waar geschiedenis en mysterie samenkomen! 😏✨",
    ],

    "chinese tekens": () => [
      " Ah, de Chinese characters! 🀄 Een prachtige vondst, maar ik moet toegeven... mijn Chinees is roestiger dan mijn oude zakmes. 🤔 Gelukkig had ik een ingeving en heb ik een kopie van het blad gemaakt, zodat ik niet telkens met dat fragiele origineel moest rondzeulen. 🗂️ Het lijkt erop dat ik die kopie heb opgeborgen in een lade... de lade van het dichtstbijzijnde desk.Kijk daar eens, avonturiers. Misschien brengt dat jullie dichter bij de oplossing!  Succes! 😉",


      "Ah, jullie willen meer weten over de Chinese characters! 🀄 Goed zo, een scherp oog voor detail is cruciaal in dit soort adventures! Een kopie van die tekens ligt in de lade van het dichtstbijzijnde desk. Kijk daar eens, en haal het tevoorschijn. Misschien onthullen die karakters een aanwijzing die ons helpt de puzzle op te lossen! Weet je, die tekens deden me denken aan een avontuur dat ik had in de Chinese bergen... Maar goed, dat is een verhaal voor later. Eerst: zoek die lade en laat me weten wat je ontdekt! Succes, avonturiers! 😉",

      "Ah, jullie zitten vast op het juiste spoor, hé? 🀄 De Chinese characters zijn fascinerend, hé? En terecht! De kopie van dat blad ligt in de lade van het dichtstbijzijnde desk. Misschien is die lade een beetje verstopt, maar als echte avonturiers vinden jullie dat wel. 👀🗄️ Hebben jullie het al gevonden? Wie weet onthult het een geheim dat eeuwenlang verborgen bleef... spannend, hé? 😏 Ga ervoor, partners!",
    ],

    "geheim schrift": () => [
      "Ah, het secret writing! 🧐 Dat is altijd spannend! Maar nu moet ik iets opbiechten... Ik ben die pagina met het geheimschrift even kwijtgeraakt. 🙈 Ik denk dat het ergens in één van de cabinets achteraan ligt. Misschien moeten jullie daar eens zoeken, avonturiers. Het kan verstopt zitten tussen oude papieren of in een verborgen hoek. Een echte schattenjager laat zich niet stoppen door een beetje rommel, toch? 😉 Succes, en vergeet niet: soms is het decoderen van een mystery net zo spannend als de schat zelf! 🗝️",

      "Ah, het secret writing! Dat stuk is me altijd een raadsel gebleven... een échte puzzel. Maar eh, eerlijk gezegd... ben ik dat blad een beetje kwijtgeraakt. 🙈 Oeps!Ik herinner me vaag dat ik het ergens achteraan heb opgeborgen, in één van de cabinets. Misschien ligt het tussen een stapel oude papieren, verstopt als een echte schat op zichzelf. 🗂️👀 Jullie zullen even moeten graven, net zoals ik in de ruïnes van een verloren tempel in Peru moest doen... Ga ervoor, avonturiers, en kijk goed! Wat verborgen is, wil vaak gevonden worden. 😉 Succes!",

      "Ah, het secret writing is intregerend, hé? Goed zo, dat betekent dat jullie de ware geest van een avonturier hebben! 🗺️ Dat blad ben ik even kwijtgeraakt... Het ligt vast ergens achteraan, in een van de cabinets. Jullie zullen daar even moeten zoeken. Het is misschien verstopt tussen oude papieren, wat stoffige boeken of andere vergeten schatten. 🗄️📜 Als ik jullie een hint mag geven... kijk goed, wees geduldig, en gebruik je curiosity als gids. Dat geheimschrift wacht erop om ontcijferd te worden. 😉 Succes, partners! En vergeet niet: het mooiste aan een schat is niet altijd de vondst, maar de adventure ernaartoe. 😏✨",
    ],
    
    "landkaart": () => [
      "Ah, de map! 🗺️ Nu raken we aan de kern van elk goed avontuur, hé? Maar deze kaart... tja, ze is niet meer wat ze ooit was. Het middelste deel is bijna onleesbaar, aangetast door de tand des tijds. 🕰️ Gelukkig zijn er nog duidelijke stukken te zien, en één ding sprong me meteen in het oog: er staan coördinaten op. ✨ Het zijn deze: 53.0067206, 7.1920883. Misschien moeten jullie die eens in Google Maps intypen? Wie weet brengt het jullie naar een locatie die iets onthult over de schat... Of misschien ligt er een andere aanwijzing verborgen? 🤔 Komaan, avonturiers, tijd om een reis door de tijd én ruimte te maken! 🌍 ",
      "Ah, de treasure map! 🗺️ Dat is waar elk goed avontuur begint! Maar helaas... deze kaart heeft geleden onder de tand des tijds. Het midden is helemaal onleesbaar geworden. Een mysterie op zich, zeg ik! 🤔 Gelukkig is niet alles verloren. Er staan coördinaten op die nog duidelijk te lezen zijn: 53.0067206, 7.1920883. Dat lijkt me een belangrijk aanknopingspunt. Misschien moeten jullie die eens invoeren in Google Maps. Wie weet brengt het jullie dichter bij de schat of onthult het een cruciale clue! 🌍✨ Weet je, deze kaart doet me denken aan mijn avontuur in de woestijn van Jordanië... maar dat is een verhaal voor een andere keer. Ga ervoor, partners! Elke stap brengt ons dichter bij de schat. Succes! 😉",

      "Ah, de map! 🗺️ Een goede landkaart is als een kompas naar avontuur. Maar deze kaart... ze heeft de tand des tijds niet helemaal doorstaan. Het middelste deel is jammer genoeg onleesbaar geworden. Een beetje zoals die keer dat ik door een zandstorm in Egypte moest navigeren... Maar ik dwaal af. 😏 Er is echter één belangrijk detail dat nog wél zichtbaar is: coördinaten. De cijfers zijn duidelijk te lezen: 53.0067206, 7.1920883. Ik zou zeggen, typ die eens in Google Maps en kijk waar dat je naartoe brengt. Wie weet ligt daar de volgende aanwijzing of zelfs de schat zelf! 🌍✨ Weet je, landkaarten vertellen meer dan wegen; ze fluisteren verhalen van het verleden. Ga eropuit, avonturiers, en laat deze kaart je gids zijn!"],

    "munten":()=>[
      "Ah, de coins! 🪙 Fascinerend spul, echt waar. Ze lijken afkomstig uit 🌍 Afrika, specifiek uit Mauritanië. Als ik het goed heb, is het precies 331, 30 Mauritaanse Ouguiya. Weet je wat? Misschien moet je dat bedrag eens omzetten naar euros... 💶 wie weet zit daar een key verborgen dat van pas komt bij het cijferslot. 😊 🎩",


      "Ah, de money! 💰 Fascinerend spul, echt waar. Ze lijken afkomstig uit 🌍 Afrika, specifiek uit Mauritanië. Als ik het goed heb, is het 331, 30 Mauritaanse Ouguiya. Weet je wat? Misschien moet je dat bedrag eens omzetten naar euro’s... wie weet zit daar een belangrijk clue verborgen dat van pas komt bij het cijferslot. 😉 🎩",
      
      "Ah, de currency! 💵 Fascinerend spul, echt waar. Ze lijken afkomstig uit 🌍 Afrika, specifiek uit Mauritanië. Als ik het goed heb, is het bedrag precies 331, 30 Mauritaanse Ouguiya. Weet je wat? Misschien moet je dat bedrag eens omzetten naar euro's... wie weet zit daar een belangrijk code verborgen dat van pas komt bij het cijferslot. 😄 🎩"]
,
      "hallo":() => [
        "Hello! Aangename kennismaking. Over welk voorwerp wil je iets meer weten?",
        "Howdi partner! Welk voorwerp wil je bestuderen?",
        "Aangename kennismaking! Wat wil je onderzoeken?",
        "Hi! Nice to meet you! Wat wil je researchen?"
      ]
    ,
    "kaka":() =>[
      "Etje! Vies!",
      "💩💩💩",
      "🤢🤮",
      "Ooooh! Dat ga ik zeggen aan de juf! 💩"
    ],

    "juf sien": () => [
      'Ah... Juf Sien... Een oude vriendin van me.<br><img src="jufsien.png">'
    ]

  };


  const keywordRedirects = {
    // Landkaart gerelateerd
    schatkaart: "landkaart",
    kaart: "landkaart",
    map: "landkaart",
    treasuremap: "landkaart",
    avontuurkaart: "landkaart",
    navigatie: "landkaart",
    routekaart: "landkaart",
    kompas: "landkaart",
  
    // Telescoop gerelateerd
    telescoopje: "telescoop",
    sterrenkijker: "telescoop",
    sterrenkijken: "telescoop",
    verrekijker: "telescoop",

    // Munten gerelateerd
    geld: "munten",
    muntjes: "munten",
    centen: "munten",
    goudenmunten: "munten",
    zilvermunten: "munten",
    schatgeld: "munten",
    muntverzameling: "munten", 
  
    // Chinese tekens gerelateerd
    chinees: "chinese tekens",
    tekens: "chinese tekens",
    karakters: "chinese tekens",
    symbolen: "chinese tekens",
    chineseletters: "chinese tekens",

  
    // Geheimschrift gerelateerd
    codetaal: "geheim schrift",
    geheimecode: "geheim schrift",
    geheimtaal: "geheim schrift",
    geheimetaal: "geheim schrift",
    geheimschrift:"geheim schrift",
  
    // Schat gerelateerd
    treasure: "schat",
    kist: "schat",
    schatkist: "schat",
 
  
    // Algemene redirects
    avontuur: "landkaart",
    ontdekking: "landkaart",
    aanwijzing: "landkaart",
    puzzel: "geheim schrift",
    mysterie: "geheim schrift",
    oplossing: "geheim schrift",
    kennismaking:"hallo",
    welkom:"hallo",
    pipi:"kaka",
    drol:"kaka",
    sien: "jufsien",
    verschuere: "jufsien"
  };
  
  function appendMessage(text, isBot = false, name = "Jacob", time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })) {
    const message = document.createElement("div");
    message.classList.add("message", isBot ? "bot-message" : "user-message");
  
    const profilePic = document.createElement("img");
    profilePic.src = isBot ? "bot-profile.png" : "user-profile.png";
    profilePic.alt = "Profielfoto";
  
    const messageContent = document.createElement("div");
    messageContent.classList.add("message-content");
  
    const nameElement = document.createElement("div");
    nameElement.classList.add("name");
    nameElement.textContent = name;
  
    const textElement = document.createElement("div");
    textElement.classList.add("text");
    textElement.innerHTML = text;
  
    const timeElement = document.createElement("div");
    timeElement.classList.add("time");
    timeElement.textContent = time;
  
    messageContent.appendChild(nameElement);
    messageContent.appendChild(textElement);
    messageContent.appendChild(timeElement);
  
    message.appendChild(profilePic);
    message.appendChild(messageContent);
    chatBox.appendChild(message);
  
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll naar het laatste bericht
  }
  

  function showTypingIndicator() {
    // Verwijder bestaande typ-indicator (indien aanwezig)
    const existingIndicator = document.querySelector(".typing-indicator");
    if (existingIndicator) existingIndicator.remove();

    // Voeg een nieuwe typ-indicator toe
    const typingIndicator = document.createElement("div");
    typingIndicator.classList.add("message", "bot-message", "typing-indicator");
    typingIndicator.innerHTML = "Aan het typen<span class='dots'></span>";
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll naar het laatste bericht
  }

  function handleInput(input) {
    if (!input.trim()) return;
    appendMessage(input, false,"Mezelf");

    // Laat de typ-indicator zien
    showTypingIndicator();

    // Tijdelijke variabele voor het antwoord
    const lowerInput = input.toLowerCase();
    let response = botResponses.error[Math.floor(Math.random() * botResponses.error.length)];

    const combinedKeywords = { ...keywords, ...Object.fromEntries(
      Object.entries(keywordRedirects).map(([redirect, target]) => [redirect, keywords[target]])
    )};
    console.log(combinedKeywords)

    for (let keyword in combinedKeywords) {
      console.log(keyword)
      if (lowerInput.includes(keyword)) {
        const responses = combinedKeywords[keyword]();
        console.log(responses)
        response = responses[Math.floor(Math.random() * responses.length)];
        break;
      }
    }

    // Bereken de timeout op basis van het aantal letters
    const typingSpeed = 100; // Aantal letters per seconde
    const responseTime = Math.max(1000, (response.length / typingSpeed) * 1000); // Minimaal 1 seconde

    // Verberg de typ-indicator na de berekende tijd en toon het antwoord
    setTimeout(() => {
      const typingIndicator = document.querySelector(".typing-indicator");
      if (typingIndicator) typingIndicator.remove(); // Verwijder typ-indicator
      appendMessage(response, true); // Toon het antwoord
    }, responseTime);
  }

  sendBtn.addEventListener("click", () => {
    handleInput(userInput.value);
    userInput.value = "";
  });

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleInput(userInput.value);
      userInput.value = "";
    }
  });

  // Welkomsbericht weergeven en status resetten
  //handleInput('welkom')
  const responses = botResponses.welcome;
  response = responses[Math.floor(Math.random() * responses.length)];
  appendMessage(response, true);
  //appendMessage(botResponses.welcome, true);

  localStorage.setItem("hasSeenTelescopeInfo", "false");
});
