"use strict";

// Primary content is static HTML; JavaScript only enhances the language switch.
const translations = {
  skip: "跳转到正文",
  navAbout: "主页",
  profileRole: "博士研究生<br />大模型与智能体安全", profileUniversity: "国防科技大学",
  aboutTitle: '关于我 <span class="heading-aside">(冯云浩)</span>',
  bio: '我是<a href="https://english.nudt.edu.cn/">国防科技大学</a>管理科学与工程专业博士研究生，导师为<strong>郭延明教授</strong>。2025 年 5 月至 12 月在<a href="https://www.fudan.edu.cn/en/">复旦大学</a>访问。目前在<a href="https://www.antgroup.com/en">蚂蚁集团</a>担任实习算法工程师，研究大模型与智能体安全。',
  researchGoal: '我的长期研究目标是构建面向真实环境的<strong>安全、可靠、可控的 AI 智能体</strong>。目前主要关注以下方向：',
  interest1: '大模型与智能体安全、后门攻击与自动化红队；',
  interest2: '安全后训练、检测模型与强化学习；',
  interest3: '计算机操作智能体、编程智能体与科研助手的可靠性评测。',
  collaboration: '欢迎在可信大模型与 AI 智能体方向开展学术交流与合作。',
  newsTitle: "最新动态",
  newsNeurips: "✨ 一篇论文被 <strong>NeurIPS 2026</strong> 录用！",
  newsMM: "✨ 一篇论文被 <strong>ACM Multimedia 2026</strong> 录用！",
  newsICML: "✨ 两篇论文被 <strong>ICML 2026</strong> 录用！",
  newsACL: "✨ 一篇论文被 <strong>Findings of ACL 2026</strong> 录用！",
  newsWWW: "✨ 一篇论文被 <strong>WWW 2026</strong> 录用！",
  pubTitle: "代表性论文", allPapers: "完整列表",
  experienceTitle: "研究与实习经历", fudanName: "复旦大学", fudanRole: "访问学生",
  fudanDetail: "开展智能体安全与大模型可靠性研究，关注智能体工作流中的后门威胁与评测基准构建。",
  antName: "蚂蚁集团 · 大安全部", antDate: "2026.05 – 至今", internRole: "实习算法工程师",
  antDetail: "开展安全数据构建，以及结合 SFT 与强化学习的检测模型后训练；围绕提示注入、越狱和工具调用风险，研究基于执行轨迹的风险判定与防护。",
  alibabaName: "阿里巴巴集团 · 未来生活实验室",
  alibabaDetail: "研究 Coding Agent 的安全与可靠性，分析规划、工具调用和代码执行的攻击面，探索基于执行轨迹的运行时监控、自演化防护与过程监督。",
  jdName: "京东探索研究院",
  jdDetail: "开发支持 TB 级表格数据的自动特征工程框架，覆盖特征预处理、生成与筛选，并集成至 OmniForce AutoML 平台。",
  educationTitle: "教育经历", nudt: "国防科技大学", swufe: "西南财经大学",
  phdDegree: "博士在读 · 管理科学与工程", phdDate: "2024.03 – 至今",
  masterDegree: "硕士 · 电子信息", bachelorDegree: "本科 · 信息管理与信息系统",
  serviceTitle: "学术服务", serviceIntro: "担任以下会议或期刊的程序委员会成员 / 审稿人：",
  awardsTitle: "荣誉与奖励",
  awardQingyun: '腾讯青云计划 (Tencent Qingyun Program)',
  awardKstar: '快手 KStar 计划 (Kuaishou KStar Program)',
  awardHuawei: '2024 年“华为杯”第六届中国研究生人工智能创新大赛，大模型安全赛道<strong>全国冠军</strong>',
  awardNudt: '国防科技大学国防科技奖学金，2024 年',
  backTop: "返回顶部 ↑"
};
const languageButton = document.getElementById("langToggle");
const localizedNodes = [...document.querySelectorAll("[data-i18n], [data-zh]")];
const englishContent = new Map(localizedNodes.map(node => [node, node.innerHTML]));

function setLanguage(language) {
  const chinese = language === "zh";
  document.documentElement.lang = chinese ? "zh-CN" : "en";
  localizedNodes.forEach(node => {
    if (chinese && node.dataset.zh) node.textContent = node.dataset.zh;
    else node.innerHTML = chinese ? (translations[node.dataset.i18n] ?? englishContent.get(node)) : englishContent.get(node);
  });
  languageButton.textContent = chinese ? "English" : "中文";
  languageButton.setAttribute("aria-label", chinese ? "Switch to English" : "切换到中文");
  try { localStorage.setItem("homepage-language", language); } catch { /* Preference storage is optional. */ }
}
if (languageButton) {
  languageButton.hidden = false;
  languageButton.addEventListener("click", () => setLanguage(document.documentElement.lang === "en" ? "zh" : "en"));
  try { if (localStorage.getItem("homepage-language") === "zh") setLanguage("zh"); } catch { /* English remains readable. */ }
}
document.getElementById("year").textContent = String(new Date().getFullYear());
