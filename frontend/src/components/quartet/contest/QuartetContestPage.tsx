import { Switch, FormControlLabel, FormGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ScoreSet, getScoreSetsByContestId, Quartet, totalMusCalculator, totalPerfCalculator, roundTotalMusCalculator, roundTotalPerfCalculator, roundTotalScoreCalculator, roundTotalSingCalculator, totalScoreCalculator, totalSingCalculator, placementFinder } from "../../../clients/apiClient";
import { Link, useParams } from "react-router-dom";

export const QuartetContestPage: React.FC = () => {
    const [scoreSets, setScoreSets] = useState<ScoreSet[]>();
    const [showRawScores, setShowRawScores] = useState(false);
    const quartets: Quartet[] = [];

    const { contestId } = useParams<{ contestId: string }>();

    useEffect(() => {
        getScoreSetsByContestId(parseInt(contestId)).then(setScoreSets);
    }, []);

    function containsObject(obj: Quartet, list: Quartet[]) {
        let i;
        for (i in list) {
            if (list[i].id === obj.id) {
                return true;
            }
        }
        return false;
    }

    scoreSets?.forEach(scoreset => {
        if (scoreset.quartet !== undefined && containsObject(scoreset.quartet, quartets) === false) {
            quartets.push(scoreset.quartet)
        }
    })

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
                            if (scoreSets[0].contest.totalRounds === 2) {
                                return (<TableBody key={quartet.name}>
                                    <TableRow>
                                        <TableCell rowSpan={8}>{placementFinder(scoreSets, scoreSets[0].contest, quartet)}</TableCell>
                                        <TableCell rowSpan={8}>
                                            <Link to={`/quartets/${quartet.id}`}>{quartet.name}</Link>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total</TableCell>
                                        <TableCell />
                                        <TableCell>{totalMusCalculator(scoreSets, quartet, scoreSets[0].contest.id)}</TableCell>
                                        <TableCell>{totalPerfCalculator(scoreSets, quartet, scoreSets[0].contest.id)}</TableCell>
                                        <TableCell>{totalSingCalculator(scoreSets, quartet, scoreSets[0].contest.id)}</TableCell>
                                        <TableCell>{totalScoreCalculator(scoreSets, quartet, scoreSets[0].contest.id)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Finals</TableCell>
                                        <TableCell />
                                        <TableCell>{roundTotalMusCalculator(scoreSets, quartet, 1, scoreSets[0].contest.id)}</TableCell>
                                        <TableCell>{roundTotalPerfCalculator(scoreSets, quartet, 1, scoreSets[0].contest.id)}</TableCell>
                                        <TableCell>{roundTotalSingCalculator(scoreSets, quartet, 1, scoreSets[0].contest.id)}</TableCell>
                                        <TableCell>{roundTotalScoreCalculator(scoreSets, quartet, 1, scoreSets[0].contest.id)}</TableCell>
                                    </TableRow>
                                    {scoreSets.map(scoreSet => {
                                        if (scoreSet.roundNumber === 1 && scoreSet.quartet?.id === quartet.id) {
                                            return (<TableRow key={scoreSet.song.name}>
                                                <TableCell />
                                                <TableCell>
                                                    <Link to={`/songs/${scoreSet.song.id}`}>{scoreSet.song.name}</Link>
                                                </TableCell>
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
                                        <TableCell>{roundTotalMusCalculator(scoreSets, quartet, 2, scoreSets[0].contest.id)}</TableCell>
                                        <TableCell>{roundTotalPerfCalculator(scoreSets, quartet, 2, scoreSets[0].contest.id)}</TableCell>
                                        <TableCell>{roundTotalSingCalculator(scoreSets, quartet, 2, scoreSets[0].contest.id)}</TableCell>
                                        <TableCell>{roundTotalScoreCalculator(scoreSets, quartet, 2, scoreSets[0].contest.id)}</TableCell>
                                    </TableRow>
                                    {scoreSets.map(scoreSet => {
                                        if (scoreSet.roundNumber === 2 && scoreSet.quartet?.id === quartet.id) {
                                            return (<TableRow key={scoreSet.song.name}>
                                                <TableCell />
                                                <TableCell>
                                                    <Link to={`/songs/${scoreSet.song.id}`}>{scoreSet.song.name}</Link>
                                                </TableCell>
                                                <TableCell>{scoreSet.mus}</TableCell>
                                                <TableCell>{scoreSet.perf}</TableCell>
                                                <TableCell>{scoreSet.sing}</TableCell>
                                                <TableCell>{scoreSet.mus + scoreSet.perf + scoreSet.sing}</TableCell>
                                            </TableRow>)
                                        }
                                    })}
                                </TableBody>)
                            }
                            else {
                                return (<TableBody key={quartet.name}>
                                    <TableRow>
                                        <TableCell rowSpan={8}>{placementFinder(scoreSets, scoreSets[0].contest, quartet)}</TableCell>
                                        <TableCell rowSpan={8}>
                                            <Link to={`/quartets/${quartet.id}`}>{quartet.name}</Link>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total</TableCell>
                                        <TableCell />
                                        <TableCell>{totalMusCalculator(scoreSets, quartet, scoreSets[0].contest.id)}</TableCell>
                                        <TableCell>{totalPerfCalculator(scoreSets, quartet, scoreSets[0].contest.id)}</TableCell>
                                        <TableCell>{totalSingCalculator(scoreSets, quartet, scoreSets[0].contest.id)}</TableCell>
                                        <TableCell>{totalScoreCalculator(scoreSets, quartet, scoreSets[0].contest.id)}</TableCell>
                                    </TableRow>
                                    {scoreSets.map(scoreSet => {
                                        if (scoreSet.contest.id === quartet.id) {
                                            return (<TableRow key={scoreSet.song.name}>
                                                <TableCell />
                                                <TableCell>
                                                    <Link to={`/songs/${scoreSet.song.id}`}>{scoreSet.song.name}</Link>
                                                </TableCell>
                                                <TableCell>{scoreSet.mus}</TableCell>
                                                <TableCell>{scoreSet.perf}</TableCell>
                                                <TableCell>{scoreSet.sing}</TableCell>
                                                <TableCell>{scoreSet.mus + scoreSet.perf + scoreSet.sing}</TableCell>
                                            </TableRow>)
                                        }
                                    })}
                                </TableBody>)
                            }
                        })}
                    </Table>
                </TableContainer>
            </div>)

                :

                (<div className="contest-page">
                    <TableContainer component={Paper}>
                        <Table aria-label="contest-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Place</TableCell>
                                    <TableCell>Quartet</TableCell>
                                    <TableCell>Round</TableCell>
                                    <TableCell>Songs</TableCell>
                                    <TableCell>Mus %</TableCell>
                                    <TableCell>Perf %</TableCell>
                                    <TableCell>Sing %</TableCell>
                                    <TableCell>Total %</TableCell>
                                </TableRow>
                            </TableHead>
                            {quartets.map(quartet => {
                                if (scoreSets[0].contest.totalRounds === 2) {
                                    return (<TableBody key={quartet.name}>
                                        <TableRow>
                                            <TableCell rowSpan={8}>{placementFinder(scoreSets, scoreSets[0].contest, quartet)}</TableCell>
                                            <TableCell rowSpan={8}>
                                                <Link to={`/quartets/${quartet.id}`}>{quartet.name}</Link>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Total</TableCell>
                                            <TableCell />
                                            <TableCell>{(((totalMusCalculator(scoreSets, quartet, scoreSets[0].contest.id)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalPerfCalculator(scoreSets, quartet, scoreSets[0].contest.id)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalSingCalculator(scoreSets, quartet, scoreSets[0].contest.id)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalScoreCalculator(scoreSets, quartet, scoreSets[0].contest.id)) / 4) / (scoreSets[0].contest.panelSize)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Finals</TableCell>
                                            <TableCell />
                                            <TableCell>{(((roundTotalMusCalculator(scoreSets, quartet, 1, scoreSets[0].contest.id)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalPerfCalculator(scoreSets, quartet, 1, scoreSets[0].contest.id)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalSingCalculator(scoreSets, quartet, 1, scoreSets[0].contest.id)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalScoreCalculator(scoreSets, quartet, 1, scoreSets[0].contest.id)) / 2) / (scoreSets[0].contest.panelSize)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        {scoreSets.map(scoreSet => {
                                            if (scoreSet.roundNumber === 1 && scoreSet.quartet?.id === quartet.id) {
                                                return (<TableRow key={scoreSet.song.name}>
                                                    <TableCell />
                                                    <TableCell>
                                                        <Link to={`/songs/${scoreSet.song.id}`}>{scoreSet.song.name}</Link>
                                                    </TableCell>
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
                                            <TableCell>{(((roundTotalMusCalculator(scoreSets, quartet, 2, scoreSets[0].contest.id)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalPerfCalculator(scoreSets, quartet, 2, scoreSets[0].contest.id)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalSingCalculator(scoreSets, quartet, 2, scoreSets[0].contest.id)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalScoreCalculator(scoreSets, quartet, 2, scoreSets[0].contest.id)) / 2) / (scoreSets[0].contest.panelSize)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        {scoreSets.map(scoreSet => {
                                            if (scoreSet.roundNumber === 2 && scoreSet.quartet?.id === quartet.id) {
                                                return (<TableRow key={scoreSet.song.name}>
                                                    <TableCell />
                                                    <TableCell>
                                                        <Link to={`/songs/${scoreSet.song.id}`}>{scoreSet.song.name}</Link>
                                                    </TableCell>
                                                    <TableCell>{(scoreSet.mus / (scoreSet.contest.panelSize / 3)).toFixed(2)}</TableCell>
                                                    <TableCell>{(scoreSet.perf / (scoreSet.contest.panelSize / 3)).toFixed(2)}</TableCell>
                                                    <TableCell>{(scoreSet.sing / (scoreSet.contest.panelSize / 3)).toFixed(2)}</TableCell>
                                                    <TableCell>{((scoreSet.mus + scoreSet.perf + scoreSet.sing) / scoreSet.contest.panelSize).toFixed(2)}</TableCell>
                                                </TableRow>)
                                            }
                                        })}
                                    </TableBody>)
                                }
                                else {
                                    return (<TableBody key={quartet.name}>
                                        <TableRow>
                                            <TableCell rowSpan={8}>{placementFinder(scoreSets, scoreSets[0].contest, quartet)}</TableCell>
                                            <TableCell rowSpan={8}>
                                                <Link to={`/quartets/${quartet.id}`}>{quartet.name}</Link>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Total</TableCell>
                                            <TableCell />
                                            <TableCell>{(((totalMusCalculator(scoreSets, quartet, scoreSets[0].contest.id)) / (scoreSets[0].contest.panelSize / 3) / 2)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalPerfCalculator(scoreSets, quartet, scoreSets[0].contest.id)) / (scoreSets[0].contest.panelSize / 3) / 2)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalSingCalculator(scoreSets, quartet, scoreSets[0].contest.id)) / (scoreSets[0].contest.panelSize / 3) / 2)).toFixed(2)}</TableCell>
                                            <TableCell>{((totalScoreCalculator(scoreSets, quartet, scoreSets[0].contest.id)) / (scoreSets[0].contest.panelSize) / 2).toFixed(2)}</TableCell>
                                        </TableRow>
                                        {scoreSets.map(scoreSet => {
                                            if (scoreSet.quartet?.id === quartet?.id) {
                                                return (<TableRow key={scoreSet.song.name}>
                                                    <TableCell />
                                                    <TableCell>
                                                        <Link to={`/songs/${scoreSet.song.id}`}>{scoreSet.song.name}</Link>
                                                    </TableCell>
                                                    <TableCell>{(scoreSet.mus / (scoreSet.contest.panelSize / 3)).toFixed(2)}</TableCell>
                                                    <TableCell>{(scoreSet.perf / (scoreSet.contest.panelSize / 3)).toFixed(2)}</TableCell>
                                                    <TableCell>{(scoreSet.sing / (scoreSet.contest.panelSize / 3)).toFixed(2)}</TableCell>
                                                    <TableCell>{((scoreSet.mus + scoreSet.perf + scoreSet.sing) / scoreSet.contest.panelSize).toFixed(2)}</TableCell>
                                                </TableRow>)
                                            }
                                        })}
                                    </TableBody>)
                                }
                            })
                            }</Table>
                    </TableContainer>
                </div>)}
        </>
    )
}
