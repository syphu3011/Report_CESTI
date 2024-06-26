import IBieuMau from "../BieuMau/IBieuMau";
import IGiaTriChiSo from "../GiaTriChiSo/IGiaTriChiSo";
import IParamsTable from "../IParamsTable"
import INoiDungChiSo from "../NoiDungChiSo/INoiDungChiSo";
export default interface IChiSo extends IParamsTable {
    maChiSo: number;
    noiDungDonGian: string | null;
    loaiNoiDung: string;
    noiDungThayThePhongBan: string | null;
    loai: string;
    thang: number;
    nam: number;
    viTri: number;
    ngayTao: string;
    ngayCapNhat: string;
    trangThai: string;
    bieuMau: IBieuMau
    chiSoCha: number;
    chiSoConAr: IChiSo[];
    giaTriChiSoAr: IGiaTriChiSo[];
    noiDungChiSoAr: INoiDungChiSo[];
    giaTriDonGian: string;
}