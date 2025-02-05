/**
 * @copyright davidpr0811
 * Der Code des SPHclient-Moduls wurde ursprünglich von alessioC42 entwickelt und von davidpr0811 für die Verwendung in diesem Projekt angepasst.
 * Dieses Projekt ist unter der MIT-Lizenz lizenziert. Weitere Informationen finden Sie in der Datei LICENSE.
 */

class SPHclient {
  constructor(
    username,
    password,
    schoolID,
    stayLoggedIn = false,
    loggingLevel = 1,
  ) {
    this.username = username;
    this.password = password;
    this.schoolID = schoolID;
    this.stayLoggedIn = stayLoggedIn;
    this.loggingLevel = loggingLevel;
    this.logged_in = false;
    this.cookies = {};
    this.stayLoggedInBodyOption = stayLoggedIn ? "stayconnected=1" : "";
  }

  async authenticate() {
    if (this.logged_in) {
      throw new Error("Client already authenticated!");
    }
    try {
      const response = await fetch(
        `https://login.schulportal.hessen.de/?i=${this.schoolID}&${this.stayLoggedInBodyOption}`,
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
          redirect: "manual",
          body: encodeURI(
            `user2=${this.username}&user=${this.schoolID}.${this.username}&password=${this.password}`,
          ),
          method: "POST",
        },
      );

      const skipVerification =
        this.stayLoggedIn || response.headers.has("location");

      if (skipVerification) {
        this.parseSetCookieHeader(response.headers.get("set-cookie"));
        this.log("auth request 1 successful.", 0);

        const response2 = await fetch("https://connect.schulportal.hessen.de", {
          redirect: "manual",
          method: "GET",
          headers: {
            cookie: this.getCookieHeader(),
          },
        });

        if (response2.headers.get("location")) {
          this.log("auth request 2 successful.", 0);

          const response3 = await fetch(response2.headers.get("location"), {
            method: "GET",
            redirect: "manual",
            headers: {
              cookie: this.getCookieHeader(),
            },
          });

          this.parseSetCookieHeader(response3.headers.get("set-cookie"));
          this.logged_in = true;
          this.log(
            `authenticated successful with sid=${this.cookies.sid.value}`,
            1,
          );
        } else {
          this.log("error during auth request 2", 0);
          this.logged_in = false;
          throw new Error("Unexpected error during request");
        }
      } else {
        this.log("error during auth request 1", 0);
        this.logged_in = false;
        throw new Error(
          "Wrong credentials or the lanis team changed the API again ;D",
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    if (!this.logged_in) {
      throw new Error("Client not authenticated!");
    }
    const url = "https://start.schulportal.hessen.de/index.php?logout=all";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          cookie: this.getCookieHeader(),
        },
      });
      this.parseSetCookieHeader(response.headers.get("set-cookie"));
      this.logged_in = false;
      this.log(`deauthenticated successful.`, 1);
    } catch (error) {
      throw error;
    }
  }

  parseSetCookieHeader(setCookieHeader) {
    const cookiesArray = setCookieHeader.split(",");
    cookiesArray.forEach((cookieString) => {
      const [cookie, ...options] = cookieString.trim().split(";");
      const [name, value] = cookie.trim().split("=");
      this.cookies[name] = { value };
      options.forEach((option) => {
        const [key, val] = option.trim().split("=");
        this.cookies[name][key] = val || true;
      });
    });
  }

  getCookieHeader() {
    return Object.keys(this.cookies)
      .map((name) => {
        const cookie = this.cookies[name];
        const options = Object.keys(cookie)
          .filter((key) => key !== "value")
          .map((key) => (cookie[key] === true ? key : `${key}=${cookie[key]}`))
          .join("; ");
        return `${name}=${cookie.value}; ${options}`;
      })
      .join(", ");
  }

  log(message, loglevel = 0) {
    if (this.loggingLevel === 0) {
      console.log(
        `[SPHclient] ${new Date().toLocaleString("en-CH")} (${this.schoolID}.${this.username}) : ${message}`,
      );
    } else if (this.loggingLevel === 1 && loglevel === 1) {
      console.log(
        `[SPHclient] ${new Date().toLocaleString("en-CH")} (${this.schoolID}.${this.username}) : ${message}`,
      );
    }
  }
}

module.exports = SPHclient;
