import React from 'react';
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import withPermission from "./withPermission"; 


const data = [
  { name: 'Enero', uv: 4000 },
  { name: 'Febrero', uv: 3000 },
  { name: 'Marzo', uv: 2000 },
  { name: 'Abril', uv: 2780 },
  { name: 'Mayo', uv: 1890 },
  { name: 'Junio', uv: 2390 },
  { name: 'Julio', uv: 3490 },
];

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <p className="label">{`${payload[0].payload.name}`}</p>
        <p className="intro">{`S/ ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const AreaChartComponent: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" className="h-[150px]">
      <AreaChart
        data={data}
        margin={{ top: 60, right: 0, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="uv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorUv)" />
      </AreaChart>
    </ResponsiveContainer>
  );
};


export default withPermission(AreaChartComponent, 'areachart'); 

