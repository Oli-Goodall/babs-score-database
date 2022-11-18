const backendUrl = process.env["REACT_APP_BACKEND_DOMAIN"];

export interface ListResponse<T> {
    items: T[];
  }
export interface Year {
    id: number;
    contestYear: number;
} 

export interface Contest {
    id: number;
    name: string;
    year: Year;
    contestType: number;
    
}

export interface ScoreSet {
    id: number;
    mus: number;
    perf: number;
    sing: number;
    quartet?: Quartet;
    chorus?: Chorus;
    song: Song;
}

export interface Quartet {
    id: number;
    name: string;
}

export interface Chorus {
    id: number;
    name: string;
}

export interface Song {
    id: number;
    name: string;
}

export const getAllContests = async (): Promise<Contest[]> => {
    const response = await fetch(`http://localhost:5000/contests`);
    const contestListResponse: ListResponse<Contest> = await response.json();
    return contestListResponse.items;
}

export const getContestsByYear = async (year: number): Promise<Contest[]> => {
    const response = await fetch(`http://localhost:5000/contests/year/${year}`);
    const contestListResponse: ListResponse<Contest> = await response.json();
    return contestListResponse.items;
}

export const getScoreSetsByContestId = async (id: number): Promise<ScoreSet[]> => {
    const response = await fetch(`http://localhost:5000/contests/${id}`);
    const contestListResponse: ListResponse<ScoreSet> = await response.json();
    return contestListResponse.items;
}