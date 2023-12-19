import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Item from "./components/item";

function App() {
  const [data, setData] = useState<any>([]);
  const [input, setInput] = useState<string>("");
  const [status, setStatus] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  useEffect(() => {
    axios
      .get(`http://localhost:8000/posts/?content=${searchValue}`)
      .then((res) => {
        setData(res.data);
        setInput("");
      })
      .catch(() => {
        console.log("lỗi");
      });
  }, [status, searchValue]);
  const handelCreate = async (): Promise<void> => {
    await axios
      .post("http://localhost:8000/posts", {
        content: input,
      })
      .then(() => {
        onChangeStatus();
      })
      .catch(() => {
        console.log("post error");
      });
  };
  const onChangeStatus = () => {
    setStatus(!status);
  };
  return (
    <div className="App">
      <h1>To Do List</h1>
      <div className="input-to-do-list">
        <input
          type="text"
          placeholder="create todolist"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        ></input>
        <button onClick={handelCreate}>Create</button>
      </div>
      <div className="table">
        {data?.map((item: any) => {
          return (
            <Item
              content={item.content}
              id={item.id}
              onChangeStatus={onChangeStatus}
            />
          );
        })}
      </div>
    </div>
  );
}
export default App;
