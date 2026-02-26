export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  emergencyContacts: EmergencyContact[];
}

export const mockUser: UserProfile = {
  name: '김영숙',
  phone: '010-1234-5678',
  emergencyContacts: [
    { id: '1', name: '김민수', phone: '010-9876-5432', relation: '아들' },
    { id: '2', name: '이정희', phone: '010-5555-1234', relation: '딸' },
  ],
};

export const mockChatMessages: ChatMessage[] = [
  { id: '1', sender: 'ai', text: '안녕하세요, 영숙님! 오늘 하루는 어떠셨나요? 😊', time: '오전 10:00' },
  { id: '2', sender: 'user', text: '오늘은 좀 무릎이 아파서 산책을 못 갔어요.', time: '오전 10:01' },
  { id: '3', sender: 'ai', text: '아이고, 무릎이 아프셨군요. 많이 불편하시겠어요. 무릎 통증이 언제부터 시작되셨나요?', time: '오전 10:01' },
  { id: '4', sender: 'user', text: '며칠 전부터 계단 오르내릴 때 특히 아프더라고요.', time: '오전 10:02' },
  { id: '5', sender: 'ai', text: '계단을 오르내리실 때 통증이 있으시군요. 실내에서 할 수 있는 간단한 스트레칭을 알려드릴까요? 무리하지 않는 선에서 도움이 될 수 있어요. 💪', time: '오전 10:03' },
];

export const mockHealthTips = [
  '아침에 따뜻한 물 한 잔으로 하루를 시작해보세요.',
  '하루 30분 가벼운 산책은 마음 건강에도 좋아요.',
  '균형 잡힌 식사로 건강을 지켜보세요.',
];

// Admin mock data
export interface AdminUser {
  id: string;
  name: string;
  phone: string;
  joinDate: string;
  lastActive: string;
  status: '활성' | '비활성' | '주의';
  totalChats: number;
  riskCount: number;
}

export interface AdminConversation {
  id: string;
  userName: string;
  date: string;
  messageCount: number;
  hasRisk: boolean;
  riskKeywords: string[];
  summary: string;
}

export interface AdminEmergency {
  id: string;
  userName: string;
  type: '119' | '경찰' | '비상연락';
  date: string;
  status: '접수' | '처리중' | '완료';
  description: string;
}

export const mockAdminUsers: AdminUser[] = [
  { id: '1', name: '김영숙', phone: '010-1234-5678', joinDate: '2025-12-01', lastActive: '2026-02-26', status: '활성', totalChats: 45, riskCount: 0 },
  { id: '2', name: '박순자', phone: '010-2345-6789', joinDate: '2025-12-15', lastActive: '2026-02-25', status: '주의', totalChats: 32, riskCount: 2 },
  { id: '3', name: '이옥순', phone: '010-3456-7890', joinDate: '2026-01-05', lastActive: '2026-02-24', status: '활성', totalChats: 28, riskCount: 0 },
  { id: '4', name: '정말자', phone: '010-4567-8901', joinDate: '2026-01-10', lastActive: '2026-02-20', status: '비활성', totalChats: 12, riskCount: 1 },
  { id: '5', name: '최봉순', phone: '010-5678-9012', joinDate: '2026-01-20', lastActive: '2026-02-26', status: '활성', totalChats: 55, riskCount: 0 },
  { id: '6', name: '한영자', phone: '010-6789-0123', joinDate: '2026-02-01', lastActive: '2026-02-26', status: '활성', totalChats: 18, riskCount: 0 },
  { id: '7', name: '강옥자', phone: '010-7890-1234', joinDate: '2026-02-05', lastActive: '2026-02-23', status: '주의', totalChats: 22, riskCount: 3 },
  { id: '8', name: '윤순덕', phone: '010-8901-2345', joinDate: '2026-02-10', lastActive: '2026-02-22', status: '비활성', totalChats: 8, riskCount: 0 },
];

export const mockAdminConversations: AdminConversation[] = [
  { id: '1', userName: '김영숙', date: '2026-02-26', messageCount: 12, hasRisk: false, riskKeywords: [], summary: '무릎 통증에 대한 상담' },
  { id: '2', userName: '박순자', date: '2026-02-25', messageCount: 8, hasRisk: true, riskKeywords: ['외롭다', '혼자'], summary: '외로움과 우울감 호소' },
  { id: '3', userName: '이옥순', date: '2026-02-24', messageCount: 15, hasRisk: false, riskKeywords: [], summary: '손자 자랑 및 일상 대화' },
  { id: '4', userName: '강옥자', date: '2026-02-23', messageCount: 6, hasRisk: true, riskKeywords: ['죽고싶다'], summary: '심리적 위기 징후 감지' },
  { id: '5', userName: '최봉순', date: '2026-02-26', messageCount: 20, hasRisk: false, riskKeywords: [], summary: '건강 관리 팁 문의' },
];

export const mockAdminEmergencies: AdminEmergency[] = [
  { id: '1', userName: '강옥자', type: '비상연락', date: '2026-02-23 14:32', status: '완료', description: '위험 키워드 감지로 비상연락처 알림 발송' },
  { id: '2', userName: '박순자', type: '비상연락', date: '2026-02-20 09:15', status: '완료', description: '반복적 우울 표현으로 보호자 연락' },
  { id: '3', userName: '정말자', type: '119', date: '2026-02-18 22:45', status: '처리중', description: '낙상 의심 긴급 신고' },
  { id: '4', userName: '김영숙', type: '비상연락', date: '2026-02-15 16:20', status: '접수', description: '연락 두절 48시간 초과 알림' },
];

export const adminStats = {
  totalUsers: 8,
  todayChats: 24,
  riskDetections: 3,
  emergencyReports: 4,
};
