import React, {useEffect, useState} from 'react'
import {Input, Form, Tooltip, Button, Col, Row} from 'antd';
import {Select, InputNumber, Slider, Checkbox, Modal, Space, Spin} from 'antd';
import {DeleteOutlined, LoadingOutlined} from "@ant-design/icons";

import s from './style.module.scss'
import {prepareData} from "../../utlis/prepareData";
import {projectAPI} from "../../api/flats_api";


function CaretRightOutlined() {
  return null;
}

const DataField = (props) => {
  const {Option} = Select;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const [flatsVals, setFlatsVals] = useState(null)
  const [checkedValues, setCheckedValues] = useState(null)
  const [quality, setQuality] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [price, setPrice] = useState("")

  const checkedBoxes = {
    "kitchen studio": 0,
    "multi-level": 0,
    "with_attic": 0,
    "penthouse": 0,
    "without_furniture": 0,
    "rough_plaster": 0,
  }

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };


  function onChange(checkedValues) {
    let checkedBoxes = {
      "kitchen studio": 0,
      "multi-level": 0,
      "with_attic": 0,
      "penthouse": 0,
      "without_furniture": 0,
      "rough_plaster": 0,
    }

    if (checkedValues.length !== 0) {
      for (let i = 0; i < checkedValues.length; i++) {
        checkedBoxes[checkedValues[i]] = 1
      }
    }

    setCheckedValues(checkedBoxes)
  }

  function onChangeQuality(quality) {
    setQuality(quality)
  }

  const onFinish = (values) => {
    let checkBoxesValues = checkedValues ? checkedValues : checkedBoxes
    const resValues = {
      "house_price_index": 114.9,
      "quality": quality,
      "room_amount": values["room_amount"],
      "total_square_meters": values["total_square_meters"],
      "live_square_meters": values["live_square_meters"],
      "kitchen_square_meters": values["kitchen_square_meters"],
      "floor": values["floor"],
      "floors_count": values["floors_count"],
      "district_type_name": values["district_type"],
      "city_name": values["city_name"],
      "wall_type": values["wall_type"],
      "heating": values["heating"],
      "year_of_construction": values["year_of_construction"],
      ...checkBoxesValues
    }
    setFlatsVals(prepareData(resValues))
  }

  const addData = async (flatsVals) => {
    if(flatsVals){
      console.log("flatsVals", flatsVals)
      setLoading(true)
      let result = await projectAPI.estimateFlatPrice(flatsVals)
      console.log("result", result)
      setPrice(result['estimated_price_range'])
      setLoading(false)
      showModal()
    }
  }

  useEffect(() => {
    addData(flatsVals)
  }, [flatsVals])

  return (
    <>
      <div className={s.wrapper}>
        <Form form={form}
              name="basic"
              layout="vertical"
              onFinish={onFinish}
        >
          <div className={s.firstFormItem}>
            <div className={s.generalFields}>
              <div className={s.topBlock}>
                <h2>Заповніть характеристики квартири:</h2>
              </div>
              <div className={s.inputBlock}>
                <Form.Item
                  name="city_name"
                  rules={[{required: true, message: 'Оберіть місто'}]}
                >
                  <Select
                    showSearch
                    size={"large"}
                    placeholder="Місто"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="city_name_Kyiv">Київ</Option>
                    <Option value="city_name_Irpin">Ірпінь</Option>
                    <Option value="city_name_Bucha">Буча</Option>
                    <Option value="city_name_Kyiv-Sviatoshynskyi">Київ-Святославський</Option>
                    <Option value="city_name_Bila Tserkva">Біла Церква</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="total_square_meters"
                  rules={[{required: true, message: 'Зазначте загальну площу'}]}
                >
                  <InputNumber placeholder="Загальна площа(м²)" size={"large"} className={s.inputNumber}/>
                </Form.Item>
                <Form.Item
                  name="live_square_meters"
                  rules={[{required: true, message: 'Зазначте житлову площу'}]}
                >
                  <InputNumber placeholder="Житлова площа(м²)" size={"large"} className={s.inputNumber}/>
                </Form.Item>
                <Form.Item
                  name="kitchen_square_meters"
                  rules={[{required: true, message: 'Зазначте площу кухні'}]}
                >
                  <InputNumber placeholder="Площа кухні(м²)" size={"large"} className={s.inputNumber}/>
                </Form.Item>
                <Form.Item
                  name="floor"
                  rules={[{required: true, message: 'Зазначте поверх'}]}
                >
                  <InputNumber placeholder="Поверх" size={"large"} className={s.inputNumber}/>
                </Form.Item>
                <Form.Item
                  name="room_amount"
                  rules={[{required: true, message: 'Зазначте кількість кімнат'}]}
                >
                  <InputNumber placeholder="Кількість кімнат" size={"large"} className={s.inputNumber}/>
                </Form.Item>
              </div>
            </div>
            <div className={s.secondFields}>
              <div className={s.inputBlock}>
                <Form.Item
                  name="heating"
                  rules={[{required: true, message: 'Зазначте тип опалення'}]}
                >
                  <Select
                    showSearch
                    size={"large"}
                    placeholder="Тип опалення"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="heating_1648">Централізоване</Option>
                    <Option value="heating_1649">Індивідуальне</Option>
                    <Option value="heating_1653">Без опалення</Option>
                  </Select>
                </Form.Item>
              </div>
              <div className={s.inputBlock}>
                <Form.Item
                  name="year_of_construction"
                  rules={[{required: true, message: 'Зазначте рік будівницва'}]}
                >
                  <Select
                    showSearch
                    size={"large"}
                    placeholder="Рік будівництва"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="year_of_construction_441">до 1917</Option>
                    <Option value="year_of_construction_1791">1917-1969</Option>
                    <Option value="year_of_construction_437">1970-1979</Option>
                    <Option value="year_of_construction_436">1980-1989</Option>
                    <Option value="year_of_construction_435">1990-2000</Option>
                    <Option value="year_of_construction_1783">2001-2010</Option>
                    <Option value="year_of_construction_1784">2011-2015</Option>
                    <Option value="year_of_construction_1468">2017</Option>
                    <Option value="year_of_construction_1469">2018</Option>
                    <Option value="year_of_construction_1470">2019</Option>
                    <Option value="year_of_construction_1471">2020</Option>
                    <Option value="year_of_construction_1751">Здача в 2021</Option>
                    <Option value="year_of_construction_1752">Здача в 2022</Option>
                    <Option value="year_of_construction_1873">Здача в 2023</Option>
                    <Option value="year_of_construction_1874">Здача в 2024</Option>
                    <Option value="year_of_construction_1875">Здача в 2025</Option>
                    <Option value="year_of_construction_1876">Здача в 2026</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="district_type"
                  rules={[{required: true, message: 'Зазначте район'}]}
                >
                  <Select
                    showSearch
                    size={"large"}
                    placeholder="Район"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="district_type_name_district">Міський</Option>
                    <Option value="district_type_name_suburb">Приміський</Option>
                    <Option value="district_type_name_village">Сільський</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="wall_type"
                  rules={[{required: true, message: 'Зазначте тип стін'}]}
                >
                  <Select
                    showSearch
                    size={"large"}
                    placeholder="Тип стін"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="wall_type_108">цегла</Option>
                    <Option value="wall_type_109">силікатна цегла</Option>
                    <Option value="wall_type_110">панель</Option>
                    <Option value="wall_type_111">піноблок</Option>
                    <Option value="wall_type_113">моноліт</Option>
                    <Option value="wall_type_114">ракушняк</Option>
                    <Option value="wall_type_115">монолітно-цегляний</Option>
                    <Option value="wall_type_116">монолітно-блоковий</Option>
                    <Option value="wall_type_117">дерево та цегла</Option>
                    <Option value="wall_type_1439">інкерманський камінь</Option>
                    <Option value="wall_type_1446">бутовий камінь</Option>
                    <Option value="wall_type_1462">газобетон</Option>
                    <Option value="wall_type_1466">керамзітобетон</Option>
                    <Option value="wall_type_1467">монолітно-каркасний</Option>
                    <Option value="wall_type_1472">керамічний блок</Option>
                    <Option value="wall_type_1613">армований залізобетон</Option>
                    <Option value="wall_type_1614">збірний залізобетон</Option>
                    <Option value="wall_type_1615">армована 3D панель</Option>
                    <Option value="wall_type_1616">газоблок</Option>
                    <Option value="wall_type_1617">безкаркасна</Option>
                    <Option value="wall_type_1618">СІП</Option>
                    <Option value="wall_type_1619">збірно-монолітна</Option>
                    <Option value="wall_type_1620">керамічна цегла</Option>
                    <Option value="wall_type_1621">залізобетон</Option>
                    <Option value="wall_type_1622">облицювальна цегла</Option>
                    <Option value="wall_type_1623">каркасно-кам`яна</Option>
                    <Option value="wall_type_1625">монолітний залізобетон</Option>
                    <Option value="wall_type_1631">блочно-цегляний</Option>
                    <Option value="wall_type_1782">каркасний</Option>
                    <Option value="wall_type_1793">полістиролбетон</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="floors_count"
                  rules={[{required: false}]}
                >
                  <InputNumber placeholder="Кількість поверхів" size={"large"} className={s.inputNumber}/>
                </Form.Item>
                <Form.Item
                  name="quality"
                  rules={[{required: false}]}
                >

                  <div className={s.quality}>
                    <h3>Загальна якість: </h3>
                    <Slider min={1} max={10} defaultValue={10} style={{width: 200, marginLeft: 20}}
                            onChange={onChangeQuality}/>
                  </div>
                </Form.Item>
              </div>
            </div>
          </div>
          <div className={s.secondFormItem}>
            <Checkbox.Group style={{width: '100%'}} onChange={onChange}>
              <Row>
                <Col span={6}>
                  <Checkbox value="kitchen studio" size={"large"} className={s.checkbox}>Кухня студія</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value="multi-level" size={"large"} className={s.checkbox}>Багаторівнева</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value="with_attic" size={"large"} className={s.checkbox}>З мансардою</Checkbox>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <Checkbox value="penthouse" size={"large"} className={s.checkbox}>Пентхаус</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value="without_furniture" size={"large"} className={s.checkbox}>Без меблів</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value="rough_plaster" size={"large"} className={s.checkbox}>Чорнова штукатурка</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
            <Form.Item>
              <Tooltip title="Дізнатись орієнтовну вартість квартири">
                <Button
                  type="primary"
                  size={"large"}
                  onClick={() => {
                    form.submit()
                  }}
                  disabled={loading}
                >
                  { loading ?
                    <Space>
                      <Spin indicator={<LoadingOutlined style={{fontSize: 18, color: "#00000040"}} spin/>}/>
                      <span>Оцінювання...</span>
                    </Space>
                    :
                    <Space><span>Дізнатись вартість</span></Space>}
                </Button>
              </Tooltip>
            </Form.Item>
          </div>
        </Form>
        <Modal title="" visible={isModalVisible}
               onOk={handleOk}
               footer={[
                 <Button key="submit" type="primary" onClick={handleOk}>
                   Добре
                 </Button>,
               ]}>
          <div className={s.modalContent}>
            <h2>Орієнтовна вартість квартири: </h2>
            <div style={{color: 'green', fontSize: 22}}>{price}</div>
          </div>
        </Modal>
      </div>
    </>
  )
};


export default DataField
