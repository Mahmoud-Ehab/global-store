import { MediaQuery } from "@sfawd/html";
import { TextStyle } from "./TextStyle";

export const getNavStyle = (mq?: MediaQuery) => ({
    body: {
        display: mq.minWidth("laptop_small") ? "flex" : "none",
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
        width: mq.minWidth("laptop_medium") ? "70%" : "100%",
        height: "auto",
        padding: "20px",
        margin: "auto",

        borderRadius: "20px",
        boxShadow: "0 0 5px 2px #00000033",
        color: color,
        backgroundColor: "#f6f6f6"
    })
})