export interface PaginationResultInterface<PaginationEntity> {
    results: PaginationEntity[];
    total: number;
    all_names?: string[] | {}[];
    custom?: any;
    next?: string;
    previous?: string;
  }