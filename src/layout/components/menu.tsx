import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";

import "./menu.scss";

const asideData = namespace("menu");

interface AsideItem {
  path?: string;
  title: string;
  icon: string;
  children?: any[];
}

@Component
export default class Menuside extends Vue {
  name = "Menuside";

  @Prop() readonly getHeight!: number;

  @asideData.State aside: any;
  @asideData.State asideCollapse: any;
  @asideData.Mutation asideCollapseSet: any;

  // @Watch("openKeys")
  // openKeysChange(val: string) {
  //   console.log("openKeys", val);
  // }

  get openKeys() {
    return [this.$route.path];
  }

  handleClick(e: any) {
    if (this.$route.path !== e.key) {
      this.$router.push({ path: e.key });
    }
  }
  titleClick(e: object) {
    console.log("titleClick", e);
  }
  toggleCollapsed() {
    this.asideCollapseSet(!this.asideCollapse);
  }

  render() {
    return (
      <div
        class="menuList"
        style={this.asideCollapse ? "width: 80px;" : "width: 12%;"}
      >
        <p class="menutitle">
          {this.asideCollapse ? "TS" : "typeScript"}
          <a-icon
            class="menubtn"
            onClick={this.toggleCollapsed}
            type={this.asideCollapse ? "menu-unfold" : "menu-fold"}
          />
        </p>
        <a-menu
          style={`height:${this.getHeight - 40}px;`}
          defaultOpenKeys={this.openKeys}
          defaultSelectedKeys={this.openKeys}
          mode="inline"
          inlineCollapsed={this.asideCollapse}
          onClick={this.handleClick}
        >
          {this.aside.map((v: any, index: number) =>
            v.children ? (
              <a-sub-menu key={index}>
                <span slot="title">
                  <a-icon type={v.icon || "folder"} />
                  <span>{v.title}</span>
                </span>
                {v.children.map((item: AsideItem) => (
                  <a-menu-item key={item.path}>
                    <a-icon type={item.icon || "file"} />
                    <span>{item.title}</span>
                  </a-menu-item>
                ))}
              </a-sub-menu>
            ) : (
              <a-menu-item key={v.path}>
                <a-icon type={v.icon || "file"} />
                <span>{v.title}</span>
              </a-menu-item>
            )
          )}
        </a-menu>
      </div>
    );
  }
}
