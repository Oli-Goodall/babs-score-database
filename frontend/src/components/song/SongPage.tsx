import React, { useEffect, useState } from "react";
import { ScoreSet, getScoreSetsBySongId, Contest } from "../../clients/apiClient";
import { Link, useParams } from "react-router-dom";
import { Switch, FormGroup, FormControlLabel, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";

export const SongPage: React.FunctionComponent = () => {
    const [scoreSets, setScoreSets] = useState<ScoreSet[]>();
    const [showRawScores, setShowRawScores] = useState(false);
    const contests: Contest[] = [];

    const { songId } = useParams();

    useEffect(() => {
        if (songId !== undefined){
        getScoreSetsBySongId(parseInt(songId)).then(setScoreSets)}
    }, []);

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
        if (scoreset.song !== undefined && containsObject(scoreset.contest, contests) === false) {
            contests.push(scoreset.contest)
        }
    })

    console.log(scoreSets, contests);

    if (scoreSets === undefined) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>{scoreSets[0].song?.name}</h1>
            <FormGroup>
                <FormControlLabel control={<Switch onChange={() => { setShowRawScores(!showRawScores) }} />} label="Show raw scores" />
            </FormGroup>
            {showRawScores ? (<div className="contest-page">
                <TableContainer component={Paper}>
                    <Table aria-label="contest table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Contest</TableCell>
                                <TableCell>Quartet</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>Mus</TableCell>
                                <TableCell>Perf</TableCell>
                                <TableCell>Sing</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        {contests.map(contest => {
                            const count = scoreSets.filter((scoreSet) => scoreSet.contest.id === contest.id).length;
                            return (<TableBody key={contest.name}>
                                {scoreSets.map(scoreSet => {
                                    if (scoreSet.contest.id === contest.id && scoreSet.quartet?.id !== undefined) {
                                        return (<TableRow key={scoreSet.song.name}>
                                            <TableCell rowSpan={count}>
                                                <Link to={`/quartets/contest/${contest.id}`}>{contest.name}</Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/quartets/${scoreSet.quartet?.id}`}>{scoreSet.quartet?.name}</Link>
                                            </TableCell>
                                            <TableCell>{contest.year.contestYear}</TableCell>
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
                <TableContainer component={Paper}>
                    <Table aria-label="contest table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Contest</TableCell>
                                <TableCell>Chorus</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>Mus</TableCell>
                                <TableCell>Perf</TableCell>
                                <TableCell>Sing</TableCell>
                                <TableCell>Total</TableCell>
                            </TableRow>
                        </TableHead>
                        {contests.map(contest => {
                            const count = scoreSets.filter((scoreSet) => scoreSet.contest.id === contest.id).length;
                            return (<TableBody key={contest.name}>
                                {scoreSets.map(scoreSet => {
                                    if (scoreSet.contest.id === contest.id && scoreSet.chorus?.id !== undefined) {
                                        return (<TableRow key={scoreSet.song.name}>
                                            <TableCell rowSpan={count}>
                                                <Link to={`/choruses/contest/${contest.id}`}>{contest.name}</Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/choruses/${scoreSet.chorus?.id}`}>{scoreSet.chorus?.name}</Link>
                                            </TableCell>
                                            <TableCell>{contest.year.contestYear}</TableCell>
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
            </div>)

                :

                (<div className="contest-page">
                    <TableContainer component={Paper}>
                        <Table aria-label="contest table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Contest</TableCell>
                                    <TableCell>Quartet</TableCell>
                                    <TableCell>Year</TableCell>
                                    <TableCell>Mus %</TableCell>
                                    <TableCell>Perf %</TableCell>
                                    <TableCell>Sing %</TableCell>
                                    <TableCell>Total %</TableCell>
                                </TableRow>
                            </TableHead>
                            {contests.map(contest => {
                                const count = scoreSets.filter((scoreSet) => scoreSet.contest.id === contest.id).length;
                                return (<TableBody key={contest.name}>
                                    {scoreSets.map(scoreSet => {
                                        if (scoreSet.contest.id === contest.id && scoreSet.quartet?.id !== undefined) {
                                            return (<TableRow key={scoreSet.song.name}>
                                                <TableCell rowSpan={count}>
                                                    <Link to={`/quartets/contest/${contest.id}`}>{contest.name}</Link>
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/quartets/${scoreSet.quartet?.id}`}>{scoreSet.quartet?.name}</Link>
                                                </TableCell>
                                                <TableCell>{contest.year.contestYear}</TableCell>
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
                <TableContainer component={Paper}>
                    <Table aria-label="contest table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Contest</TableCell>
                                <TableCell>Chorus</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>Mus %</TableCell>
                                <TableCell>Perf %</TableCell>
                                <TableCell>Sing %</TableCell>
                                <TableCell>Total %</TableCell>
                            </TableRow>
                        </TableHead>
                        {contests.map(contest => {
                            const count = scoreSets.filter((scoreSet) => scoreSet.contest.id === contest.id).length;
                            return (<TableBody key={contest.name}>
                                {scoreSets.map(scoreSet => {
                                    if (scoreSet.contest.id === contest.id && scoreSet.chorus?.id !== undefined) {
                                        return (<TableRow key={scoreSet.song.name}>
                                            <TableCell rowSpan={count}>
                                                <Link to={`/choruses/contest/${contest.id}`}>{contest.name}</Link>
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/choruses/${scoreSet.chorus?.id}`}>{scoreSet.chorus?.name}</Link>
                                            </TableCell>
                                            <TableCell>{contest.year.contestYear}</TableCell>
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
                </div>)}
        </>
    );
};