import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Contest, getAllContests } from "../../clients/apiClient";
import { Link } from "react-router-dom";

export const ContestListPage: React.FunctionComponent = () => {
    const [contests, setContests] = useState<Contest[]>();
    const years: number[] = [];

    useEffect(() => {
        getAllContests().then(setContests);
    }, []);

    contests?.forEach(contest => {
        if (years.indexOf(contest.year.contestYear) === -1) {
            years.push(contest.year.contestYear)
        }

        console.log(years)
    })



    if (contests === undefined) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <h1>Quartet Contests</h1>
            <div className="contest-list-page">
                <TableContainer component={Paper}>
                    <Table aria-label="contest table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{contests[0].year.contestYear}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* {contestsOfTheYear.map((contest) => ( */}
                            <TableRow key={contests[0].name} >
                                <TableCell>
                                    <Link to={`/contest/${contests[0].id}`}>{contests[0].name}</Link>
                                </TableCell>
                            </TableRow>
                            {/* ))
                        }; */}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};