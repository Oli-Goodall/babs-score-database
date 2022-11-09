import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Tab } from "@mui/material";
import { Contest, getContestsByYear } from "../../clients/apiClient";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

interface ContestTableProps {
    contestYear: number;
}

export const ContestTable: React.FunctionComponent<ContestTableProps> = ({ contestYear }) => {
    const [contestsOfTheYear, setContestsOfTheYear] = useState<Contest[]>();

    useEffect(() => {
        getContestsByYear(contestYear.toString()).then(setContestsOfTheYear);
    }, []);
    console.log(contestsOfTheYear);
    if (contestsOfTheYear === undefined) {
        return <p>Loading...</p>;
      }

    return(
        <>
            <TableContainer component={Paper}>
                <Table aria-label="contest table">
                    <TableHead>
                        <TableRow>
                            <TableCell>{contestsOfTheYear[0].year}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contestsOfTheYear.map((contest) => (
                            <TableRow key={contest.name} >
                                <TableCell>
                                    <Link to={`/contest/${contest.id}`}>{contest.name}</Link>
                                </TableCell>
                            </TableRow>
                        ))
                        };
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
};
