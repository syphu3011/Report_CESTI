import axios from "axios";
import IColumn from "../../interfaces/IColumn";
import IChiTieu from "../../interfaces/ChiTieu/IChiTieu";
import dayjs from "dayjs";
import { PATH } from "@/app/utils/const";
import IChiSo from "../../interfaces/ChiSo/IChiSo";
import IBieuMau from "../../interfaces/BieuMau/IBieuMau";
import IGiaTriChiSo from "../../interfaces/GiaTriChiSo/IGiaTriChiSo";
import INoiDungChiSo from "../../interfaces/NoiDungChiSo/INoiDungChiSo";
export default async function ChiSo(limit: number, page: number, searchParam?: {bieuMau?: number, chiSo?: number}, condition?: {}) {
    let data
    if (searchParam?.bieuMau) {
        data = await axios.get(PATH + `/chi_so/paginate?limit=${limit}&page=${page}&bieu_mau=${searchParam.bieuMau}&params=${condition ? JSON.stringify(condition) : "{}"}`)
    }
    else if (searchParam?.chiSo){
        data = await axios.get(PATH + `/chi_so/paginate?limit=${limit}&page=${page}&chi_so=${searchParam.chiSo}&params=${condition ? JSON.stringify(condition) : "{}"}`)
    }
    else {
        return
    }
    const chiSoObject = {
        maChiSo: 0,
        noiDungDonGian: "",
        loaiNoiDung: "",
        noiDungThayThePhongBan: "",
        loai: '',
        thang: 1,
        nam: 1,
        viTri: 1,
        ngayTao: '',
        ngayCapNhat: '',
        trangThai: '',
        bieuMau: {} as IBieuMau,
        chiSoCha: 0,
        chiSoConAr: [] as IChiSo[],
        giaTriChiSoAr: [] as IGiaTriChiSo[],
        noiDungChiSoAr: [] as INoiDungChiSo[],
        giaTriDonGian: ""
    } as IChiSo
    const columns: IColumn[] = [
        { key: "maChiSo", title: "Mã chỉ số", dataIndex: "maChiSo" } as IColumn,
        { key: "noiDungDonGian", title: "Nội dung", dataIndex: "noiDungDonGian", editable: true } as IColumn,
        // { key: "loaiNoiDung", title: "Loại nội dung", dataIndex: "loaiNoiDung" } as IColumn,
        // { key: "noiDungThayThePhongBan", title: "Nội dung thay thế phòng ban", dataIndex: "noiDungThayThePhongBan", editable: true } as IColumn,
        { key: "loai", title: "Loại", dataIndex: "loai" } as IColumn,
        { key: "thang", title: "Tháng", dataIndex: "thang" } as IColumn,
        { key: "nam", title: "Năm", dataIndex: "nam" } as IColumn,
        // { key: "bieuMau", title: "Biểu mẫu", dataIndex: "bieuMau" } as IColumn,
        { key: "chiSoCha", title: "Chỉ số cha", dataIndex: "chiSoCha" } as IColumn,
        // { key: "viTri", title: "Vị trí", dataIndex: "viTri" } as IColumn,
        { key: "ngayTao", title: "Ngày tạo", dataIndex: "ngayTao", isDate: true } as IColumn,
        { key: "ngayCapNhat", title: "Ngày cập nhật", dataIndex: "ngayCapNhat", isDate: true } as IColumn,
        // { key: "trangThai", title: "Trạng thái", dataIndex: "trangThai" } as IColumn,
        // { key: "chiSoConAr", title: "Chỉ số con", dataIndex: "chiSoConAr" } as IColumn,
        { key: "giaTriDonGian", title: "Giá trị chỉ số", dataIndex: "giaTriDonGian" } as IColumn,
        // { key: "noiDungChiSoAr", title: "Nội dung chỉ số", dataIndex: "noiDungChiSoAr" } as IColumn
    ];
    
    
    const rows:IChiSo[] = []
    data.data.results.forEach((e:any, i:any) => {
        let row = JSON.parse("{}")
        row["key"] = i+""
        for (const key in chiSoObject) {
            // console.log(key)
            if (key == "maChiSo") {
                row[key] = e[key]
                row["id"] = e[key]
            }
            if (key == "chiSoCha") {
                // console.log(e[key])
                if (e[key] && e[key]["maChiSo"]) {
                    row[key] = e[key]["maChiSo"]
                } 
            }
            else {
                if (key == "ngayTao" || key == "ngayCapNhat") {
                    row[key] = dayjs(e[key]).format("DD-MM-YYYY hh:mm:ss")
                }
                else {
                    row[key] = e[key]
                }
            }
        }
        console.log(row)
        rows.push(row)
    });
    data.data.custom["bieuMau"] = data.data.custom["bieuMau"].map((e: any) => {
        return {value: e.maBieuMau, label: e.tenBieuMau}
    })
    data.data.custom["chiSo"] = data.data.custom["chiSo"].map((e: any) => {
        return {value: e.maChiSo, label: e.maChiSo+"-"+e.noiDungDonGian, bieuMau: e?.bieuMau?.maBieuMau}
    })
    // const allNamesResult: [] = data.data.all_names
    // const allNames = allNamesResult.map((v: string) => {
    //     return {value: v}
    // })
    // console.log(allNamesResult)
    return {columns, data: rows, itemsPerPage: Number.parseInt(data.data.page_total), totalPage: Math.ceil(Number.parseInt(data.data.total) / Number.parseInt(data.data.page_total)), custom: data.data.custom}
}