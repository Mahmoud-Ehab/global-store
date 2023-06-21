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
      flexFlow: mq.minWidth("laptop_small") ? "row" : "column",
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
        justifyContent: "space-around",
        padding: mq.minWidth("laptop_small") ? "2em" : "1em",
      },

      text: {
        flex: mq.minWidth("laptop_small") ? "" : "1",
        display: "flex",
        fontSize: mq.minWidth("laptop_small") ? "135%" : "100%",
        textAlign: "center",
        alignItems: "center",
        margin: mq.minWidth("laptop_small") ? "0 5vw 4em 5vw" : "0 1em",
      },

      imageSlider: {
        flex: mq.minWidth("laptop_small") ? "" : "2",
        width: "100%",
        height: "100%",
      },

      signDiv: {
        body: {
          flex: "1",
          display: mq.minWidth("laptop_small") ? "none" : "flex",
          flexFlow: "column",
          justifyContent: "space-between",
          width: mq.minWidth("taplet_small") ? "65%" : "100%",
          height: "100%"
        },

        registerBtn: {
          fontSize: "150%",
          height: "100%",
          marginBottom: "12px",
          borderRadius: "30px",
          border: "solid 5px #2F3542",
          color: "#2F3542",
          backgroundColor: "#FFF",
        },

        loginBtn: {
          fontSize: "150%",
          height: "80%",
          borderRadius: "30px",
          border: "solid 5px #FFF",
          color: "#FFF",
          backgroundColor: "#2F3542",
        }
      }
    }
  }
})