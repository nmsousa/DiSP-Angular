export enum TableColumnType {
  STRING,
  NUMBER,
  BOOLEAN,
  DATE,

  // Custom Types

  ID,
  STATUS,
  ARCHIVED_PURGED,
  FROM,
  SIGNED,
  ACTION
}

export interface TableColumn {

  field: string;
  label: string;
  type: TableColumnType;
  width?: string;

}
