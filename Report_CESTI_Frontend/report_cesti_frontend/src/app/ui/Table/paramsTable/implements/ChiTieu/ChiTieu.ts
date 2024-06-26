import axios from "axios";
import IColumn from "../../interfaces/IColumn";
import IChiTieu from "../../interfaces/ChiTieu/IChiTieu";
import dayjs from "dayjs";
import { PATH } from "@/app/utils/const";
import { setCookie } from "cookies-next";
import { Cookie } from "next/font/google";
export default async function ChiTieu(limit: number, page: number, condition?: {}) {
    console.log(PATH + `/chi_tieu/paginate?limit=${limit}&page=${page}&params=${JSON.stringify(condition)}`)
    const data = await axios.get(PATH + `/chi_tieu/paginate?limit=${limit}&page=${page}&params=${JSON.stringify(condition)}`)
    const oneChiTieu = {maChiTieu:1, tenChiTieu:"", batDau:"", ketThuc:"", ngayTao:"", ngayCapNhat:"", trangThai:""} as IChiTieu
    const columns = [
        {key: "maChiTieu", title: "Mã chỉ tiêu", dataIndex: "maChiTieu"} as IColumn,
        {key: "tenChiTieu", title: "Tên chỉ tiêu", dataIndex: "tenChiTieu", editable: true, isDate: false} as IColumn,
        {key: "batDau", title: "Bắt đầu", dataIndex: "batDau", editable: true, isDate: true} as IColumn,
        {key: "ketThuc", title: "Kết thúc", dataIndex: "ketThuc", editable: true, isDate: true} as IColumn, 
        {key: "ngayTao", title: "Ngày tạo", dataIndex: "ngayTao", isDate: true} as IColumn,
        {key: "ngayCapNhat", title: "Ngày cập nhật", dataIndex: "ngayCapNhat", isDate: true} as IColumn
    ]
    const rows:IChiTieu[] = []
    data.data.results.forEach((e:any, i:any) => {
        let row = JSON.parse("{}")
        row["key"] = i+""
        for (const key in oneChiTieu) {
            if (key == "maChiTieu") {
                row[key] = e[key]
                row["id"] = e[key]
            }
            else {
                if (key == "batDau" || key == "ketThuc") {
                    row[key] = dayjs(e[key]).format("DD-MM-YYYY")
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
        }
        rows.push(row)
    });
    const allNamesResult: [] = data.data.all_names
    console.log(JSON.stringify(allNamesResult))

    console.log(allNamesResult)
    const allNames = allNamesResult.map((v: any) => {
        return {value: v.tenChiTieu}
    })
    localStorage.setItem("allNamesChiTieu", JSON.stringify(allNamesResult))
    return {columns, data: rows, itemsPerPage: Number.parseInt(data.data.page_total), totalPage: Math.ceil(Number.parseInt(data.data.total) / Number.parseInt(data.data.page_total)), allNames}
}
// process.env.HOST