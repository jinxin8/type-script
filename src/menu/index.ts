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

export const menuHeader = supplementPath([]);

export const menuAside = supplementPath([
  { path: "/indexPage", title: "首页", icon: "home" },
  { path: "/quillPage", title: "富文本", icon: "file-text" },
  {
    title: "视频",
    icon: "video-camera",
    children: [
      { path: "/videoPage/photo", title: "视频第一帧", icon: "scissor" },
      { path: "/videoPage/disfast", title: "禁止快进", icon: "forward" }
    ]
  },
  { path: "/zipPage", title: "文件打包", icon: "file-zip" },
  // { path: "/zipPage", title: "加密", icon: "eye-invisible" },
  { path: "/execComPage", title: "复制", icon: "copy" }
]);
