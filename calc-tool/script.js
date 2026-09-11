// salary-tax.js —— 计算税后工资

const THRESHOLD = 5000; // 个税起征点（元/月）

// 月度税率表（从高到低）：应纳税所得额超过 limit 部分适用 rate，对应速算扣除数 deduction
const TAX_BRACKETS = [
  { limit: 80000, rate: 0.45, deduction: 15160 },
  { limit: 55000, rate: 0.35, deduction: 7160 },
  { limit: 35000, rate: 0.30, deduction: 4410 },
  { limit: 25000, rate: 0.25, deduction: 2660 },
  { limit: 12000, rate: 0.20, deduction: 1410 },
  { limit: 3000,  rate: 0.10, deduction: 210 },
  { limit: 0,     rate: 0.03, deduction: 0 }
];


