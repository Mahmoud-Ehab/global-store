import { MediaQuery } from "../../MediaQuery";
import { TextStyle } from "./TextStyle";

export const getNavStyle = (mq?: MediaQuery) => ({
    body: {
        display: mq.minWidth(1000) ? "flex" : "none",
        flex: "1",
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
        width: mq.minWidth(1150) ? "70%" : "100%",
        height: "auto",
        padding: "20px",
        margin: "auto",

        borderRadius: "20px",
        boxShadow: "0 0 5px 2px #00000033",
        color: color,
        backgroundColor: "#f6f6f6"
    })
})