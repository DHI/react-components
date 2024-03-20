export interface ClippedBoxProps {
    height: number | string
    base: ReactNode
    overlay: ReactNode
    direction?: 'horizontal' | 'vertical'
}