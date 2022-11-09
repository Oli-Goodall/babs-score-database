import React, { useEffect, useState } from "react";
import { Contest, getAllContests } from "../../clients/apiClient";
import { ContestTable } from "./ContestTable"

export const ContestListPage: React.FunctionComponent = () => {
    const [contests, setContests] = useState<Contest[]>();
    
    useEffect(() => {
        getAllContests().then(setContests);
      }, []);
    
    return(
        <>
            <h1>Select a contest:</h1>
            <div className="contest-list-page">
                <ContestTable contestYear={2022}></ContestTable>
            </div>
        </>
    );
};