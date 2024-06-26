import { Button, Form, Input, InputNumber, Modal, Select, Table, Typography } from "antd"
import { useForm, useWatch } from "antd/es/form/Form"
import { useEffect, useState } from "react"
import CustomModal from "../Modal/CustomModal"
import IColumn from "../Table/paramsTable/interfaces/IColumn"
import dayjs from "dayjs"
import axios from "axios"
import { PATH } from "@/app/utils/const"

type ThemChiSoFormProps = {
    ob: any//of bieuMau
    oc: any//of chiSo
    dataEdit?: any
    isEdit?: boolean
    id?: number
    callBackSetHide?: (isOpen: boolean) => void
}
export default function ThemChiSoForm(props: ThemChiSoFormProps) {
    const [formAdd] = useForm()
    const [formAddContent] = useForm()
    const [formAddValue] = useForm()
    const [formEditContent] = useForm()
    const [valueBieuMau, setValueBieuMau] = useState(1)
    const v = useWatch('v', formAdd)
    const [hideBieuMau, setHideBieuMau] = useState(false)
    const [hidePhucTap, setHidePhucTap] = useState(false)
    const [chiSoCha, setChiSoCha] = useState<any>()
    const [loai, setLoai] = useState<string>()
    const [thang, setThang] = useState<number>()
    const [nam, setNam] = useState<number>()
    const [valuesContentChiSo, setValuesContentChiSo] = useState<any[]>([])
    const [valuesChiSo, setValuesChiSo] = useState<any[]>([])
    const [currentSetting, setCurrentSetting] = useState(false)
    const [key, setKey] = useState(0)
    const [keyV, setKeyV] = useState(0)
    const [open,setOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenAddForm, setIsOpenAddForm] = useState(false)
    const [record, setRecord] = useState()
    const [isEditValues, setIsEditValues] = useState(false)
    const months = [1,2,3,4,5,6,7,8,9,10,11,12].map(e => {
        return {value: e}
    })
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const years = [currentYear-1, currentYear, currentYear + 1].map(e => {
        return {
            value: e
        }
    })
    const columns = [
        { key: "tienChuoi", title: "Tiền chuỗi", dataIndex: "tienChuoi" } as IColumn,
        { key: "tienTo", title: "Tiền tố", dataIndex: "tienTo" } as IColumn,
        { key: "giaTri", title: "Giá trị", dataIndex: "giaTri" } as IColumn,
        { key: "loaiGiaTri", title: "Loại giá trị", dataIndex: "loaiGiaTri" } as IColumn,
        { key: "donVi", title: "Đơn vị", dataIndex: "donVi" } as IColumn,
        { key: "hauChuoi", title: "Hậu chuỗi", dataIndex: "hauChuoi" } as IColumn,
    ]
    const columnsContentChiSo = [...columns,{ key: "sua", title: "Sửa", dataIndex: "sua", render: (_: any,record: any) => {
        return <Typography.Link onClick={()=>{
            setRecord(record)
            setIsOpen(true)
            setIsEditValues(false)
        }}>
            Sửa
        </Typography.Link>
    }},
    { key: "xoa", title: "Xóa", dataIndex: "sua", render: (_: any,record: any) => {
        return <Typography.Link onClick={()=>{
            setValuesContentChiSo(valuesContentChiSo.filter((v: any) => v.key != record.key))
        }}>
            Xóa
        </Typography.Link>
    }}]

    const columnsValuesChiSo = [...columns, { key: "sua", title: "Sửa", dataIndex: "sua", render: (_: any,record: any) => {
        return <Typography.Link onClick={()=>{
            setRecord(record)
            setIsOpen(true)
            setIsEditValues(true)
        }}>
            Sửa
        </Typography.Link>
    }},
    { key: "xoa", title: "Xóa", dataIndex: "sua", render: (_: any,record: any) => {
        return <Typography.Link onClick={()=>{
            setValuesChiSo(valuesChiSo.filter((v: any) => v.key != record.key))
        }}>
            Xóa
        </Typography.Link>
    }}]

    const handleOkEdit = () => {
        const data = formEditContent.getFieldsValue()
        console.log(valuesChiSo)
        console.log(valuesContentChiSo)
        let cloneValuesContent 
        console.log(isEditValues)
        if (isEditValues) {
            cloneValuesContent = [...valuesChiSo]
        }
        else {
            cloneValuesContent = [...valuesContentChiSo]
        }
        for (let i = 0; i < cloneValuesContent.length; i++) {
            if (cloneValuesContent[i].key == data.key) {
                cloneValuesContent[i] = data
            }
        }

        if (isEditValues) {
            setValuesChiSo(cloneValuesContent)
        }
        else {
            setValuesContentChiSo(cloneValuesContent)
        }
        setIsOpen(false)
    }   
    const handleAddChiSo = () => {
        const values = formAdd.getFieldsValue()
        values["thang"] = values["thang"] ? values["thang"] : currentMonth
        values["nam"] = values["nam"] ? values["nam"] : currentYear
        values["loaiNoiDung"] = loai == "Chỉ số thường" ? (values["loaiNoiDung"] ? values["loaiNoiDung"] : "Đơn giản") : ""
        values["bieuMau"] = values["chiSoCha"] ? valueBieuMau : values["bieuMau"]
        
        if (valuesChiSo.length > 0 && loai == "Kết quả") {
            values["giaTriChiSoAr"] = valuesChiSo
            for (const e of values["giaTriChiSoAr"]){
                delete e.key
            }
        }
        if (valuesContentChiSo.length > 0 && loai == "Chỉ số thườnh") {
            values["noiDungChiSoAr"] = valuesContentChiSo
            for (const e of values["noiDungChiSoAr"]){
                delete e.key
            }
        }
        values["bieuMau"] = {
            maBieuMau: values["bieuMau"]
        }
        if (chiSoCha) {
            values["chiSoCha"] = {
                maChiSo: chiSoCha
            }
        }
        console.log(JSON.stringify(values))
        axios.post(PATH + "/chi_so", values).then(e => {
            if (e.status == 201) {
                window.location.reload()
            }
        })
    }
    const handleEditChiSo = () => {
        const values = formAdd.getFieldsValue()
        values["thang"] = values["thang"] ? values["thang"] : currentMonth
        values["nam"] = values["nam"] ? values["nam"] : currentYear
        values["loaiNoiDung"] = values["loaiNoiDung"] ? values["loaiNoiDung"] : "Đơn giản"
        values["bieuMau"] = values["chiSoCha"] ? valueBieuMau : values["bieuMau"]
        
        if (valuesChiSo.length > 0) {
            values["giaTriChiSoAr"] = valuesChiSo
            for (const e of values["giaTriChiSoAr"]){
                delete e.key
            }
        }
        if (valuesContentChiSo.length > 0) {
            values["noiDungChiSoAr"] = valuesContentChiSo
            for (const e of values["noiDungChiSoAr"]){
                delete e.key
            }
        }
        values["bieuMau"] = {
            maBieuMau: values["bieuMau"]
        }
        if (chiSoCha) {
            values["chiSoCha"] = {
                maChiSo: chiSoCha
            }
        }
        values["maChiSo"] = props.id
        console.log(JSON.stringify(values))
        axios.put(PATH + "/chi_so", values).then(e => {
            if (e.status == 200) {
                window.location.reload()
            }
        })
    }
    const formAddContentE = () => {
        console.log(currentSetting)
        return <Form layout="vertical" form={currentSetting ? formAddContent : formAddValue}>
                    <Form.Item name="key" initialValue={currentSetting ? key : keyV} hidden={true}></Form.Item>
                    <Form.Item name="tienChuoi" label="Tiền chuỗi">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item name="tienTo" label="Tiền tố">
                        <Select></Select>
                    </Form.Item>
                    <Form.Item name="giaTri" label="Giá trị">
                        <InputNumber></InputNumber>
                    </Form.Item>
                    <Form.Item name="loaiGiaTri" label="Loại giá trị">
                        <Select></Select>
                    </Form.Item>
                    <Form.Item name="donVi" label="Đơn vị">
                        <Select></Select>
                    </Form.Item>
                    <Form.Item name="hauChuoi" label="Hậu chuỗi">
                        <Input></Input>
                    </Form.Item>
                </Form>
    }
    useEffect(() => {
        // console.log(props.dataEdit)
        if (props.dataEdit && props.dataEdit.thang) {
            if (props.dataEdit.bieuMau) {
                setValueBieuMau(props.dataEdit.bieuMau.maBieuMau)
            }
            if (props.dataEdit.chiSoCha) {
                setChiSoCha(props.dataEdit.chiSoCha.maChiSo)
                setHideBieuMau(true)
                console.log(props.dataEdit.chiSoCha.maChiSo)
            }
            setLoai(props.dataEdit.loai)
            console.log(props.dataEdit.loai)
            let i = 0 
            for (const e of props.dataEdit.giaTriChiSoAr) {
                e["key"] = i
                i++
            }
            i = 0
            for (const e of props.dataEdit.noiDungChiSoAr) {
                e["key"] = i
                i++
            }
            setValuesChiSo(props.dataEdit.giaTriChiSoAr)
            setValuesContentChiSo(props.dataEdit.noiDungChiSoAr)
            setThang(props.dataEdit.thang)
            setNam(props.dataEdit.nam)
            setOpen(true)
        }
        else {
            setOpen(false)
        }
    },
    [props.dataEdit])
    return <>
        {props.isEdit || <Button onClick={() => {setOpen(true)}} type="primary">Thêm chỉ số</Button>}
        <Modal title={(!props.isEdit ? "Thêm" : "Sửa") + " chỉ số"} open={open} onCancel={() => {
            setOpen(false)
            props.callBackSetHide && props.callBackSetHide(false)
        }} width={1000} footer={<></>}>
            <Form layout="vertical" form={formAdd}>
                <Form.Item
                    label="Biểu mẫu"
                    name="bieuMau"
                    hidden={hideBieuMau}
                    initialValue={valueBieuMau}
                >
                    <Select options={props.ob} showSearch placeholder="Chọn biểu mẫu" value={valueBieuMau}></Select>
                </Form.Item>
                
                {/* <Form.Item
                    label="Chỉ số cha"
                    name="chiSoCha"
                > */}
                <div className="mb-[24px]">
                <div className="mb-[8px]">Chỉ số cha</div>
                    <Select
                        showSearch
                        allowClear
                        // defaultValue={chiSoCha}
                        value={chiSoCha}
                        placeholder="Chọn chỉ số cha"
                        optionFilterProp="label"
                        options={props.oc}
                        onSelect={(value, option) => {
                            console.log(option)
                            setHideBieuMau(true)
                            setValueBieuMau(option.bieuMau)
                            setChiSoCha(value)
                        }}
                        onClear={() => {
                            setHideBieuMau(false)
                        }}
                    />
                    </div>
                {/* </Form.Item> */}
                <Form.Item
                    label="Loại"
                    name="loai">
                    <Select
                        optionFilterProp="label"
                        options={[{value: "Chỉ số thường"}, {value: "Kết quả"}]}
                        defaultValue={"Chỉ số thường"}
                        onSelect={(value) => setLoai(value)}
                    />
                </Form.Item>
                {loai == "Chỉ số thường" ? 
                <>
                    <CustomModal content={
                        formAddContentE()
                    }onOpen={() => setCurrentSetting(true)}
                    onSubmit={()=>{
                        console.log("haha")
                        const values = formAddContent.getFieldsValue()
                        const cloneValuesContent:any = [...valuesContentChiSo]
                        cloneValuesContent.push(values)
                        console.log(cloneValuesContent)
                        console.log(valuesContentChiSo)
                        setValuesContentChiSo(cloneValuesContent)
                        setKey(key + 1)
                        return true}} title="Thêm thành phần nội dung" titleBtnCancel="Trở lại" titleBtnSubmit="Thêm" >
                    </CustomModal>
                    <Table columns={columnsContentChiSo} dataSource={valuesContentChiSo} pagination={false}>
                    </Table>
                </>
                :
                <>
                    <CustomModal content={
                        formAddContentE()
                    }onOpen={() => setCurrentSetting(false)}
                    onSubmit={()=>{
                        console.log("haha")
                        const values = formAddValue.getFieldsValue()
                        const cloneValuesContent:any = [...valuesChiSo]
                        cloneValuesContent.push(values)
                        console.log(cloneValuesContent)
                        console.log(valuesContentChiSo)
                        // if (isEdit) {

                        // }
                        setValuesChiSo(cloneValuesContent)
                        setKeyV(keyV + 1)
                        return true}} title="Thêm thành phần giá trị" titleBtnCancel="Trở lại" titleBtnSubmit="Thêm" >
                    </CustomModal>
                    <Table columns={columnsValuesChiSo} dataSource={valuesChiSo} pagination={false}>

                    </Table></>}
                <Modal title={"Sửa thành phần nội dung"} open={isOpen} onCancel={() => setIsOpen(false)} footer={[
                    <Button type="primary" onClick={handleOkEdit}>Sửa</Button>,
                    <Button onClick={() => {
                        setIsOpen(false)
                    }}>Trở lại</Button>
                ]
                }>
                    <Form layout="vertical" initialValues={record} form={formEditContent}>
                        <Form.Item name="key" hidden={true}></Form.Item>
                        <Form.Item name="tienChuoi" label="Tiền chuỗi">
                            <Input></Input>
                        </Form.Item>
                        <Form.Item name="tienTo" label="Tiền tố">
                            <Select></Select>
                        </Form.Item>
                        <Form.Item name="giaTri" label="Giá trị">
                            <InputNumber></InputNumber>
                        </Form.Item>
                        <Form.Item name="loaiGiaTri" label="Loại giá trị">
                            <Select></Select>
                        </Form.Item>
                        <Form.Item name="donVi" label="Đơn vị">
                            <Select></Select>
                        </Form.Item>
                        <Form.Item name="hauChuoi" label="Hậu chuỗi">
                            <Select></Select>
                        </Form.Item>
                    </Form>
                </Modal>
                <Form.Item label="Tháng" name="thang">
                    <Select options={months} defaultValue={currentMonth}></Select>
                </Form.Item >
                <Form.Item label="Năm" name="nam">
                    <Select options={years} defaultValue={currentYear}></Select>
                </Form.Item>
                <br></br>
            </Form>
            <Button type="primary" onClick={() => {
                !props.isEdit ? handleAddChiSo() : handleEditChiSo()
            }}>{!props.isEdit ? "Thêm" : "Sửa"}</Button>
            <Button onClick={() => setIsOpenAddForm(false)}>Trở lại</Button>
        </Modal>
        
    </>
}