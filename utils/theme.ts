export const enum ThemeEnum {
  light = 'light',
  dark = 'dark',
}
export const getTheme = (): ThemeEnum => {
  const html = document.documentElement;
  return (
    (html.getAttribute('data-theme') as ThemeEnum) ??
    localStorage.getItem('theme')
  );
};
export const setTheme = (theme: ThemeEnum) => {
  const html = document.documentElement;
  //set html attribute
  html.setAttribute('data-theme', theme);
  //set local storage
  localStorage.setItem('theme', theme);
};
export const toggleTheme = () => {
  const html = document.documentElement;
  const currentTheme = html?.getAttribute('data-theme');
  //toggle html attribute
  html.setAttribute(
    'data-theme',
    currentTheme === ThemeEnum.light ? ThemeEnum.dark : ThemeEnum.light
  );
  //toggle local storage
  localStorage.setItem(
    'theme',
    currentTheme === ThemeEnum.light ? ThemeEnum.dark : ThemeEnum.light
  );
};
export const initializeTheme = () => {
  //system theme
  const preferedTheme: ThemeEnum = matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? ThemeEnum.dark
    : ThemeEnum.light;
  //local storage
  const localTheme = localStorage.getItem('theme');
  const html = document.documentElement;
  //set initial theme
  if (!localTheme) {
    html.setAttribute('data-theme', preferedTheme);
    localStorage.setItem('theme', preferedTheme);
  } else {
    html.setAttribute('data-theme', localTheme);
  }
};
