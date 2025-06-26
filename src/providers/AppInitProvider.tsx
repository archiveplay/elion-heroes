import { ReactNode } from "react";
import { useAppInit } from '@/hooks/app/useAppInit';

// TODO: add loader as a component
const AppLoader = () => (
  <div className="app-loader">
    <div className="spinner" />
    <p>Загрузка приложения...</p>
  </div>
);
const AppError = ({ error }: { error: string }) => (
  <div className="app-error">
    <h2>Ошибка загрузки</h2>
    <p>{error}</p>
  </div>
);

type AppInitProviderProps = {
  children: ReactNode
}

export function AppInitProvider({ children }: AppInitProviderProps) {
  const { isLoading, isError, error } = useAppInit();

  if (isLoading) {
    return <AppLoader />;
  }

  if (isError) {
    return (
      <AppError
        error={error?.message || 'Неизвестная ошибка'}
      />
    );
  }

  return <>{children}</>;
}
