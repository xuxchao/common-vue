import { createAlova } from "alova";
import VueHook from "alova/vue";
// import GlobalFetch from 'alova/GlobalFetch'
import { mockAdapter } from "./mock";
import { Config } from "@/config";
// export * from '@alova/scene-vue'
export * from "alova";
import { ElMessage } from "element-plus";

const { domain } = Config;

export const alova = createAlova({
  statesHook: VueHook,
  requestAdapter: mockAdapter,
  // responded: async (res) => {
  //   return (await res.json()).body
  // }
  responded: {
    onSuccess: async (res) => {
      const body = (await res.json()).body;
      if (body.code === 200) {
        return body.data;
      } else {
        ElMessage.error(body.message);
        throw Error(body.message);
      }
      // return
    }
    // onError: async (res) => {
    //   return (await res.json()).body
    // }
  }
});

export interface R<T> {
  code: number;
  message: string;
  data: T;
}

export interface Area {
  areaId: number;
  password: string;
}

export const createArea = alova.Post<R<Area>>(`${domain}area`);
export const areaList = alova.Get<Omit<Area, "password">[]>(`${domain}area`);
