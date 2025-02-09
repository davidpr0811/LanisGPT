# LanisClient

<div align="center">
  <h1>Lanis<span style="color: #4F46E5">Client</span></h1>
  
  <p align="center">
    <strong>Der moderne und leistungsstarke Client für das Hessische Schulportal</strong>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/version-2.0.0-blue.svg" alt="Version" />
    <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License" />
    <img src="https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg" alt="Node" />
    <img src="https://img.shields.io/badge/typescript-%5E5.0.0-blue.svg" alt="TypeScript" />
    <img src="https://img.shields.io/badge/react-%5E18.0.0-blue.svg" alt="React" />
    <img src="https://img.shields.io/badge/tailwindcss-latest-blueviolet.svg" alt="Tailwind" />
  </p>

  <br />
  
  <img src="http://randojs.com/images/dropShadow.png" width="75%" alt="Lanis Client Vorschau"/>
</div>

## 📑 Inhaltsverzeichnis

- [✨ Funktionen](#-funktionen)
- [🚀 Erste Schritte](#-erste-schritte)
  - [Voraussetzungen](#voraussetzungen)
  - [Installation](#installation)
  - [Entwicklung](#entwicklung)
  - [Deployment](#deployment)
- [🏗️ Technologie-Stack](#️-technologie-stack)
- [🔧 Konfiguration](#-konfiguration)
- [🖼️ Vorschau](#️-vorschau)
- [🤝 Mitwirken](#-mitwirken)
- [📈 Projekt-Entwicklung](#-projekt-entwicklung)
- [❓ FAQ](#-faq)
- [📝 Lizenz](#-lizenz)
- [📞 Support](#-support)

## ✨ Funktionen

- 🔐 **Sicherer Login:** Automatische und sichere Anmeldung bei Lanis
- 💾 **Offline-Zugriff:** Intelligente Zwischenspeicherung der Kursmappen
- 📚 **Verlaufsverfolgung:** Kompletter Überblick über alle Kursmappen
- 🔑 **JWT-Integration:** Moderne und sichere Sitzungsverwaltung
- 🤖 **KI-Assistent:** Intelligente Hausaufgabenhilfe und Lernunterstützung
- 📱 **Responsive Design:** Optimiert für alle Geräte
- 🌙 **Dark Mode:** Augenschonende Darstellung

## 🚀 Erste Schritte

### Voraussetzungen

- Node.js (Version 16 oder höher)
- npm (neueste Version empfohlen)
- Git
- Ein moderner Webbrowser
- Lanis-Zugangsdaten

### Installation

1. **Repository klonen**
```bash
git clone https://github.com/davidpr0811/lanis-client.git
cd lanis-client
```

2. **Abhängigkeiten installieren**
```bash
npm install
```

3. **Umgebungsvariablen konfigurieren**

Erstelle eine `.env` Datei im Hauptverzeichnis:
```env
# ------------------------ ( API-Konfiguration ) ------------------------
# KI-Integration (OpenAI oder GitHub)
apiurl=https://models.inference.ai.azure.com
apikey=ihr_api_schlüssel
modelname=gpt-4o

# Erweiterte Einstellungen
temperature=1.0
top_p=1.0
max_tokens=1000

# Lanis-Konfiguration
LANIS_API_URL=https://start.schulportal.hessen.de
```

4. **Anwendung starten**
```bash
npm run all
```

### Entwicklung

```bash
# Entwicklungsserver starten
npm run dev

# Startet den Backend server
npm run server

# Code-Linting
npm run lint

# Build erstellen
npm run build
```

### Deployment

```bash
# Produktions-Build erstellen
npm run build
```

## 🏗️ Technologie-Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Vite

- **State Management:**
  - React Context API
  - localStorage für Offline-Funktionalität

- **Code Qualität:**
  - ESLint
  - Prettier

## 🔧 Konfiguration

### Verfügbare Scripts

| Command | Beschreibung |
|---------|--------------|
| `npm run dev` | Startet den Entwicklungsserver |
| `npm run build` | Erstellt den Produktions-Build |
| `npm run lint` | Führt Code-Linting durch |

### Umgebungsvariablen

| Variable | Beschreibung | Standard |
|----------|--------------|----------|
| `apikey` | KI-API Schlüssel | - |
| `modelname` | KI-Modell Name | `gpt-4o` |

## 🖼️ Vorschau

<div align="center">
  <h3>Anmeldeseite</h3>
  <img src="https://i.imgur.com/2BsuBGT.png" alt="Anmeldeseite" width="100%"/>
  
  <h3>Dashboard</h3>
  <img src="https://i.imgur.com/BnF2ET9.png" alt="Dashboard" width="100%"/>
  
  <h3>Kursdetails</h3>
  <img src="https://i.imgur.com/mRVzihD.png" alt="Kursdetails" width="100%"/>
  
  <h3>KI-Hausaufgaben-Assistent</h3>
  <img src="https://i.imgur.com/5YNvjKs.png" alt="KI-Hausaufgaben-Assistent" width="100%"/>
</div>

## 🤝 Mitwirken

Wir freuen uns über Beiträge! Bitte lies unsere Beitragsrichtlinien:

1. Fork das Repository
2. Erstelle einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committe deine Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Push zum Branch (`git push origin feature/AmazingFeature`)
5. Öffne einen Pull Request

## 📈 Projekt-Entwicklung

<div align="center">
  
  [![Star History Chart](https://api.star-history.com/svg?repos=davidpr0811/LanisGPT&type=Date)](https://star-history.com/#davidpr0811/lanis-client)

</div>

## ❓ FAQ

<details>
<summary><strong>Wie sicher sind meine Lanis-Zugangsdaten?</strong></summary>
Dein Passwort wird zu keinem zeitpunkt gespeichert wir speichern nur deinen nutznamen und die sassionid im jwt.
</details>

<details>
<summary><strong>Funktioniert die App auch offline?</strong></summary>
Teilweise, weil die Daten im Zwischenspeicher gespeichert werden sind sie offline noch erreichbar.
</details>

<details>
<summary><strong>Wie funktioniert der KI-Assistent?</strong></summary>
Der KI-Assistent nutzt die API von openai oder github um mithilfe modernster ki modelle gute antworten zu generiern.
</details>

## 📝 Lizenz

<div align="center">
  
  **LanisClient** ist unter der MIT-Lizenz lizenziert.
  
  Copyright © 2025-present [Davidpr0811](https://github.com/davidpr0811)

</div>

## 📞 Support

- 📧 E-Mail: support@lanisclient.de
- 💬 Discord: [LanisClient Community](https://discord.gg/lanisclient)
- 🐛 Issues: [GitHub Issues](https://github.com/davidpr0811/lanis-client/issues)

---

<p align="center">Mit 💙 entwickelt von Davidpr0811</p>
