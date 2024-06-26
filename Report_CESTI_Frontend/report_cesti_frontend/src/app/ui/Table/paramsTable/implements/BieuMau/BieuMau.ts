import axios from "axios";
import IColumn from "../../interfaces/IColumn";
import IChiTieu from "../../interfaces/ChiTieu/IChiTieu";
import dayjs from "dayjs";
import { PATH } from "@/app/utils/const";
import IChiSo from "../../interfaces/ChiSo/IChiSo";
import IBieuMau from "../../interfaces/BieuMau/IBieuMau";
export default async function BieuMau(limit: number, page: number, chiTieu?: number, condition?: {}) {
    const data = await axios.get(PATH + `/bieu_mau/paginate?limit=${limit}&page=${page}&chi_tieu=${chiTieu}&params=${JSON.stringify(condition)}`)
    const bieuMauObject = {
        maBieuMau: 0,
        tenBieuMau: "",
        chiTieu: {} as IChiTieu,
        chiSoAr: [] as IChiSo[],
        ngayTao: "",
        ngayCapNhat: "",
        trangThai: ""
    } as IBieuMau
    const columns = [
        {key: "maBieuMau", title: "Mã biểu mẫu", dataIndex: "maBieuMau"} as IColumn,
        {key: "tenBieuMau", title: "Tên biểu mẫu", dataIndex: "tenBieuMau", editable: true} as IColumn,
        {key: "chiTieu", title: "Chỉ tiêu", dataIndex: "chiTieu"} as IColumn,
        {key: "ngayTao", title: "Ngày tạo", dataIndex: "ngayTao", isDate: true} as IColumn,
        {key: "ngayCapNhat", title: "Ngày cập nhật", dataIndex: "ngayCapNhat", isDate: true} as IColumn,
    ];
    
    const rows:IBieuMau[] = []
    data.data.results.forEach((e:any, i:any) => {
        let row = JSON.parse("{}")
        row["key"] = i+""
        for (const key in bieuMauObject) {
            if (key == "maBieuMau") {
                row[key] = e[key]
                row["id"] = e[key]
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
        rows.push(row)
    });
    const allNamesResult: [] = data.data.all_names
    const allNames = allNamesResult.map((v: string) => {
        return {value: v}
    })
    return {columns, data: rows, itemsPerPage: Number.parseInt(data.data.page_total), totalPage: Math.ceil(Number.parseInt(data.data.total) / Number.parseInt(data.data.page_total)), allNames}
}