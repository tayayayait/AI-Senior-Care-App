import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { mockUser } from "@/data/mockData";

export function useEmergency() {
  const navigate = useNavigate();
  const [confirmType, setConfirmType] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  const goBack = () => navigate("/home");

  const openConfirm = (type: string) => setConfirmType(type);
  const closeConfirm = () => setConfirmType(null);

  const startCountdown = useCallback(() => {
    setCountdown(3);
  }, []);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) {
      setConfirmType(null);
      setCountdown(null);
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => (c ?? 1) - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const cancelCountdown = () => {
    setCountdown(null);
    setConfirmType(null);
  };

  return {
    contacts: mockUser.emergencyContacts,
    confirmType,
    countdown,
    goBack,
    openConfirm,
    closeConfirm,
    startCountdown,
    cancelCountdown,
  };
}
