import axios from "axios";

export default function getRoutersJson(path){
  return axios.get(path).then()
}