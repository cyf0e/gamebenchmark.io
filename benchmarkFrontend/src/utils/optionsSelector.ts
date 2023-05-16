import { IBenchmarkFull } from "./models";

export const getResolutionOptions = (data: IBenchmarkFull[]) => {
  const possibleOptions: string[] = [];
  data.map((e) => {
    if (!possibleOptions.includes(e.resolution)) {
      possibleOptions.push(e.resolution);
    }
  });
  return possibleOptions;
};
export const getSettingsOptions = (data: IBenchmarkFull[]) => {
  const possibleOptions: string[] = [];
  data.map((e) => {
    if (!possibleOptions.includes(e.settingstooltip)) {
      possibleOptions.push(e.settingstooltip);
    }
  });
  return possibleOptions;
};
