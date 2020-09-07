import { Component, Vue } from "vue-property-decorator";
import "@/components/videoPage/videoPhoto.scss";
// video.js
import Video from "video.js";
import "video.js/dist/video-js.min.css";

@Component
export default class VideoPhoto extends Vue {
  name = "VideoPhoto";

  imgUrl = "";
  player: any = null;
  newfile: any = null;
  baseUrl = "";

  mounted() {
    this.setvideo();
  }

  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  }
  // 初始化video
  setvideo() {
    const options: any = {
      controls: true, // 是否显示底部控制栏
      preload: "auto", // 加载<video>标签后是否加载视频
      autoplay: false,
      // playbackRates: [0.5, 1, 1.5, 2],// 倍速播放
      fluid: false, // 自适应宽高
      width: "100%",
      height: "100%",
      controlBar: {
        children: {
          controlBar: {
            fullscreenToggle: true
          }
        }
      }
    };
    this.player = Video(this.$refs.videoPlayer, options, function onPlayerReady(
      this: any
    ) {
      this.on("loadeddata", function(this: any) {
        this.durationtime = this.duration();
      });
    });
    this.player.on("ended", function() {
      console.log("播放结束了");
    });
    this.player.on("error", function() {
      // this.$message.warning('异常，无法播放');
    });
  }

  // 截取视频第一张图
  findvideocover() {
    // 当页面中没有video元素，通过url截取时
    // const video = document.createElement('video');
    // video.src = this.vedioUrl;
    // video.currentTime = 1;
    // const self = this;
    // loadeddata是当前帧的数据加载完成且还没有足够的数据播放视频 / 音频（audio / video）的下一帧时触发
    // video.addEventListener("loadeddata", function(){
    // canvas方法
    // });
    // 当页面中有video元素时
    const video: any = this.$refs.videoPlayer;
    const canvas: any = document.createElement("canvas");
    canvas.width = video.offsetWidth;
    canvas.height = video.offsetWidth;
    console.log(video.offsetWidth, video.offsetHeight);
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.width);
    this.baseUrl = canvas.toDataURL("image/png");
    this.newfile = this.dataURLtoFile(this.baseUrl, "base64.png");
    this.uploadImgToBase64(this.newfile).then((data: any) => {
      this.imgUrl = data.result;
      // 上传图片地址方法
      // self.uploadimage();
    });
  }
  // 用于图片上传
  dataURLtoFile(dataurl: any, filename: any) {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    // 转换成file对象
    return new File([u8arr], filename, { type: mime });
  }
  uploadImgToBase64(file: any) {
    // 核心方法，将图片转成base64字符串形式
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        // 图片转base64完成后返回reader对象
        resolve(reader);
      };
      reader.onerror = reject;
    });
  }

  render() {
    return (
      <div class="photocont">
        <p
          class="quilltitle"
          style="font-size:18px;color:#333;line-height:60px;"
        >
          截取视频
        </p>
        <p class="quilltitle" style="line-height:40px;">
          截取视频中的某一帧生成图片
        </p>
        <div class="videocont">
          <p class="left">
            <video
              ref="videoPlayer"
              class="video-js"
              style="width:100%;height:100%;"
            >
              <source
                src={require("@/assets/testvideo.mp4")}
                type="video/mp4"
              />
            </video>
          </p>
          <p class="right">
            {!this.imgUrl || <img src={this.imgUrl} alt="" class="icon" />}
          </p>
        </div>
        <p class="btn">
          <a-button type="primary" onClick={this.findvideocover}>
            截取视频
          </a-button>
        </p>
      </div>
    );
  }
}
