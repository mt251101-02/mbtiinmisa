// 16Personalities 스타일 성격 유형 검사기 애플리케이션 로직

(function () {
  "use strict";

  // 상태 관리
  const state = {
    currentStep: 0,
    pageSize: 6,
    totalQuestions: MBTI_QUESTIONS.length,
    totalSteps: Math.ceil(MBTI_QUESTIONS.length / 6),
    answers: {}, // { [questionId]: value (-3 to +3) }
    calculatedResult: null
  };

  // DOM 요소 캐시
  const elements = {
    viewIntro: document.getElementById("view-intro"),
    viewTest: document.getElementById("view-test"),
    viewLoading: document.getElementById("view-loading"),
    viewResult: document.getElementById("view-result"),

    btnStart: document.getElementById("btn-start"),
    btnPrev: document.getElementById("btn-prev"),
    btnNext: document.getElementById("btn-next"),
    btnRestart: document.getElementById("btn-restart"),
    btnCopyLink: document.getElementById("btn-copy-link"),

    progressBar: document.getElementById("progress-bar"),
    progressText: document.getElementById("progress-text"),
    stepIndicator: document.getElementById("step-indicator"),
    questionsContainer: document.getElementById("questions-container"),
    toast: document.getElementById("toast")
  };

  // 1. 이벤트 리스너 등록
  function initEvents() {
    elements.btnStart.addEventListener("click", startTest);
    elements.btnPrev.addEventListener("click", prevStep);
    elements.btnNext.addEventListener("click", nextStep);
    elements.btnRestart.addEventListener("click", restartTest);
    elements.btnCopyLink.addEventListener("click", copyResultLink);
  }

  // 2. 화면 전환 헬퍼
  function switchView(viewName) {
    elements.viewIntro.classList.add("hidden");
    elements.viewTest.classList.add("hidden");
    elements.viewLoading.classList.add("hidden");
    elements.viewResult.classList.add("hidden");

    if (viewName === "intro") elements.viewIntro.classList.remove("hidden");
    if (viewName === "test") elements.viewTest.classList.remove("hidden");
    if (viewName === "loading") elements.viewLoading.classList.remove("hidden");
    if (viewName === "result") elements.viewResult.classList.remove("hidden");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // 3. 테스트 시작
  function startTest() {
    state.currentStep = 0;
    state.answers = {};
    renderCurrentStep();
    switchView("test");
  }

  // 4. 질문 렌더링
  function renderCurrentStep() {
    const startIndex = state.currentStep * state.pageSize;
    const currentQuestions = MBTI_QUESTIONS.slice(startIndex, startIndex + state.pageSize);

    elements.stepIndicator.textContent = `단계 ${state.currentStep + 1} / ${state.totalSteps}`;
    updateProgress();

    // 이전 버튼 활성화/비활성화
    elements.btnPrev.disabled = state.currentStep === 0;
    if (state.currentStep === 0) {
      elements.btnPrev.classList.add("opacity-40", "cursor-not-allowed");
    } else {
      elements.btnPrev.classList.remove("opacity-40", "cursor-not-allowed");
    }

    // 다음 버튼 텍스트 변경 (마지막 페이지인 경우)
    if (state.currentStep === state.totalSteps - 1) {
      elements.btnNext.innerHTML = '<span>결과 분석하기</span> <span class="ml-1">✨</span>';
      elements.btnNext.classList.remove("bg-emerald-600", "hover:bg-emerald-700");
      elements.btnNext.classList.add("bg-purple-600", "hover:bg-purple-700");
    } else {
      elements.btnNext.innerHTML = '<span>다음 단계</span> <span class="ml-1">→</span>';
      elements.btnNext.classList.remove("bg-purple-600", "hover:bg-purple-700");
      elements.btnNext.classList.add("bg-emerald-600", "hover:bg-emerald-700");
    }

    // 질문 목록 HTML 생성
    elements.questionsContainer.innerHTML = currentQuestions
      .map((q, idx) => {
        const globalNum = startIndex + idx + 1;
        const currentAns = state.answers[q.id];

        return `
          <div class="question-card bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 mb-6 transition-all" id="q-card-${q.id}">
            <div class="flex items-start gap-3 mb-4">
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs shrink-0">
                ${globalNum}
              </span>
              <p class="text-base sm:text-lg font-medium text-gray-800 leading-snug">
                ${q.question}
              </p>
            </div>

            <div class="likert-scale">
              <span class="likert-label agree">동의</span>
              <div class="likert-options">
                <!-- 동의 (+3, +2, +1) -->
                <button type="button" aria-label="매우 동의" class="likert-option agree-opt size-xl ${currentAns === 3 ? "selected" : ""}" data-qid="${q.id}" data-val="3"></button>
                <button type="button" aria-label="동의" class="likert-option agree-opt size-lg ${currentAns === 2 ? "selected" : ""}" data-qid="${q.id}" data-val="2"></button>
                <button type="button" aria-label="약간 동의" class="likert-option agree-opt size-md ${currentAns === 1 ? "selected" : ""}" data-qid="${q.id}" data-val="1"></button>

                <!-- 중립 (0) -->
                <button type="button" aria-label="보통 / 중립" class="likert-option neutral-opt size-sm ${currentAns === 0 ? "selected" : ""}" data-qid="${q.id}" data-val="0"></button>

                <!-- 비동의 (-1, -2, -3) -->
                <button type="button" aria-label="약간 비동의" class="likert-option disagree-opt size-md ${currentAns === -1 ? "selected" : ""}" data-qid="${q.id}" data-val="-1"></button>
                <button type="button" aria-label="비동의" class="likert-option disagree-opt size-lg ${currentAns === -2 ? "selected" : ""}" data-qid="${q.id}" data-val="-2"></button>
                <button type="button" aria-label="매우 비동의" class="likert-option disagree-opt size-xl ${currentAns === -3 ? "selected" : ""}" data-qid="${q.id}" data-val="-3"></button>
              </div>
              <span class="likert-label disagree">비동의</span>
            </div>
          </div>
        `;
      })
      .join("");

    // 선택 이벤트 바인딩
    const buttons = elements.questionsContainer.querySelectorAll(".likert-option");
    buttons.forEach((btn) => {
      btn.addEventListener("click", onOptionSelect);
    });
  }

  // 5. 옵션 선택 핸들러
  function onOptionSelect(e) {
    const btn = e.currentTarget;
    const qid = parseInt(btn.getAttribute("data-qid"), 10);
    const val = parseInt(btn.getAttribute("data-val"), 10);

    // 해당 질문의 다른 선택지 해제 후 현재 버튼 활성화
    const card = document.getElementById(`q-card-${qid}`);
    card.classList.remove("border-red-400", "bg-red-50/20");
    const siblingBtns = card.querySelectorAll(".likert-option");
    siblingBtns.forEach((b) => b.classList.remove("selected"));
    btn.classList.add("selected");

    state.answers[qid] = val;
    updateProgress();
  }

  // 6. 진행률 업데이트
  function updateProgress() {
    const answeredCount = Object.keys(state.answers).length;
    const percentage = Math.round((answeredCount / state.totalQuestions) * 100);
    elements.progressBar.style.width = `${percentage}%`;
    elements.progressText.textContent = `${percentage}% (${answeredCount}/${state.totalQuestions})`;
  }

  // 7. 이전 / 다음 스텝 이동
  function prevStep() {
    if (state.currentStep > 0) {
      state.currentStep--;
      renderCurrentStep();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function nextStep() {
    // 현재 스텝의 모든 문항이 응답되었는지 검사
    const startIndex = state.currentStep * state.pageSize;
    const currentQuestions = MBTI_QUESTIONS.slice(startIndex, startIndex + state.pageSize);
    let unansweredQid = null;

    for (const q of currentQuestions) {
      if (state.answers[q.id] === undefined) {
        unansweredQid = q.id;
        break;
      }
    }

    if (unansweredQid !== null) {
      // 미응답 문항 하이라이트 및 스크롤
      const unCard = document.getElementById(`q-card-${unansweredQid}`);
      if (unCard) {
        unCard.classList.add("border-red-400", "bg-red-50/30");
        unCard.scrollIntoView({ behavior: "smooth", block: "center" });
        showToast("모든 문항에 답변을 선택해 주세요!");
      }
      return;
    }

    // 마지막 단계인 경우 결과 계산 및 화면 전환
    if (state.currentStep === state.totalSteps - 1) {
      finishTest();
    } else {
      state.currentStep++;
      renderCurrentStep();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  // 8. 테스트 종료 및 로딩 연출
  function finishTest() {
    switchView("loading");

    // 1.5초 후 결과 화면 렌더링
    setTimeout(() => {
      calculateResult();
      renderResult();
      switchView("result");
    }, 1400);
  }

  // 9. 점수 계산 알고리즘
  function calculateResult() {
    const scores = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0,
      A: 0, T_id: 0
    };

    const opposites = {
      E: "I", I: "E",
      S: "N", N: "S",
      T: "F", F: "T",
      J: "P", P: "J",
      A: "T_id", T: "A"
    };

    MBTI_QUESTIONS.forEach((q) => {
      const val = state.answers[q.id];
      if (val === undefined) return;

      const target = q.dimension === "AT" && q.target === "T" ? "T_id" : q.target;
      const opposite = opposites[q.target] || "I";

      if (val > 0) {
        scores[target] += val;
      } else if (val < 0) {
        scores[opposite] += Math.abs(val);
      } else {
        // 중립(0)일 경우 양쪽에 균등 배분
        scores[target] += 1.5;
        scores[opposite] += 1.5;
      }
    });

    // 백분율 계산 헬퍼
    function getPercentages(scoreA, scoreB) {
      const total = scoreA + scoreB;
      if (total === 0) return { a: 50, b: 50 };
      const percentA = Math.round((scoreA / total) * 100);
      return {
        a: percentA,
        b: 100 - percentA
      };
    }

    const ei = getPercentages(scores.E, scores.I);
    const sn = getPercentages(scores.S, scores.N);
    const tf = getPercentages(scores.T, scores.F);
    const jp = getPercentages(scores.J, scores.P);
    const at = getPercentages(scores.A, scores.T_id);

    const typeCode =
      (ei.a >= 50 ? "E" : "I") +
      (sn.b >= 50 ? "N" : "S") + // Intuition(N) vs Sensing(S)
      (tf.a >= 50 ? "T" : "F") +
      (jp.a >= 50 ? "J" : "P");

    const identityCode = at.a >= 50 ? "A" : "T";

    state.calculatedResult = {
      typeCode: typeCode,
      identityCode: identityCode,
      fullCode: `${typeCode}-${identityCode}`,
      traits: {
        ei: { left: "외향형 (E)", right: "내향형 (I)", leftPct: ei.a, rightPct: ei.b, winner: ei.a >= 50 ? "E" : "I" },
        sn: { left: "직관형 (N)", right: "현실주의형 (S)", leftPct: sn.b, rightPct: sn.a, winner: sn.b >= 50 ? "N" : "S" },
        tf: { left: "이성사고형 (T)", right: "감정형 (F)", leftPct: tf.a, rightPct: tf.b, winner: tf.a >= 50 ? "T" : "F" },
        jp: { left: "계획형 (J)", right: "탐색형 (P)", leftPct: jp.a, rightPct: jp.b, winner: jp.a >= 50 ? "J" : "P" },
        at: { left: "자기주장형 (-A)", right: "신중형 (-T)", leftPct: at.a, rightPct: at.b, winner: at.a >= 50 ? "A" : "T" }
      }
    };
  }

  // 10. 결과 렌더링
  function renderResult() {
    const res = state.calculatedResult;
    const typeInfo = MBTI_RESULTS[res.typeCode];
    const identityInfo = MBTI_IDENTITY[res.identityCode];

    if (!typeInfo) return;

    // 헤더 및 기본 정보
    document.getElementById("res-role-badge").textContent = typeInfo.role;
    document.getElementById("res-role-badge").style.backgroundColor = `${typeInfo.color}15`;
    document.getElementById("res-role-badge").style.color = typeInfo.color;
    document.getElementById("res-icon").textContent = typeInfo.icon;
    document.getElementById("res-full-code").textContent = res.fullCode;
    document.getElementById("res-name").textContent = typeInfo.name;
    document.getElementById("res-english-name").textContent = typeInfo.englishName;
    document.getElementById("res-summary").textContent = `"${typeInfo.summary}"`;
    document.getElementById("res-description").textContent = typeInfo.description;

    // 키워드 태그
    const tagContainer = document.getElementById("res-tags");
    tagContainer.innerHTML = typeInfo.traits
      .map(
        (t) =>
          `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">#${t}</span>`
      )
      .join("");

    // 5대 성향 게이지 바 렌더링
    renderTraitBars(res.traits, typeInfo.color);

    // 강점 & 약점 목록
    const strengthsContainer = document.getElementById("res-strengths");
    strengthsContainer.innerHTML = typeInfo.strengths
      .map((s) => `<li class="flex items-start gap-2 text-sm text-gray-700"><span class="text-emerald-500 font-bold">✓</span> ${s}</li>`)
      .join("");

    const weaknessesContainer = document.getElementById("res-weaknesses");
    weaknessesContainer.innerHTML = typeInfo.weaknesses
      .map((w) => `<li class="flex items-start gap-2 text-sm text-gray-700"><span class="text-purple-500 font-bold">•</span> ${w}</li>`)
      .join("");

    // 추천 직무
    const careersContainer = document.getElementById("res-careers");
    careersContainer.innerHTML = typeInfo.careers
      .map((c) => `<span class="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs sm:text-sm font-medium">${c}</span>`)
      .join("");

    // 궁합
    document.getElementById("res-match-best-type").textContent = typeInfo.bestMatch.type;
    document.getElementById("res-match-best-reason").textContent = typeInfo.bestMatch.reason;
    document.getElementById("res-match-worst-type").textContent = typeInfo.worstMatch.type;
    document.getElementById("res-match-worst-reason").textContent = typeInfo.worstMatch.reason;

    // 아이덴티티 설명
    document.getElementById("res-identity-title").textContent = identityInfo.name;
    document.getElementById("res-identity-summary").textContent = identityInfo.summary;
    document.getElementById("res-identity-desc").textContent = identityInfo.description;
  }

  // 게이지 바 렌더링
  function renderTraitBars(traits, themeColor) {
    const list = [
      { key: "ei", title: "정신 (Mind)", data: traits.ei },
      { key: "sn", title: "에너지 (Energy)", data: traits.sn },
      { key: "tf", title: "본성 (Nature)", data: traits.tf },
      { key: "jp", title: "전술 (Tactics)", data: traits.jp },
      { key: "at", title: "자아 (Identity)", data: traits.at }
    ];

    const container = document.getElementById("res-trait-gauges");
    container.innerHTML = list
      .map((item) => {
        const { left, right, leftPct, rightPct } = item.data;
        const isLeftDominant = leftPct >= 50;

        return `
          <div class="mb-5">
            <div class="flex justify-between items-center text-xs sm:text-sm font-medium mb-1.5">
              <span class="${isLeftDominant ? "font-bold text-gray-900" : "text-gray-500"}">${left} <strong class="text-emerald-600">${leftPct}%</strong></span>
              <span class="text-xs text-gray-400 font-normal uppercase tracking-wider">${item.title}</span>
              <span class="${!isLeftDominant ? "font-bold text-gray-900" : "text-gray-500"}"><strong class="text-purple-600">${rightPct}%</strong> ${right}</span>
            </div>
            <div class="trait-gauge-container">
              <div class="trait-gauge-fill bg-emerald-500" style="width: ${leftPct}%"></div>
              <div class="trait-gauge-fill bg-purple-500" style="width: ${rightPct}%"></div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // 11. 결과 링크 복사
  function copyResultLink() {
    const dummyUrl = window.location.href.split("?")[0] + `?type=${state.calculatedResult ? state.calculatedResult.fullCode : "INTJ-A"}`;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(dummyUrl).then(() => {
        showToast("결과 링크가 클립보드에 복사되었습니다! 🎉");
      });
    } else {
      showToast("결과 링크가 복사되었습니다!");
    }
  }

  // 12. 다시 검사하기
  function restartTest() {
    state.currentStep = 0;
    state.answers = {};
    state.calculatedResult = null;
    switchView("intro");
  }

  // 토스트 메시지 알림
  function showToast(msg) {
    elements.toast.textContent = msg;
    elements.toast.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");
    elements.toast.classList.add("opacity-100", "translate-y-0");

    setTimeout(() => {
      elements.toast.classList.add("opacity-0", "translate-y-4", "pointer-events-none");
      elements.toast.classList.remove("opacity-100", "translate-y-0");
    }, 2500);
  }

  // 시작
  document.addEventListener("DOMContentLoaded", () => {
    initEvents();
  });
})();
