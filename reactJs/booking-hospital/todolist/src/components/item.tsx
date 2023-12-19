import "./item.css";
import axios from "axios";
import React, { memo, useState } from "react";
import { Button, Modal, message, Popconfirm } from "antd";
interface Props {
  content: JSX.Element;
  id: number;
  onChangeStatus: Function;
}
const Item: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [valueInput, setValueInput] = useState<string>("");
  const handelDelete = async (id: number): Promise<void> => {
    await axios.delete(`http://localhost:8000/posts/${id}`);
    props.onChangeStatus();
  };
  const handelUpdate = async (id: number): Promise<void> => {
    await axios.patch(`http://localhost:8000/posts/${id}`, {
      content: valueInput,
    });
    setOpen(false);
    props.onChangeStatus();
  };
  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.success("Click on Yes");
    handelDelete(props.id);
  };
  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
  };
  return (
    <div className="item-to-do-list">
      <input type="checkbox" placeholder="a"></input>
      <div className="item-name">{props.content}</div>
      <div className="btn-to-do-list">
        <Button onClick={() => setOpen(true)}>Update</Button>
        <Modal
          title="Modal Update To Do List"
          centered
          open={open}
          onOk={() => handelUpdate(props.id)}
          onCancel={() => setOpen(false)}
          width={1100}
        >
          <input
            type="text"
            placeholder="enter input"
            onChange={(e) => {
              setValueInput(e.target.value);
            }}
            className="input-update"
            value={valueInput || (props.content as any)}
          />
        </Modal>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={confirm as any}
          onCancel={cancel as any}
          okText="yes"
          cancelText="No"
        >
          <Button danger>Delete</Button>
        </Popconfirm>
      </div>
    </div>
  );
};
export default memo(Item);
