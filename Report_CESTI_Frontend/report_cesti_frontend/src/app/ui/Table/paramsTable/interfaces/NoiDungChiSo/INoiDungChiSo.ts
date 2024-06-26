import IChiSo from "../ChiSo/IChiSo";
import IParamsTable from "../IParamsTable";

export default interface INoiDungChiSo extends IParamsTable{
    maNoiDungChiSo: number;
    chiSo: IChiSo;
    tienGiaTri: INoiDungChiSo | null;
    tienChuoi: string | null;
    tienTo: string | null;
    giaTri: number;
    loaiGiaTri: string | null;
    donVi: string | null;
    hauChuoi: string | null;
    hauGiaTri: INoiDungChiSo | null;
    trangThai: string | null;
    ngayTao: string;
    ngayCapNhat: string;
  }
  