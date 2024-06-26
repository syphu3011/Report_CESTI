import Image from "next/image";
import NavigateCard from "./ui/NavigateCard/NavigateCard";

export default function Home() {
  return (
    <main className="h-full flex-row items-center justify-between pt-20">
      <div className="flex w-full content-center items-center justify-center">
        <div className="flex w-3/4 justify-between">
          <NavigateCard number={1} srcImage={"/report.png"} name={"Báo cáo"} content={"Quản lý các báo cáo của các sở, ngành"} to="/chi_tieu"></NavigateCard>
          <NavigateCard number={2} srcImage={"/bieu_mau.png"} name={"Biểu mẫu"} content={"Quản lý các biểu mẫu thuộc các báo cáo"} to="/bieu_mau"></NavigateCard>
        </div>
      </div>
    </main>
  );
}
