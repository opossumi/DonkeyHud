import React from "react";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

export const StatCards = () => {
  return (
    <>
      <Card
        title={"Test"}
        value={"100$"}
        pillText={"20%"}
        trend={"up"}
        period={"Jan 1 - 2"}
      />
      <Card
        title={"Test"}
        value={"100$"}
        pillText={"20%"}
        trend={"down"}
        period={"Jan 1 - 2"}
      />
      <Card
        title={"Test"}
        value={"100$"}
        pillText={"20%"}
        trend={"up"}
        period={"Jan 1 - 2"}
      />
    </>
  );
};

interface CardProps {
  title: string;
  value: string;
  pillText: string;
  trend: "up" | "down";
  period: string;
}

const Card = ({ title, value, pillText, trend, period }: CardProps) => {
  return (
    <div className="col-span-4 rounded border border-stone-300 p-4">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h3 className="mb-2 text-sm text-stone-500">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>
        <span
          className={`flex items-center gap-1 rounded px-2 py-1 text-sm font-medium ${trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {trend === "up" ? <TrendingUpIcon /> : <TrendingDownIcon />}
          {pillText}
        </span>
      </div>
      <p className="text-xs text-stone-500">{period}</p>
    </div>
  );
};
