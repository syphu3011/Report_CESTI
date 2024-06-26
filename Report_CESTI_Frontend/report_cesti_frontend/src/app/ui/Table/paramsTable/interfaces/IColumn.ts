export default interface IColumn {
    title: string,
    dataIndex: string,
    key: string,
    editable?: boolean,
    render?: (...args: any) => any,
    isID?: boolean,
    isDate?: boolean,
    isDatetime?: boolean
}