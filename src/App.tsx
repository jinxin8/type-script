import { Component, Vue } from "vue-property-decorator";

import "./app.scss";
@Component
export default class App extends Vue {
  name = "App";
  render() {
    return (
      <div id="app">
        <router-view />
      </div>
    );
  }
}
