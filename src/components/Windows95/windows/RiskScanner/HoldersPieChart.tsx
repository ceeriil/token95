import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import type { ITopHoldersReport } from "@/types/report";

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
  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 mt-4">
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

      <div className="space-y-2">
        {holders.map((holder, index) => (
          <div key={holder.accountAddress} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <p className="text-sm font-mono truncate max-w-[180px]">
              {holder.accountAddress}
            </p>
            <span className="text-xs text-gray-500">
              ({holder.percentage}%)
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(holder.accountAddress)}
            >
              <Copy className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
