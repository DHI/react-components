export interface MultiFieldStyleProps {
    fontSize: number;
}
export interface MultiFieldProps {
    value?: string;
    onChange: (e: string) => void;
    length?: number;
    seperationInterval?: number;
    placeholderChar?: string;
    seperatorChar?: string;
    fontSize?: number;
}
