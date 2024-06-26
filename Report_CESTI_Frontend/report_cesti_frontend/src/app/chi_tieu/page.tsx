"use client"
import dynamic from 'next/dynamic'
import React, { useState } from 'react';
const ChiTieuTable = dynamic(() => import('../ui/Table/ChiTieu/ChiTieuTable'), { ssr: false })
import Image from "next/image";
import { AutoComplete, Button, DatePicker, Form, Input, Modal, Table } from "antd";
import CustomModal from '../ui/Modal/CustomModal';
import dayjs from 'dayjs';
import axios from 'axios';
import { PATH } from '../utils/const';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0)
  const router = useRouter();
  
  return (
    <main className="App flex min-h-screen flex-col items-center justify-between p-24">
      <div className='App'>
        {/* <Button className="mt-[10px]" >Thêm chỉ tiêu</Button> */}
        <ChiTieuTable limit={12} page={currentPage} callbackSetPage={setCurrentPage} condition={{"tuBatDau": "1970/01/07", "denBatDau": "2028/01/07", "tuKetThuc": "1970/01/07", "denKetThuc": "2028/01/07"}}></ChiTieuTable>
      </div>

    </main>
  //   <div className="App">
  //   <Button type="primary">Button</Button>
  // </div>
  );
}
