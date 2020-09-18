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
    this.disAbleQucik();
  }

  disAbleQucik() {
    const that = this.player;
    let isMousedown = false;
    let isDrag = false;
    let curTime = 0;
    let maxTime = 0;
    const progressOne = document.getElementsByClassName(
      "vjs-progress-holder"
    )[0];
    const progressTwo = document.getElementsByClassName(
      "vjs-progress-control"
    )[0];
    function mouseOverFun() {
      isDrag = true;
    }
    function down() {
      curTime = that.currentTime();
      isMousedown = true;
      progressTwo.addEventListener("mousemove", mouseOverFun);
      if (curTime > maxTime) {
        that.currentTime(maxTime);
        // this.$message.warning("不能节选课程");
      }
    }
    function up() {
      isDrag = false;
      curTime = that.currentTime();
      if (curTime > maxTime) {
        that.currentTime(maxTime);
      }
      progressTwo.removeEventListener("mousemove", mouseOverFun, false);
    }
    function timego() {
      if (that.currentTime() > maxTime && !isMousedown && !isDrag) {
        maxTime = that.currentTime();
        // console.log('max', maxTime);
      }
    }
    // that.on("pause", function() {});
    that.on("play", function() {
      isMousedown = false;
    });

    progressOne.addEventListener("mousedown", down);
    progressOne.addEventListener("mouseup", up);
    progressTwo.addEventListener("mousedown", down);
    progressTwo.addEventListener("mouseup", up);
    that.on("timeupdate", timego);
  }

  render() {
    return (
      <div class="photocont">
        <p
          class="quilltitle"
          style="font-size:18px;color:#333;line-height:60px;"
        >
          禁止快进
        </p>
        <p class="quilltitle" style="line-height:40px;">
          禁止视频进行快进，允许视频后退
        </p>
        <div class="videofastc" style="">
          <video
            ref="videoPlayer"
            class="video-js"
            style="width:100%;height:100%;"
          >
            <source src={require("@/assets/testvideo.mp4")} type="video/mp4" />
          </video>
        </div>
      </div>
    );
  }
}
