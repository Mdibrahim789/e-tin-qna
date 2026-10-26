// Direct benchmark test for Grounded AI Assistant
import { askGroundedAssistant } from './src/utils/groundedAi.js';
import qnaData from './src/data/qna.json' with { type: 'json' };

const questions = qnaData.questions;

const adversarial10Tests = [
  "বাংলাদেশ ক্রিকেট দলের বর্তমান অধিনায়ক কে?",
  "আমেরিকান পর্যটন ভিসার অ্যাপয়েন্টমেন্ট ফি কত টাকা?",
  "প্যারাসিটামল ৫০০ মিলিগ্রাম দিনে কতবার খেতে হয়?",
  "২০৩০ সালে বাংলাদেশের আয়করের হার কত শতাংশ হবে?",
  "আমার ফেসবুক পেজ হ্যাক হয়েছে কীভাবে উদ্ধার করব?",
  "ভারতের জিএসটি (GST) রিটার্ন ফর্ম ৩বি কীভাবে ফাইল করব?",
  "লটারি টিকিট কিনলে কি নিশ্চিত কোটিপতি হওয়া যায়?",
  "ঢাকা থেকে কক্সবাজার ট্রেনের টিকিট ভাড়া কত?",
  "সুইজারল্যান্ডের ব্যাংকে গোপন অ্যাকাউন্ট খোলার নিয়ম কি?",
  "আইফোন ১৬ প্রো ম্যাক্সের অফিসিয়াল বাজারদর কত?"
];

console.log("=== AI Assistant 10-Question Grounded Benchmark ===");
let passed = 0;

for (let i = 0; i < adversarial10Tests.length; i++) {
  const q = adversarial10Tests[i];
  const res = askGroundedAssistant(q, questions);
  const isRefusal = res.status === 'unmatched';
  if (isRefusal) passed++;
  console.log(`[Test ${i + 1}] Query: "${q}"`);
  console.log(`Status: ${res.status} | Strict Refusal: ${isRefusal ? 'PASSED' : 'FAILED'}`);
  console.log(`Response: "${res.text}"\n`);
}

console.log(`Result: ${passed}/10 tests passed strict refusal guardrail!`);
if (passed === 10) {
  console.log("SUCCESS: AI Assistant 100% refuses to guess on out-of-domain questions.");
} else {
  console.error("FAILURE: Some questions were not refused.");
  process.exit(1);
}
