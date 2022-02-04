import React, { Dispatch, useEffect } from 'react';
import "./Infor.scss"
import { User } from "../../utils/interface"

interface InforProps {
    auth: {
        access_token?: string
        user?: User
    }
    id: string
    dispatch: Dispatch<any>
}

const Infor: React.FC<InforProps> = ({ auth, id, dispatch }) => {
    return <div className="profile__infor">

    </div>;
};

export default Infor;
