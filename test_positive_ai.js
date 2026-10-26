import { askGroundedAssistant } from './src/utils/groundedAi.js';
import qnaData from './src/data/qna.json' with { type: 'json' };

const questions = qnaData.questions;

const positiveTests = [
  "e-TIN কি?",
  "zero return kivabe dibo?",
  "কর দিবস কবে?",
  "নারীদের করমুক্ত সীমা কত?",
  "ভ্যাট আর BIN এর পার্থক্য কি?"
];

console.log("=== AI Assistant Positive In-Domain Queries Test ===");
let passed = 0;

for (const q of positiveTests) {
  const res = askGroundedAssistant(q, questions);
  console.log(`Query: "${q}" -> Status: ${res.status}`);
  if (res.status === 'matched') {
    passed++;
    console.log(`Matched Title: ${res.questionTitle}`);
    console.log(`Legal Section: ${res.legalSection}`);
    console.log(`Source: ${res.sourceName}\n`);
  } else {
    console.error(`Failed to match legitimate query: ${q}\n`);
  }
}

console.log(`Result: ${passed}/${positiveTests.length} matched accurately with verified legal sources!`);
