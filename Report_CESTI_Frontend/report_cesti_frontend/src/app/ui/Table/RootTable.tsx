"use client"

import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input, InputNumber, Popconfirm, Space, Table, TableProps, Tag, Typography, message } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import { PATH } from '@/app/utils/const';
import IColumn from './paramsTable/interfaces/IColumn';
import IParamsTable from './paramsTable/interfaces/IParamsTable';

type TableRef = {
  columns: IColumn[],
  data: IParamsTable[],
  path: string,
  itemsPerPage: number,
  totalPage: number,
  currentPage: number,
  callbackSetPage: (page: number) => void,
  callbackSetReload: (reload: number) => void
  reload: number
  onRowClick: (record: IParamsTable) => void
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text' | 'date';
  record: IParamsTable
  index: number;
}
const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : inputType == "date" ? <DatePicker format={"DD-MM-YYYY"} /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
export default function RootTable(ref: TableRef) {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [messageApi, contextHolder] = message.useMessage();
  // const [columns, setColumns] = useState<IColumn[]>([])
  const [data, setData] = useState<IParamsTable[]>(ref.data)
  const isEditing = (record: IParamsTable) => {
    // console.log(record.key == editingKey)
    // console.log(record.key, editingKey)
    return record.key === editingKey;
  }
  const edit = (record: Partial<any>) => {
    const fields = { ...record }
    for (let i = 0; i < columns.length; i++) {
      if (columns[i] && columns[i].isDate) {
        fields[columns[i].dataIndex] = dayjs(record[columns[i].dataIndex], "DD-MM-YYYY")
      }
    }
    form.setFieldsValue(fields);
    setEditingKey(record.key);
  };
  const save = async (key: string) => {
    try {
      const row = await form.validateFields();
      const newData = [...ref.data] as any[];
      const index = newData.findIndex((item) => key === item.key);
      const item = newData[index];
      const temp_key = item["key"]
      const fullNewRow = {
        ...item,
        ...row,
      }
      delete fullNewRow["key"]
      const putResult = await axios.put(ref.path, fullNewRow)
      fullNewRow["key"] = temp_key
      if (!putResult.data.statusCode || putResult.data.statusCode != 500) {
        if (index > -1) {
          newData.splice(index, 1, fullNewRow);
          for (const i in newData[index]) {
            const e = newData[index][i + ""]
            if (typeof e != 'number' && typeof e != 'string') {
              // if (e instanceof dayjs.Dayjs)
              newData[index][i + ""] = newData[index][i + ""].format("DD-MM-YYYY")
            }
          }
        } else {
          newData.push(row);
        }
        setData(newData);
        setEditingKey('');
      }
      else {
        messageApi.open({
          type: 'error',
          content: 'Tên không thể trùng lặp!'
        })
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  }
  const cancel = () => {
    setEditingKey('');
  }
  const columns = [...ref.columns, {
    title: 'Sửa',
    dataIndex: 'Sửa',
    render: (_: any, record: IParamsTable) => {
      const editable = isEditing(record);
      console.log(editable)
      // console.log(record.key)
      return editable ? (
        <span>
          <Typography.Link
            onClick={() => save(record.key)}
            style={{
              marginRight: 8,
            }}>
            Lưu
          </Typography.Link>
          <Popconfirm title="Bạn có muốn hủy?" onConfirm={cancel}>
            <a>Hủy</a>
          </Popconfirm>
        </span>
      ) : (
        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
          Sửa
        </Typography.Link>
      );
    },
    key: ''
  },
  {
    title: 'Xóa',
    dataIndex: 'Xóa',
    render: (_: any, record: IParamsTable) => {
      const editable = isEditing(record);
      return <>
        <Typography.Link>
          <Popconfirm onConfirm={async () => {
            const rs = await axios.delete(ref.path + `/${record.id}`)
            console.log(rs.data)
            ref.callbackSetReload(ref.reload + 0.001);
          }} disabled={!isEditing} title={"Bạn chắc chắn muốn xóa?"}>
            Xóa
          </Popconfirm>
        </Typography.Link>
      </>
    },
    key: ''
  }]
  const mergedColumns: TableProps['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IParamsTable) => ({
        record,
        inputType: (col.title == 'Bắt đầu' || col.title == 'Kết thúc') ? "date" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  useEffect(() => {
    setData(ref.data)
  }, [ref.data])
  return <Form form={form} component={false}>
    {contextHolder}
    <Table components={{
      body: {
        cell: EditableCell,
      },
    }} columns={mergedColumns} pagination={{
      total: ref.itemsPerPage * ref.totalPage, pageSize: ref.itemsPerPage, showSizeChanger: false, defaultCurrent: ref.currentPage, onChange(page, pageSize) {
        ref.callbackSetPage(page)
        setEditingKey('');
      },
    }} onRow={(record, rowIndex) => {
      return {
        onDoubleClick: (event) => ref.onRowClick(record)
      };
    }} dataSource={data} />;
  </Form>
} 