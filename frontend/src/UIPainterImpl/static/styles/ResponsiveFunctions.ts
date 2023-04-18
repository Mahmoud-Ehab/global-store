export const mediaQuery = (query: string): boolean => {
  return window.matchMedia(query).matches;
}

export const maxWidth = (width: number) => {
  return (document.body.clientWidth <= width);
}

export const minWidth = (width: number) => {
  return (document.body.clientWidth >= width);
}

export const isPortrait = () => {
  return (document.body.clientWidth <= window.screen.height);
}

export const isLandscape = () => {
  return (document.body.clientWidth > window.screen.height);
}