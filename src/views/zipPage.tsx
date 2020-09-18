import { Component, Vue } from "vue-property-decorator";

@Component
export default class ZipPage extends Vue {
  name = "ZipPage";

  // downloadAndZip(urls) {
  //   const download = url => {
  //     url = `/collegeweb/dfsfile/download?dfsfilePath=${url.documentUrl}&filename=${url.documentName}`;
  //     return fetch(url).then(resp => resp.blob());
  //   };
  //   const downloadByGroup = urls => {
  //     return Promise.map(urls, async url => {
  //       return await download(url);
  //     });
  //   };
  //   const exportZip = blobs => {
  //     const zip = JsZip();
  //     blobs.forEach((blob, i) => {
  //       zip.file(`${urls[i].documentName}.${urls[i].documentType}`, blob);
  //     });
  //     zip.generateAsync({ type: 'blob' }).then(zipFile => {
  //       // const currentDate = new Date().getTime();
  //       const fileName = '公开文档.zip';
  //       return FileSaver.saveAs(zipFile, fileName);
  //     });
  //   };
  //   return downloadByGroup(urls).then(exportZip);
  // },
  render() {
    return (
      <div>
        <p
          class="quilltitle"
          style="font-size:18px;color:#333;text-align:center;line-height:60px;"
        >
          文件打包
        </p>
        <p class="quilltitle" style="line-height:40px;text-align:center;">
          下载多个文件时为避免多次选择下载地址，将下载文件进行打包
        </p>
      </div>
    );
  }
}
