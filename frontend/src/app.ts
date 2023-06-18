import { normalize } from "path";
import { HTMLApp } from "./UIPainterImpl/HTMLApp";
import { Home } from "./UIPainterImpl/views/pages/Home";
import { HTMLScreen } from "./UIPainterImpl/HTMLScreen";

try {
  const app = new HTMLApp(normalize(__dirname + "/"));

  const homeScreen = new HTMLScreen("index", {
    title: "Global Store",
    viewport: "width=device-width, initial-scale=1.0"
  });
  homeScreen.addView((new Home("", 0, 0)).myView());

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
