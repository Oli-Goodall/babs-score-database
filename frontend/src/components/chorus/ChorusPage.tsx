import React, { useEffect, useState } from "react";
import { ScoreSet, getScoreSetsByChorusId, Chorus, totalMusCalculator, totalPerfCalculator, roundTotalMusCalculator, roundTotalPerfCalculator, roundTotalScoreCalculator, roundTotalSingCalculator, totalScoreCalculator, totalSingCalculator, Contest } from "../../clients/apiClient";
import { Link, useParams } from "react-router-dom";
import { Switch, FormGroup, FormControlLabel, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export const ChorusPage: React.FunctionComponent = () => {
    const [scoreSets, setScoreSets] = useState<ScoreSet[]>();
    const [showRawScores, setShowRawScores] = useState(false);
    let currentChorus: Chorus = {
        id: 0,
        name: ''
    };
    const contests: Contest[] = [];

    const { chorusId } = useParams<{ chorusId: string }>();

    useEffect(() => {
        getScoreSetsByChorusId(parseInt(chorusId)).then(setScoreSets);
    }, []);

    if (scoreSets !== undefined) {
            currentChorus = {
                id: scoreSets[0].chorus?.id,
                name: scoreSets[0].chorus?.name
            }
        }

    function containsObject(obj: Contest, list: Contest[]) {
        let i;
        for (i in list) {
            if (list[i].id === obj.id) {
                return true;
            }
        }
        return false;
    }

    scoreSets?.forEach(scoreset => {
        if (scoreset.chorus !== undefined && containsObject(scoreset.contest, contests) === false) {
            contests.push(scoreset.contest)
        }
    })

    console.log(scoreSets, contests);

    if (scoreSets === undefined) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>{scoreSets[0].chorus?.name}</h1>
            <FormGroup>
                <FormControlLabel control={<Switch onChange={() => { setShowRawScores(!showRawScores) }} />} label="Show raw scores" />
            </FormGroup>
            {showRawScores ? (<div className="contest-page">
                {scoreSets[0].contest.totalRounds === 2 ?
                    <TableContainer component={Paper}>
                        <Table aria-label="contest-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Contest</TableCell>
                                    <TableCell>Place</TableCell>
                                    <TableCell>Round</TableCell>
                                    <TableCell>Songs</TableCell>
                                    <TableCell>Mus</TableCell>
                                    <TableCell>Perf</TableCell>
                                    <TableCell>Sing</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            {contests.map(contest => {
                                return (<TableBody key={contest.name}>
                                    <TableRow>
                                        <TableCell rowSpan={8}>
                                            <Link to={`/choruses/contest/${contest.id}`}>{contest.name}</Link>
                                        </TableCell>
                                        <TableCell rowSpan={8}>{scoreSets[0].place}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total</TableCell>
                                        <TableCell />
                                        <TableCell>{totalMusCalculator(scoreSets, currentChorus)}</TableCell>
                                        <TableCell>{totalPerfCalculator(scoreSets, currentChorus)}</TableCell>
                                        <TableCell>{totalSingCalculator(scoreSets, currentChorus)}</TableCell>
                                        <TableCell>{totalScoreCalculator(scoreSets, currentChorus)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Finals</TableCell>
                                        <TableCell />
                                        <TableCell>{roundTotalMusCalculator(scoreSets, currentChorus, 1)}</TableCell>
                                        <TableCell>{roundTotalPerfCalculator(scoreSets, currentChorus, 1)}</TableCell>
                                        <TableCell>{roundTotalSingCalculator(scoreSets, currentChorus, 1)}</TableCell>
                                        <TableCell>{roundTotalScoreCalculator(scoreSets, currentChorus, 1)}</TableCell>
                                    </TableRow>
                                    {scoreSets.map(scoreSet => {
                                        if (scoreSet.roundNumber === 1 && scoreSet.chorus?.id === currentChorus?.id) {
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
                                        <TableCell>{roundTotalMusCalculator(scoreSets, currentChorus, 2)}</TableCell>
                                        <TableCell>{roundTotalPerfCalculator(scoreSets, currentChorus, 2)}</TableCell>
                                        <TableCell>{roundTotalSingCalculator(scoreSets, currentChorus, 2)}</TableCell>
                                        <TableCell>{roundTotalScoreCalculator(scoreSets, currentChorus, 2)}</TableCell>
                                    </TableRow>
                                    {scoreSets.map(scoreSet => {
                                        if (scoreSet.roundNumber === 2 && scoreSet.chorus?.id === currentChorus?.id) {
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
                                    <TableCell>Contest</TableCell>
                                    <TableCell>Place</TableCell>
                                    <TableCell>Round</TableCell>
                                    <TableCell>Songs</TableCell>
                                    <TableCell>Mus</TableCell>
                                    <TableCell>Perf</TableCell>
                                    <TableCell>Sing</TableCell>
                                    <TableCell>Total</TableCell>
                                </TableRow>
                            </TableHead>
                            {contests.map(contest => {
                                return (<TableBody key={contest.name}>
                                    <TableRow>
                                        <TableCell rowSpan={8}>
                                            <Link to={`/choruses/contest/${contest.id}`}>{contest.name}</Link>
                                        </TableCell>
                                        <TableCell rowSpan={8}>{scoreSets[0].place}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Total</TableCell>
                                        <TableCell />
                                        <TableCell>{totalMusCalculator(scoreSets, currentChorus)}</TableCell>
                                        <TableCell>{totalPerfCalculator(scoreSets, currentChorus)}</TableCell>
                                        <TableCell>{totalSingCalculator(scoreSets, currentChorus)}</TableCell>
                                        <TableCell>{totalScoreCalculator(scoreSets, currentChorus)}</TableCell>
                                    </TableRow>
                                    {scoreSets.map(scoreSet => {
                                        if (scoreSet.contest.id === contest.id) {
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
                                        <TableCell>Contest</TableCell>
                                        <TableCell>Place</TableCell>
                                        <TableCell>Round</TableCell>
                                        <TableCell>Songs</TableCell>
                                        <TableCell>Mus %</TableCell>
                                        <TableCell>Perf %</TableCell>
                                        <TableCell>Sing %</TableCell>
                                        <TableCell>Total %</TableCell>
                                    </TableRow>
                                </TableHead>
                                {contests.map(contest => {
                                    return (<TableBody key={contest.name}>
                                        <TableRow>
                                            <TableCell rowSpan={8}>
                                                <Link to={`/choruses/contest/${contest.id}`}>{contest.name}</Link>
                                            </TableCell>
                                            <TableCell rowSpan={8}>{scoreSets[0].place}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Total</TableCell>
                                            <TableCell />
                                            <TableCell>{(((totalMusCalculator(scoreSets, currentChorus)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalPerfCalculator(scoreSets, currentChorus)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalSingCalculator(scoreSets, currentChorus)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalScoreCalculator(scoreSets, currentChorus)) / 4) / (scoreSets[0].contest.panelSize)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Finals</TableCell>
                                            <TableCell />
                                            <TableCell>{(((roundTotalMusCalculator(scoreSets, currentChorus, 1)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalPerfCalculator(scoreSets, currentChorus, 1)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalSingCalculator(scoreSets, currentChorus, 1)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalScoreCalculator(scoreSets, currentChorus, 1)) / 2) / (scoreSets[0].contest.panelSize)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        {scoreSets.map(scoreSet => {
                                            if (scoreSet.roundNumber === 1 && scoreSet.chorus?.id === currentChorus?.id) {
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
                                            <TableCell>{(((roundTotalMusCalculator(scoreSets, currentChorus, 2)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalPerfCalculator(scoreSets, currentChorus, 2)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalSingCalculator(scoreSets, currentChorus, 2)) / 2) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((roundTotalScoreCalculator(scoreSets, currentChorus, 2)) / 2) / (scoreSets[0].contest.panelSize)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        {scoreSets.map(scoreSet => {
                                            if (scoreSet.roundNumber === 2 && scoreSet.chorus?.id === currentChorus?.id) {
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
                                        <TableCell>Contest</TableCell>
                                        <TableCell>Place</TableCell>
                                        <TableCell>Round</TableCell>
                                        <TableCell>Songs</TableCell>
                                        <TableCell>Mus %</TableCell>
                                        <TableCell>Perf %</TableCell>
                                        <TableCell>Sing %</TableCell>
                                        <TableCell>Total %</TableCell>
                                    </TableRow>
                                </TableHead>
                                {contests.map(contest => {
                                    return (<TableBody key={contest.name}>
                                        <TableRow>
                                            <TableCell rowSpan={8}>
                                                <Link to={`/choruses/contest/${contest.id}`}>{contest.name}</Link>
                                            </TableCell>
                                            <TableCell rowSpan={8}>{scoreSets[0].place}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Total</TableCell>
                                            <TableCell />
                                            <TableCell>{(((totalMusCalculator(scoreSets, currentChorus)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalPerfCalculator(scoreSets, currentChorus)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalSingCalculator(scoreSets, currentChorus)) / 4) / (scoreSets[0].contest.panelSize / 3)).toFixed(2)}</TableCell>
                                            <TableCell>{(((totalScoreCalculator(scoreSets, currentChorus)) / 4) / (scoreSets[0].contest.panelSize)).toFixed(2)}</TableCell>
                                        </TableRow>
                                        {scoreSets.map(scoreSet => {
                                            if (scoreSet.chorus?.id === currentChorus?.id) {
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
    );
};