import GlobalFetch from "alova/GlobalFetch";
import { createAlovaMockAdapter, defineMock } from "@alova/mock";

const mockGroup1 = defineMock(
  {
    // 捕获get请求
    "[GET]/area": () => {
      console.log("我执行了");
      return {
        code: 200,
        message: "ok",
        data: [{ area: 1 }, { area: 2 }]
      };
    },

    // rest风格请求
    "/todo/{id}": ({ params }) => {
      const id = params.id;
      // ...
      return {
        title: "...",
        time: "10:00"
      };
    },

    // 捕获post请求
    "[POST]/todo": ({ query, data }) => {
      // ...
      return { success: true };
    },

    // key前面添加`-`，表示禁用此mock接口
    "-[DELETE]/todo/{id}": ({ params }) => {
      // ...
      return { success: true };
    }
  },
  true
); // 第二个参数表示是否启用本组mock接口，默认为true，可以指定为false关闭

export const mockAdapter = createAlovaMockAdapter([mockGroup1 /** ... */], {
  // 全局控制是否启用mock接口，默认为true
  enable: true,

  // 非模拟请求适配器，用于未匹配mock接口时发送请求
  httpAdapter: GlobalFetch(),

  // mock接口响应延迟，单位毫秒
  delay: 1000,

  // 是否打印mock接口请求信息
  mockRequestLogger: true,

  // 模拟接口回调，data为返回的模拟数据，你可以用它构造任何你想要的对象返回给alova
  // 以下为默认的回调函数，它适用于使用GlobalFetch请求适配器
  // 如果你使用的是其他请求适配器，在模拟接口回调中请自定义返回适合适配器的数据结构
  onMockResponse: (data) => {
    return {
      response: new Response(JSON.stringify(data)),
      ...new Response(JSON.stringify(data))
    };
  }
  // onMockResponse: (data) => new Response(JSON.stringify(data))
});
