import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Quill from "quill";
import ImageResize from "@taoqf/quill-image-resize-module";
Quill.register("modules/imageResize", ImageResize);

@Component
export default class TsQuill extends Vue {
  name = "TsQuill";

  @Prop() readonly value!: {
    type: string;
    required: false;
    default: "";
  };

  Quill: any = undefined;
  currentValue = "";
  options = {
    theme: "snow",
    bounds: document.body,
    debug: "warn",
    modules: {
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["clean"],
          ["link", "image"]
        ],
        handlers: {
          image: function(value: any) {
            if (value) {
              // 触发input框选择图片文件
              const tiinput: any = document.querySelector(".conti input");
              tiinput.click();
            } else {
              // this.Quill.format("image", false);
            }
          }
        }
      },
      imageResize: {
        displaySize: true,
        // Toolbar
        modules: ["Resize", "DisplaySize"]
      }
    },
    placeholder: "书写你的内容",
    readOnly: false
  };

  @Watch("value", { immediate: true })
  valueChange(val: any) {
    if (val !== this.currentValue) {
      this.currentValue = val;
      // 尝试更新
      if (this.Quill) {
        this.Quill.pasteHTML(this.value);
      }
    }
  }

  mounted() {
    this.init();
  }

  init() {
    const editor: any = this.$refs.editor;
    // 初始化编辑器
    this.Quill = new Quill(editor, this.options);
    // 默认值
    this.Quill.pasteHTML(this.currentValue);
    // 绑定事件
    this.Quill.on("text-change", () => {
      const html = editor.children[0].innerHTML;
      const text = this.Quill.getText();
      const quill = this.Quill;
      // 更新内部的值
      this.currentValue = html;
      // 发出事件 v-model
      this.$emit("input", html);
      // 发出事件
      this.$emit("change", { html, text, quill });
    });
    // 将一些 quill 自带的事件传递出去
    this.Quill.on("text-change", (delta: any, oldDelta: any, source: any) => {
      this.$emit("text-change", delta, oldDelta, source);
    });
    this.Quill.on(
      "selection-change",
      (range: any, oldRange: any, source: any) => {
        this.$emit("selection-change", range, oldRange, source);
      }
    );
    this.Quill.on("editor-change", (eventName: any, ...args: any) => {
      this.$emit("editor-change", eventName, ...args);
    });
  }

  render() {
    return <div ref="editor"></div>;
  }
}
