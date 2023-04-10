import { normalize } from "path";
import { HTMLApp } from "./UIPainterImpl/HTMLApp";
import { HomePage } from "./UIPainterImpl/views/HomePage";
import { HTMLScreen } from "./UIPainterImpl/HTMLScreen";

try {
  const app = new HTMLApp(normalize(__dirname + "/"));
  const homeScreen = new HTMLScreen({
    name: "index",
    width: 1024,
    height: 600,
  });

  app.addScreen(homeScreen, [new HomePage()]);

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
