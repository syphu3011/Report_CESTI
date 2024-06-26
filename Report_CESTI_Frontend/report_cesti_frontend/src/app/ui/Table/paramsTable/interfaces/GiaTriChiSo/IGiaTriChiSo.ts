import IChiSo from "../ChiSo/IChiSo";
import IParamsTable from "../IParamsTable";

export default interface GiaTriChiSo extends IParamsTable{
    maGiaTriChiSo: number;
    chiSo: IChiSo;
    tienGiaTri: GiaTriChiSo | null;
    tienChuoi: string | null;
    tienTo: string | null;
    giaTri: number;
    loaiGiaTri: string | null;
    donVi: string | null;
    hauChuoi: string | null;
    hauGiaTri: GiaTriChiSo | null;
    trangThai: string | null;
    ngayTao: string;
    ngayCapNhat: string;
}
  