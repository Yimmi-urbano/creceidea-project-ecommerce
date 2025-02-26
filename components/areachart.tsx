import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";
import { Card, CardBody } from "@nextui-org/react";
import withPermission from "./withPermission";
import moment from "moment-timezone";



const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-green-700 text-white p-2 rounded-md">
        <p className="label font-bold text-xs">{`${payload[0].payload.name}`}</p>
        <p className="intro text-xs">{`S/ ${Number(payload[0].value).toFixed(2)}`}</p>
      </div>
    );
  }

  return null;
};

const AreaChartComponent: React.FC = () => {
  const [data, setData] = useState<{ name: string; uv: number }[]>([]);
  const [totalSales, setTotalSales] = useState<number | null>(null);
  const [lastMonth, setLastMonth] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

const API_URL = "https://api-orders.creceidea.pe/api/orders/sell/month";
const domain = localStorage.getItem("domainSelect") ?? '';

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const startDate = moment().tz("America/Lima").subtract(7, "days").format("YYYY-MM-DD");
        const endDate = moment().tz("America/Lima").format("YYYY-MM-DD");
        const response = await fetch(`${API_URL}?startDate=${startDate}&endDate=${endDate}`, {
          headers: { domain },
        });

        const result = await response.json();

        if (!result.status) {
          throw new Error(result.message || "Error al obtener datos");
        }

        setData(result.data);
        setTotalSales(result.totalUv);
        setLastMonth(result.totalCount);

      } catch (err) {
        setError("No se pudieron obtener los datos");
        console.error("Error al obtener datos:", err);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <Card isBlurred className="border-1 border-[#B8F1D2] bg-[#D9F9E699] dark:bg-[#2F946199]/60 dark:border-[#53B483]">
      <CardBody className="p-0">
        <div className="p-4">
          {error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : (
            <>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
                + S/ {totalSales?.toFixed(2)}
              </h2>
              {lastMonth && (
                <p className="text-xs text-gray-600 dark:text-white">
                 Total de los últimos {lastMonth} días
                </p>
              )}
            </>
          )}
        </div>
        <ResponsiveContainer width="100%" className="h-[150px]">
          <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
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

export default withPermission(AreaChartComponent, "areachart");
