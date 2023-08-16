import { normalize } from "path";
import { HTMLApp, HTMLScreen } from "@sfawd/html";
import { Home } from "./UIPainterImpl/views/pages/Home";

try {
  const app = new HTMLApp(normalize(__dirname + "/"));

  const homeScreen = new HTMLScreen("index", {title: "Global Store"});
  homeScreen.addView((new Home("")).myView());

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
