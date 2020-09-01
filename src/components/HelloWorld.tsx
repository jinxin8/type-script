import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Helloword extends Vue {
  @Prop() private msg!: string;
  name = "Helloword";
  render() {
    return (
      <div class="hello">
        <h1>{this.msg}</h1>
      </div>
    );
  }
}
