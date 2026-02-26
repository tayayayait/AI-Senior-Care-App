import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-6">
        <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
        <p className="mb-6 type-headline text-muted-foreground">페이지를 찾을 수 없습니다</p>
        <a href="/" className="inline-flex h-[48px] items-center rounded-[12px] bg-primary px-6 text-primary-foreground type-callout font-semibold hover:bg-primary/90 shadow-1 transition-all">
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
};

export default NotFound;
