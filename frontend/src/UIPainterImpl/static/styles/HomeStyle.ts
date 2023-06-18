import { MediaQuery } from "../../MediaQuery"
import { HeaderStyle } from "./HeaderStyle"
import { TextStyle } from "./TextStyle"

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
    },

    rightpart: {
      body: {
        flex: "1",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        padding: "2em"
      },
      button: (color: string) => ({
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center",

        fontFamily: TextStyle.fontFamily,
        fontSize: "120%",
        width: "70%",
        height: "auto",
        padding: "20px",
        margin: "auto",

        borderRadius: "20px",
        boxShadow: "0 0 5px 2px #00000033",
        color: color,
        backgroundColor: "#f6f6f6"
      })
    },
  }
})