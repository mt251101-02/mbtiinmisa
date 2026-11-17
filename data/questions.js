const MBTI_QUESTIONS = [
  {
    id: 1,
    dimension: "EI",
    target: "E",
    question: "새로운 사람들과 대화를 시작하고 친해지는 것이 자연스럽고 편안하다.",
    weight: 1
  },
  {
    id: 2,
    dimension: "EI",
    target: "I",
    question: "많은 사람들과 어울린 후에는 혼자만의 시간을 가지며 에너지를 재충전해야 한다.",
    weight: 1
  },
  {
    id: 3,
    dimension: "EI",
    target: "E",
    question: "여러 사람이 모인 파티나 모임에 참석하면 활력과 에너지가 샘솟는다.",
    weight: 1
  },
  {
    id: 4,
    dimension: "EI",
    target: "I",
    question: "대화의 중심에 서서 주목받는 것보다 조용히 뒤에서 지켜보는 것을 선호한다.",
    weight: 1
  },
  {
    id: 5,
    dimension: "EI",
    target: "E",
    question: "생각이나 아이디어가 떠오르면 혼자 곱씹기보다 주변 사람들과 이야기하며 정리한다.",
    weight: 1
  },
  {
    id: 6,
    dimension: "EI",
    target: "I",
    question: "넓고 얕은 인간관계보다 깊은 이야기를 나눌 수 있는 소수의 친구를 선호한다.",
    weight: 1
  },
  {
    id: 7,
    dimension: "EI",
    target: "E",
    question: "침묵이 흐르는 분위기가 어색해서 먼저 말을 건네거나 화제를 던지는 편이다.",
    weight: 1
  },
  {
    id: 8,
    dimension: "EI",
    target: "I",
    question: "전화 통화로 이야기하는 것보다 메신저나 문자로 소통하는 것이 훨씬 편하다.",
    weight: 1
  },
  {
    id: 9,
    dimension: "EI",
    target: "E",
    question: "쉬는 날 약속 없이 하루 종일 집에만 머물면 답답하거나 무료하게 느껴진다.",
    weight: 1
  },
  {
    id: 10,
    dimension: "EI",
    target: "I",
    question: "갑작스러운 약속이나 초대보다는 사전에 미리 약속된 일정을 편안하게 여긴다.",
    weight: 1
  },
  {
    id: 11,
    dimension: "SN",
    target: "N",
    question: "현재 눈앞에 있는 현실의 사실보다 '앞으로 어떤 일이 가능할지' 상상하는 것을 좋아한다.",
    weight: 1
  },
  {
    id: 12,
    dimension: "SN",
    target: "S",
    question: "검증되지 않은 기발한 아이디어보다 실제로 입증된 현실적인 방법을 더 신뢰한다.",
    weight: 1
  },
  {
    id: 13,
    dimension: "SN",
    target: "N",
    question: "사건이나 현상을 접할 때 세부적인 디테일보다 전체적인 맥락과 숨은 의미를 먼저 파악한다.",
    weight: 1
  },
  {
    id: 14,
    dimension: "SN",
    target: "S",
    question: "모호하고 추상적인 이론보다는 눈으로 보고 손으로 만질 수 있는 실질적인 결과가 중요하다.",
    weight: 1
  },
  {
    id: 15,
    dimension: "SN",
    target: "N",
    question: "이야기를 나눌 때 은유적이거나 비유적인 표현을 자주 사용하거나 흥미롭게 느낀다.",
    weight: 1
  },
  {
    id: 16,
    dimension: "SN",
    target: "S",
    question: "업무나 과제를 수행할 때 정해진 지침과 명확한 절차를 따르는 것이 편안하다.",
    weight: 1
  },
  {
    id: 17,
    dimension: "SN",
    target: "N",
    question: "가끔은 현실에서 일어날 것 같지 않은 엉뚱한 공상이나 상상에 깊이 빠져든다.",
    weight: 1
  },
  {
    id: 18,
    dimension: "SN",
    target: "S",
    question: "경험해보지 않은 이론적인 이야기보다 직접 겪어본 경험과 축적된 데이터를 우선시한다.",
    weight: 1
  },
  {
    id: 19,
    dimension: "SN",
    target: "N",
    question: "'왜 그럴까?'라는 근본적인 원리나 철학적인 물음에 대해 사색하는 것을 즐긴다.",
    "weight": 1
  },
  {
    id: 20,
    dimension: "SN",
    target: "S",
    question: "당장 일상생활이나 업무에 유용하게 쓰이지 않는 공상은 비실용적이라고 느낀다.",
    weight: 1
  },
  {
    id: 21,
    dimension: "TF",
    target: "T",
    question: "중요한 결정을 내릴 때 사람들의 감정이나 기분보다 객관적인 사실과 논리를 우선한다.",
    weight: 1
  },
  {
    id: 22,
    dimension: "TF",
    target: "F",
    question: "논리적으로 옳고 그름을 따지기 전에 상대방의 마음이 상하지 않을지 먼저 염려된다.",
    weight: 1
  },
  {
    id: 23,
    dimension: "TF",
    target: "T",
    question: "친구가 고민을 털어놓을 때 무조건적인 위로보다 현실적이고 구체적인 해결책을 먼저 생각한다.",
    weight: 1
  },
  {
    id: 24,
    dimension: "TF",
    target: "F",
    question: "주변 사람의 슬픈 사연이나 영화를 보면 감정에 깊이 이입되어 눈물을 흘릴 때가 많다.",
    weight: 1
  },
  {
    id: 25,
    dimension: "TF",
    target: "T",
    question: "비판이나 피드백을 들었을 때 서운한 감정보다는 그 내용이 논리적으로 타당한지 분석한다.",
    weight: 1
  },
  {
    id: 26,
    dimension: "TF",
    target: "F",
    question: "갈등이 생겼을 때 냉정하게 시시비비를 가리기보다 서로의 입장을 배려하며 원만히 화해하고 싶다.",
    weight: 1
  },
  {
    id: 27,
    dimension: "TF",
    target: "T",
    question: "업무나 프로젝트를 진행할 때 인간적인 정보다 업무 효율성과 공정한 원칙이 가장 중요하다.",
    weight: 1
  },
  {
    id: 28,
    dimension: "TF",
    target: "F",
    question: "부탁을 받았을 때 거절하면 상대방이 무안해할까 봐 마음이 불편해 거절하기 어렵다.",
    weight: 1
  },
  {
    id: 29,
    dimension: "TF",
    target: "T",
    question: "규칙과 원칙은 개인적인 사정이 있더라도 누구에게나 예외 없이 공평하게 적용되어야 한다.",
    weight: 1
  },
  {
    id: 30,
    dimension: "TF",
    target: "F",
    question: "사람의 처지와 사정에 따라 규칙도 융통성 있고 따뜻하게 적용될 수 있어야 한다.",
    weight: 1
  },
  {
    id: 31,
    dimension: "JP",
    target: "J",
    question: "여행이나 나들이를 떠나기 전에 시간대별 일정과 갈 곳을 꼼꼼하게 계획해 둔다.",
    weight: 1
  },
  {
    id: 32,
    dimension: "JP",
    target: "P",
    question: "미리 정해둔 계획에 얽매이기보다 그날의 분위기와 기분에 맞춰 즉흥적으로 움직이는 편이다.",
    weight: 1
  },
  {
    id: 33,
    dimension: "JP",
    target: "J",
    question: "마감 기한이 있는 일은 가능한 한 미리미리 해치워두어야 마음이 편안하다.",
    weight: 1
  },
  {
    id: 34,
    dimension: "JP",
    target: "P",
    question: "마감 직전의 긴박한 압박감이 닥쳤을 때 오히려 집중력과 번뜩이는 효율이 발휘된다.",
    weight: 1
  },
  {
    id: 35,
    dimension: "JP",
    target: "J",
    question: "책상이나 일상 공간이 깔끔하게 정돈되어 있어야 비로소 집중이 잘 된다.",
    weight: 1
  },
  {
    id: 36,
    dimension: "JP",
    target: "P",
    question: "주변이 조금 어질러져 있어도 어디에 무엇이 있는지만 알면 크게 신경 쓰이지 않는다.",
    weight: 1
  },
  {
    id: 37,
    dimension: "JP",
    target: "J",
    question: "예상치 못한 돌발 상황이 생겨 기존 일정이 변경되면 상당한 스트레스를 받는다.",
    weight: 1
  },
  {
    id: 38,
    dimension: "JP",
    target: "P",
    question: "계획이 틀어지더라도 '그럴 수도 있지'라며 상황에 맞춰 유연하게 대처할 수 있다.",
    weight: 1
  },
  {
    id: 39,
    dimension: "JP",
    target: "J",
    question: "오늘 해야 할 일 목록(To-Do List)을 작성하고 하나씩 완료 표시를 할 때 뿌듯함을 느낀다.",
    weight: 1
  },
  {
    id: 40,
    dimension: "JP",
    target: "P",
    question: "하나를 끝내고 다음으로 넘어가기보다 여러 흥미로운 일들을 동시에 벌여놓고 번갈아 진행한다.",
    weight: 1
  },
  {
    id: 41,
    dimension: "AT",
    target: "A",
    question: "실수를 하거나 뜻밖의 실패를 겪더라도 비교적 빠르게 털어내고 평정심을 되찾는다.",
    weight: 1
  },
  {
    id: 42,
    dimension: "AT",
    target: "T",
    question: "지나간 대화나 사소한 실수에 대해 '그때 그렇게 하지 말걸' 하고 오랫동안 곱씹으며 자책한다.",
    weight: 1
  },
  {
    id: 43,
    dimension: "AT",
    target: "A",
    question: "남들의 시선이나 평가에 크게 연연하지 않고 내 방식에 확신을 갖는 편이다.",
    weight: 1
  },
  {
    id: 44,
    dimension: "AT",
    target: "T",
    question: "타인에게 내가 어떻게 비칠지 늘 신경 쓰이고 사소한 반응에도 마음이 쉽게 흔들린다.",
    weight: 1
  },
  {
    id: 45,
    dimension: "AT",
    target: "A",
    question: "걱정스러운 일이 생겨도 '어떻게든 잘 풀릴 거야'라며 담담하고 낙관적으로 바라본다.",
    weight: 1
  },
  {
    id: 46,
    dimension: "AT",
    target: "T",
    question: "아직 일어나지 않은 일에 대해 최악의 시나리오를 상상하며 미리 불안해할 때가 많다.",
    weight: 1
  },
  {
    id: 47,
    dimension: "AT",
    target: "A",
    question: "스스로 세운 목표를 달성하지 못해도 과도하게 자책하지 않고 다음 기회를 기약한다.",
    weight: 1
  },
  {
    id: 48,
    dimension: "AT",
    target: "T",
    question: "스스로에게 엄격한 완벽주의 성향이 있어서 스스로의 결과물에 좀처럼 만족하기 어렵다.",
    weight: 1
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MBTI_QUESTIONS;
}