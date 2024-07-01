export type TTimer = {
  onComplete: () => void;
  defaultValue: number;
  total: number;
  interval: number;
  onStarted: () => void;
};
