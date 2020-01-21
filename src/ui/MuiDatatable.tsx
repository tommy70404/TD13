import React from 'react';
import clsx from 'clsx';
import MuiDatatable, { MUIDataTableProps, MUIDataTableOptions } from 'mui-datatables';
import { makeStyles } from '@material-ui/core/styles';
import { Overwrite } from '../utils/types';
import { thinScrollbarStyle } from './helpers/styleHelpers';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

type IMUIDataTableProps = Overwrite<
MUIDataTableProps,
{
  className?: string;
  options?: MUIDataTableOptions;
  localizeOptions?: any;
}
>;

const useStyles = makeStyles(
  theme => ({
    tableContainer: {
      '& div[class*=MuiPaper-root]': {
        overflow: 'hidden',
      },
      '& th': {
        background: theme.palette.primary.main,
        padding: theme.spacing(2, 2),
        '& div': {
          ...theme.typography.h6,
        },
      },
      '& thead th': {},
      '& tbody>tr': {
        '& td': {
          ...theme.typography.h6,
          padding: theme.spacing(2, 2),
          background: 'transparent',

          [theme.breakpoints.down('sm')]: {
            ...theme.typography.h5,
            padding: theme.spacing(1, 2),
            height: 60,
          },
        },
        '&:nth-of-type(even)': {
          background: '#ecebec',
        },
        '&:hover > td': {
          background: '#dfebf9',
        },
      },

      '& div[class*=responsiveScrollMaxHeight]': {
        ...thinScrollbarStyle,
        minHeight: 'calc(100vh - 240px)',
        width: 'auto',

        [theme.breakpoints.down('xs')]: {
          maxHeight: 'calc(100vh - 150px)',
          width: `calc(100vw - 32px)`,
        },
      },
      '& tfoot': {
        background: theme.palette.grey[400],
      },
    },
  }),
  { name: 'DataTable' },
);

const useThemeStyles = () =>
  createMuiTheme({
    overrides: {
      MuiTablePagination: {
        spacer: {
          display: 'none',
        },
        toolbar: {
          justifyContent: 'center',
        },
      },
    },
  } as any);

export const DataTable = ({ options, className, localizeOptions, ...props }: IMUIDataTableProps) => {
  const classes = useStyles();
  const combinedLocalizeOptions = { textLabels: { ...DEFAULT_LOCALIZE_OPTIONS, ...localizeOptions } };
  const combinedOptions = Object.assign(basicOptions, options, combinedLocalizeOptions);

  const muiThemeStyle = useThemeStyles();

  return (
    <div className={clsx(classes.tableContainer, className)}>
      <MuiThemeProvider theme={muiThemeStyle}>
        <MuiDatatable options={combinedOptions} {...props} />
      </MuiThemeProvider>
    </div>
  );
};

export const basicColumnOptions = {
  download: false,
  empty: false,
  filter: false,
  print: false,
  searchable: false,
};

const basicOptions: MUIDataTableOptions = {
  responsive: 'scrollMaxHeight',
  serverSide: false,
  pagination: true,
  download: false,
  filter: false,
  search: false,
  sort: false,
  print: false,
  viewColumns: false,
  selectableRows: 'none',
};

const DEFAULT_LOCALIZE_OPTIONS = {
  body: {
    noMatch: '查無資料',
    toolTip: '',
  },
  // toolbar: {
  //   search: '搜尋',
  //   downloadCsv: '下載本表',
  //   print: '列印',
  //   viewColumns: '顯示欄位',
  //   filterTable: '篩選器',
  // },
  // viewColumns: {
  //   title: '顯示欄位',
  //   titleAria: '顯示/隱藏 欄位',
  // },
  // filter: {
  //   title: '篩選器',
  //   all: '全選',
  //   reset: '重置',
  // },
  // pagination: {
  //   next: '下一頁',
  //   previous: '前一頁',
  //   rowsPerPage: '單頁行數:',
  //   displayRows: '的',
  // },
  // selectedRows: {
  //   text: '已選擇(列)',
  //   delete: '刪除',
  //   deleteAria: '刪除已選擇(列)',
  // },
};
