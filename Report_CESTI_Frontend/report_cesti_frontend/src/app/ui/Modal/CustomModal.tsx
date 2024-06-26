import { Button, Modal } from "antd";
import { ReactNode, useState } from "react";
type CustomModalProps = {
    title: string,
    content: ReactNode,
    titleBtnSubmit: string,
    titleBtnCancel: string,
    onSubmit: (...args: any) => boolean | Promise<boolean>,
    onCancel?: (...args: any) => boolean,
    onOpen?: (...args: any) => void
}
export default function CustomModal(props: CustomModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      props.onOpen && props.onOpen() 
      setIsModalOpen(true);
    };
    const handleOk = async () => {
        if (await props.onSubmit()) {
            alert("Thành công!")
            setIsModalOpen(false);
        }
        else {
            alert("Đã có lỗi xảy ra!")
        }
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (
      <>
        <Button className="my-[10px]" type="primary" onClick={showModal}>
          {props.title}
        </Button>
        <Modal title={props.title} open={isModalOpen} onCancel={handleCancel} width={1000} footer={[
            <Button type="primary" onClick={handleOk}>{props.titleBtnSubmit}</Button>,
            <Button type="primary" onClick={handleCancel}>{props.titleBtnCancel}</Button>
        ]
        }>
          {props.content}
        </Modal>
      </>
    );
}