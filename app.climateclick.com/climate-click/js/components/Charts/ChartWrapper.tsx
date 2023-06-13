import React, { useState, useEffect } from 'react';
import { getLatestDailyCompensations, DataPoint } from '../../hooks/compensations';
import { OffsetBarChart } from './OffsetChart';
import { MetricCard, MetricCardTitle, MetricCardValue } from '../MetricCard';
import { useStyletron } from "styletron-react";

export const ChartWrapper: React.FC = () => {
  const [chartData, setChartData] = useState<DataPoint[]>([{amount: 0, day: ""}]);
  const [css] = useStyletron();

  useEffect(() => {
    (async () => {
      try {
        const data = await getLatestDailyCompensations();
        setChartData(data);
      } catch (e) {
      }
    })();
  }, []);

  return (
      (chartData.length > 0)
      ? <div className={css({ marginBottom: `40px`})}>
          <MetricCard>
            <MetricCardTitle>Monthly climate investment</MetricCardTitle>
            <MetricCardValue> €{(chartData.reduce((acc, data) => acc + data.amount, 0).toFixed(2))}</MetricCardValue>
          </MetricCard>
          <h2>Compensations from the last month</h2>
          <OffsetBarChart data={chartData}/>
        </div>
      : <div>
          <h3>You don't have any compensations yet</h3>
          <p>When you do, they'll show up here.</p>
        </div>
  );
};
