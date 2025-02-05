/**
 * @copyright davidpr0811
 * Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Informationen finden Sie in der Datei LICENSE.
 */
const OpenAI = require("openai");

const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

async function fetchTaskResponse(taskDescription, taskOrder) {
  const client = new OpenAI({
    baseURL: process.env.apiurl,
    apiKey: process.env.apikey,
  });

  // Nachricht für OpenAI erstellen
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: `Anweisung in welchem stil: ${taskDescription}` },
    { role: "user", content: `Auftrag: ${taskOrder}` },
  ];

  // API-Anfrage an OpenAI senden
  try {
    const response = await client.chat.completions.create({
      messages: messages,
      temperature: Number(process.env.temperature),
      top_p: Number(process.env.top_p),
      max_tokens: Number(process.env.max_tokens),
      model: process.env.modelname,
    });

    // Antwort von OpenAI zurückgeben
    return response.choices[0].message.content;
  } catch (err) {
    console.error("Fehler bei der Anfrage:", err);
    throw err;
  }
}

module.exports = fetchTaskResponse;
