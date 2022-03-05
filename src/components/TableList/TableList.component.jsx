import React, { useState, useEffect, useCallback } from 'react';
import { AxiosAction } from '../../utils/axios-action';
import { 
    DataTableSkeleton,
    DataTable,
    Table,
    TableHead,
    TableRow,
    TableHeader,
    TableBody,
    TableCell,
    TableContainer,
    TableToolbar,
    TableBatchActions,
    TableBatchAction,
    TableToolbarContent,
    TableToolbarSearch,
    TableToolbarMenu,
    TableToolbarAction,
    Button,
    TableSelectAll,
    TableSelectRow,
    InlineNotification,
} from 'carbon-components-react';
import { TransformMemberDataList } from '../../utils/transform-data';
import { TrashCan32, Save32, Download32, UserFollow32 } from '@carbon/icons-react';
import { useMemberContext } from '../../Member.context';
import { useNavigate } from 'react-router-dom';
import tableHeaders from '../../utils/table-headers.json'

const TableList = () => {
    const [ skeleton, setSkeleton ] = useState(true);
    const { dispatch, state } = useMemberContext();
    const { token, member_list, member } = state;
    const navigate = useNavigate();

    const onSetSkeleton = useCallback(value => { setSkeleton(value) }, [setSkeleton]);
    
    useEffect(() => {
        const setMemberList = async () => {
            try {
                const endpoint = process.env.REACT_APP_ENDPOINT_LIST;
                const ListResponse = await AxiosAction.get(endpoint, token);
                let Members = ListResponse.data?.data;
                Members = TransformMemberDataList(Members);
                console.log(Members);
                dispatch({ type: 'SET_MEMBER_LIST', payload: Members });
                onSetSkeleton(false);
            } catch (error) {
                console.error(error);
                const errorMsg = error.response && error.response.data ? 
                error.response.data.message : 'Unknow Error';
                dispatch({ type: 'SET_ERROR', payload: errorMsg })
            }
        };
        setMemberList();
    }, [token, onSetSkeleton, dispatch]);

    const handleNewMember = (e) => {
        e.preventDefault();
        navigate('/dashboard/add');
    };

    const handleClickRow = (id) => navigate(`view/${id}`);

    if (skeleton) return (
        <div>
            <DataTableSkeleton />
            { state.error && 
                <InlineNotification 
                title={state.error}
                kind='error' 
                style={{ margin: '20px auto' }} /> 
            }
        </div>
    );
    return(
        <DataTable rows={member_list} headers={tableHeaders}>
        {({
            rows,
            headers,
            getHeaderProps,
            getRowProps,
            getSelectionProps,
            getToolbarProps,
            getBatchActionProps,
            onInputChange,
            selectedRows,
            getTableProps,
            getTableContainerProps,
            }) => {
            const batchActionProps = getBatchActionProps();

            return (
                <TableContainer
                title="Members"
                description="List of members"
                {...getTableContainerProps()}>
                <TableToolbar {...getToolbarProps()}>
                    <TableBatchActions {...batchActionProps}>
                    <TableBatchAction
                        tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                        renderIcon={TrashCan32}
                        onClick={() => console.log('clickDelete', selectedRows)}>
                        Delete
                    </TableBatchAction>
                    <TableBatchAction
                        tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                        renderIcon={Save32}
                        onClick={() => console.log('clickSave', selectedRows)}>
                        Save
                    </TableBatchAction>
                    <TableBatchAction
                        tabIndex={batchActionProps.shouldShowBatchActions ? 0 : -1}
                        renderIcon={Download32}
                        onClick={() => console.log('clickDownload', selectedRows)}>
                        Download
                    </TableBatchAction>
                    </TableBatchActions>
                    <TableToolbarContent
                    aria-hidden={batchActionProps.shouldShowBatchActions}>
                    <TableToolbarSearch
                        persistent={true}
                        tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                        onChange={onInputChange}
                    />
                    <TableToolbarMenu
                        tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}>
                        <TableToolbarAction onClick={() => alert('Alert 1')}>
                        Action 1
                        </TableToolbarAction>
                    <TableToolbarAction onClick={() => alert('Alert 2')}>
                        Action 2
                        </TableToolbarAction>
                        <TableToolbarAction onClick={() => alert('Alert 3')}>
                        Action 3
                        </TableToolbarAction>
                    </TableToolbarMenu>
                    { member.role === 'admin' &&
                        <Button
                            tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                            onClick={handleNewMember}
                            size="small"
                            kind="primary"
                            renderIcon={UserFollow32}>
                            Add Member
                        </Button>
                    }
                    </TableToolbarContent>
                </TableToolbar>
                <Table {...getTableProps()}>
                    <TableHead>
                    <TableRow>
                        <TableSelectAll {...getSelectionProps()} />
                        {headers.map((header, i) => (
                        <TableHeader key={i} {...getHeaderProps({ header })}>
                            {header.header}
                        </TableHeader>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row, i) => (
                        <TableRow key={i} {...getRowProps({ row })} onClick={() => handleClickRow(row.id)} >
                        <TableSelectRow {...getSelectionProps({ row })} />
                        {row.cells.map((cell) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            );
            }}
        </DataTable>
    );
};

export default TableList;