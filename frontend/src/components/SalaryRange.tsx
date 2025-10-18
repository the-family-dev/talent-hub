import React from "react";
import { formatNumber } from "../utils/utils";

interface SalaryRangeProps {
  salaryFrom?: number;
  salaryTo?: number;
}

const SalaryRange: React.FC<SalaryRangeProps> = ({ salaryFrom, salaryTo }) => {
  if (salaryFrom != null && salaryTo != null) {
    return (
      <span className="text-2xl">
        {formatNumber(salaryFrom)} - {formatNumber(salaryTo)} ₽
      </span>
    );
  }

  if (salaryFrom != null) {
    return <span className="text-2xl">От {formatNumber(salaryFrom)} ₽</span>;
  }

  if (salaryTo != null) {
    return <span className="text-2xl">До {formatNumber(salaryTo)} ₽</span>;
  }

  return null;
};

export default SalaryRange;
