import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ScoreSet, getScoreSetsByContestId } from "../../clients/apiClient";
import { Link, useParams } from "react-router-dom";

export const ContestPage: React.FC = () => {
    const [scoreSets, setScoreSets] = useState<ScoreSet[]>();
    const quartets: string[] = [];

    const { contestId } = useParams<{ contestId: string }>();

    useEffect(() => {
        getScoreSetsByContestId(parseInt(contestId)).then(setScoreSets);
    }, [contestId]);

    console.log(scoreSets);
    console.log(contestId);

    scoreSets?.forEach(scoreset => {
        if (scoreset.quartet !== undefined && quartets?.indexOf(scoreset.quartet.name) === -1) {
            quartets.push(scoreset.quartet.name)
        }

        console.log(quartets)
    })
    if (scoreSets === undefined) {
        return <p>Loading...</p>;
    }

    return (
        <>
        <h1>{scoreSets[0].contest.name}</h1>
            <div className="contest-page">
                    <TableContainer component={Paper}>
                        <Table aria-label="contest table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Place</TableCell>
                                    <TableCell>Quartet</TableCell>
                                    <TableCell>Song</TableCell>
                                    <TableCell>Mus %</TableCell>
                                    <TableCell>Perf %</TableCell>
                                    <TableCell>Sing %</TableCell>
                                    <TableCell>Total %</TableCell>
                                </TableRow>
                            </TableHead>
                            {/* <TableBody>
                                {quartets.map(quartet => {
                                    if (scoreSets.Quartet.name !== undefined && scoreSets.quartet.name  === quartet) {
                                        return (<TableRow key={contest.name} >
                                            <TableCell>
                                                <Link to={`/contests/${contest.id}`}>{contest.name}</Link>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                })}
                            </TableBody> */}
                        </Table>
                    </TableContainer>
            </div>
        </>
    )
}