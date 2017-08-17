# 圖片上傳系統

本系統目標為提供用戶上傳圖片並進行圖片裁剪(支援JPG、PNG)，可以將圖片剪裁結果以網址方式來表示不同尺寸的圖片。

## 系統功能與技術說明

* 前端系統：
前端統採用React.js開發框架，提供高維護性與效能性的網頁介面。

* 後端系統：
後端系統採用node.js與Express來開發RESTful API服務，提供上傳圖片剪裁結果與回傳圖片縮址功能。(系統專案[image-processing-service](https://github.com/jjhuang2017/image-processing-service))

## 系統安裝說明

* step1：安裝[node.js](https://nodejs.org/en/)

* step2：建立目錄並切換到建立完成的目錄
```shell
$ mkdir myapp
$ cd myapp
```
* step3：安裝位於專案的套件(package.json)
```shell
$ npm install
```

* step4：啟動位於專案的程式
```shell
$ npm start
```

* step5：圖片上傳系統的網頁位址
`http://localhost:3000`