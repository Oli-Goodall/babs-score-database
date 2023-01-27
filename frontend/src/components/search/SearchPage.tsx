import { FormControlLabel, Radio, RadioGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getChorusBySearchQuery, getContestBySearchQuery, getQuartetBySearchQuery, getSongBySearchQuery, Quartet } from "../../clients/apiClient";

export const SearchPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState<Quartet[]>();
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [currentSearchQuery, setCurrentSearchQuery] = useState("");
    const [previousSearchQuery, setPreviousSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("Quartet");


    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        if (currentSearchQuery) {
            switch (searchType) {
                case 'Quartet' : 
                    getQuartetBySearchQuery(currentSearchQuery).then(setSearchResults);
                    break;
                case 'Chorus' :
                    getChorusBySearchQuery(currentSearchQuery).then(setSearchResults);
                    break;
                case 'Contest' :
                    getContestBySearchQuery(currentSearchQuery).then(setSearchResults);
                    break;
                case 'Song' :
                    getSongBySearchQuery(currentSearchQuery).then(setSearchResults);
                    break;
            }
            setPreviousSearchQuery(currentSearchQuery);
            if (searchResults) {
                setShowSearchResults(true);
            }
        }
            setShowSearchResults(false);
    }
        return (
            <>
                <h1>Search database</h1>
                <p>What are you searching for?</p>
                <RadioGroup
                    aria-labelledby="radio-buttons-group"
                    defaultValue="quartet"
                    name="radio-buttons-group"
                    row
                    onChange={(e) => {setSearchType(e.target.value);}}
                >
                    <FormControlLabel value="Quartet" control={<Radio />} label="Quartet" />
                    <FormControlLabel value="Chorus" control={<Radio />} label="Chorus" />
                    <FormControlLabel value="Contest" control={<Radio />} label="Contest" />
                    <FormControlLabel value="Song" control={<Radio />} label="Song" />
                </RadioGroup>
                <form onSubmit={handleSubmit}>
                    <input placeholder="Search query" type="text" id="searchQuery" required onChange={(e) => {
                        setCurrentSearchQuery(e.target.value);
                    }} />
                    <input type="submit" value="Submit" onSubmit={() => setSearchParams({ searchQuery: currentSearchQuery })} />
            </form>
            <div>{searchResults !== undefined ? 
                <div>
                <p>Search results for &lsquo;{previousSearchQuery}&lsquo;</p>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{searchType} Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {searchResults.map(result => {
                                return (
                                    <TableRow key={result.name}>
                                        <TableCell>
                                            <Link to={`/${searchType}s/${result.id}`}>{result.name}</Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div> : <></> }
            </div>
            
            <div>
                {showSearchResults && searchResults === undefined ? <p>Sorry, no results</p> : <></>}
            </div>
        </>
    )
};