import {
  Column,
  DataTable,
  TableBody,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  Button,
  TableToolbarContent,
  TableToolbarSearch,
  Table,
  TableCell,
} from "@carbon/react";
import { Edit } from "@carbon/icons-react";
import { Link, useNavigate } from "react-router-dom";

const APIsDataTable = ({ rows, headers, title, description, add, edit }) => {
  const navigate = useNavigate();
  const redirectToEditPage = (id) => {
    navigate(edit.replace(":id", id));
  };
  const rowsWithIds = rows.map((row, index) => ({
    ...row,
    id: (index + 1).toString(),
  }));
  return (
    <>
      <DataTable rows={rowsWithIds} headers={headers}>
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getToolbarProps,
          getBatchActionProps,
          onInputChange,
          getTableProps,
          getTableContainerProps,
        }) => {
          const batchActionProps = getBatchActionProps();
          return (
            <TableContainer
              title={title}
              description={description}
              {...getTableContainerProps()}
            >
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
                      tabIndex={
                        batchActionProps.shouldShowBatchActions ? -1 : 0
                      }
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
              <Table {...getTableProps()} aria-label="sample table">
                <TableHead>
                  <TableRow>
                    {headers.map((header, i) => (
                      <TableHeader
                        key={i}
                        {...getHeaderProps({
                          header,
                        })}
                      >
                        {header.header}
                      </TableHeader>
                    ))}
                    <TableHeader>Edit</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    ? rows.map((row, i) => (
                        <TableRow
                          key={i}
                          {...getRowProps({
                            row,
                          })}
                        >
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>{cell.value}</TableCell>
                          ))}
                          <TableCell
                            key={i + "edit"}
                            className="cursor-pointer"
                            onClick={() => redirectToEditPage(rows[i].id)}
                          >
                            <Edit size={24} />
                          </TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          );
        }}
      </DataTable>
    </>
  );
};

export default APIsDataTable;
