import { Component, Vue } from "vue-property-decorator";

@Component
export default class About extends Vue {
  name = "About";
  render() {
    return (
      <div class="about">
        <h1>This is an about page</h1>
      </div>
    );
  }
}
