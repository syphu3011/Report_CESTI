"use client"
import React from "react"
import BieuMau from "@/app/ui/Table/paramsTable/implements/BieuMau/BieuMau"
import RootTable from "../RootTable"
import { useEffect, useState } from "react"
import IColumn from "@/app/ui/Table/paramsTable/interfaces/IColumn"
import IBieuMau from "@/app/ui/Table/paramsTable/interfaces/BieuMau/IBieuMau"
import { PATH } from "@/app/utils/const"
import { AutoComplete, Button, DatePicker, Form, Input, Select } from "antd"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import CustomModal from "../../Modal/CustomModal"
import axios from "axios"
import dayjs from "dayjs"
import { getCookie, setCookie } from "cookies-next"
import IParamsTable from "../paramsTable/interfaces/IParamsTable"

type ParamsBieuMau = {
    limit: number,
    page: number,
    condition?: {},
    callbackSetPage: (page: number) => void
}
export default function BieuMauTable(params: ParamsBieuMau) {
    const [formAdd] = Form.useForm()
    const [formSearch] = Form.useForm()
    const [beginDate, setBeginDate] = useState(dayjs(Date.now()))
    const [endDate, setEndDate] = useState(dayjs(new Date(new Date().setFullYear(new Date().getFullYear() + 1))))
    const [condition, setCondition] = useState(params.condition)
    const [reloadTable, setReloadTable] = useState(0)
    const [error, setError] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams()
    const chiTieu = searchParams.get('chi_tieu')
    const allNamesChiTieu = localStorage.getItem("allNamesChiTieu")
    let change = 0
    console.log(allNamesChiTieu)
    const allNamesChiTieuParse = allNamesChiTieu ? JSON.parse(allNamesChiTieu) as [] : []
    const optionsChiTieu = allNamesChiTieuParse.map((e:any) => {
        return {
            value: e.maChiTieu,
            label: e.tenChiTieu
        }
    })
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
                    label="Tên biểu mẫu"
                    name="tenBieuMau"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập tên biểu mẫu!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <br></br>
                <Form.Item
                    label="Chỉ tiêu"
                    name="chiTieu"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy chọn chỉ tiêu!',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        placeholder="Chọn chỉ tiêu"
                        optionFilterProp="label"
                        options={optionsChiTieu}
                    />
                </Form.Item>
            </Form>
        </>
    }
    const onSubmitForm = async () => {
        const submitData = await formAdd.validateFields()
        submitData["chiTieu"] = {
            maChiTieu: submitData["chiTieu"]
        }
        console.log(submitData)
        const rsPost = await axios.post(PATH + "/bieu_mau", submitData)
        window.location.reload();
        return true
    }
    const onSearch = async () => {
        change += 0.0001
        const searchData = await formSearch.validateFields()
        setCookie("BieuMauQuery", JSON.stringify(searchData))
        setCondition(searchData)
        console.log(searchData)
    }
    const onRowClick = (record: IParamsTable) => {
        window.location.href = `/chi_so?bieu_mau=${record.id}`
    }
    console.log(optionsChiTieu)
    useEffect(() => {
        const bieuMau = chiTieu ? BieuMau(params.limit, params.page, parseInt(chiTieu), {}) : BieuMau(params.limit, params.page, -1, {})
        bieuMau.then(e => {
            console.log(e)
            setComponent(
                <>
                    <h1 className="text-center w-full mb-3 text-black">DANH SÁCH BIỂU MẪU</h1>
                    {/* search*/}
                    <Form layout="inline" form={formSearch}>
                        <Form.Item layout="vertical" name={"tenBieuMau"} label="Tên biểu mẫu">
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
                        <Button onClick={onSearch}>Tìm kiếm</Button>
                    </Form>
                    {/* add report */}
                    <CustomModal content={contentAddForm()} title='Thêm biểu mẫu' titleBtnSubmit='Thêm' titleBtnCancel='Trở lại' onSubmit={onSubmitForm}></CustomModal>
                    {/* form*/}
                    <RootTable onRowClick={onRowClick} reload={reloadTable} callbackSetReload={setReloadTable} callbackSetPage={params.callbackSetPage} columns={e.columns} data={e.data} path={PATH + "/chi_tieu"} itemsPerPage={e.itemsPerPage} totalPage={e.totalPage} currentPage={params.page + 1}></RootTable>
                </>)
        }).catch(e => {
            setError("Đã có lỗi xảy ra!")
        })
    }, [params.page, condition, change, reloadTable])
    return component
    {/* <Link href={"/them"}> */ }

    {/* </Link> */ }

}