import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { PageWrapper } from '../../ui/PageWrapper';
import {
  Box,
  Grid,
  Container,
  Paper,
  Typography,
  Divider,
  Button,
  IconButton,
  useTheme,
  Checkbox,
} from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import { PaperButton, ComfirmPopupButton } from '../../ui/Button';
import { SelectField } from '../../ui/SelectField';
import { BorderFieldSkeleton } from '../../ui/BorderFieldSkeleton';
import {
  AddCircleOutlineRounded,
  WarningRounded,
  CloseRounded,
  DeleteForeverRounded,
  RemoveCircleOutlineRounded,
} from '@material-ui/icons';
import { MultiTextField } from '../../ui/TextField';
import { DateField } from '../../ui/DateField';
import { NavigatorBar } from '../../ui/NavigatorBar';
import { venderOptions, repairReasonOptions, materialOptions } from '../../data/comm';
import { RadioGroupField } from '../../ui/RadioGroupField';
import { TableForm } from '../../ui/TableForm';
import { CurrentShiftTotalForm } from '../../components/forms/workLog/CurrentShiftTotalForm';
import { OnDutyForm } from '../../components/forms/workLog/OnDutyForm';
import { TodoForm } from '../../components/forms/workLog/TodoForm';
import { BurnCondGraphField } from '../../components/popup/BurnCondGraphField';
import { ResidueGraphField } from '../../components/popup/ResidueGraphField';
import { WorkLogGraphicForm } from '../../components/WorkLogGraphicForm';
import clsx from 'clsx';

const useStyles = makeStyles(
  theme => ({
    row: {
      marginBottom: theme.spacing(2),
      borderBottom: `2px solid ${theme.palette.primary.main}`,
    },
    cardContainer: {
      marginTop: theme.spacing(3),
      minHeight: 'calc(100vh - 400px)',
    },
    panel: {
      position: 'relative',
      width: '100%',
      padding: theme.spacing(3),
      margin: theme.spacing(1.5, 0),
      '&.odd': {
        background: theme.palette.grey[100],
      },
      // '& .MuiExpansionPanel-root.Mui-disabled': {}
    },
    dashedDivider: {
      margin: theme.spacing(2, 0),
      border: 0,
      borderBottomWidth: 2,
      borderBottomStyle: 'dashed',
      borderColor: theme.palette.primary.main,
    },
    solidDivider: {
      margin: theme.spacing(2, 0),
      border: 0,
      borderBottomWidth: 2,
      borderBottomStyle: 'solid',
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
      margin: theme.spacing(2, 0),
      color: theme.palette.grey[600],
      '& pre': {
        fontFamily: 'unset',
        lineHeight: 0.8,
        margin: 0,
      },
    },
    footer: {
      margin: theme.spacing(1, 0),
    },
    btn: {
      fontWeight: theme.typography.fontWeightBold,
      fontSize: theme.typography.h6.fontSize,
      color: theme.palette.grey[700],
      width: 226,
      height: 56,
    },
  }),
  { name: 'WorkLogFormPage' },
);

interface IContent {
  id: string;
  修別: string;
  [key: string]: any;
}

interface IPanel {
  id: string;
  workType: number;
  contents: IContent[];
  [key: string]: any;
}

const workOptions = [
  { label: '1. 下線TD', value: 1 },
  { label: '2. 殘剛到除', value: 2 },
  { label: '3. 上蓋時間', value: 3 },
  { label: '4. 送出時間', value: 4 },
  { label: '5. 修護範圍', value: 5 },
  // { label: '5.本班統計', value: 5 },
  // { label: '6.交辦事項', value: 6 },
  // { label: '7.出勤紀錄', value: 7 },
];

const stateHandingFields = [
  {
    label: '倒次',
    control: () => <MultiTextField fields={[{ placeholder: 'NN' }]} style={{ width: 102, padding: 4 }} />,
  },
  {
    label: '燒結',
    control: () => <BurnCondGraphField title="燒結" />,
  },
  {
    label: '殘鋼太薄',
    control: () => <Checkbox size="medium" color="primary" />,
  },
  {
    label: '背襯凹陷',
    control: () => <Checkbox size="medium" color="primary" />,
  },
  {
    label: '沖區',
    control: () => <Checkbox size="medium" color="primary" />,
  },
  {
    label: '澆水',
    control: () => <Checkbox size="medium" color="primary" />,
  },
  {
    label: '厚渣',
    control: () => <ResidueGraphField title="厚渣" />,
  },
  {
    label: '頂撞',
    control: () => <Checkbox size="medium" color="primary" />,
  },
];

