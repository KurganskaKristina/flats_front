
export function prepareData(data){
  const defaultData = {
    "house_price_index": [data["house_price_index"]],
    "quality":[data["quality"]],
    "room_amount":[data["room_amount"]],
    "total_square_meters":[data["total_square_meters"]],
    "live_square_meters":[data["live_square_meters"]],
    "kitchen_square_meters":[data["kitchen_square_meters"]],
    "floor":[data["floor"]],
    "floors_count":[data["floors_count"]],
    "kitchen studio":[data["kitchen studio"]],
    "multi-level": [data["multi-level"]],
    "with_attic":[data["with_attic"]],
    "penthouse":[data["penthouse"]],
    "without_furniture":[data["without_furniture"]],
    "rough_plaster":[data["rough_plaster"]],
  }

  let categories = {
    "district_type_name_district":[0],
    "district_type_name_suburb":[0],
    "district_type_name_village":[0],
    "city_name_Bila Tserkva":[0],
    "city_name_Bucha":[0],
    "city_name_Irpin":[0],
    "city_name_Kyiv":[0],
    "city_name_Kyiv-Sviatoshynskyi":[0],
    "wall_type_108":[1],
    "wall_type_109":[0],
    "wall_type_110":[0],
    "wall_type_111":[0],
    "wall_type_113":[0],
    "wall_type_115":[0],
    "wall_type_116":[0],
    "wall_type_1466":[0],
    "wall_type_1467":[0],
    "wall_type_1616":[0],
    "wall_type_1620":[0],
    "wall_type_1621":[0],
    "wall_type_1625":[0],
    "heating_1648":[0],
    "heating_1649":[0],
    "year_of_construction_435":[0],
    "year_of_construction_436":[0],
    "year_of_construction_437":[0],
    "year_of_construction_441":[0],
    "year_of_construction_442":[0],
    "year_of_construction_1468":[0],
    "year_of_construction_1469":[0],
    "year_of_construction_1470":[0],
    "year_of_construction_1471":[0],
    "year_of_construction_1751":[0],
    "year_of_construction_1752":[0],
    "year_of_construction_1783":[0],
    "year_of_construction_1784":[0],
    "year_of_construction_1789":[0],
    "year_of_construction_1791":[0],
    "year_of_construction_1873":[0]
  }

  for (let key in categories) {
    for (let key2 in data) {
      if (data.hasOwnProperty(key2)) {
        if (key === data[key2]) {
          categories[key] = [1]
        }
      }
    }
  }

  return {
    ...defaultData,
    ...categories
  }
}