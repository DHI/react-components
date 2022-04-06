export declare type DateType = 'monthly' | 'yearly' | 'daily';
export interface TimestepPlayerProps {
    timesteps: Date[];
    setTimestep: (d: Date) => void;
    activeTimestep: Date;
    type?: DateType;
    isPaused?: boolean;
    interval?: number;
}
