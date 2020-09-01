import { uniqueId } from "lodash";

interface MenuItem {
  path?: string;
  title: string;
  icon: string;
  children?: any[];
}

/**
 * @description 给菜单数据补充上 path 字段
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath(menu: MenuItem[]): object[] {
  return menu.map((e: MenuItem) => ({
    ...e,
    path: e.path || uniqueId(""),
    ...(e.children
      ? {
          children: supplementPath(e.children)
        }
      : {})
  }));
}

export const menuHeader = supplementPath([
  { path: "/indexPage", title: "首页", icon: "" },
  {
    title: "管理中心",
    icon: "",
    children: [
      { path: "/filesUpload", title: "文档上传", icon: "" },
      { path: "/trainingRelease", title: "培训发布", icon: "" },
      { path: "/bannertrain", title: "banner发布", icon: "" },
      { path: "/announcement", title: "公告发布", icon: "" }
    ]
  }
]);

export const menuAside = supplementPath([
  { path: "/indexPage", title: "首页", icon: "" }
]);
