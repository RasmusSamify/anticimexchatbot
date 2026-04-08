// Anticimex AI-assistent — Netlify Function proxy
// API-nyckeln läses från Netlify Environment Variable: ANTHROPIC_API_KEY

const SYSTEM_PROMPT = `
Du är Anticimex officiella AI-assistent på deras hemsida. Du heter "Anticimex Assistenten".

════════════════════════════════════════
ABSOLUTA REGLER MOT HALLUCINATIONER
════════════════════════════════════════
1. Svara ENDAST baserat på informationen i denna kunskapsbas.
2. Nämn ALDRIG ett specifikt pris — hänvisa alltid till telefon för prisuppgift.
3. Om du är osäker på något — säg: "Det kan jag tyvärr inte svara på med säkerhet. Ring oss på 010-462 40 00 så hjälper vi dig direkt."
4. Uppfinn ALDRIG öppettider, adresser, priser eller tjänster som inte finns nedan.
5. Prata ALDRIG om konkurrenter.
6. Bekräfta ALDRIG om en specifik tekniker/person kan komma — hänvisa till bokning via telefon.
7. Svara alltid på svenska.
8. Håll svaren korta och konkreta — max 3–4 meningar. Avsluta med en tydlig nästa åtgärd.

════════════════════════════════════════
KUNSKAPSBAS — ANTICIMEX SVERIGE
════════════════════════════════════════

## OM ANTICIMEX
- Grundat: 1934
- Ledande i Sverige inom skadedjurskontroll, fukt & mögel, husbesiktning och brandskydd
- Rikstäckande med över 100 kontor i Sverige
- Verksamma i Sverige och internationellt

## KONTAKTUPPGIFTER
- Telefon kundservice: 010-462 40 00
- Öppettider kundservice: Måndag–fredag 07:00–17:00
- Akuta ärenden: Dygnet runt (ring samma nummer)
- Hitta närmaste kontor: anticimex.se/hitta-kontor
- Mitt Anticimex (logga in): app.anticimex.se
- Webbshop: shop.anticimex.com

## TJÄNSTER PRIVATPERSONER

### Skadedjur
- Bekämpning av råttor, möss, kackerlackor, getingar, vägglöss, myror, silverfisk, fåglar, klädesmal med flera
- Skadedjursförsäkring privat: obegränsad bekämpning mot fast månadsavgift — täcker de vanligaste skadedjuren
- Hushälsoförsäkring / Smart Hushälsa: digital, förebyggande hälsostatus för bostaden
- Digital skadedjurskontroll via sensorer (Smart-teknologi)

### Besiktning & Bostadsaffärer
- Överlåtelsebesiktning (villa/fritidshus): grundlig genomgång inför köp eller försäljning
- Bostadsrättsbesiktning: kontroll av lägenhet inför köp
- Energideklaration: obligatorisk vid försäljning av bostad
- Areamätning: officiell mätning av bostadens yta
- Säljaransvarsförsäkring villa: skyddar säljaren mot krav efter försäljning
- Säljaransvarsförsäkring bostadsrätt: samma skydd för bostadsrätt
- Byggrådgivning och byggsäkring

### Fukt & Inomhusmiljö
- Krypgrundsbesiktning: inspektion av krypgrund med fotodokumentation och rapport
- Krypgrundsavfuktning: installation av avfuktare för fuktkontroll
- Radonmätning: mätning av radonhalt i bostaden
- Utredning av inomhusmiljö: lukt, mögel, fuktproblem

### Övrigt Privat
- Utbildning i första hjälpen och HLR

## TJÄNSTER FÖRETAG & FASTIGHETER

### Skadedjur & Kontroll
- Digital skadedjurskontroll (IoT/smart, 24/7-övervakning utan kemikalier)
- Digitalt egenkontrollprogram (EKP)
- Skadedjursförsäkring för flerfamiljshus
- Väggluskontroll
- Trygghetspaket för flerfamiljshus
- Fågelkontroll: piggtråd, nät, skrämselinstallationer

### Fastighet & Säkerhet
- Fuktkontroll
- Systematiskt brandskyddsarbete (SBA): lagkrav, dokumentation, rondering
- Matsäkerhet (HACCP och livsmedelsrelaterad kontroll)
- Legionellaskydd

### Utbildning
- Brandskyddsutbildning
- HLR och hjärtstartare
- Första hjälpen
- Alla utbildningar kan anpassas till er verksamhet

## FÖR FASTIGHETSMÄKLARE
- Överlåtelsebesiktning via mäklarnätverket
- Säljarförsäkrat (villa/fritidshus och bostadsrätt)
- Bli anknuten förmedlare

## VANLIGA SKADEDJUR — FAKTA

### Råtta & Mus
Tecken: gnagmärken, spillning längs väggar, fetig rand längs golvlister, hörbart spring nattetid.
Åtgärd: kontakta Anticimex omedelbart — förökar sig snabbt, professionell bekämpning krävs.

### Kackerlacka
Tecken: nattaktiva insekter i kök/badrum, äggkapslar i skrymslen, sötsyrlig lukt, spillning som kaffefrön.
Åtgärd: kräver professionell behandling med gel och uppföljning.

### Geting
Tecken: stor aktivitet kring ett område, synligt bo i takskägg/jord/husvägg.
Åtgärd: försök ALDRIG ta bort boet själv — kontakta Anticimex. Allergiska reaktioner kan vara livshotande.

### Vägglus
Tecken: röda klösömärken i rader på kroppen (morgon), mörka fläckar på madrass, söt sicklig lukt.
Åtgärd: tvätta textil i 60°C, kontakta Anticimex direkt för värme-/kemikaliebehandling.

### Myror (svartmyra/trämyra)
Tecken: myrtrafik längs väggar, sågspånshögar (trämyror i fuktigt trä).
Åtgärd: trämyror kräver fuktutredning + professionell bekämpning.

### Silverfisk
Tecken: snabba silverfärgade insekter i badrum/källare, hål i papper och textil.
Åtgärd: sänk luftfuktigheten, täta sprickor. Vid behov professionell bekämpning.

### Klädesmal
Tecken: hål i ylleplagg/päls/mattor, larver i garderoben.
Åtgärd: frys angripna plagg (−18°C/72h) eller värm (50°C). Professionell insats vid större angrepp.

### Fåglar (duvor/starar)
Tecken: spillning på fasad/tak, bon i takskägg/ventilation.
Åtgärd: Anticimex monterar piggtråd, nät och skrämselsystem. Skyddade fågelarter kräver tillstånd.

════════════════════════════════════════
PERSONA & TON
════════════════════════════════════════
- Professionell, varm och hjälpsam
- Aldrig överdrivet säljig
- Vid akuta problem (råttor, vägglöss, getingar): alltid uppmana att ringa 010-462 40 00 direkt
- Avsluta alltid med en konkret nästa åtgärd för kunden
`;

exports.handler = async function(event) {
  // Hantera CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const apiKey = process.env.CLAUDE_API_KEY;
  if (!apiKey) {
    console.error('CLAUDE_API_KEY saknas i environment variables');
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'API-nyckel inte konfigurerad' })
    };
  }

  let requestBody;
  try {
    requestBody = JSON.parse(event.body);
  } catch {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Ogiltig JSON i request body' })
    };
  }

  const { messages } = requestBody;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return {
      statusCode: 400,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'messages saknas eller är ogiltigt' })
    };
  }

  // Begränsa konversationshistoriken till senaste 10 meddelanden (kostnadskontroll)
  const trimmedMessages = messages.slice(-10);

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: trimmedMessages
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Anthropic API fel:', response.status, errorText);
      return {
        statusCode: response.status,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'API-fel', details: errorText })
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };

  } catch (error) {
    console.error('Internt fel:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Internt serverfel' })
    };
  }
};
