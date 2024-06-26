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
import BieuMauTable from '../ui/Table/BieuMau/BieuMauTable';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(0)
  const router = useRouter();
  
  return (
    <main className="App flex min-h-screen flex-col items-center justify-between p-24">
      <div className='App'>
        {/* <Button className="mt-[10px]" >Thêm chỉ tiêu</Button> */}
        <BieuMauTable limit={12} page={currentPage} callbackSetPage={setCurrentPage} condition={{}}/>
      </div>

    </main>
  //   <div className="App">
  //   <Button type="primary">Button</Button>
  // </div>
  );
}
