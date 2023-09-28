import React from "react";
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Button,
} from "@carbon/react";
import { Link, useNavigate } from "react-router-dom";
import { Edit } from "@carbon/icons-react";

const UserAccessDataTable = ({ rows, headers, add, edit, title }) => {
  const navigate = useNavigate();
  const redirectToEditPage = (id) => {
    navigate(edit.replace(":id", id));
  };
  const rowsWithIds = rows.map((row, index) => ({
    ...row,
    id: (index + 1).toString(),
  }));
  return (
    <DataTable rows={rowsWithIds} headers={headers}>
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        getToolbarProps,
        getBatchActionProps,
        onInputChange,
      }) => {
        const batchActionProps = getBatchActionProps();
        return (
          <TableContainer title={title}>
            <TableToolbar {...getToolbarProps()}>
              <TableToolbarContent
                aria-hidden={batchActionProps.shouldShowBatchActions}
              >
                <TableToolbarSearch
                  tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                  onChange={onInputChange}
                />
                {add && (
                  <Button
                    tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                    as={Link}
                    to={add}
                    size="lg"
                    kind="primary"
                  >
                    Add new
                  </Button>
                )}
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                  {edit && <TableHeader>Edit</TableHeader>}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows &&
                  rows.map((row) => (
                    <TableRow key={row.id} {...getRowProps({ row })}>
                      {row.cells &&
                        row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      {edit && (
                        <TableCell
                          key={row.id}
                          className="cursor-pointer"
                          onClick={() => redirectToEditPage(row.id)}
                        >
                          <Edit size={24} />
                        </TableCell>
                      )}
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

export default UserAccessDataTable;
