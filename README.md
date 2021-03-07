# Web-sovelluskehitys-2-projekti

## KUVAUS

Parkkidata on web-sovellus millä käyttäjät voivat nähdä Etelä_helsingin parkkipaikkoja ja niiden pysäköintistatistiikkaa. Sovelluksella voi myös suodattaa dataa ja katsoa parkkipaikat listana kiireisimmästä vähiten kiireisimpään.

## TOIMINNALLISUUS

•Sovelluksen aukeutuessa näkee kartalla Etelä_helsingin parkkipaikkoja. Karttaa voi tarkentaa hiiren rullalla tai vasemmalla yläkulmassa olevilla painikkeilla sekä liikutella raahamalla hiirellä. Parkkipaikat näkyvät sinisenä ja valittu parkkipaikka näkyy punaisena.
•Ikkuna, jolla sovellusta hallitaan kartan lisäksi on myös liikuteltavissa.
•Sovelluksella voi suodattaa parkkipaikkoja sen parkkipaikkojen määrän mukaan vaihtoehdoilla enemmän kuin, vähemmän kuin tai tasan. Joissakin parkkipaikoissa parkkipaikkojen määrä ei ole ilmoitettu, nämä saadaan pois näkyvistä tai takaisin näkyviin yhdellä täpällä.
•Kun painaa haluamastaan parkkipaikasta, näkee sen tunnuksen, kuinka monta autoa sinne mahtuu ja paljon on sillä hetkellä parkissa autoja.
•Sen lisäksi aukeaa kaavio, josta näkee historian, että kuinka monta autoa siellä on ollut parkissa. Tässä kaaviossa voi rajaa dataa 12h, 24h, tai 7 päivään.
•Sovellus mahdollistaa katsoa parkkipaikkoja listana kiireisimmästä vähiten kiireisimpään yhteen laskettujen automäärien mukaan. Listassa näkyy parkkipaikan koordinaatti, katuosoite sekä yhteen lasketut autojen määrät.

## SOVELLUKSEN ARKITEHTUURI JA KÄYTETYT TEKNOLOGIAT

•Frontend: React,
•Backend: Node.js, Express, PostgreSQL, Knex,
•Version hallinta: Git and GitHub
•Testit: Jest,
•Deployment:
•Rajapinta-haku: https://pubapi.parkkiopas.fi/public/v1/
•Dokumentaatio:

## Asennus ja Devaus

Vs-code:ssa tai muussa kehitysympäristössä etsi "clone repository" -toiminto, ja kopioi alla oleva linkki sen URL-kenttään:
`git clone: https://github.com/breeku/Web-sovelluskehitys-2-projekti`

##### Riippuvuuksien asennus

Siirry kehitysympäristön (esim. Vs-code) terminaliin ja varmista, että olet projektin juuressa ja syötä terminaaliin seuraavat komennot:

`cd frontend && npm install` -> `cd ../backend && npm install`

##### Tietokanta

Lataa ja asenna [postgres](https://www.postgresql.org/download/)

Asennuksen mukana tulee pgAdmin jolla pystyt katselemaan tietokantaa.

Backend kansioon luo ".env" jonka sisään tulee tietokantasi käyttäjä, salasana, host ja tietokannan nimi, malliin `DB_USER=käyttäjä`, `DB_PASSWORD=salasana`, `DB_HOST=host`, `DB_DATABASE=tietokanta`. Oletusarvoisesti käyttäjä on postgres, salasanan asetat postgressia asentaessa, host on 127.0.0.1, tietokannan nimen saat itse valita.

Tämän jälkeen luot tietokannan pgAdmin-sovelluksessa, haet backend kansiossa knex:in komennolla `npm install knex -g` jonka jälkeen migrate `knex migrate:latest`

##### Tietokannan sisältö:

Komento, jolla voit backend kansiossa hakea parkkipaikkojen tiedot ja nimet tietokantaan `knex seed:run`
Komento, jolla voit backend kansiossa hakea tilannetietoa parkkipaikoista `npm run update:db`


##### Koodaus
Node dev serverin saa käynnistettyä backend kansiosta ajamalla `npm run watch`
Reactin dev serverin saa käynnistettyä frontend kansiosta ajamalla `npm run start`

##### Testaus
**Frontend** testaus frontend kansiosta ajamalla `npm run test`
**Backend** testaukseen luot toisen tietokannan ja lisäät ".env" tiedostoon kohdan `TEST_DB_DATABASE=testitietokanta`, nimen
voit valita itse. Testit voidaan ajaa backend kansiosta komennolla `npm run test` (ensimmäistä testikertaa ajettaessa käytä ensin komentoa `npm run first:test`) 

##### Dokumentaatio
Dokumentaation projektissa käytettävälle Apille voi generoida ajamalla backend kansiossa `npm run swagger`. Dokumentaatio generoituu /backend/src/swagger kansioon
Dokumentaatio löytyy osoitteesta https://docs.parkkidata.tk/