export interface LegendsConfig {
  fontSize: string;
  reducedFontSize: number;
}

export interface params {
  size?: "sm" | "lg";
  gap?: number;
  xAxisLegends?: LegendsConfig;
  yAxisLegends?: LegendsConfig;
}

export interface StyleClasses {
  classes: {
    main_container: string;
    blocks: string;
    xAxisLegends: string;
    yAxisLegends: string;
    xAxisName: string;
    yAxisName: string;
  };
}
export interface LegendsAndAxisNames {
  classes: {
    main_container: string;
    blocks: string;
    xAxisLegends: string;
    yAxisLegends: string;
    xAxisName: string;
    yAxisName: string;
  };
  row: number;
  col: number;
}
