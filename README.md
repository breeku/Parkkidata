# Web-sovelluskehitys-2-projekti

KUVAUS

Parkkidata on web-sovellus millä käyttäjät voivat nähdä Etelä_helsingin parkkipaikkoja ja niiden pysäköintistatistiikkaa. Sovelluksella voi myös suodattaa dataa ja katsoa parkkipaikat listana kiireisimmästä vähiten kiireisimpään.

TOIMINNALLISUUS

•Sovelluksen aukeutuessa näkee kartalla Etelä_helsingin parkkipaikkoja. Karttaa voi tarkentaa hiiren rullalla tai vasemmalla yläkulmassa olevilla painikkeilla sekä liikutella raahamalla hiirellä. Parkkipaikat näkyvät sinisenä ja valittu parkkipaikka näkyy punaisena.
•Ikkuna, jolla sovellusta hallitaan kartan lisäksi on myös liikuteltavissa.
•Sovelluksella voi suodattaa parkkipaikkoja sen parkkipaikkojen määrän mukaan vaihtoehdoilla enemmän kuin, vähemmän kuin tai tasan. Joissakin parkkipaikoissa parkkipaikkojen määrä ei ole ilmoitettu, nämä saadaan pois näkyvistä tai takaisin näkyviin yhdellä täpällä.
•Kun painaa haluamastaan parkkipaikasta, näkee sen tunnuksen, kuinka monta autoa sinne mahtuu ja paljon on sillä hetkellä parkissa autoja.
•Sen lisäksi aukeaa kaavio, josta näkee historian, että kuinka monta autoa siellä on ollut parkissa. Tässä kaaviossa voi rajaa dataa 12h, 24h, tai 7 päivään.
•Sovellus mahdollistaa katsoa parkkipaikkoja listana kiireisimmästä vähiten kiireisimpään yhteen laskettujen automäärien mukaan. Listassa näkyy parkkipaikan koordinaatti, katuosoite sekä yhteen lasketut autojen määrät.

SOVELLUKSEN ARKITEHTUURI JA KÄYTETYT TEKNOLOGIAT

•Frontend: React,
•Backend: Node.js, Express, PostgreSQL, Knex,
•Version hallinta: Git and GitHub
•Testit: Jest,
•Deployment:
•Rajapinta-haku: https://pubapi.parkkiopas.fi/public/v1/
•Dokumentaatio:
