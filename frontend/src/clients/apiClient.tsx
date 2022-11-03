const backendUrl = process.env["REACT_APP_BACKEND_DOMAIN"];

export interface ListResponse<T> {
    items: T[];
  }

export interface Contest {
    id: number;
    year: number;
    name: string;
}

export const getAllContests = async (): Promise<Contest[]> => {
    const response = await fetch(`${backendUrl}/contests`);
    const contestListResponse: ListResponse<Contest> = await response.json();
    return contestListResponse.items;
}