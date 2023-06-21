import { MediaQuery } from "../../MediaQuery"

type ObjectOfStyles = {
  [name: string]: Partial<CSSStyleDeclaration>
}

const body: Partial<CSSStyleDeclaration> = {
  position: "fixed",
  display: "flex",
  flexFlow: "row",
  alignItems: "center",
  justifyContent: "space-between",

  width: "100vw",
  height: "10vh",
  
  backgroundColor: "#2F3542",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
}

const title = (mq: MediaQuery): Partial<CSSStyleDeclaration> => ({
  fontSize: mq.minWidth("taplet_medium") ? "200%" : "150%",
  marginLeft: mq.minWidth("taplet_medium") ? "3em" : "1em",
})

const loginBtn: ObjectOfStyles = {
  normal: {  
    fontSize: "125%",
    height: "100%",
    width: "6em",

    borderLeft: "solid 1px",
    color: "#fff",
    backgroundColor: "transparent",

    cursor: "pointer",
    transitionDuration: "250ms"
  },
  hover: {
    color: "#2F3542",
    backgroundColor: "#fff",
  }
}

export const HeaderStyle = {
  body,
  title,
  loginBtn
}