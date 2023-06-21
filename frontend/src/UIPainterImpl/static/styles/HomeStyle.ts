import { MediaQuery } from "../../MediaQuery"
import { HeaderStyle } from "./HeaderStyle"

export const HomeStyle = (mq: MediaQuery) => ({
  body: {
    width: "100vw", 
    height: "auto", 
    backgroundColor: "#2F3542",
    overflow: "hidden"
  },

  overview_sec: {
    body: {
      display: "flex",
      flexFlow: mq.minWidth(1000) ? "row" : "column",
      height: "100vh",
      paddingTop: HeaderStyle.body.height,
      boxSizing: "border-box",
    },

    leftpart: {
      body: {
        flex: "4",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        padding: "2em"
      },

      text: {
        fontSize: "125%",
        textAlign: "center",
        margin: mq.minWidth(768) ? "0 10em 4em 10em" : "1em",
      }
    }
  }
})