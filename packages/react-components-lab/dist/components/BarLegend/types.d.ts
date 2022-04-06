export declare type BarLegendProps = {
    src: string;
    /**
     * *Only relevant when `range` is present. Represents the amount of ticks distributed between min/max values(including them).
     */
    length?: number | undefined;
    /**
     * Min/Max range for the Legend ticks.
     */
    range?: number[] | string[] | undefined;
    /**
     * Append a unit at the end of the values. (%, °C, £, $)
     */
    unit?: string | undefined;
};
