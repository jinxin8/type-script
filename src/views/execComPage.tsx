import { Component, Vue } from "vue-property-decorator";
import "@/components/execComPage/execComPage.scss";

@Component
export default class ZipPage extends Vue {
  name = "ZipPage";

  texto = "测试1：Autosize height with minimum and maximum number of lines";
  textt = "测试2：";
  flago = false;
  flagt = false;

  // 复制访问链接及验证码
  copyXml(name: string, flag: boolean) {
    const ele: any = document.querySelector(`.${name}`);
    if (ele) {
      console.log(JSON.stringify(123), ele);
      ele.select();
      document.execCommand("copy");
      console.log(document.execCommand("copy"));
      // this.$message.success('复制成功');
    } else {
      console.log("copy log detail fail,can't get element.");
    }
    if (flag) {
      this.flago = true;
      this.flagt = false;
    } else {
      this.flagt = true;
      this.flago = false;
    }
  }

  render() {
    return (
      <div class="execComcont">
        <p
          class="quilltitle"
          style="font-size:18px;color:#333;text-align:center;line-height:60px;"
        >
          复制
        </p>
        <p class="quilltitle" style="line-height:40px;text-align:center;">
          execCommand实现监控control C 的操作
        </p>
        <div class="execont">
          <div class="left">
            <p class="text">{this.texto}</p>
            <a-input
              v-model={this.texto}
              class="leftinput"
              placeholder="Basic usage"
            />
            <a-button
              type="primary"
              onClick={() => {
                this.copyXml("leftinput", true);
              }}
            >
              一键复制
            </a-button>
            {!this.flago || (
              <p class="tiptxt">测试1数据已复制成功，请粘贴试一试。</p>
            )}
          </div>
          <div class="right">
            <a-textarea
              v-model={this.textt}
              class="rightinput"
              placeholder="Autosize height with minimum and maximum number of lines"
              auto-size={{ minRows: 10, maxRows: 10 }}
            />
            <a-button
              type="primary"
              onClick={() => {
                this.copyXml("rightinput", false);
              }}
            >
              一键复制
            </a-button>
            {!this.flagt || (
              <p class="tiptxt">测试2数据已复制成功，请粘贴试一试。</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
