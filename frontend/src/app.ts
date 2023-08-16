import { normalize } from "path";
import { HTMLApp, HTMLScreen } from "@sfawd/html";
import { Home } from "./UIPainterImpl/views/pages/Home";

try {
  const homeScreen = new HTMLScreen("index", {
    title: "Global Store",
    viewport: "width=device-width, initial-scale=1.0"
  });
  homeScreen.addView((new Home("", 0, 0)).myView());

  const app = new HTMLApp(normalize(__dirname + "/"));
  app.addScreen(homeScreen);
  app.start((port: number, host: string) => {
    console.log(`The app is live on http://${host}:${port}`);
  });

  process.on('SIGTERM', () => {
    app.close(() => {
      console.log("server has been gracefully shutdowned.");
    });
  });
}
catch (e) {
  console.error(e);
}
