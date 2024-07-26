import React from 'react';
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import { Card, CardBody } from "@nextui-org/react";
import withPermission from "./withPermission"; 

const data = [
  { name: 'Enero', uv: 500 },
  { name: 'Febrero', uv: 700 },
  { name: 'Marzo', uv: 1500 },
  { name: 'Abril', uv: 2000 },
  { name: 'Mayo', uv: 3000 },
  { name: 'Junio', uv: 3500 },
  { name: 'Julio', uv: 4000 },
];

const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-green-700 text-white p-2 rounded-lg">
        <p className="label font-bold">{`${payload[0].payload.name}`}</p>
        <p className="intro">{`S/ ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const AreaChartComponent: React.FC = () => {
  return (
    <Card isBlurred className="border-1 border-[#B8F1D2] bg-[#D9F9E699] dark:bg-[#2F946199]/60 dark:border-[#53B483] max-w-[610px]">
      <CardBody className="p-0">
        <div className="p-4">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white">S/ 500.00</h2>
          <p className="text-lg text-gray-600 dark:text-white">S/ 300.00 ventas mes anterior</p>
        </div>
        <ResponsiveContainer width="100%" className="h-[150px]">
          <AreaChart
            data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
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
      </CardBody>
    </Card>
  );
};

export default withPermission(AreaChartComponent, 'areachart');
