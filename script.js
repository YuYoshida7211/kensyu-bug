"use strict";

const MAX_POINT = 100;
const MIN_POINT = 0;

const SUBJECTS = [
  { id: "kokugo", label: "国語" },
  { id: "sugaku", label: "数学" },
  { id: "eigo", label: "英語" },
  { id: "rika", label: "理科" },
  { id: "shakai", label: "社会" },
];

// ---- 初期化 ----

function init() {
  SUBJECTS.forEach(({ id }) => {
    const input = document.getElementById(id);
    // 修正③: change → input（入力中にリアルタイムで検証）
    input.addEventListener("input", () => {
      showError(id, getErrorMessage(input.value));
      updateCalcButton();
    });
  });
  updateCalcButton();
}

// ---- バリデーション ----

function getErrorMessage(value) {
  if (value === "") return "入力してください";

  if (!/^-?\d+(\.\d+)?$/.test(value)) return "数値を入力してください";

  const num = Number(value);

  if (!Number.isInteger(num) || num < MIN_POINT || num > MAX_POINT) {
    return "0〜100の整数を入力してください";
  }

  return null;
}

function isValid(id) {
  return getErrorMessage(document.getElementById(id).value) === null;
}

function showError(id, msg) {
  const errorEl = document.getElementById(id + "-error");
  const inputEl = document.getElementById(id);
  if (msg) {
    errorEl.textContent = msg;
    inputEl.classList.add("input-error");
  } else {
    errorEl.textContent = "";
    inputEl.classList.remove("input-error");
  }
}

function updateCalcButton() {
  const allValid = SUBJECTS.every(({ id }) => isValid(id));
  document.getElementById("calc-btn").disabled = !allValid;
}

// ---- 判定 ----

function getGradeLabel(avg) {
  if (avg >= 80) return "A";
  if (avg >= 60) return "B";
  if (avg >= 30) return "C";
  return "D";
}

// ---- 計算・結果表示 ----

function calculate() {
  const scores = SUBJECTS.map(({ id }) =>
    Number(document.getElementById(id).value),
  );

  const total = scores.reduce((sum, s) => sum + s, 0);
  const avg = total / SUBJECTS.length;

  const gradeLabel = getGradeLabel(avg);

  document.getElementById("result-total").textContent = total + " 点";
  document.getElementById("result-avg").textContent = avg.toFixed(1) + " 点";
  document.getElementById("result-grade").textContent = gradeLabel;

  document.getElementById("result-section").style.display = "block";
}

// ---- エントリポイント ----

document.addEventListener("DOMContentLoaded", () => {
  init();
  document.getElementById("calc-btn").addEventListener("click", calculate);
});