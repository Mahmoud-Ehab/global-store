import { HeaderStyle } from "./HeaderStyle"

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
        flex: "1"
      }
    },
  }
}