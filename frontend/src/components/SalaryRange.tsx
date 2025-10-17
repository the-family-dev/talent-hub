import React from "react";
import { formatNumber } from "../utils/utils";

interface SalaryRangeProps {
  salaryFrom?: number;
  salaryTo?: number;
}

const SalaryRange: React.FC<SalaryRangeProps> = ({ salaryFrom, salaryTo }) => {
  if (salaryFrom != null && salaryTo != null) {
    return (
      <span>
        {formatNumber(salaryFrom)} - {formatNumber(salaryTo)} ₽
      </span>
    );
  }

  if (salaryFrom != null) {
    return <span>От {formatNumber(salaryFrom)} ₽</span>;
  }

  if (salaryTo != null) {
    return <span>До {formatNumber(salaryTo)} ₽</span>;
  }

  return null;
};

export default SalaryRange;
