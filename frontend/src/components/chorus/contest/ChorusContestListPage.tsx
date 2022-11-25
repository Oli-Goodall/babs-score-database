import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Contest, getAllChorusContests } from "../../../clients/apiClient";
import { Link } from "react-router-dom";

export const ChorusContestListPage: React.FunctionComponent = () => {
    const [contests, setContests] = useState<Contest[]>();
    const years: number[] = [];

    useEffect(() => {
        getAllChorusContests().then(setContests);
    }, []);
    console.log(contests)
    contests?.forEach(contest => {
        if (years.indexOf(contest.year.contestYear) === -1) {
            years.push(contest.year.contestYear)
        }
    })



    if (contests === undefined) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>Chorus Contests</h1>
            <div className="contest-list-page">
                {years.map(year => {
                    return (<TableContainer component={Paper} key={year}>
                        <Table aria-label="contest table">
                            <TableHead>
                                <TableRow key={year}>
                                    <TableCell>{year}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contests.map(contest => {
                                    if (contest.year.contestYear === year) {
                                        return (<TableRow key={contest.name} >
                                            <TableCell>
                                                <Link to={`/choruses/contest/${contest.id}`}>{contest.name}</Link>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    )
                })}
            </div>
        </>
    );
};