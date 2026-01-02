
export interface GroundingSource {
  title: string;
  uri: string;
}

export interface GeneratedGuide {
  title: string;
  summary: string;
  sections: {
    id: string;
    title: string;
    content: string;
  }[];
  sources: GroundingSource[];
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
