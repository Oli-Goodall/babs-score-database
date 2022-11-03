import React, { useState } from "react";
import { Contest } from "../../clients/apiClient";

export const ContestListPage: React.FunctionComponent = () => {
    const [contests, setContests] = useState<Contest[]>(); 
    return(
        <>
            <h1>Select a contest:</h1>
            <div className="contest-list-page">

            </div>
        </>
    );
};