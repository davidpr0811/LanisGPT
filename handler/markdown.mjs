/**
 * @copyright davidpr0811
 * Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Informationen finden Sie in der Datei LICENSE.
 */
import { md2docx } from "@adobe/helix-md2docx";
import fs from "fs";
import path from "path";

// Funktion, um Markdown zu DOCX zu konvertieren und zu speichern
async function convertMarkdownToDocx(markdown, outputFolder, outputFileName) {
  try {
    // Sicherstellen, dass der Zielordner existiert
    if (!fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder, { recursive: true });
    }

    // Konvertiere Markdown in DOCX
    const docx = await md2docx(markdown);

    // Erstelle den vollständigen Pfad für die Zieldatei
    const outputPath = path.join(outputFolder, outputFileName);

    // Schreibe das DOCX-Dokument in die Datei
    fs.writeFileSync(outputPath, docx);

    console.log(`DOCX wurde erfolgreich erstellt: ${outputPath}`);
  } catch (error) {
    console.error("Fehler beim Konvertieren von Markdown zu DOCX:", error);
  }
}

// Beispielaufruf der Funktion
export default convertMarkdownToDocx;
