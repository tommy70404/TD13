import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { PageWrapper } from '../../ui/PageWrapper';
import { Box, Grid, Container, Paper, Typography, Divider, Button, IconButton } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import { PaperButton } from '../../ui/Button';
import { SelectField } from '../../ui/SelectField';
import { BorderFieldSkeleton } from '../../ui/BorderFieldSkeleton';
import { AddCircleOutlineRounded, WarningRounded, CloseRounded } from '@material-ui/icons';
import { MultiTextField } from '../../ui/TextField';
import { DateField } from '../../ui/DateField';

const useStyles = makeStyles(
  theme => ({
    row: {
      marginBottom: theme.spacing(2),
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    cardContainer: {
      marginTop: theme.spacing(3),
      minHeight: 'calc(100vh - 200px)',
    },
    panel: {
      position: 'relative',
      width: '100%',
      padding: theme.spacing(3),
      margin: theme.spacing(1.5, 0),
      // '& .MuiExpansionPanel-root.Mui-disabled': {}
    },
    divider: {
      margin: theme.spacing(3, 0),
      border: 0,
      borderBottomWidth: 2,
      borderBottomStyle: 'dashed',
      borderColor: theme.palette.primary.main,
    },
    addMore: {
      width: '100%',
      padding: theme.spacing(1.5),
      margin: theme.spacing(1.5, 0),
      borderWidth: 2,
      borderStyle: 'dashed',
      borderColor: theme.palette.primary.main,
      borderRadius: theme.shape.borderRadius,
    },
    icon: {
      position: 'relative',
      marginRight: 8,
      top: 1,
    },
    alarm: {
      position: 'relative',
      bottom: 0,
      left: 0,
      color: theme.palette.grey[600],
      '& pre': {
        fontFamily: 'unset',
        lineHeight: 0.8,
        margin: 0,
      },
    },
  }),
  { name: 'WorkLogFormPage' },
);

interface IPanel {
  id: number;
  workType: number;
  [key: string]: any;
}

const workOptions = [
  { label: '1.送修資料', value: 1 },
  { label: '2.殘鋼到除', value: 2 },
  { label: '3.上蓋送出', value: 3 },
  { label: '4.修別與廠商', value: 4 },
  { label: '5.本班統計', value: 5 },
  { label: '6.交辦事項', value: 6 },
  { label: '7.出勤紀錄', value: 7 },
];

const alarmText = '注意事項';
const alarmBody = `
1. 上下線 TD 需靜置 20 分鐘後才可澆注冷卻水\r\n
2. 殘剛量大於 10 噸於下線後 1.5 個小時才可拆卸 S/G。\r\n
3. 殘剛量小於 10 噸於下線後 1 個小時才可拆卸 S/G。
`;

export const WorkLogFormPage = () => {
  const [panelList, setPanelList] = useState<IPanel[]>([]);

  const classes = useStyles();
  const history = useHistory();
  // const { id } = useParams();

  const handleSelectChange = (o: number) => (v: number) => {
    setPanelList((prev: any) => {
      prev.splice(o, 1, { ...prev[o], workType: v });
      return [...prev];
    });
  };

  const handlePanelAdd = () => {
    setPanelList((prev: any) => {
      prev.push({ id: Date.now(), workType: 0 });
      return [...prev];
    });
  };
  const handlePanelRemove = (o: number) => {
    setPanelList((prev: any) => {
      prev.splice(o, 1);
      return [...prev];
    });
  };

  const renderBody = (panel: IPanel) => {
    switch (panel.workType) {
      case 1:
        return (
          <Grid item container xs={12} wrap="nowrap" justify="space-between" alignItems="center" spacing={3}>
            <Grid item xs>
              <DateField label="上蓋時間" placeholder="YYYY-MM-DD" withDayTime />
            </Grid>
            <Grid item xs>
              <DateField label="送出時間" placeholder="YYYY-MM-DD" withDayTime />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  const renderAlarm = () => (
    <Grid container className={classes.alarm}>
      <Grid item xs={12}>
        <Typography variant="h6" display="block" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <WarningRounded color="error" className={classes.icon} /> {alarmText}
        </Typography>
        <Typography variant="h6">
          <pre>{alarmBody}</pre>
        </Typography>
      </Grid>
    </Grid>
  );
  return (
    <>
      <PageWrapper title="TD13 耐火材管理系統" />
      <Box marginTop="12px" clone>
        <Container maxWidth="lg" style={{ position: 'relative' }}>
          {/* 1st section */}
          <Grid container wrap="nowrap" justify="space-between" alignItems="center" spacing={3} className={classes.row}>
            <Grid item container xs wrap="nowrap" alignItems="center">
              <Typography color="primary" variant="h3">
                工作紀錄單&nbsp;:&nbsp;109/01/09-夜班
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            alignContent="flex-start"
            // spacing={3}
            className={classes.cardContainer}
          >
            {panelList.map((panel, pIdx) => (
              <Grid item container xs={12} alignItems="center" key={panel.id}>
                {/* panel start */}
                <Paper className={classes.panel}>
                  {/* header start */}
                  <IconButton
                    onClick={() => handlePanelRemove(pIdx)}
                    style={{ position: 'absolute', top: 5, right: 5 }}
                  >
                    <CloseRounded color="primary" />
                  </IconButton>
                  <Grid container spacing={3}>
                    <Grid item xs="auto">
                      <BorderFieldSkeleton
                        title="TD號碼"
                        field={
                          <SelectField
                            options={Array(40)
                              .fill('')
                              .map((e, idx) => ({ value: idx, label: idx.toString() }))}
                          />
                        }
                      />
                    </Grid>
                    <Grid item>
                      <BorderFieldSkeleton
                        title="工作項目"
                        field={<SelectField onChange={handleSelectChange(pIdx)} options={workOptions} />}
                      />
                    </Grid>
                  </Grid>
                  {/* header end */}
                  <hr className={classes.divider} />
                  {/* body start */}
                  {renderBody(panel)}
                  {/* body end */}
                </Paper>
                {/* add more skeleton start */}
                {/* add more skeleton end */}
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button onClick={handlePanelAdd} className={classes.addMore}>
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    <Typography variant="h5" color="primary" style={{ display: 'inline-flex', alignItems: 'center' }}>
                      <AddCircleOutlineRounded color="primary" className={classes.icon} /> 新增工作項目
                    </Typography>
                  </Grid>
                </Grid>
              </Button>
            </Grid>
          </Grid>
          {renderAlarm()}
        </Container>
      </Box>
    </>
  );
};
