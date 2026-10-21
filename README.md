# Introduksjon til Claude Code i &lt;organization&gt;

Statisk kursutkast for GitHub Pages på https://marthekri.github.io/.
Materialet er foreslått obligatorisk lesestoff før lisens tildeles, ikke
fullstendige eller vedtatte retningslinjer.

## Redigere og legge til innhold

- Rediger velkomstsiden i `index.html` og faginnholdet i `modules/`.
- All styling ligger i `style.css` og brukes av alle sidene.
- For en ny modul: kopier en eksisterende modulside til en ny HTML-fil i
  `modules/`. Oppdater sidetittel, overskrift, modulnummer, læringsmål og innhold.
- Legg modulen til i den ulenkede oversikten på velkomstsiden. Oppdater
  forrige-/neste-lenkene på nabosidene, modulnumrene og sidetellerne.
  Navigasjon mellom sider skal bare skje med Forrige og Neste; ikke legg til
  menyer, snarveier eller lenker tilbake til velkomstsiden fra andre moduler.
- Hver side vises i én skjermramme med fast navigasjon nederst. Behold innholdet
  i `.page-content`, som kan rulles med mus, berøring eller tastatur når det
  ikke får plass (for eksempel på mobil eller ved forstørret tekst).
  Ved svært lav skjermhøyde, blant annet ved kraftig zoom, rulles hele siden
  i stedet slik at innholdet ikke skjules.
- Lenker fra moduler til forsiden og stilarket bruker `../index.html` og
  `../style.css`. Forrige-/neste-lenker mellom moduler bruker bare filnavnet.
- Behold utkastmerkingen til materialet er avklart. Offisiell lenke til
  retningslinjene, MCP-veiledning og rutine for bekreftelse er fortsatt åpne
  punkter. Bekreftelsesskjemaet sender ingenting før en backend er konfigurert.

## Forhåndsvisning og publisering

Ingen avhengigheter eller byggesteg er nødvendig. Bekreftelsesskjemaet bruker
`completion.js`; resten av kurset fungerer uten JavaScript. Åpne `index.html`
i nettleseren, eller kjør `python3 -m http.server 8000` fra repoets rot og besøk
http://localhost:8000/. Kontroller hele rekkefølgen frem og tilbake, første og
siste side, tastaturnavigasjon, rulling av innhold og smal skjermbredde etter
endringer. Repoet har ikke et automatisert testoppsett.

Endringer publiseres når de flettes til publiseringsgrenen. I GitHub Pages
brukes «Deploy from a branch», grenen `main` og mappen `/(root)`.

## Koble bekreftelsesskjemaet til en backend

Skjemaet på `modules/bekreftelse.html` er deaktivert som standard. Sett
`data-endpoint` på skjemaet til backendens HTTPS-adresse for å aktivere innsending.
Oppdater `data-course-version` når kursinnholdet endres; `draft-1` er en
utkastversjon. Avklar offisielle retningslinjer og rutinen først, fjern eller
oppdater varselet om at registrering ikke er aktivert, og oppgi ansvarlig for
registeret, formål, tilgang og lagringstid før løsningen tas i bruk.

Frontend sender en POST med `Content-Type: application/json` og feltene:

| Felt | Innhold |
| --- | --- |
| `courseId` | `claude-code` |
| `courseVersion` | Verdien fra `data-course-version` |
| `name` | Fullt navn (maks. 200 tegn) |
| `email` | E-postadresse på jobb (maks. 254 tegn) |
| `confirmed` | `true` når brukeren har krysset av |
| `confirmationText` | Bekreftelsesteksten som vises i skjemaet |
| `submittedAt` | Klientens tidspunkt i ISO 8601-format (UTC) |

Backend kan for eksempel være API Gateway/Lambda som lagrer JSON i en privat
S3-bøtte. Returner en 2xx-status først når registreringen er varig lagret;
responsinnholdet brukes ikke. Andre statuser og nettverksfeil gir en feilmelding
og lar brukeren prøve igjen. Forespørsler avbrytes etter 15 sekunder. Ved timeout
kan backend likevel ha lagret svaret, så håndter gjentatte innsendinger uten
uønskede duplikater, for eksempel per bruker og kursversjon.

Backend må validere alle felter, kontrollere tillatt kursversjon og bekreftelse,
legge til et servergenerert mottakstidspunkt og begrense misbruk. Navn og e-post
er selvrapporterte og bekrefter ikke identitet eller at modulene er lest.
Legg til autentisering ved behov før registeret brukes som dokumentasjon.
Frontend sender ingen cookies eller andre innloggingsopplysninger; en
autentisert integrasjon krever at dette tilpasses den valgte innloggingsløsningen.
For en annen origin må backend tillate nettstedets origin samt OPTIONS/POST
og Content-Type i CORS-oppsettet. CORS er ikke autentisering.

Ikke legg AWS-nøkler, andre hemmeligheter eller personopplysninger i repoet.
Frontend skal kun kjenne API-adressen, ikke ha direkte skrivetilgang til S3.
Skjemaet lagrer ingen data i nettleserlagring og viser kun mottaksbekreftelse
etter vellykket API-svar.

Kontroller skjemaet uten konfigurert endpoint og uten JavaScript. Med et
test-endpoint: kontroller påkrevde felter, ugyldig e-post, vellykket innsending,
HTTP-/nettverksfeil, timeout og gjentatte klikk. Kontroller også tastaturbruk
og smal skjermbredde.
