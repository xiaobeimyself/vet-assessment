import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const questions = [
  {
    id: 1,
    text: "1️⃣ 我们有没有建立清晰的客户分类标签？",
    options: [
      { label: "没有任何客户数据", value: 1 },
      { label: "客户分为新老客户两类", value: 2 },
      { label: "按宠种/频率/是否年卡分级", value: 3 },
      { label: "有生命周期标签，能做精准回访", value: 4 },
      { label: "CRM系统自动推送个性化提醒", value: 5 },
    ],
  },
  {
    id: 2,
    text: "2️⃣ 我们有没有复诊召回机制？",
    options: [
      { label: "客户复诊靠医生记忆或微信喊", value: 1 },
      { label: "有部分主动联系，但不成体系", value: 2 },
      { label: "护士定期追访，记录但不反馈", value: 3 },
      { label: "建立复诊SOP，责任人专岗", value: 4 },
      { label: "复诊率超过50%，有数据驱动优化机制", value: 5 },
    ],
  },
  {
    id: 3,
    text: "3️⃣ 我们的信息化水平如何？",
    options: [
      { label: "手工登记、Excel表格、纸质处方", value: 1 },
      { label: "部分使用PMS（医院管理系统）", value: 2 },
      { label: "核心流程（接诊、结算）已上线系统", value: 3 },
      { label: "系统与财务/库存/会员/绩效相联通", value: 4 },
      { label: "完整SaaS系统全覆盖，自动形成运营数据", value: 5 },
    ],
  },
  {
    id: 4,
    text: "4️⃣ 我们是否能从数据中做决策？",
    options: [
      { label: "无数据", value: 1 },
      { label: "靠直觉和经验判断", value: 2 },
      { label: "老板每月查数据但无优化机制", value: 3 },
      { label: "定期运营复盘，数据驱动迭代", value: 4 },
      { label: "数据可视化+AI辅助洞察+诊疗流程优化", value: 5 },
    ],
  },
  {
    id: 5,
    text: "5️⃣ 医院是否有明确的岗位职责和培训机制？",
    options: [
      { label: "靠师傅带徒弟，没有培训", value: 1 },
      { label: "有粗略分工但容易混岗", value: 2 },
      { label: "有培训资料但更新缓慢", value: 3 },
      { label: "SOP+手册+培训计划已上线", value: 4 },
      { label: "人才梯队清晰，培训体系+激励机制闭环", value: 5 },
    ],
  },
  {
    id: 6,
    text: "6️⃣ 是否建立医生激励或成长机制？",
    options: [
      { label: "靠底薪+吆喝加班", value: 1 },
      { label: "纯绩效导向，易内卷", value: 2 },
      { label: "有成长机制但短期激励为主", value: 3 },
      { label: "医生有晋升路径+技能等级认证", value: 4 },
      { label: "设有合伙机制/分红体系/个人IP孵化", value: 5 },
    ],
  },
  {
    id: 7,
    text: "7️⃣ 医疗服务是否专业分工？",
    options: [
      { label: "一人全能，啥都做", value: 1 },
      { label: "勉强分为外科/内科", value: 2 },
      { label: "有专人负责麻醉、化验、接待", value: 3 },
      { label: "多学科协作+有初步专科方向", value: 4 },
      { label: "设有正式专科医生+专业主任负责培训与复盘", value: 5 },
    ],
  },
  {
    id: 8,
    text: "8️⃣ 医疗复盘机制如何？",
    options: [
      { label: "出了事才开会", value: 1 },
      { label: "偶尔口头讨论", value: 2 },
      { label: "每月开会总结但缺乏行动计划", value: 3 },
      { label: "系统化病案复盘，复盘结果反馈SOP", value: 4 },
      { label: "设有M&M会议（死亡病例复盘）、持续医疗改进计划", value: 5 },
    ],
  },
  {
    id: 9,
    text: "9️⃣ 医院的收入结构是否多元？",
    options: [
      { label: "95%靠诊疗收费", value: 1 },
      { label: "加卖点药、推点寄养", value: 2 },
      { label: "诊疗+年卡+零售占比平衡", value: 3 },
      { label: "年卡/保险/会员复购+异业合作", value: 4 },
      { label: "构建闭环型消费生态：医院+零售+线上+增值服务", value: 5 },
    ],
  },
  {
    id: 10,
    text: "🔟 医院品牌是否具有独立传播力？",
    options: [
      { label: "靠院长抖音/朋友圈支撑", value: 1 },
      { label: "主要靠客户口碑", value: 2 },
      { label: "有统一VI和宣传素材", value: 3 },
      { label: "自媒体矩阵+用户UGC分享", value: 4 },
      { label: "品牌有独立人设、口号、年度IP活动", value: 5 },
    ],
  },
];

const scoreMeaning = [
  { range: [10, 19], meaning: "萌芽阶段：医疗为主、系统薄弱、老板亲力亲为" },
  { range: [20, 29], meaning: "初阶经营：有意识经营，但管理机制和系统力还很初级" },
  { range: [30, 39], meaning: "成长期医院：开始建设系统，部分复购机制生效，组织力初具雏形" },
  { range: [40, 45], meaning: "成熟运营阶段：医疗与经营双轮驱动，服务体验提升，品牌渐稳" },
  { range: [46, 50], meaning: "战略型平台医院：系统协同、生态闭环、数据驱动，具备连锁潜力" },
];

function App() {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [meaning, setMeaning] = useState(null);

  const handleAnswer = (id, value) => {
    setAnswers({ ...answers, [id]: parseInt(value) });
  };

  const calculate = () => {
    const total = Object.values(answers).reduce((sum, val) => sum + val, 0);
    setScore(total);
    const matched = scoreMeaning.find(({ range }) => total >= range[0] && total <= range[1]);
    setMeaning(matched?.meaning || "未知阶段");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🐾 宠物医院五维战略自测问卷</h1>
      {questions.map((q) => (
        <div key={q.id} className="mb-4">
          <p className="font-semibold mb-2">{q.text}</p>
          {q.options.map((opt, i) => (
            <label key={i} className="block mb-1">
              <input
                type="radio"
                name={`q${q.id}`}
                value={opt.value}
                onChange={() => handleAnswer(q.id, opt.value)}
              />{" "}
              {opt.label}
            </label>
          ))}
        </div>
      ))}
      <button onClick={calculate} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
        提交测评
      </button>
      {score !== null && (
        <div className="mt-6 text-center">
          <p>你的得分是：<strong>{score}</strong></p>
          <p>评估结果：<strong>{meaning}</strong></p>
        </div>
      )}
    </div>
  );
}

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
