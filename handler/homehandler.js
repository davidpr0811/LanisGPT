/**
 * @copyright davidpr0811
 * Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Informationen finden Sie in der Datei LICENSE.
 */
const cheerio = require("cheerio");

// Funktion, die den HTML-Inhalt verarbeitet und die Hausaufgaben zurückgibt
function getHomework(htmlContent) {
  // Parsen des HTML-Inhalts mit Cheerio
  const $ = cheerio.load(htmlContent);

  // Suchen der Tabelle mit Hausaufgaben
  const homeworkTable = $("#aktuellTable");
  const homeworkEntries = [];

  if (homeworkTable.length) {
    // Iteration durch alle Zeilen der Tabelle
    homeworkTable.find("tbody tr").each((_, row) => {
      const courseName = $(row).find("span.name").text().trim();
      const date = $(row).find("span.datum").text().trim();
      const topic = $(row).find("b.thema").text().trim();
      const homeworkDetailsElement = $(row).find("div.realHomework");
      const homeworkDetails = homeworkDetailsElement.length
        ? homeworkDetailsElement.text().trim()
        : "Keine Details";

      // Hinzufügen der Einträge zur Liste
      homeworkEntries.push({
        course: courseName,
        date: date,
        topic: topic,
        homework: homeworkDetails,
      });
    });
  }

  // Rückgabe der Hausaufgaben als Array
  return homeworkEntries;
}

module.exports = getHomework;
