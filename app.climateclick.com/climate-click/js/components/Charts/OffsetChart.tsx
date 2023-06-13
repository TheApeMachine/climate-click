import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { generateTooltip } from "./Tooltip";


const monetaryTicks = (currencySymbol:string="€") => {
  return (t:number) => `${currencySymbol}${t.toFixed(2)}`;
}

export const OffsetBarChart = (chartData:any) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={chartData.data}
        margin={{ top: 0, left: -20, right: 0, bottom: 0 }}
      >
        <Tooltip
          content={generateTooltip}
          cursor={{fill: "rgba(0,0,0,0.1)"}}
        />

        <Bar
          type="monotone"
          dataKey="amount"
          fill="#009F78"
          stroke="#009F78"
          radius={[3,3,0,0]}
        />

        <XAxis
          dataKey="day"
          tickSize={0}
          tickMargin={15}
          axisLine={{stroke: "#CCCCCC"}}
          interval={chartData.data.length - 2}
          allowDataOverflow={true}
          
        />
        <YAxis
          dataKey="amount"
          patternTransform={10}
          tickSize={5}
          tickMargin={10}
          tickLine={{stroke: "#CCCCCC"}}
          axisLine={{stroke: "#CCCCCC"}}
          tickFormatter={monetaryTicks()}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};
