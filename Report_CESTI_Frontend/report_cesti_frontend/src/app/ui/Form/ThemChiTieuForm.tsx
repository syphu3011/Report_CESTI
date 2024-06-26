import { DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";


export default function ThemChiTieuForm() {
    return <>
    <p className="text-black">Thêm chỉ tiêu</p>
    <Form layout="vertical">
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
            <Input/>
        </Form.Item>
        <Form.Item
            label="Ngày bắt đầu"
            name="ngayBatDau"
            rules={[
                {
                required: true,
                message: 'Hãy chọn ngày bắt đầu!',
                },
            ]}
        >
            <DatePicker defaultValue={dayjs(Date.now())} format="DD-MM-YYYY"/>
        </Form.Item>
        <Form.Item
            label="Ngày bắt đầu"
            name="ngayBatDau"
            rules={[
                {
                required: true,
                message: 'Hãy chọn ngày bắt đầu!',
                },
            ]}
        >
            <DatePicker defaultValue={dayjs(new Date(new Date().setFullYear(new Date().getFullYear() + 1)))} format="DD-MM-YYYY"/>
        </Form.Item>
    </Form>
    </>
}