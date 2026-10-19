# Introduksjon til Claude Code i Vy

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
  punkter. Nettsiden registrerer ikke gjennomføring.

## Forhåndsvisning og publisering

Ingen avhengigheter, byggesteg eller JavaScript er nødvendig. Åpne `index.html`
i nettleseren, eller kjør `python3 -m http.server 8000` fra repoets rot og besøk
http://localhost:8000/. Kontroller hele rekkefølgen frem og tilbake, første og
siste side, tastaturnavigasjon, rulling av innhold og smal skjermbredde etter
endringer. Repoet har ikke et automatisert testoppsett.

Endringer publiseres når de flettes til publiseringsgrenen. I GitHub Pages
brukes «Deploy from a branch», grenen `main` og mappen `/(root)`.
