const backendUrl = process.env["REACT_APP_BACKEND_DOMAIN"];

export interface ListResponse<T> {
    items: T[];
  }

export interface Contest {
    id: number;
    name: string;
    year: number;
    contestType: number;
    
}

export const getAllContests = async (): Promise<Contest[]> => {
    const response = await fetch(`http://localhost:5000/contests`);
    const contestListResponse: ListResponse<Contest> = await response.json();
    return contestListResponse.items;
}

export const getContestsByYear = async (year: number): Promise<Contest[]> => {
    const response = await fetch(`http://localhost:5000/contests/${year}`);
    const contestListResponse: ListResponse<Contest> = await response.json();
    return contestListResponse.items;
}