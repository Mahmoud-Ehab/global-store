import { MediaQuery } from "../../MediaQuery";
import { TextStyle } from "./TextStyle";

export const getNavStyle = (mq?: MediaQuery) => ({
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
})