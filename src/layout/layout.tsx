import { Component } from "vue-property-decorator";
import { HeightMixin } from "./mixins/getHeight";

import "./layout.scss";

@Component({
  components: {
    "menu-side": () => import("./components/menu")
  }
})
export default class App extends HeightMixin {
  name = "layout";
  render() {
    return (
      <div id="nav" style={`height:${this.getHeight}px;`}>
        <menu-side getHeight={this.getHeight}></menu-side>
        <div class="content">
          <router-view />
        </div>
      </div>
    );
  }
}
