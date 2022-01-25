import { ColorTheme } from "../types/ColorTheme";

export const themes = Object.values(ColorTheme).map(value => ({
  value,
  labelKey: `global_theme-${value}`,
}));

export const defaultTheme = ColorTheme.Blue;
