import { Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getQuartetBySearchQuery, Quartet } from "../../clients/apiClient";

export const QuartetSearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState<Quartet[]>();
    const [showSearchResults, setShowSearchResults] = useState(false);
    const searchQuery = searchParams.get("searchQuery");
    console.log(searchQuery);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setSearchParams();
        if (searchQuery){
            setShowSearchResults(true); 
                getQuartetBySearchQuery(searchQuery).then(setSearchResults);
        }
        else {
            return (
                <>
                <h3>Please enter a search term</h3>
                </>
            )
        }
    }

    if (showSearchResults === false) {
        return (
            <>
            <h1>Find a quartet</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="Quartet name" type="text" id="searchQuery" />
                <input type="submit" value="Submit" />
            </form>
            </>
        )
    }
    else {
        return (
            <>
            <h1>Find a quartet</h1>
            <form onSubmit={handleSubmit}>
                <input placeholder="Quartet name" type="text" id="searchQuery" />
                <input type="submit" value="Submit" />
            </form>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Quartet Name</TableCell>
                        </TableRow>
                    </TableHead>

                </Table>
            </TableContainer>
            </>
        )
    }
};