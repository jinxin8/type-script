import { Component } from "vue-property-decorator";
import { HeightMixin } from "@/layout/mixins/getHeight";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

@Component({
  components: {
    "ts-quill": () => import("@/components/quillPage")
  }
})
export default class QuillPage extends HeightMixin {
  name = "QuillPage";

  contenttxt = "";
  TiLength = 0;

  // 上传正文图片的操作
  beforequill(file: any) {
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isLt2M) {
      this.$message.error("图片大小不能超过 1MB!");
    }
    return isLt2M;
  }
  // 编辑器
  quillChange(info: any) {
    // uploading 正在上传   done 上传成功   error 上传失败
    if (info.file.status === "done") {
      const quill: any = this.$refs.myQuillEditor;
      // 如果上传成功
      if (info.file.response.code === "0000") {
        // 获取光标所在位置
        const length = quill.getSelection().index;
        // 插入图片  response.data.url为服务器返回的图片地址
        quill.insertEmbed(length, "image", info.file.response.data.url);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
    } else if (info.file.status === "error") {
      this.$message.error("图片插入失败");
    }
  }
  textChangeHandler(e: any) {
    console.log(e);
    e.quill.deleteText(2000, 4);
    if (this.contenttxt === "") {
      this.TiLength = 0;
    } else {
      this.TiLength = e.quill.getLength() - 1;
    }
  }

  render() {
    return (
      <div
        class="quillcon"
        style={`height:${this.getHeight - 170}px;padding:0 30px;`}
      >
        <p
          class="quilltitle"
          style="font-size:18px;color:#333;text-align:center;line-height:60px;"
        >
          富文本编辑器
        </p>
        <p class="quilltitle" style="line-height:40px;text-align:center;">
          富文本编辑器：上传图片、显示剩余字数
        </p>
        <a-upload
          class="conti"
          ref="quillUpload"
          action=""
          accept=".jpg, .jpeg, .png, .gip"
          showUploadList={false}
          beforeUpload={this.beforequill}
          onChange={this.quillChange}
          style="height: 0"
        ></a-upload>
        <ts-quill
          v-model={this.contenttxt}
          ref="myQuillEditor"
          onChange={($event: any) => this.textChangeHandler($event)}
        />
        <p class="quillNumber" style="text-align:right;padding-right:20px;">
          {this.TiLength}/2000
        </p>
      </div>
    );
  }
}
