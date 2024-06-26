"use client"
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("")
  const data = axios.get("http://127.0.0.1:3000/api"+`/chi_tieu/paginate?limit=12&page=3&params={"tuBatDau":"1970/01/07","denBatDau":"2028/01/07","tuKetThuc":"1970/01/07","denKetThuc":"2028/01/07"}`).then(rs => {
    setContent(JSON.stringify(rs.data))
  })
  return <div className="mt-[300px] text-black">{content}</div>;
}
