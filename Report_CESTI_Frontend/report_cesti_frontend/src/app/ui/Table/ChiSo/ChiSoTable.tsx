"use client"
import React from "react"
import ChiSo from "@/app/ui/Table/paramsTable/implements/ChiSo/ChiSo"
import RootTable from "../RootTable"
import { useEffect, useState } from "react"
import IColumn from "@/app/ui/Table/paramsTable/interfaces/IColumn"
import IChiSo from "@/app/ui/Table/paramsTable/interfaces/ChiSo/IChiSo"
import { PATH } from "@/app/utils/const"
import { AutoComplete, Button, DatePicker, Form, Input, Modal, Popconfirm, Select, Table, Typography } from "antd"
import Link from "next/link"
import { notFound, useRouter, useSearchParams } from "next/navigation"
import CustomModal from "../../Modal/CustomModal"
import NotFound from "next/error";
import axios from "axios"
import dayjs from "dayjs"
import { getCookie, setCookie } from "cookies-next"
import IParamsTable from "../paramsTable/interfaces/IParamsTable"
import ThemChiSoForm from "../../Form/ThemChiSoForm"

type ParamsChiSo = {
    limit: number,
    page: number,
    currentPage: number,
    condition?: {}
    callbackSetPage: (page: number) => void
}
export default function ChiSoTable(params: ParamsChiSo) {
    const [v, setV] = useState(1)
    const [formAdd] = Form.useForm()
    const [formSearch] = Form.useForm()
    const [beginDate, setBeginDate] = useState(dayjs(Date.now()))
    const [endDate, setEndDate] = useState(dayjs(new Date(new Date().setFullYear(new Date().getFullYear() + 1))))
    const [condition, setCondition] = useState(params.condition)
    const [reloadTable, setReloadTable] = useState(0)
    const [optionsBieuMau, setOptionsBieuMau] = useState<{ value: string, label: string }[]>([])
    const [valueBieuMau, setValueBieuMau] = useState(1)
    const [selectBieuMau, setSelectBieuMau] = useState<any>()
    const [isDisableBieuMau, setIsDisableBieuMau] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [currentEdit, setCurrentEdit] = useState<number>()
    const [error, setError] = useState("")
    const [ob, setOb] = useState<any>()
    const [oc, setOc] = useState<any>()
    const [rowData, setRowData] = useState<any>()
    const router = useRouter()

    const searchParams = useSearchParams()
    const bieuMau = searchParams.get('bieu_mau')
    const chiSo = searchParams.get('chi_so')
    // const allNamesChiTieu = localStorage.getItem("allNamesChiTieu")
    let change = 0
    // console.log(allNamesChiTieu)
    // const allNamesChiTieuParse = allNamesChiTieu ? JSON.parse(allNamesChiTieu) as [] : []
    // const optionsChiTieu = allNamesChiTieuParse.map((e:any) => {
    //     return {
    //         value: e.maChiTieu,
    //         label: e.tenChiTieu
    //     }
    // })
    const [component, setComponent] = useState<any>()
    const onChangeBeginDate = (date: dayjs.Dayjs) => {
        setBeginDate(dayjs(date))
    }
    const onChangeEndDate = (date: dayjs.Dayjs) => {
        setEndDate(dayjs(date))
    }
    const contentAddForm = (ob: any, oc: any) => {
        return <>
            <Form layout="vertical" form={formAdd}>
                <Form.Item
                    label="Biểu mẫu"
                    name="bieuMau"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy chọn biểu mẫu!',
                        },
                    ]}
                >
                    {selectBieuMau}
                </Form.Item>
                <Form.Item
                    label="Chỉ số cha"
                    name="chiSoCha"
                >
                    <Select
                        showSearch
                        placeholder="Chọn chỉ số cha"
                        optionFilterProp="label"
                        options={oc}
                        onSelect={(value, option) => {
                            const selectedChiSo = oc.find((e: any) => e.value == value)
                            setSelectBieuMau(() => {
                                console.log("kkk")
                                return <>
                                    <Select
                                        showSearch
                                        placeholder="Chọn biểu mẫu"
                                        optionFilterProp="label"
                                        options={ob}
                                        defaultValue={selectedChiSo}
                                        disabled={false}
                                    /></>
                            })
                        }}
                    />
                </Form.Item>
                <br></br>
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
        setCookie("ChiSoQuery", JSON.stringify(searchData))
        setCondition(searchData)
        console.log(searchData)
    }
    const onRowClick = (record: IParamsTable) => {

    }
    const chiSoTable = (e: any) => {
        console.log(e)
        const columns = [
            ...e.columns,
            {
                title: 'Sửa',
                dataIndex: 'Sửa',
                render: (_: any, record: IParamsTable) => {
                    return <Typography.Link onClick={
                        async () => {
                            const result = await axios.get(PATH + "/chi_so/" + record.id)
                            const dataResult = result.data
                            // console.log(dataResult)
                            setRowData(dataResult)
                            setCurrentEdit(record.id)
                        }}>
                        Sửa</Typography.Link>
                },
                key: ''
            },
            {
                title: 'Xóa',
                dataIndex: 'Xóa',
                render: (_: any, record: IParamsTable) => {
                    return <Typography.Link>
                        <Popconfirm title="Bạn có muốn xóa không?" onConfirm={() => {
                            axios.delete(PATH + "/chi_so/" + record.id)
                        }}>
                            Xóa
                        </Popconfirm>
                    </Typography.Link>
                },
                key: ''
            }
        ]
        return <Table columns={columns} pagination={{
            total: e.totalPage * params.limit - params.currentPage * params.limit, pageSize: params.limit, showSizeChanger: false, defaultCurrent: params.currentPage, onChange(page: number, pageSize: number) {
                params.callbackSetPage(page - 1)
            }
        }
        } dataSource={e.data}
            onRow={(record, rowIndex) => {
                return {
                    onDoubleClick: (event) => window.location.href = `/chi_so?chi_so=${record.id}`
                };
            }} />;
    }
    useEffect(() => {
        if (bieuMau && chiSo) return
        if (bieuMau || chiSo) {
            ChiSo(params.limit, params.page, bieuMau ? {bieuMau: parseInt(bieuMau)} : {chiSo: parseInt(chiSo!)}).then((e: any) => {
                console.log(e)
                setOptionsBieuMau(e.custom.bieuMau)
                const ob = e.custom.bieuMau
                const oc = e.custom.chiSo
                setOb(ob)
                setOc(oc)
                console.log(oc)
                setComponent(
                    <>
                        <h1 className="text-center w-full mb-3 text-black">DANH SÁCH CHỈ SỐ</h1>
                        <ThemChiSoForm ob={ob} oc={oc} callBackSetHide={setIsOpen}></ThemChiSoForm >
                        {chiSoTable(e)}
                    </>)
            }).catch(e => {
                setError("Đã có lỗi xảy ra!")
            })
        }
    }, [params.page, condition, change, reloadTable])
    return bieuMau && chiSo ? notFound() :
        <>
            <ThemChiSoForm ob={ob} oc={rowData ? oc.filter((e: any) => e.value != rowData.maChiSo) : oc} dataEdit={rowData ? rowData : false} isEdit={true} id={currentEdit}></ThemChiSoForm >
            {component}
        </>

}