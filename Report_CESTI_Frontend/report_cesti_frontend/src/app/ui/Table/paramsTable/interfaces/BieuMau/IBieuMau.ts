import IChiSo from "../ChiSo/IChiSo"
import IChiTieu from "../ChiTieu/IChiTieu"
import IParamsTable from "../IParamsTable"
export default interface IBieuMau extends IParamsTable {
    key: string,
    maBieuMau: number,
    tenBieuMau: string,
    chiTieu: IChiTieu,
    chiSoAr: IChiSo[],
    ngayTao: string,
    ngayCapNhat: string,
    trangThai: string
}