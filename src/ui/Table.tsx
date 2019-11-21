import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import MuiTable from '@material-ui/core/Table';
import MuiTableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableRow from '@material-ui/core/TableRow';

interface ITableProps {
  headers: { label: string; width?: number }[];
  body: any[][];
}

const useStyles = makeStyles(
  theme => ({
    head: {
      background: theme.palette.primary.main,
      '& > tr > th': {
        border: `1px solid ${theme.palette.grey[500]}`,
        color: '#4a4a4a',
        fontSize: 24,
        fontWeight: 600,
      },
    },
    body: {
      '& > tr > td': {
        border: `1px solid ${theme.palette.grey[500]}`,
        color: '#4a4a4a',
        fontSize: 24,
        fontWeight: 600,
      },
    },
    row: {
      '&:nth-of-type(odd)': {
        backgroundColor: 'white',
      },
    },
  }),
  { name: 'Table' },
);

export const Table = ({ headers, body }: ITableProps) => {
  const classes = useStyles();
  return (
    <MuiTable size="small">
      <MuiTableHead className={classes.head}>
        <MuiTableRow>
          {headers.map(h => (
            <MuiTableCell align="center" style={{ minWidth: h.width || undefined }}>
              {h.label}
            </MuiTableCell>
          ))}
        </MuiTableRow>
      </MuiTableHead>
      <MuiTableBody className={classes.body}>
        {body.map((row, i) => (
          <MuiTableRow className={classes.row} key={i}>
            {row.map((data, i) => (
              <MuiTableCell size="small" align="center" style={{ maxHeight: 40 }} key={i}>
                {data}
              </MuiTableCell>
            ))}
          </MuiTableRow>
        ))}
      </MuiTableBody>
    </MuiTable>
  );
};
