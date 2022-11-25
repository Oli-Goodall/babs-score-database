import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Contest, getAllQuartetContests } from "../../../clients/apiClient";
import { Link } from "react-router-dom";

export const QuartetContestListPage: React.FunctionComponent = () => {
    const [contests, setContests] = useState<Contest[]>();
    const years: number[] = [];

    useEffect(() => {
        getAllQuartetContests().then(setContests);
    }, []);

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
            <h1>Quartet Contests</h1>
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
                                                <Link to={`/quartets/contest/${contest.id}`}>{contest.name}</Link>
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