import React, {useCallback, useContext, useEffect, useState} from 'react';
import {AppBar, Box, IconButton, Toolbar} from "@mui/material";
import {makeStyles} from "@mui/styles";
import AddIcon from '@mui/icons-material/Add';
import {gql, useQuery} from "@apollo/client";
import LoadingView from "../Loading";
import {useHistory} from "react-router-dom";
import { SquareCard } from '../../components/atomic';
import ConfigViewTemplate from '../../components/templates/ConfigViewTemplate';

const LIST_DATA_QUERY = gql`
    query listUsers ($filter: UsersFilter, $ord: String, $asc: Boolean, $num: Int, $pag: Int) {
        users (
            filter: $filter
            ord: $ord
            asc: $asc
            num: $num
            pag: $pag
        ) {
            totalCount
            data {
                id
                fullName
                firstName
                lastName
                color
                createdAt
                updatedAt
                deletedAt
            }
        }
    }
`;


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    userCardsContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    }
}));

function UserCard ({ data, onClick }) {
    const handleClick = useCallback(() => {
        onClick(data);
    }, [data, onClick]);

    return <SquareCard
        icon={data?.fullName[0]?.toUpperCase() || '--'}
        label={data?.fullName}
        styles={{
            backgroundColor: data?.color || '#70DDFF',
        }}
        onClick={handleClick}
    />
}

export default function UsersConfigView () {
    const classes = useStyles(),
        { data, loading, error } = useQuery(LIST_DATA_QUERY),
        [users, setUsers] = useState([]),
        history = useHistory();

    const handleUserSelected = useCallback((selectedUser) => {
        console.log(selectedUser);
    }, []);

    const handleAddNewUser = useCallback(() => {
        history.push('/config/newUser');
    }, [history]);

    useEffect(() => {
        if (!data) return;
        setUsers(data?.users?.data);
    }, [data]);

    if (loading) return <LoadingView />;

    return <ConfigViewTemplate>
        <Box className={classes.root}>
            <Box className={classes.userCardsContainer}>
                {
                    users?.length > 0 && users?.map((user) => (
                        <UserCard key={user?.id} data={user} onClick={handleUserSelected} />
                    ))
                }
                <SquareCard
                    icon={<AddIcon fontSize={'large'}/>}
                    label={'New User'}
                    styles={{
                        backgroundColor: 'transparent',
                        border: '4px solid #fff',
                    }}
                    onClick={handleAddNewUser}
                />
            </Box>
        </Box>
    </ConfigViewTemplate>        
}