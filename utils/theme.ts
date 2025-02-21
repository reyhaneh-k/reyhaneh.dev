const enum ThemeEnum {
  light = 'light',
  dark = 'dark',
}
export const getTheme = (): ThemeEnum => {
  const html = document.documentElement;
  return (html?.getAttribute('data-theme') as ThemeEnum) ?? ThemeEnum.light;
};
export const setTheme = (theme: ThemeEnum) => {
  const html = document.documentElement;
  html.setAttribute('data-theme', theme);
};
export const toggleTheme = () => {
  const html = document.documentElement;
  const currentTheme = html?.getAttribute('data-theme');
  html.setAttribute(
    'data-theme',
    currentTheme === ThemeEnum.light ? ThemeEnum.dark : ThemeEnum.light
  );
};
export const initializeTheme = () => {
  const preferedTheme: ThemeEnum = matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? ThemeEnum.dark
    : ThemeEnum.light;
  const html = document.documentElement;
  html.setAttribute('data-theme', preferedTheme);
};
