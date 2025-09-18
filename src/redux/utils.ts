import { GridPaginationModel } from '@mui/x-data-grid/models/gridPaginationProps';

export interface RejectedWithError {
    errors: any;
    message: string;
    status: number;
    statusText: string;
}

export interface ISearchableSortablePaginatedRequest {
    search: string;
    page: number;
    pageSize: number;
    sortColumn: string;
    sortDirection: 'asc' | 'desc'
}

export class SearchableSortablePaginatedRequest implements ISearchableSortablePaginatedRequest {
    search: string;
    page: number;
    pageSize: number;
    sortColumn: string;
    sortDirection: 'asc' | 'desc'

    constructor(data: any) {
        this.search = data.search ?? '';
        this.page = data.page ? data.page + 1 : 1;
        this.pageSize = data.pageSize ?? 10;
        this.sortColumn = data.sortColumn ?? 'created_at';
        this.sortDirection = data.sortDirection ?? 'desc';
    }

    getUrlParameters(): string {
        return `?search=${this.search}&page=${this.page}&pageSize=${this.pageSize}&sortColumn=${this.sortColumn}&sortDirection=${this.sortDirection}`
    }
}

export interface IMeta {
    page: number;
    from: number | null;
    to: number | null;
    pageSize: number;
    total: number;
}

export interface IPaginatedResponse<T> {
    meta: IMeta;
    data: T[];
}

export function getPaginationMeta(data: any): Partial<GridPaginationModel> & Partial<IMeta> {
    return {
        page : data ? data['current_page'] - 1 : 0,
        from : data ? data['from'] : 0,
        to : data ? data['to'] : 0,
        pageSize : data ? data['per_page'] : 0,
        total : data ? data['total'] : 0
    };
}
export const paginate = (array: any[], page: number, perPage: number) => {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return array.slice(start, end);
};

