import './App.css';
import React from 'react'
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import {Content, Footer, Header} from "antd/es/layout/layout";

import DataField from "./components/DataField/DataField";


function App() {
  return (
    <Layout>
      <Header/>
      <Content>
        <div className={"content"}>
          <DataField />
        </div>
      </Content>
    </Layout>
  );
}

export default App;
