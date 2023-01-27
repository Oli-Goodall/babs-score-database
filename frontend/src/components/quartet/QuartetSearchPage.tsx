import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getQuartetBySearchQuery, Quartet } from "../../clients/apiClient";

export const QuartetSearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState<Quartet[]>();
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [currentSearchQuery, setCurrentSearchQuery] = useState("");


    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (currentSearchQuery) {
            getQuartetBySearchQuery(currentSearchQuery).then(setSearchResults);
            if (searchResults) {
                setShowSearchResults(true);
            }
        }
    }

    if (!showSearchResults) {
        return (
            <>
                <h1>Find a quartet</h1>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Quartet name" type="text" id="searchQuery" required onChange={(e) => {
                        setCurrentSearchQuery(e.target.value);
                    }} />
                    <input type="submit" value="Submit" onClick={() => setSearchParams({ searchQuery: currentSearchQuery })} />
                </form>
                <p>Please enter a search term</p>
            </>
        )
    }
    else if (!searchResults) {
        return (
            <>
                <h1>Find a quartet</h1>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Quartet name" type="text" id="searchQuery" required onChange={(e) => {
                        setCurrentSearchQuery(e.target.value);
                    }} />
                    <input type="submit" value="Submit" onClick={() => setSearchParams({ searchQuery: currentSearchQuery })} />
                </form>
                <p>No results found</p>
            </>)
    }
    else {
        return (
            <>
                <h1>Find a quartet</h1>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Quartet name" type="text" id="searchQuery" required onChange={(e) => {
                        setCurrentSearchQuery(e.target.value);
                    }} />
                    <input type="submit" value="Submit" onClick={() => setSearchParams({ searchQuery: currentSearchQuery })} />
                </form>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Quartet Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {searchResults.map(quartet => {
                                return (
                                    <TableRow key={quartet.name}>
                                        <TableCell>
                                            <Link to={`/quartets/${quartet.id}`}>{quartet.name}</Link>
                                        </TableCell>                                    
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        )
    }
};