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

export const totalMusCalculator = (scoreSets: ScoreSet[], competitor: Quartet | Chorus | undefined, contestId: number) => {
    let totalMusScore = 0;
    if(competitor === undefined) {
        console.log("Oops, competitor is undefined.")
     }
    scoreSets.forEach(scoreSet => {
        if ((scoreSet.quartet?.id === competitor?.id || scoreSet.chorus?.id === competitor?.id) && contestId === scoreSet.contest.id) {
            totalMusScore += scoreSet.mus;
        }
    })
    return (totalMusScore)
}

export const totalPerfCalculator = (scoreSets: ScoreSet[], competitor: Quartet | Chorus | undefined, contestId: number) => {
    let totalPerfScore = 0;
    if(competitor === undefined) {
        console.log("Oops, competitor is undefined.")
     }
    scoreSets.forEach(scoreSet => {
        if ((scoreSet.quartet?.id === competitor?.id || scoreSet.chorus?.id === competitor?.id) && contestId === scoreSet.contest.id) {
            totalPerfScore += scoreSet.perf;
        }
    })
    return (totalPerfScore)
}

export const totalSingCalculator = (scoreSets: ScoreSet[], competitor: Quartet | Chorus | undefined, contestId: number) => {
    let totalSingScore = 0;
    if(competitor === undefined) {
        console.log("Oops, competitor is undefined.")
     }
    scoreSets.forEach(scoreSet => {
        if ((scoreSet.quartet?.id === competitor?.id || scoreSet.chorus?.id === competitor?.id) && contestId === scoreSet.contest.id) {
            totalSingScore += scoreSet.sing;
        }
    })
    return (totalSingScore)
}

export const totalScoreCalculator = (scoreSets: ScoreSet[], competitor: Quartet | Chorus | undefined, contestId: number) => {
    let totalScore = 0;
    if(competitor === undefined) {
        console.log("Oops, competitor is undefined.")
     }
    scoreSets.forEach(scoreSet => {
        if ((scoreSet.quartet?.id === competitor?.id || scoreSet.chorus?.id === competitor?.id) && contestId === scoreSet.contest.id) {
            totalScore += scoreSet.mus + scoreSet.perf + scoreSet.sing;
        }
    })
    return (totalScore)
}

export const roundTotalMusCalculator = (scoreSets: ScoreSet[], competitor: Quartet | Chorus | undefined, roundNumber: number, contestId: number) => {
    let roundTotalMusScore = 0;
    if(competitor === undefined) {
        console.log("Oops, competitor is undefined.")
     }
    scoreSets.forEach(scoreSet => {
        if ((scoreSet.quartet?.id === competitor?.id || scoreSet.chorus?.id === competitor?.id) && scoreSet.roundNumber === roundNumber && contestId === scoreSet.contest.id) {
            roundTotalMusScore += scoreSet.mus;
        }
    })
    return (roundTotalMusScore)
}

export const roundTotalPerfCalculator = (scoreSets: ScoreSet[], competitor: Quartet | Chorus | undefined, roundNumber: number, contestId: number) => {
    let roundTotalPerfScore = 0;
    if(competitor === undefined) {
        console.log("Oops, competitor is undefined.")
     }
    scoreSets.forEach(scoreSet => {
        if ((scoreSet.quartet?.id === competitor?.id || scoreSet.chorus?.id === competitor?.id) && scoreSet.roundNumber === roundNumber && contestId === scoreSet.contest.id) {
            roundTotalPerfScore += scoreSet.perf;
        }
    })
    return (roundTotalPerfScore)
}

export const roundTotalSingCalculator = (scoreSets: ScoreSet[], competitor: Quartet | Chorus | undefined, roundNumber: number, contestId: number) => {
    let roundTotalSingScore = 0;
    if(competitor === undefined) {
        console.log("Oops, competitor is undefined.")
     }
    scoreSets.forEach(scoreSet => {
        if ((scoreSet.quartet?.id === competitor?.id || scoreSet.chorus?.id === competitor?.id) && scoreSet.roundNumber === roundNumber && contestId === scoreSet.contest.id) {
            roundTotalSingScore += scoreSet.sing;
        }
    })
    return (roundTotalSingScore)
}

export const roundTotalScoreCalculator = (scoreSets: ScoreSet[], competitor: Quartet | Chorus | undefined, roundNumber: number, contestId: number) => {
    let roundTotalScore = 0;
    if(competitor === undefined) {
        console.log("Oops, competitor is undefined.")
     }
    scoreSets.forEach(scoreSet => {
        if ((scoreSet.quartet?.id === competitor?.id || scoreSet.chorus?.id === competitor?.id) && scoreSet.roundNumber === roundNumber && contestId === scoreSet.contest.id) {
            roundTotalScore += scoreSet.mus + scoreSet.perf + scoreSet.sing;
        }
    })
    return (roundTotalScore)
}

export const placementFinder = (scoreSets: ScoreSet[], contest: Contest, competitor: Quartet | Chorus) => {
    let i;
    for (i in scoreSets) {
    if (scoreSets[i].contest.id === contest.id && (scoreSets[i].chorus?.id === competitor.id || scoreSets[i].quartet?.id === competitor.id )){
        console.log(scoreSets[i].place);
        return scoreSets[i].place}
    }


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

export const getQuartetBySearchQuery = async (query: string): Promise<Quartet[]> => {
    const response = await fetch(`http://localhost:5000/quartets/search?=${query}`);
    const contestListResponse: ListResponse<Quartet> = await response.json();
    return contestListResponse.items;
}

export const getChorusBySearchQuery = async (query: string): Promise<Chorus[]> => {
    const response = await fetch(`http://localhost:5000/choruses/search?=${query}`);
    const contestListResponse: ListResponse<Chorus> = await response.json();
    return contestListResponse.items;
}

export const getSongBySearchQuery = async (query: string): Promise<Song[]> => {
    const response = await fetch(`http://localhost:5000/songs/search?=${query}`);
    const contestListResponse: ListResponse<Song> = await response.json();
    return contestListResponse.items;
}