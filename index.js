/**
 * @copyright davidpr0811
 * Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Informationen finden Sie in der Datei LICENSE.
 */

// Abhängigkeiten importieren
const SPHclient = require("./handler/SPH_helper");
const homehandler = require("./handler/homehandler");
const homesolver = require("./handler/solvehandler");
const axios = require("axios");
const fs = require("fs");
const path = require("path"); // Erforderlich für den Umgang mit Dateipfaden
const dotenv = require("dotenv");
dotenv.config(); // Lädt die Umgebungsvariablen aus der .env-Datei

// Erstelle eine SPHclient-Instanz mit den Benutzerdaten
console.log(process.env.username);
const client = new SPHclient(
  process.env.username2,
  process.env.password,
  process.env.schoolid,
);

// Funktion, die eine spezifische Seite vom Schulportal abruft
async function fetchPage() {
  try {
    // Authentifizierung des Benutzers
    console.log("Authentifizierung beginnt...");
    await client.authenticate();
    console.log("Authentifizierung erfolgreich.");

    // URL der Seite, die abgerufen werden soll
    const pageUrl = "https://start.schulportal.hessen.de/meinunterricht.php";
    console.log(`Abrufen der Seite: ${pageUrl}...`);

    // HTTP-GET-Anfrage an die Seite mit den Authentifizierungs-Cookies
    const response = await fetch(pageUrl, {
      headers: {
        cookie: `sph-login-upstream=4; schulportal_lastschool=${client.schoolID}; i=${client.schoolID}; sid=${client.cookies.sid.value}`,
      },
    });

    // Überprüfe den Status der Antwort
    if (!response.ok) {
      throw new Error(`HTTP-Fehler! Status: ${response.status}`);
    }
    console.log("Seite erfolgreich abgerufen.");

    // Inhalt der Seite als Text
    const pageContent = await response.text();

    // Verarbeite den Inhalt der Seite
    console.log("Verarbeite die Seite...");
    let json = homehandler(pageContent); // Verarbeite die Seite mit homehandler

    // Importiere den Markdown-Converter
    let converter = await import("./handler/markdown.mjs");

    // Durchlaufe alle Kurse und bearbeite die Hausaufgaben
    for (let i = 0; i < json.length; i++) {
      const currentCourse = json[i];

      console.log(`Kurs: ${currentCourse.course} wird gestartet...`);

      // Generiere die Aufgabenstellung mit dem homesolver
      let task = await homesolver(
        process.env.defaultprompt,
        process.env.solveprompt
          .replace("{course}", currentCourse.course)
          .replace("{topic}", currentCourse.topic)
          .replace("{homework}", currentCourse.homework),
      );

      // Überprüfe den Status der Lösung (ob sie als "solved" markiert wurde)
      if (task === "not solved") {
        console.log(
          `Kurs: ${currentCourse.course} - Aufgabe konnte nicht gelöst werden. Überspringe diesen Kurs.`,
        );
        continue; // Überspringe diesen Kurs, wenn er nicht gelöst wurde
      }

      // Verhindere ungültige Zeichen im Dateipfad, insbesondere den Slash
      const sanitizedCourse = currentCourse.course.replace(
        /[<>:"/\\|?*]/g,
        "_",
      ); // Entfernt ungültige Zeichen
      const sanitizedTopic = currentCourse.topic.replace(
        /[<>:"/\\|?*\/]/g,
        "_",
      ); // Entfernt den Slash und andere ungültige Zeichen

      // Erstelle den Dateipfad
      const date = `${new Date().getDay()}.${new Date().getMonth() + 1}.${new Date().getFullYear()}`;
      const fileName = `${sanitizedCourse}_${sanitizedTopic}_${date}.docx`;

      // Erstelle den Ordner, falls er nicht existiert
      const folderPath = path.join(__dirname, "solved"); // Stelle sicher, dass der 'solved'-Ordner existiert
      if (!fs.existsSync(folderPath)) {
        console.log(`Ordner 'solved' existiert nicht. Erstelle ihn jetzt.`);
        fs.mkdirSync(folderPath, { recursive: true });
      }

      // Der vollständige Pfad zur Datei (nur Dateiname + Ordnerpfad)
      const filePath = path.join(folderPath, fileName); // Nur einmal den Ordnerpfad hinzufügen

      // Konvertiere die gelöste Aufgabe in eine .docx-Datei
      console.log(
        `Konvertiere die Aufgabe für Kurs: ${currentCourse.course} in eine Datei.`,
      );
      await converter.default(task, "solved", fileName);

      // Warte 5 Sekunden zwischen den Aufgaben
      console.log(
        `Kurs: ${currentCourse.course} abgeschlossen. Warte 5 Sekunden...`,
      );
      await sleep(5000);
    }

    // Abmelden vom Schulportal
    console.log("Abmelden vom Schulportal...");
    await client.logout();
    console.log("Abmeldung erfolgreich.");
  } catch (error) {
    // Fehlerbehandlung
    console.error("Fehler beim Abrufen der Seite:", error);
  }
}

// Funktion zum Warten (Schlafmodus) für eine bestimmte Zeit in Millisekunden
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Die fetchPage-Funktion ausführen
fetchPage();