const repairTypeField = [
  {
    label: '廠商',
    control: () => <SelectField defaultText="廠商中文名稱" options={venderOptions} />,
  },
  {
    label: '數量',
    control: () => <MultiTextField textCenter fields={[{ placeholder: 'NN', suffix: 'kg' }]} style={{ padding: 8 }} />,
  },
];

const paintTypeField = [
  {
    label: '廠商',
    control: () => <SelectField defaultText="廠商中文名稱" options={venderOptions} />,
  },
  {
    label: '數量',
    control: () => <MultiTextField textCenter fields={[{ placeholder: 'NN', suffix: 'kg' }]} style={{ padding: 8 }} />,
  },
];
function getColorLabel(text: string, color: string) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <p style={{ display: 'inline-block', margin: 0 }}>{text}</p>
      <p style={{ background: color, width: 110, height: 30, display: 'inline-block', marginLeft: 8 }}></p>
    </div>
  );
}

const repairTypeWithColorOptions = [
  { label: getColorLabel('小修', '#f4ce91'), value: '小修' },
  { label: getColorLabel('中修', '#f5a623'), value: '中修' },
  { label: getColorLabel('大修', '#8d5b09'), value: '大修' },
  { label: '全修', value: '全修' },
  { label: '其他', value: '其他' },
];

enum repairTypeColorMap {
  '小修' = '#f4ce91',
  '中修' = '#f5a623',
  '大修' = '#8d5b09',
  '全修' = '#f5a623',
  '其他' = '#f5a623',
}

const alarmText = '注意事項';
const alarmBody = `
1. 上下線 TD 需靜置 20 分鐘後才可澆注冷卻水\r\n
2. 殘剛量大於 10 噸於下線後 1.5 個小時才可拆卸 S/G。\r\n
3. 殘剛量小於 10 噸於下線後 1 個小時才可拆卸 S/G。
`;

