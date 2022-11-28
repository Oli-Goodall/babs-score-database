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
    panelSize: number;
    totalRounds: number;
}

export interface ScoreSet {
    id: number;
    mus: number;
    perf: number;
    sing: number;
    quartet?: Quartet;
    chorus?: Chorus;
    song: Song;
    contest: Contest;
    roundNumber: number;
    place: number;
}

export interface Quartet {
    id: number | undefined;
    name: string | undefined;
}

export interface Chorus {
    id: number | undefined;
    name: string | undefined;
}

export interface Song {
    id: number;
    name: string;
}

export const totalMusCalculator = (scoreSets: ScoreSet[], quartet: Quartet | undefined) => {
    let totalMusScore = 0;
    if(quartet === undefined) {
        console.log("Oops, quartet is undefined.")
     }
    scoreSets.forEach(scoreSet => {
        if (scoreSet.quartet?.id === quartet?.id) {
            totalMusScore += scoreSet.mus;
        }
    })
    return (totalMusScore)
}

export const totalPerfCalculator = (scoreSets: ScoreSet[], quartet: Quartet | undefined) => {
    let totalPerfScore = 0;
    if(quartet === undefined) {
        console.log("Oops, quartet is undefined.")
     }
    scoreSets.forEach(scoreSet => {
        if (scoreSet.quartet?.id === quartet?.id) {
            totalPerfScore += scoreSet.perf;
        }
    })
    return (totalPerfScore)
}

export const totalSingCalculator = (scoreSets: ScoreSet[], quartet: Quartet | undefined) => {
    let totalSingScore = 0;
    if(quartet === undefined) {
        console.log("Oops, quartet is undefined.")
     }
    scoreSets.forEach(scoreSet => {
        if (scoreSet.quartet?.id === quartet?.id) {
            totalSingScore += scoreSet.sing;
        }
    })
    return (totalSingScore)
}

export const totalScoreCalculator = (scoreSets: ScoreSet[], quartet: Quartet | undefined) => {
    let totalScore = 0;
    if(quartet === undefined) {
        console.log("Oops, quartet is undefined.")
     }
    scoreSets.forEach(scoreSet => {
        if (scoreSet.quartet?.id === quartet?.id) {
            totalScore += scoreSet.mus + scoreSet.perf + scoreSet.sing;
        }
    })
    return (totalScore)
}

export const roundTotalMusCalculator = (scoreSets: ScoreSet[], quartet: Quartet | undefined, roundNumber: number) => {
    let roundTotalMusScore = 0;
    if(quartet === undefined) {
        console.log("Oops, quartet is undefined.")
     }
    scoreSets.forEach(scoreSet => {
        if (scoreSet.quartet?.id === quartet?.id && scoreSet.roundNumber === roundNumber) {
            roundTotalMusScore += scoreSet.mus;
        }
    })
    return (roundTotalMusScore)
}

export const roundTotalPerfCalculator = (scoreSets: ScoreSet[], quartet: Quartet | undefined, roundNumber: number) => {
    let roundTotalPerfScore = 0;
    if(quartet === undefined) {
        console.log("Oops, quartet is undefined.")
     }
    scoreSets.forEach(scoreSet => {
        if (scoreSet.quartet?.id === quartet?.id && scoreSet.roundNumber === roundNumber) {
            roundTotalPerfScore += scoreSet.perf;
        }
    })
    return (roundTotalPerfScore)
}

export const roundTotalSingCalculator = (scoreSets: ScoreSet[], quartet: Quartet | undefined, roundNumber: number) => {
    let roundTotalSingScore = 0;
    if(quartet === undefined) {
        console.log("Oops, quartet is undefined.")
     }
    scoreSets.forEach(scoreSet => {
        if (scoreSet.quartet?.id === quartet?.id && scoreSet.roundNumber === roundNumber) {
            roundTotalSingScore += scoreSet.sing;
        }
    })
    return (roundTotalSingScore)
}

export const roundTotalScoreCalculator = (scoreSets: ScoreSet[], quartet: Quartet | undefined, roundNumber: number) => {
    let roundTotalScore = 0;
    if(quartet === undefined) {
       console.log("Oops, quartet is undefined.")
    }
    scoreSets.forEach(scoreSet => {
        if (scoreSet.quartet?.id === quartet?.id && scoreSet.roundNumber === roundNumber) {
            roundTotalScore += scoreSet.mus + scoreSet.perf + scoreSet.sing;
        }
    })
    return (roundTotalScore)
}

export const getAllQuartetContests = async (): Promise<Contest[]> => {
    const response = await fetch(`http://localhost:5000/contests/quartets/contestList`);
    const contestListResponse: ListResponse<Contest> = await response.json();
    return contestListResponse.items;
}

export const getAllChorusContests = async (): Promise<Contest[]> => {
    const response = await fetch(`http://localhost:5000/contests/choruses/contestList`);
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

export const getScoreSetsByQuartetId = async (id: number): Promise<ScoreSet[]> => {
    const response = await fetch(`http://localhost:5000/quartets/${id}`);
    const contestListResponse: ListResponse<ScoreSet> = await response.json();
    return contestListResponse.items;
}

export const getScoreSetsByChorusId = async (id: number): Promise<ScoreSet[]> => {
    const response = await fetch(`http://localhost:5000/choruses/${id}`);
    const contestListResponse: ListResponse<ScoreSet> = await response.json();
    return contestListResponse.items;
}

export const getScoreSetsBySongId = async (id: number): Promise<ScoreSet[]> => {
    const response = await fetch(`http://localhost:5000/songs/${id}`);
    const contestListResponse: ListResponse<ScoreSet> = await response.json();
    return contestListResponse.items;
}
