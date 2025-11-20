export enum ViewState {
  HOME = 'HOME',
  DERIVATIVE = 'DERIVATIVE',
  INTEGRAL = 'INTEGRAL',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface GraphProps {
  width: number;
  height: number;
  color?: string;
}