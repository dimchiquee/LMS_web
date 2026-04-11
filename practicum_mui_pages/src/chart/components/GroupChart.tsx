import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import Container from '@mui/material/Container';
import { tGroup } from "../groupdata";
import SettingChart from './SettingChart';

type tSeries = {
  'Максимальная высота': boolean;
  'Средняя высота': boolean;
  'Минимальная высота': boolean;
};

type ChartProps = {
  data: tGroup;
};

function GroupChart({ data }: ChartProps) {

  const [series, setSeries] = React.useState<tSeries>({
    'Максимальная высота': true,
    'Средняя высота': false,
    'Минимальная высота': false,
  });

  const [isBar, setIsBar] = React.useState(true);

  const seriesY = Object.entries(series)
    .filter(([, isActive]) => isActive)
    .map(([key]) => ({
      dataKey: key,
      label: key,
    }));

  const chartSetting = {
    yAxis: [{ label: 'Высота (м)' }],
    height: 400,
  };
  const isSingleSeries = seriesY.length === 1;

  return (
    <Container maxWidth="lg">



      {isBar ? (
        <BarChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={seriesY.map(seriesItem => ({
            ...seriesItem,
            ...(isSingleSeries && { barLabel: "value" }),
          }))}
          slotProps={{
            legend: {
              position: { vertical: 'bottom', horizontal: 'center' },
            },
          }}
          {...chartSetting}
        />
      ) : (
        <LineChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={seriesY.map(seriesItem => ({
            ...seriesItem,
            showMark: true,
          }))}
          slotProps={{
            legend: {
              position: { vertical: 'bottom', horizontal: 'center' },
            },
          }}
          {...chartSetting}
        />
      )}
      <SettingChart
        series={series}
        setSeries={setSeries}
        isBar={isBar}
        setIsBar={setIsBar}
      />
    </Container>
  );
}

export default GroupChart;