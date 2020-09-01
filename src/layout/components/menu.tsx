import { Component, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

import "./menu.scss";

const headerData = namespace("menu");

interface HeaderItem {
  path?: string;
  title: string;
  icon: string;
  children?: any[];
}

@Component
export default class Menuside extends Vue {
  name = "Menuside";

  openKeys: string[] = [];

  @headerData.State header: any;

  @Watch("openKeys")
  openKeysChange(val: string) {
    console.log("openKeys", val);
  }

  handleClick(e: object) {
    console.log("click", e);
  }
  titleClick(e: object) {
    console.log("titleClick", e);
  }

  render() {
    return (
      <a-menu
        style="width: 12%"
        defaultOpenKeys={this.openKeys}
        defaultSelectedKeys={this.openKeys}
        mode="inline"
        onClick={this.handleClick}
      >
        {this.header.map((v: any, index: number) =>
          v.children ? (
            <a-sub-menu key={index}>
              <span slot="title">
                <a-icon type="mail" />
                <span>{v.title}</span>
              </span>
              {v.children.map((item: HeaderItem) => (
                <a-menu-item key={item.path}>{item.title}</a-menu-item>
              ))}
            </a-sub-menu>
          ) : (
            <a-menu-item key={v.path}>
              <a-icon type="pie-chart" />
              <span>{v.title}</span>
            </a-menu-item>
          )
        )}
      </a-menu>
    );
  }
}
