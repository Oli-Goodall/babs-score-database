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
    const response = await fetch(`http://${backendUrl}/contests`);
    const contestListResponse: ListResponse<Contest> = await response.json();
    return contestListResponse.items;
}

export const getContestsByYear = async (year: string): Promise<Contest[]> => {
    const response = await fetch(`http://${backendUrl}/contests/${year}`);
    const contestListResponse: ListResponse<Contest> = await response.json();
    return contestListResponse.items;
}