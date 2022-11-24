import { Switch, FormControlLabel, FormGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ScoreSet, getScoreSetsByContestId } from "../../clients/apiClient";
import { Link, useParams } from "react-router-dom";

export const ContestPage: React.FC = () => {
    const [scoreSets, setScoreSets] = useState<ScoreSet[]>();
    const [showRawScores, setShowRawScores] = useState(false);
    const quartets: string[] = [];

    const { contestId } = useParams<{ contestId: string }>();

    useEffect(() => {
        getScoreSetsByContestId(parseInt(contestId)).then(setScoreSets);
    }, []);

    scoreSets?.forEach(scoreset => {
        if (scoreset.quartet !== undefined && quartets?.indexOf(scoreset.quartet.name) === -1) {
            quartets.push(scoreset.quartet.name)
        }
    })

    const totalMusCalculator = (scoreSets: ScoreSet[], quartet: string) => {
        let totalMusScore = 0;
        scoreSets.forEach(scoreSet => {
            if (scoreSet.quartet?.name === quartet) {
                totalMusScore += scoreSet.mus;
            }
        })
        return (totalMusScore)
    }

    const totalPerfCalculator = (scoreSets: ScoreSet[], quartet: string) => {
        let totalPerfScore = 0;
        scoreSets.forEach(scoreSet => {
            if (scoreSet.quartet?.name === quartet) {
                totalPerfScore += scoreSet.perf;
            }
        })
        return (totalPerfScore)
    }

    const totalSingCalculator = (scoreSets: ScoreSet[], quartet: string) => {
        let totalSingScore = 0;
        scoreSets.forEach(scoreSet => {
            if (scoreSet.quartet?.name === quartet) {
                totalSingScore += scoreSet.sing;
            }
        })
        return (totalSingScore)
    }

    const totalScoreCalculator = (scoreSets: ScoreSet[], quartet: string) => {
        let totalScore = 0;
        scoreSets.forEach(scoreSet => {
            if (scoreSet.quartet?.name === quartet) {
                totalScore += scoreSet.mus + scoreSet.perf + scoreSet.sing;
            }
        })
        return (totalScore)
    }

    const roundTotalMusCalculator = (scoreSets: ScoreSet[], quartet: string, roundNumber: number) => {
        let roundTotalMusScore = 0;
        scoreSets.forEach(scoreSet => {
            if (scoreSet.quartet?.name === quartet && scoreSet.roundNumber === roundNumber) {
                roundTotalMusScore += scoreSet.mus;
            }
        })
        return (roundTotalMusScore)
    }

    const roundTotalPerfCalculator = (scoreSets: ScoreSet[], quartet: string, roundNumber: number) => {
        let roundTotalPerfScore = 0;
        scoreSets.forEach(scoreSet => {
            if (scoreSet.quartet?.name === quartet && scoreSet.roundNumber === roundNumber) {
                roundTotalPerfScore += scoreSet.perf;
            }
        })
        return (roundTotalPerfScore)
    }

    const roundTotalSingCalculator = (scoreSets: ScoreSet[], quartet: string, roundNumber: number) => {
        let roundTotalSingScore = 0;
        scoreSets.forEach(scoreSet => {
            if (scoreSet.quartet?.name === quartet && scoreSet.roundNumber === roundNumber) {
                roundTotalSingScore += scoreSet.sing;
            }
        })
        return (roundTotalSingScore)
    }

    const roundTotalScoreCalculator = (scoreSets: ScoreSet[], quartet: string, roundNumber: number) => {
        let roundTotalScore = 0;
        scoreSets.forEach(scoreSet => {
            if (scoreSet.quartet?.name === quartet && scoreSet.roundNumber === roundNumber) {
                roundTotalScore += scoreSet.mus + scoreSet.perf + scoreSet.sing;
            }
        })
        return (roundTotalScore)
    }

    if (scoreSets === undefined) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>{scoreSets[0].contest.name}</h1>
            <FormGroup>
                <FormControlLabel control={<Switch onChange={() => { setShowRawScores(!showRawScores) }} />} label="Show raw scores" />
            </FormGroup>
            {showRawScores ? (<div className="contest-page">
                {scoreSets[0].contest.totalRounds === 2 ?
                    <TableContainer component={Paper}>
                        <Table aria-label="contest-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Place</TableCell>
                                    <TableCell>Quartet</TableCell>
                                    <TableCell>Round</TableCell>
                                    <TableCell>Songs</TableCell>
                                    <TableCell>Mus</TableCell>
                                    <TableCell>Perf</TableCell>
                                    <TableCell>Sing</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            {quartets.map(quartet => {
                                return (<TableBody key={quartet}>
                                    <TableRow>
                                        <TableCell rowSpan={8}>{quartets.indexOf(quartet) + 1}</TableCell>
                                        <TableCell rowSpan={8}>{quartet}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total</TableCell>
                                        <TableCell />
                                        <TableCell>{totalMusCalculator(scoreSets, quartet)}</TableCell>
                                        <TableCell>{totalPerfCalculator(scoreSets, quartet)}</TableCell>
                                        <TableCell>{totalSingCalculator(scoreSets, quartet)}</TableCell>
                                        <TableCell>{totalScoreCalculator(scoreSets, quartet)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Finals</TableCell>
                                        <TableCell />
                                        <TableCell>{roundTotalMusCalculator(scoreSets, quartet, 1)}</TableCell>
                                        <TableCell>{roundTotalPerfCalculator(scoreSets, quartet, 1)}</TableCell>
                                        <TableCell>{roundTotalSingCalculator(scoreSets, quartet, 1)}</TableCell>
                                        <TableCell>{roundTotalScoreCalculator(scoreSets, quartet, 1)}</TableCell>
                                    </TableRow>
                                    {scoreSets.map(scoreSet => {
                                        if (scoreSet.roundNumber === 1 && scoreSet.quartet?.name === quartet) {
                                            return (<TableRow key={scoreSet.song.name}>
                                                <TableCell />
                                                <TableCell>{scoreSet.song.name}</TableCell>
                                                <TableCell>{scoreSet.mus}</TableCell>
                                                <TableCell>{scoreSet.perf}</TableCell>
                                                <TableCell>{scoreSet.sing}</TableCell>
                                                <TableCell>{scoreSet.mus + scoreSet.perf + scoreSet.sing}</TableCell>
                                            </TableRow>)
                                        }
                                    })}
                                    <TableRow>
                                        <TableCell>Semi-finals</TableCell>
                                        <TableCell />
                                        <TableCell>{roundTotalMusCalculator(scoreSets, quartet, 2)}</TableCell>
                                        <TableCell>{roundTotalPerfCalculator(scoreSets, quartet, 2)}</TableCell>
                                        <TableCell>{roundTotalSingCalculator(scoreSets, quartet, 2)}</TableCell>
                                        <TableCell>{roundTotalScoreCalculator(scoreSets, quartet, 2)}</TableCell>
                                    </TableRow>
                                    {scoreSets.map(scoreSet => {
                                        if (scoreSet.roundNumber === 2 && scoreSet.quartet?.name === quartet) {
                                            return (<TableRow key={scoreSet.song.name}>
                                                <TableCell />
                                                <TableCell>{scoreSet.song.name}</TableCell>
                                                <TableCell>{scoreSet.mus}</TableCell>
                                                <TableCell>{scoreSet.perf}</TableCell>
                                                <TableCell>{scoreSet.sing}</TableCell>
                                                <TableCell>{scoreSet.mus + scoreSet.perf + scoreSet.sing}</TableCell>
                                            </TableRow>)
                                        }
                                    })}
                                </TableBody>)
                            })}
                        </Table>
                    </TableContainer>

                    :

                    <TableContainer component={Paper}>
                        <Table aria-label="contest table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Place</TableCell>
                                    <TableCell>Quartet</TableCell>
                                    <TableCell>Round</TableCell>
                                    <TableCell>Songs</TableCell>
                                    <TableCell>Mus</TableCell>
                                    <TableCell>Perf</TableCell>
                                    <TableCell>Sing</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            {quartets.map(quartet => {
                                return (<TableBody key={quartet}>
                                    <TableRow>
                                        <TableCell rowSpan={8}>{quartets.indexOf(quartet) + 1}</TableCell>
                                        <TableCell rowSpan={8}>{quartet}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total</TableCell>
                                        <TableCell />
                                        <TableCell>{totalMusCalculator(scoreSets, quartet)}</TableCell>
                                        <TableCell>{totalPerfCalculator(scoreSets, quartet)}</TableCell>
                                        <TableCell>{totalSingCalculator(scoreSets, quartet)}</TableCell>
                                        <TableCell>{totalScoreCalculator(scoreSets, quartet)}</TableCell>
                                    </TableRow>
                                    {scoreSets.map(scoreSet => {
                                        if (scoreSet.quartet?.name === quartet) {
                                            return (<TableRow key={scoreSet.song.name}>
                                                <TableCell />
                                                <TableCell>{scoreSet.song.name}</TableCell>
                                                <TableCell>{scoreSet.mus}</TableCell>
                                                <TableCell>{scoreSet.perf}</TableCell>
                                                <TableCell>{scoreSet.sing}</TableCell>
                                                <TableCell>{scoreSet.mus + scoreSet.perf + scoreSet.sing}</TableCell>
                                            </TableRow>)
                                        }
                                    })}
                                </TableBody>)
                            })}
                        </Table>
                    </TableContainer>}
            </div>)

                :

                (<div className="contest-page">
                    {scoreSets[0].contest.totalRounds === 2 ?
                        <TableContainer component={Paper}>
                            <Table aria-label="contest-table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Place</TableCell>
                                        <TableCell>Quartet</TableCell>
                                        <TableCell>Round</TableCell>
                                        <TableCell>Songs</TableCell>
                                        <TableCell>Mus</TableCell>
                                        <TableCell>Perf</TableCell>
                                        <TableCell>Sing</TableCell>
                                        <TableCell>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                {quartets.map(quartet => {
                                    return (<TableBody key={quartet}>
                                        <TableRow>
                                            <TableCell rowSpan={8}>{quartets.indexOf(quartet) + 1}</TableCell>
                                            <TableCell rowSpan={8}>{quartet}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Total</TableCell>
                                            <TableCell />
                                            <TableCell>{(((totalMusCalculator(scoreSets, quartet)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalPerfCalculator(scoreSets, quartet)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalSingCalculator(scoreSets, quartet)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalScoreCalculator(scoreSets, quartet)) / 4) / (scoreSets[0].contest.panelSize)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Finals</TableCell>
                                            <TableCell />
                                            <TableCell>{(((roundTotalMusCalculator(scoreSets, quartet, 1)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalPerfCalculator(scoreSets, quartet, 1)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalSingCalculator(scoreSets, quartet, 1)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalScoreCalculator(scoreSets, quartet, 1)) / 2) / (scoreSets[0].contest.panelSize)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        {scoreSets.map(scoreSet => {
                                            if (scoreSet.roundNumber === 1 && scoreSet.quartet?.name === quartet) {
                                                return (<TableRow key={scoreSet.song.name}>
                                                    <TableCell />
                                                    <TableCell>{scoreSet.song.name}</TableCell>
                                                    <TableCell>{(scoreSet.mus / (scoreSet.contest.panelSize / 3)).toFixed(2)}</TableCell>
                                                    <TableCell>{(scoreSet.perf / (scoreSet.contest.panelSize / 3)).toFixed(2)}</TableCell>
                                                    <TableCell>{(scoreSet.sing / (scoreSet.contest.panelSize / 3)).toFixed(2)}</TableCell>
                                                    <TableCell>{((scoreSet.mus + scoreSet.perf + scoreSet.sing) / scoreSet.contest.panelSize).toFixed(2)}</TableCell>
                                                </TableRow>)
                                            }
                                        })}
                                        <TableRow>
                                            <TableCell>Semi-finals</TableCell>
                                            <TableCell />
                                            <TableCell>{(((roundTotalMusCalculator(scoreSets, quartet, 2)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalPerfCalculator(scoreSets, quartet, 2)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalSingCalculator(scoreSets, quartet, 2)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalScoreCalculator(scoreSets, quartet, 2)) / 2) / (scoreSets[0].contest.panelSize)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        {scoreSets.map(scoreSet => {
                                            if (scoreSet.roundNumber === 2 && scoreSet.quartet?.name === quartet) {
                                                return (<TableRow key={scoreSet.song.name}>
                                                    <TableCell />
                                                    <TableCell>{scoreSet.song.name}</TableCell>
                                                    <TableCell>{(scoreSet.mus / (scoreSet.contest.panelSize / 3)).toFixed(2)}</TableCell>
                                                    <TableCell>{(scoreSet.perf / (scoreSet.contest.panelSize / 3)).toFixed(2)}</TableCell>
                                                    <TableCell>{(scoreSet.sing / (scoreSet.contest.panelSize / 3)).toFixed(2)}</TableCell>
                                                    <TableCell>{((scoreSet.mus + scoreSet.perf + scoreSet.sing) / scoreSet.contest.panelSize).toFixed(2)}</TableCell>
                                                </TableRow>)
                                            }
                                        })}
                                    </TableBody>)
                                })}
                            </Table>
                        </TableContainer>

                        :

                        <TableContainer component={Paper}>
                            <Table aria-label="contest table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Place</TableCell>
                                        <TableCell>Quartet</TableCell>
                                        <TableCell>Round</TableCell>
                                        <TableCell>Songs</TableCell>
                                        <TableCell>Mus</TableCell>
                                        <TableCell>Perf</TableCell>
                                        <TableCell>Sing</TableCell>
                                        <TableCell>Total</TableCell>
                                    </TableRow>
                                </TableHead>
                                {quartets.map(quartet => {
                                    return (<TableBody key={quartet}>
                                        <TableRow>
                                            <TableCell rowSpan={8}>{quartets.indexOf(quartet) + 1}</TableCell>
                                            <TableCell rowSpan={8}>{quartet}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Total</TableCell>
                                            <TableCell />
                                            <TableCell>{(((totalMusCalculator(scoreSets, quartet)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalPerfCalculator(scoreSets, quartet)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalSingCalculator(scoreSets, quartet)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalScoreCalculator(scoreSets, quartet)) / 4) / (scoreSets[0].contest.panelSize)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        {scoreSets.map(scoreSet => {
                                            if (scoreSet.quartet?.name === quartet) {
                                                return (<TableRow key={scoreSet.song.name}>
                                                    <TableCell />
                                                    <TableCell>{scoreSet.song.name}</TableCell>
                                                    <TableCell>{(scoreSet.mus / (scoreSet.contest.panelSize / 3)).toFixed(2)}</TableCell>
                                                    <TableCell>{(scoreSet.perf / (scoreSet.contest.panelSize / 3)).toFixed(2)}</TableCell>
                                                    <TableCell>{(scoreSet.sing / (scoreSet.contest.panelSize / 3)).toFixed(2)}</TableCell>
                                                    <TableCell>{((scoreSet.mus + scoreSet.perf + scoreSet.sing) / scoreSet.contest.panelSize).toFixed(2)}</TableCell>
                                                </TableRow>)
                                            }
                                        })}
                                    </TableBody>)
                                })}
                            </Table>
                        </TableContainer>}
                </div>)}
        </>
    )
}