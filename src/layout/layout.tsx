import { Component } from "vue-property-decorator";
import { HeightMixin } from "./mixins/getHeight";

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
        <menu-side></menu-side>
      </div>
    );
  }
}
