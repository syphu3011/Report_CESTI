import IParamsTable from "../IParamsTable"
export default interface IChiTieu extends IParamsTable {
    maChiTieu: number,
    tenChiTieu: string,
    batDau: string,
    ketThuc: string,
    ngayTao: string,
    ngayCapNhat: string,
    trangThai: string
}