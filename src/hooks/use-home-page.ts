import { useNavigate } from "react-router-dom";
import { mockUser, mockHealthTips } from "@/data/mockData";

export function useHomePage() {
  const navigate = useNavigate();
  const tip = mockHealthTips[Math.floor(Math.random() * mockHealthTips.length)];

  const goToSettings = () => navigate("/settings");
  const goToChat = () => navigate("/chat");
  const goToEmergency = () => navigate("/emergency");

  return {
    user: mockUser,
    tip,
    goToSettings,
    goToChat,
    goToEmergency,
  };
}
