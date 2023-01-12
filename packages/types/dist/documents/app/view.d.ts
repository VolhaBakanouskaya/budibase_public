export interface View {
    name: string;
    tableId: string;
    field?: string;
    filters: ViewFilter[];
    schema: ViewSchema;
    calculation?: ViewCalculation;
}
export declare type ViewSchema = ViewCountOrSumSchema | ViewStatisticsSchema;
export interface ViewCountOrSumSchema {
    field: string;
    value: string;
}
/**
 e.g:
  "min": {
    "type": "number"
  },
  "max": {
    "type": "number"
  }
 */
export interface ViewStatisticsSchema {
    [key: string]: {
        type: string;
    };
}
export interface ViewFilter {
    value: any;
    condition: string;
    key: string;
    conjunction?: string;
}
export declare enum ViewCalculation {
    SUM = "sum",
    COUNT = "count",
    STATISTICS = "stats"
}