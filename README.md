# Introduksjon til Claude Code i Vy

Statisk kursutkast for GitHub Pages på https://marthekri.github.io/.
Materialet er foreslått obligatorisk lesestoff før lisens tildeles, ikke
fullstendige eller vedtatte retningslinjer.

## Redigere og legge til innhold

- Rediger kursoversikten i `index.html` og faginnholdet i `modules/`.
- All styling ligger i `style.css` og brukes av alle sidene.
- For en ny modul: kopier en eksisterende modulside til en ny HTML-fil i
  `modules/`. Oppdater sidetittel, overskrift, modulnummer, læringsmål og innhold.
- Legg modulen til i oversikten på forsiden og i kursnavigasjonen på **alle**
  sidene. Oppdater forrige-/neste-lenkene og `aria-current="page"` slik at bare
  gjeldende side er markert.
- Lenker fra moduler til forsiden og stilarket bruker `../index.html` og
  `../style.css`. Lenker mellom moduler bruker bare filnavnet.
- Behold utkastmerkingen til materialet er avklart. Offisiell lenke til
  retningslinjene, MCP-veiledning og rutine for bekreftelse er fortsatt åpne
  punkter. Nettsiden registrerer ikke gjennomføring.

## Forhåndsvisning og publisering

Ingen avhengigheter, byggesteg eller JavaScript er nødvendig. Åpne `index.html`
i nettleseren, eller kjør `python3 -m http.server 8000` fra repoets rot og besøk
http://localhost:8000/. Kontroller navigasjon, forrige-/neste-lenker og smal
skjermbredde etter endringer. Repoet har ikke et automatisert testoppsett.

Endringer publiseres når de flettes til publiseringsgrenen. I GitHub Pages
brukes «Deploy from a branch», grenen `main` og mappen `/(root)`.
