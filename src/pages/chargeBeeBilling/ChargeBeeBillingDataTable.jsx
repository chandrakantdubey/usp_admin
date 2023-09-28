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
import { Link } from "react-router-dom";
import { Edit, Settings } from "@carbon/icons-react";

const ChargeBeeBillingDataTable = ({
  rows,
  headers,
  add,
  edit,
  title,
  description,
  openPanel,
}) => {
  return (
    <DataTable rows={rows} headers={headers}>
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
          <TableContainer title={title} description={description || null}>
            <TableToolbar {...getToolbarProps()}>
              <TableToolbarContent
                aria-hidden={batchActionProps.shouldShowBatchActions}
              >
                <TableToolbarSearch
                  tabIndex={batchActionProps.shouldShowBatchActions ? -1 : 0}
                  onChange={onInputChange}
                />
                {openPanel && (
                  <Button
                    title="set defaults"
                    kind="ghost"
                    onClick={() => openPanel()}
                    size="sm"
                    className="default"
                  >
                    <Settings />
                  </Button>
                )}
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
                    <TableRow {...getRowProps({ row })}>
                      {row.cells &&
                        row.cells.map((cell) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      {edit && (
                        <TableCell
                          key={row.id}
                          className="cursor-pointer"
                          onClick={() => edit(row.id)}
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

export default ChargeBeeBillingDataTable;
