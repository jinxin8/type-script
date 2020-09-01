import { Vue } from "vue-property-decorator";

export class HeightMixin extends Vue {
  get getHeight() {
    const H = document.body.clientHeight;
    return H;
  }
}
