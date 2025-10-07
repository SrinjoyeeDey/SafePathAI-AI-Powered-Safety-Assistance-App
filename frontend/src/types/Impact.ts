
import  type { IconType } from 'react-icons';

export interface ImpactData {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  icon: string;
}


export interface ImpactCounterProps {
    icon: IconType;
    end: number;
    suffix?: string;
    label: string;
  }