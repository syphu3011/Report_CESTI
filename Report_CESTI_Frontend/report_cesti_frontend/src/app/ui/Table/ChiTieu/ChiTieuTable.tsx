"use client"
import React from "react"
import ChiTieu from "@/app/ui/Table/paramsTable/implements/ChiTieu/ChiTieu"
import RootTable from "../RootTable"
import { useEffect, useState } from "react"
import IColumn from "@/app/ui/Table/paramsTable/interfaces/IColumn"
import IChiTieu from "@/app/ui/Table/paramsTable/interfaces/ChiTieu/IChiTieu"
import { PATH } from "@/app/utils/const"
import { AutoComplete, Button, DatePicker, Form, Input } from "antd"
import Link from "next/link"
import { useRouter } from "next/navigation"
import CustomModal from "../../Modal/CustomModal"
import axios from "axios"
import dayjs from "dayjs"
import { setCookie } from "cookies-next"
import IParamsTable from "../paramsTable/interfaces/IParamsTable"

type ParamsChiTieu = {
    limit: number,
    page: number,
    condition?: {},
    callbackSetPage: (page: number) => void
}
export default function ChiTieuTable(params: ParamsChiTieu) {
    const [formAdd] = Form.useForm()
    const [formSearch] = Form.useForm()
    const [beginDate, setBeginDate] = useState(dayjs(Date.now()))
    const [endDate, setEndDate] = useState(dayjs(new Date(new Date().setFullYear(new Date().getFullYear() + 1))))
    const [condition, setCondition] = useState(params.condition)
    const [reloadTable, setReloadTable] = useState(0)
    const [error, setError] = useState("")
    const router = useRouter()
    // const [itemsPerPage, setItemsPerPage] = useState(0)
    // const [totalPage, setTotalPage] = useState(0)
    let change = 0
    const [component, setComponent] = useState<any>()
    const onChangeBeginDate = (date: dayjs.Dayjs) => {
        setBeginDate(dayjs(date))
    }
    const onChangeEndDate = (date: dayjs.Dayjs) => {
        setEndDate(dayjs(date))
    }
    const contentAddForm = () => {
        return <>
            <Form layout="vertical" form={formAdd}>
                <Form.Item
                    label="Tên chỉ tiêu"
                    name="tenChiTieu"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập tên chỉ tiêu!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <br></br>
                <Form.Item
                    label="Ngày bắt đầu"
                    name="batDau"
                >
                    <DatePicker allowClear={false} defaultValue={beginDate} value={beginDate} onChange={onChangeBeginDate} format="DD-MM-YYYY" />
                </Form.Item>
                <Form.Item
                    label="Ngày kết thúc"
                    name="ngayKetThuc"
                >
                    <DatePicker allowClear={false} defaultValue={endDate} value={endDate} onChange={onChangeEndDate} format="DD-MM-YYYY" />
                </Form.Item>
            </Form>
        </>
    }
    const onSubmitForm = async () => {
        const submitData = await formAdd.validateFields()
        submitData["batDau"] = beginDate.format("MM/DD/YYYY")
        submitData["ketThuc"] = endDate.format("MM/DD/YYYY")
        submitData["trangThai"] = "Đang hoạt động"
        const rsPost = await axios.post(PATH + "/chi_tieu", submitData)
        console.log(rsPost)
        window.location.reload();
        return true
    }
    const onSearch = async () => {
        change += 0.0001
        const searchData = await formSearch.validateFields()
        setCookie("chiTieuQuery", JSON.stringify(searchData))
        setCondition(searchData)
        console.log(searchData)
    }
    const navigateToBieuMau = (record: IParamsTable) => {
        router.push(`/bieu_mau?chi_tieu=${record.id}`)
    }
    useEffect(() => {
        const chiTieu = condition ? ChiTieu(params.limit, params.page, condition) : ChiTieu(params.limit, params.page)
        chiTieu.then(e => {
            console.log(e)
            setComponent(
                <>
                    <h1 className="text-center w-full mb-3 text-black">DANH SÁCH CHỈ TIÊU</h1>
                    {/* search*/}
                    <Form layout="inline" form={formSearch}>
                        <Form.Item layout="vertical" name={"tenChiTieu"} label="Tên chỉ tiêu">
                            <AutoComplete
                                style={{
                                    width: 200,
                                }}
                                options={e.allNames}
                                filterOption={(inputValue, option) =>
                                    option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }
                            />
                        </Form.Item>
                        <Form.Item layout="vertical" name={"batDau"} label="Ngày bắt đầu">
                            <Form.Item layout="vertical" name={"tuBatDau"} label="Từ">
                                <DatePicker format={"DD-MM-YYYY"} placeholder="Chọn ngày"></DatePicker>
                            </Form.Item>
                            <Form.Item layout="vertical" name={"denBatDau"} label="Đến">
                                <DatePicker format={"DD-MM-YYYY"} placeholder="Chọn ngày"></DatePicker>
                            </Form.Item>
                        </Form.Item>
                        <Form.Item layout="vertical" name={"ketThuc"} label="Ngày kết thúc">
                            <Form.Item layout="vertical" name={"tuKetThuc"} label="Từ">
                                <DatePicker format={"DD-MM-YYYY"} placeholder="Chọn ngày"></DatePicker>
                            </Form.Item>
                            <Form.Item layout="vertical" name={"denKetThuc"} label="Đến">
                                <DatePicker format={"DD-MM-YYYY"} placeholder="Chọn ngày"></DatePicker>
                            </Form.Item>
                        </Form.Item>
                        <Button onClick={onSearch}>Tìm kiếm</Button>
                    </Form>
                    {/* add report */}
                    <CustomModal content={contentAddForm()} title='Thêm chỉ tiêu' titleBtnSubmit='Thêm' titleBtnCancel='Trở lại' onSubmit={onSubmitForm}></CustomModal>
                    {/* form*/}
                    <RootTable reload={reloadTable} callbackSetReload={setReloadTable} callbackSetPage={params.callbackSetPage} columns={e.columns} data={e.data} path={PATH + "/chi_tieu"} itemsPerPage={e.itemsPerPage} totalPage={e.totalPage} currentPage={params.page + 1} onRowClick={navigateToBieuMau}></RootTable>
                </>)
        }).catch(e => {
            setError("Đã có lỗi xảy ra!")
        })
    }, [params.page, condition, change, reloadTable])
    return component
    {/* <Link href={"/them"}> */ }

    {/* </Link> */ }

}