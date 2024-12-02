import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    red: string;
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
      // bgColor: string;
      // fontColor: string;
      // accentColor: string;
      // subColor: string;
    };
    white: {
      darker: string;
      lighter: string;
    };
    aqua: {
      aqua1: string;
      aqua2: string;
      aqua3: string;
      aqua4: string;
    };
  }
}
