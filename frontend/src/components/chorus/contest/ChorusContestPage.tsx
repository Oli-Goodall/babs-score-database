import { Switch, FormControlLabel, FormGroup, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ScoreSet, getScoreSetsByContestId, Chorus, totalMusCalculator, totalPerfCalculator, roundTotalMusCalculator, roundTotalPerfCalculator, roundTotalScoreCalculator, roundTotalSingCalculator, totalScoreCalculator, totalSingCalculator } from "../../../clients/apiClient";
import { Link, useParams } from "react-router-dom";

export const ChorusContestPage: React.FC = () => {
    const [scoreSets, setScoreSets] = useState<ScoreSet[]>();
    const [showRawScores, setShowRawScores] = useState(false);
    const choruses: Chorus[] = [];

    const { contestId } = useParams<{ contestId: string }>();

    useEffect(() => {
        getScoreSetsByContestId(parseInt(contestId)).then(setScoreSets);
    }, []);

    function containsObject(obj: Chorus, list: Chorus[]) {
        let i;
        for (i in list) {
            if (list[i].id === obj.id) {
                return true;
            }
        }
        return false;
    }

    scoreSets?.forEach(scoreset => {
        if (scoreset.chorus !== undefined && containsObject(scoreset.chorus, choruses) === false) {
            choruses.push(scoreset.chorus)
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
                {scoreSets[0].contest.totalRounds === 2 ?
                    <TableContainer component={Paper}>
                        <Table aria-label="contest-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Place</TableCell>
                                    <TableCell>Chorus</TableCell>
                                    <TableCell>Round</TableCell>
                                    <TableCell>Songs</TableCell>
                                    <TableCell>Mus</TableCell>
                                    <TableCell>Perf</TableCell>
                                    <TableCell>Sing</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            {choruses.map(chorus => {
                                return (<TableBody key={chorus.name}>
                                    <TableRow>
                                        <TableCell rowSpan={8}>{choruses.indexOf(chorus) + 1}</TableCell>
                                        <TableCell rowSpan={8}>
                                            <Link to={`/choruses/${chorus.id}`}>{chorus.name}</Link>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total</TableCell>
                                        <TableCell />
                                        <TableCell>{totalMusCalculator(scoreSets, chorus)}</TableCell>
                                        <TableCell>{totalPerfCalculator(scoreSets, chorus)}</TableCell>
                                        <TableCell>{totalSingCalculator(scoreSets, chorus)}</TableCell>
                                        <TableCell>{totalScoreCalculator(scoreSets, chorus)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Finals</TableCell>
                                        <TableCell />
                                        <TableCell>{roundTotalMusCalculator(scoreSets, chorus, 1)}</TableCell>
                                        <TableCell>{roundTotalPerfCalculator(scoreSets, chorus, 1)}</TableCell>
                                        <TableCell>{roundTotalSingCalculator(scoreSets, chorus, 1)}</TableCell>
                                        <TableCell>{roundTotalScoreCalculator(scoreSets, chorus, 1)}</TableCell>
                                    </TableRow>
                                    {scoreSets.map(scoreSet => {
                                        if (scoreSet.roundNumber === 1 && scoreSet.chorus?.id === chorus.id) {
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
                                        <TableCell>{roundTotalMusCalculator(scoreSets, chorus, 2)}</TableCell>
                                        <TableCell>{roundTotalPerfCalculator(scoreSets, chorus, 2)}</TableCell>
                                        <TableCell>{roundTotalSingCalculator(scoreSets, chorus, 2)}</TableCell>
                                        <TableCell>{roundTotalScoreCalculator(scoreSets, chorus, 2)}</TableCell>
                                    </TableRow>
                                    {scoreSets.map(scoreSet => {
                                        if (scoreSet.roundNumber === 2 && scoreSet.chorus?.id === chorus.id) {
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
                            })}
                        </Table>
                    </TableContainer>

                    :

                    <TableContainer component={Paper}>
                        <Table aria-label="contest table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Place</TableCell>
                                    <TableCell>Chorus</TableCell>
                                    <TableCell>Round</TableCell>
                                    <TableCell>Songs</TableCell>
                                    <TableCell>Mus</TableCell>
                                    <TableCell>Perf</TableCell>
                                    <TableCell>Sing</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            {choruses.map(chorus => {
                                return (<TableBody key={chorus.name}>
                                    <TableRow>
                                        <TableCell rowSpan={8}>{choruses.indexOf(chorus) + 1}</TableCell>
                                        <TableCell rowSpan={8}>
                                            <Link to={`/choruses/${chorus.id}`}>{chorus.name}</Link>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total</TableCell>
                                        <TableCell />
                                        <TableCell>{totalMusCalculator(scoreSets, chorus)}</TableCell>
                                        <TableCell>{totalPerfCalculator(scoreSets, chorus)}</TableCell>
                                        <TableCell>{totalSingCalculator(scoreSets, chorus)}</TableCell>
                                        <TableCell>{totalScoreCalculator(scoreSets, chorus)}</TableCell>
                                    </TableRow>
                                    {scoreSets.map(scoreSet => {
                                        if (scoreSet.chorus?.id === chorus.id) {
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
                                        <TableCell>Chorus</TableCell>
                                        <TableCell>Round</TableCell>
                                        <TableCell>Songs</TableCell>
                                        <TableCell>Mus %</TableCell>
                                        <TableCell>Perf %</TableCell>
                                        <TableCell>Sing %</TableCell>
                                        <TableCell>Total %</TableCell>
                                    </TableRow>
                                </TableHead>
                                {choruses.map(chorus => {
                                    return (<TableBody key={chorus.name}>
                                        <TableRow>
                                            <TableCell rowSpan={8}>{choruses.indexOf(chorus) + 1}</TableCell>
                                            <TableCell rowSpan={8}>
                                                <Link to={`/choruses/${chorus.id}`}>{chorus.name}</Link>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Total</TableCell>
                                            <TableCell />
                                            <TableCell>{(((totalMusCalculator(scoreSets, chorus)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalPerfCalculator(scoreSets, chorus)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalSingCalculator(scoreSets, chorus)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalScoreCalculator(scoreSets, chorus)) / 4) / (scoreSets[0].contest.panelSize)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Finals</TableCell>
                                            <TableCell />
                                            <TableCell>{(((roundTotalMusCalculator(scoreSets, chorus, 1)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalPerfCalculator(scoreSets, chorus, 1)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalSingCalculator(scoreSets, chorus, 1)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalScoreCalculator(scoreSets, chorus, 1)) / 2) / (scoreSets[0].contest.panelSize)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        {scoreSets.map(scoreSet => {
                                            if (scoreSet.roundNumber === 1 && scoreSet.chorus?.id === chorus.id) {
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
                                            <TableCell>{(((roundTotalMusCalculator(scoreSets, chorus, 2)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalPerfCalculator(scoreSets, chorus, 2)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalSingCalculator(scoreSets, chorus, 2)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalScoreCalculator(scoreSets, chorus, 2)) / 2) / (scoreSets[0].contest.panelSize)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        {scoreSets.map(scoreSet => {
                                            if (scoreSet.roundNumber === 2 && scoreSet.chorus?.id === chorus.id) {
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
                                })}
                            </Table>
                        </TableContainer>

                        :

                        <TableContainer component={Paper}>
                            <Table aria-label="contest table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Place</TableCell>
                                        <TableCell>Chorus</TableCell>
                                        <TableCell>Round</TableCell>
                                        <TableCell>Songs</TableCell>
                                        <TableCell>Mus %</TableCell>
                                        <TableCell>Perf %</TableCell>
                                        <TableCell>Sing %</TableCell>
                                        <TableCell>Total %</TableCell>
                                    </TableRow>
                                </TableHead>
                                {choruses.map(chorus => {
                                    return (<TableBody key={chorus.name}>
                                        <TableRow>
                                            <TableCell rowSpan={8}>{choruses.indexOf(chorus) + 1}</TableCell>
                                            <TableCell rowSpan={8}>
                                                <Link to={`/choruses/${chorus.id}`}>{chorus.name}</Link>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Total</TableCell>
                                            <TableCell />
                                            <TableCell>{(((totalMusCalculator(scoreSets, chorus)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalPerfCalculator(scoreSets, chorus)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalSingCalculator(scoreSets, chorus)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalScoreCalculator(scoreSets, chorus)) / 4) / (scoreSets[0].contest.panelSize)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        {scoreSets.map(scoreSet => {
                                            if (scoreSet.chorus?.id === chorus.id) {
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
                                })}
                            </Table>
                        </TableContainer>}
                </div>)}
        </>
    )
}
