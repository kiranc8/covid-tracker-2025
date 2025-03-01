export interface CovidDataState {
  selectedRegion: string;
  loading: boolean;
  covidStat: CovidStat;
  statHistory:StatHistory[]
}

export interface CovidStat {
  summary: Summary;
  unofficialSummary: UnofficialSummary[];
  regional: Regional[];
  lastRefreshed: string;
  lastOriginUpdate: string;
}

export interface Summary {
  total: number;
  confirmedCasesIndian: number;
  confirmedCasesForeign: number;
  discharged: number;
  deaths: number;
  confirmedButLocationUndefined: number;
}

export interface UnofficialSummary {
  source: string;
  total: number;
  recovered: number;
  deaths: number;
  active: number;
}

export interface Regional {
  loc: string;
  confirmedCasesIndian: number;
  confirmedCasesForeign: number;
  discharged: number;
  deaths: number;
  totalConfirmed: number;
}

export interface StatHistory {
  day: string;
  summary: Summary;
  regional: Regional[];
}

export interface ErrorInterface {
  message: string;
}
