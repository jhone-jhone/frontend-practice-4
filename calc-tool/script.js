const THRESHOLD = 5000; // 个税起征点（元/月）

const TAX_BRACKETS = [
  { limit: 80000, rate: 0.45, deduction: 15160 },
  { limit: 55000, rate: 0.35, deduction: 7160 },
  { limit: 35000, rate: 0.30, deduction: 4410 },
  { limit: 25000, rate: 0.25, deduction: 2660 },
  { limit: 12000, rate: 0.20, deduction: 1410 },
  { limit: 3000,  rate: 0.10, deduction: 210 },
  { limit: 0,     rate: 0.03, deduction: 0 }
];

const taxable = (salary) => Math.max(0, salary - THRESHOLD);

const taxOf = (salary) => {
  const t = taxable(salary);
  if (t === 0) return 0;
  const bracket = TAX_BRACKETS.find(b => t > b.limit);
  return t * bracket.rate - bracket.deduction;
};

const netOf = (salary) => salary - taxOf(salary);

function collectNameAndSalary() {
  const arr = [];
  while (true) {
    const name = prompt("请输入名字（取消结束）：");
    if (name === null) break;
    if (name.trim() === "") {
      alert("名字不能为空！");
      continue;
    }
    const numStr = prompt(`请输入 ${name.trim()} 的税前工资（取消结束）：`);
    if (numStr === null) break;
    const num = Number(numStr);
    if (numStr.trim() === "" || Number.isNaN(num) || num < 0) {
      alert("工资无效，请重新输入这一组！");
      continue;
    }
    arr.push({ name: name.trim(), value: num });
  }
  return arr;
}

// 单人明细
const detail = ({ name, value }) => ({
  name,
  gross: value.toFixed(2),
  tax: taxOf(value).toFixed(2),
  net: netOf(value).toFixed(2)
});

// 汇总报告（模仿你 report 的写法）
const report = (list) => {
  if (list.length === 0) return "没有输入任何数据";
  const lines = list.map(p => {
    const d = detail(p);
    return `${d.name}：税前 ${d.gross} 元，缴税 ${d.tax} 元，税后 ${d.net} 元`;
  });
  const totalTax = list.reduce((sum, p) => sum + taxOf(p.value), 0);
  const totalNet = list.reduce((sum, p) => sum + netOf(p.value), 0);
  return `${lines.join("\n")}\n合计缴税 ${totalTax.toFixed(2)} 元，合计税后 ${totalNet.toFixed(2)} 元`;
};

const data = collectNameAndSalary();
console.log(data.map(detail)); // 明细数组
console.log(report(data));     // 文字报告


