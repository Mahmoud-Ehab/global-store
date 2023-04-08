import { normalize } from "path";
import { HTMLApp } from "./UIPainterImpl/HTMLApp";
import { HomePage } from "./UIPainterImpl/pages/HomePage";

try {
  const app = new HTMLApp(normalize(__dirname + "/"));

  app.addScreen({
      name: "index",
      width: 1024,
      height: 600,
    }, 
    [new HomePage()]
  );

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
