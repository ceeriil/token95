import { PieChart, Pie, Cell, Tooltip } from "recharts";
import type { ITopHoldersReport } from "@/types/report";
import { Address } from "@/components/Address";

interface Props {
  holders: ITopHoldersReport[];
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF4560",
  "#775DD0",
  "#4CAF50",
  "#F9A826",
  "#546E7A",
];

export const HoldersPieChart = ({ holders }: Props) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-4 mt-4 ">
      <PieChart width={300} height={300}>
        <Pie
          data={holders}
          dataKey="percentage"
          nameKey="address"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {holders.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      <div className="space-y-2 min-w-[4rem]">
        {holders.map((holder, index) => (
          <div key={holder.accountAddress} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <Address
              type="account"
              address={holder.accountAddress}
              className="text-xs"
              iconSize="h-4 w-4"
            />
            <span className="text-xs text-gray-500">
              ({holder.percentage}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
