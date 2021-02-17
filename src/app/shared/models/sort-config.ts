export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export interface SortConfig {

  sortField: string;
  sortOrder: SortOrder;

}
