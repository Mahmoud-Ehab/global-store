import { Button } from "../../views/mini-components/Button"
import { HeaderStyle } from "./HeaderStyle"
import { TextStyle } from "./TextStyle"

export const HomeStyle = {
  body: {
    width: "100%", 
    height: "auto", 
    backgroundColor: "#2F3542",
  },

  overview_sec: {
    body: {
      display: "flex",
      height: "100vh",
      paddingTop: HeaderStyle.body.height,
      boxSizing: "border-box",
    },

    leftpart: {
      body: {
        flex: "3",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
      },

      text: {
        textAlign: "center",
        margin: "3em"
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

        borderRadius: "20px",
        boxShadow: "0 0 5px 2px #00000033",
        color: color,
        backgroundColor: "#f6f6f6"
      })
    },
  }
}