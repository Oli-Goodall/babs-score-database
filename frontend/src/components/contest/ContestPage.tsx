import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ScoreSet, getAllContests } from "../../clients/apiClient";
import { Link } from "react-router-dom";

export const ContestPage: React.FC = () => {
    const [scoreSets, setScoreSets] = useState<ScoreSet[]>();
    
    return (
        <>
        </>
    )
}