export const WorkLogFormPage = () => {
  const [panelList, setPanelList] = useState<IPanel[]>([{ id: 'panel' + Date.now(), workType: 0, contents: [] }]);

  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { section_id } = useParams();

  const handleContentChange = (panelId: string) => (contentId: string) => (key: string) => (value: any) => {
    setPanelList(prev => {
      const targetPanelIdx = panelList.findIndex(panel => panel.id === panelId);
      if (targetPanelIdx !== -1) {
        const targetContentIdx = panelList[targetPanelIdx].contents.findIndex(content => content.id === contentId);
        if (targetContentIdx !== -1) {
          prev[targetPanelIdx].contents[targetPanelIdx] = {
            ...prev[targetPanelIdx].contents[targetPanelIdx],
            [key]: value,
          };
        }
      }
      return [...prev];
    });
  };

  const handleSelectChange = (o: number) => (v: number) => {
    setPanelList((prev: any) => {
      prev.splice(o, 1, { ...prev[o], workType: v, contents: [{ id: 'content' + Date.now() }] });
      return [...prev];
    });
  };

  const handlePanelContentAdd = (contentId: string) => {
    setPanelList((prev: any) => {
      const targetPanelIdx = panelList.findIndex(panel => panel.id === contentId);
      if (targetPanelIdx !== -1) {
        const newContents = [...prev[targetPanelIdx].contents, { id: 'content' + Date.now() }];
        prev.splice(targetPanelIdx, 1, { ...prev[targetPanelIdx], contents: newContents });
      }
      return [...prev];
    });
  };

  const handlePanelContentRemove = (panelId: string, contentId: string) => {
    setPanelList((prev: any) => {
      const targetPanelIdx = panelList.findIndex(panel => panel.id === panelId);
      const targetPanel = panelList.find(panel => panel.id === panelId);
      if (targetPanelIdx !== -1 && targetPanel) {
        const targetPanelContentIdx = targetPanel.contents.findIndex(content => content.id === contentId);
        if (targetPanelContentIdx !== -1) {
          prev[targetPanelIdx].contents.splice(targetPanelContentIdx, 1);
        }
      }
      return [...prev];
    });
  };

  const handlePanelAdd = () => {
    setPanelList((prev: any) => {
      prev.push({ id: 'panel' + Date.now(), workType: 0, contents: [] });
      return [...prev];
    });
  };

  const handlePanelRemove = (panelId: string) => {
    setPanelList((prev: any) => {
      const targetPanelIdx = panelList.findIndex(panel => panel.id === panelId);
      if (targetPanelIdx !== -1) {
        prev.splice(targetPanelIdx, 1);
      }
      return [...prev];
    });
  };

  const handleNavigate = () => {
    window.location.href = `/maintenance/work_log/${section_id}/menu`;
  };

  const renderBody = (panel: IPanel, content: IContent) => {
    switch (panel.workType) {
      case 1:
        return (
          <>
            <Grid item container xs={12} wrap="nowrap">
              <Grid item xs>
                <MultiTextField
                  label="送修序號"
                  // state={state}
                  // onChange={()=>()}
                  fields={[{ placeholder: 'YYYY-MM-NNN' }]}
                  vertical
                  fullWidth
                />
              </Grid>
              <Grid item xs>
                <DateField label="送修時間" placeholder="YYYY-MM-DD" withDayTime />
              </Grid>
              <Grid item xs>
                <RadioGroupField label="殘剛量" options={[{ label: '大於10噸' }, { label: '小於10噸' }]} vertical />
              </Grid>
              <Grid item xs>
                <DateField label="澆水冷卻時間" placeholder="YYYY-MM-DD" withDayTime />
              </Grid>
            </Grid>
            <Grid item container xs={12} wrap="nowrap">
              <Grid item xs={3}>
                <MultiTextField
                  label="回數"
                  // state={state}
                  // onChange={()=>()}
                  fields={[{ placeholder: 'NNN', suffix: '回' }]}
                  vertical
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <RadioGroupField label="修護原因" options={repairReasonOptions} vertical />
              </Grid>
            </Grid>
          </>
        );
      case 2:
        return (
          <>
            <Grid item container xs={12} wrap="nowrap">
              <Grid item xs>
                <DateField label="殘鋼到除時間" placeholder="YYYY-MM-DD" withDayTime />
              </Grid>
              <Grid item xs>
                <SelectField
                  border={true}
                  label="擋牆材料廠商"
                  defaultText="廠商中文名稱"
                  variant="outlined"
                  options={venderOptions}
                />
              </Grid>
              <Grid item xs>
                <RadioGroupField label="檔牆狀況" options={materialOptions} vertical />
              </Grid>
            </Grid>
            <Grid item container xs={12} wrap="nowrap">
              <Grid item xs>
                <TableForm label="處理狀況" fields={stateHandingFields} vertical />
              </Grid>
            </Grid>
          </>
        );
      case 3:
        return (
          <>
            <Grid item xs={3}>
              <DateField label="上蓋時間" placeholder="YYYY-MM-DD" withDayTime />
            </Grid>
          </>
        );
      case 4:
        return (
          <>
            <Grid item xs={3}>
              <DateField label="送出時間" placeholder="YYYY-MM-DD" withDayTime />
            </Grid>
          </>
        );
      case 5:
        return (
          <>
            <Grid item container xs={12} wrap="nowrap">
              <Grid item xs>
                <RadioGroupField
                  label="修別"
                  onChange={handleContentChange(panel.id)(content.id)('修別')}
                  options={repairTypeWithColorOptions}
                  vertical
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <WorkLogGraphicForm
                tdNumber={2}
                color={repairTypeColorMap[content['修別'] as keyof typeof repairTypeColorMap]}
              />
            </Grid>
            <Grid item container xs={12} wrap="nowrap">
              <Grid item xs>
                <TableForm label="修補材" fields={repairTypeField} vertical />
              </Grid>
              <Grid item xs>
                <TableForm label="塗附材" fields={paintTypeField} vertical />
              </Grid>
            </Grid>
            <Grid item container xs={12} wrap="nowrap">
              <Grid item xs={3}>
                <RadioGroupField label="流鋼嘴座換" options={[{ label: '有' }, { label: '無' }]} vertical />
              </Grid>
              <Grid item xs={3}>
                <MultiTextField
                  label="水量"
                  // state={state}
                  // onChange={()=>()}
                  fields={[{ placeholder: 'NNNNN' }]}
                  vertical
                  fullWidth
                />
              </Grid>
            </Grid>
          </>
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
          <NavigatorBar title="工作紀錄單&nbsp;:&nbsp;109/01/09-夜班" />
          <Grid
            container
            justify="flex-start"
            alignItems="flex-start"
            alignContent="flex-start"
            spacing={3}
            className={classes.cardContainer}
          >
            {panelList.map((panel, pIdx) => (
              <Grid item container xs={12} alignItems="center" key={panel.id}>
                {/* panel start */}
                <Paper className={clsx(classes.panel, { odd: pIdx % 2 === 1 })}>
                  {/* header start */}
                  <Grid container spacing={3} justify="space-between" alignItems="center">
                    <Grid item xs="auto" style={{ width: 'auto' }}>
                      <BorderFieldSkeleton
                        color="secondary"
                        title="工作項目"
                        field={
                          <SelectField
                            onChange={handleSelectChange(pIdx)}
                            dense
                            center
                            themeColor="secondary"
                            options={workOptions}
                            style={{ minWidth: 150 }}
                          />
                        }
                      />
                    </Grid>

                    <Grid item container xs="auto" spacing={3} style={{ width: 'auto' }}>
                      <Grid item xs="auto" style={{ width: 'auto' }}>
                        <Button
                          onClick={() => {
                            handlePanelContentAdd(panel.id);
                          }}
                          variant="contained"
                          color="secondary"
                          style={{ color: 'white', width: 200, height: 54, ...theme.typography.h3 }}
                        >
                          <AddCircleOutlineRounded style={{ marginRight: theme.spacing(1), fontSize: '40px' }} />
                          新增TD
                        </Button>
                      </Grid>
                      <Grid item xs="auto" style={{ width: 'auto' }}>
                        <ComfirmPopupButton
                          onClick={() => {
                            handlePanelRemove(panel.id);
                          }}
                        >
                          <Button
                            variant="contained"
                            // onClick={() => {
                            //   handlePanelRemove(panel.id);
                            // }}
                            style={{
                              backgroundColor: theme.palette.error.main,
                              color: 'white',
                              ...theme.typography.h3,
                            }}
                          >
                            <DeleteForeverRounded style={{ marginRight: theme.spacing(1), fontSize: '40px' }} />
                            刪除工項
                          </Button>
                        </ComfirmPopupButton>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* header end */}
                  {/* body start */}
                  {panel.contents.map(content => (
                    <>
                      <hr className={classes.dashedDivider} />

                      <Grid
                        item
                        container
                        xs={12}
                        justify="space-between"
                        alignItems="center"
                        spacing={1}
                        style={{ position: 'relative' }}
                        key={content.id}
                      >
                        <Grid item container xs={12}>
                          <Grid item xs="auto">
                            <BorderFieldSkeleton
                              title="TD號碼"
                              field={
                                <SelectField
                                  options={Array(40)
                                    .fill('')
                                    .map((e, idx) => ({ value: idx, label: idx.toString() }))}
                                  themeColor="primary"
                                  dense
                                  center
                                  style={{ minWidth: 150 }}
                                />
                              }
                            />
                            <ComfirmPopupButton
                              iconButton
                              onClick={() => handlePanelContentRemove(panel.id, content.id)}
                              style={{ position: 'absolute', top: 5, right: 5 }}
                            >
                              {/* <IconButton> */}
                              <RemoveCircleOutlineRounded color="error" style={{ fontSize: '40px' }} />
                              {/* </IconButton> */}
                            </ComfirmPopupButton>
                          </Grid>
                        </Grid>
                        {renderBody(panel, content)}
                      </Grid>
                    </>
                  ))}
                  {/* body end */}
                </Paper>
              </Grid>
            ))}
            {/* add more skeleton start */}
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
            {/* add more skeleton end */}

            <Grid item xs={12}>
              <CurrentShiftTotalForm />
            </Grid>
            <Grid item xs={12}>
              <OnDutyForm />
            </Grid>
            <Grid item xs={12}>
              <TodoForm />
            </Grid>
          </Grid>
          {renderAlarm()}
          <hr className={classes.solidDivider} />

          {/* footer */}
          <Grid container justify="space-between" className={classes.footer}>
            <Grid item container sm="auto" spacing={3} style={{ width: 'auto' }}>
              <Grid item>
                <Button variant="contained" onClick={handleNavigate} className={classes.btn}>
                  取消
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  onClick={handleNavigate}
                  className={classes.btn}
                  style={{ backgroundColor: '#78b532' }}
                >
                  送出
                </Button>
              </Grid>
            </Grid>
            <Grid item sm="auto" onClick={handleNavigate} style={{ width: 'auto' }}>
              <Button color="primary" variant="contained" className={classes.btn}>
                儲存
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};
