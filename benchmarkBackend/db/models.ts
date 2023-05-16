export interface IComponent {
  id?: string;
  name: string;
  chipvendor?: string;
  productvendor?: string;
  type: string;
  description?: string;
}
export interface IGame {
  id?: string;
  name: string;
  description?: string;
  publisher?: string;
}
export interface IBenchmark {
  id?: string;
  gameid: string;
  componentid: string;
  settings?: string;
  note?:string;

  averagefps: number;
  zeroonefps: number;
  onefps: number;
}
export interface ISettings {
  resolution: string;
  tooltip: string;
}
export interface IBenchmarkFull {
  id?: string;
  gameid: string;
  componentid: string;
  averagefps: number;
  zeroonefps: number;
  onefps: number;
  gamename?: string;
  gamedescription?: string;
  publisher?: string;
  componentname: string;
  chipvendor?: string;
  productvendor?: string;
  componentdescription?: string;
  componenttype: string;
  resolution: string;
  settingstooltip: string;
  note?:string;

}