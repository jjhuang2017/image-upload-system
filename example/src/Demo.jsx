import React, { Component } from 'react';
import 'cropperjs/dist/cropper.css';
import Cropper from '../../src/react-cropper';
import $ from 'jquery';
import 'cropper/dist/cropper.js';

const src = 'img/Koala.jpg';

export default class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      src,
      cropResult: null
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.uploadLargeImageURL = this.uploadLargeImageURL.bind(this);
    this.uploadMediumImageURL = this.uploadMediumImageURL.bind(this);
    this.uploadSmallImageURL = this.uploadSmallImageURL.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    });
  }

  uploadLargeImageURL(){   
    this.cropper.getCroppedCanvas().toBlob(function (blob){
    var formData = new FormData();
    formData.append('imageupload', blob);
  
      $.ajax({
          type: 'POST',
          url: 'http://localhost:3003/Image-Upload-Service/large',      
          data: formData,
          crossDomain: true,
          cache: false,
          contentType: false,
          processData: false,
          success: function(resp){
            $(".image_url").empty();
            $(".image_url").html(resp);
          }
      });
    });
  }

  uploadMediumImageURL(){
    $(".image_url").empty();
    this.cropper.getCroppedCanvas().toBlob(function (blob){
      var formData = new FormData();
      formData.append('imageupload', blob);
  
      $.ajax({
          type: 'POST',
          url: 'http://localhost:3003/Image-Upload-Service/medium',      
          data: formData,
          crossDomain: true,
          cache: false,
          contentType: false,
          processData: false,
          success: function(resp){
            $(".image_url").html(resp);
          }
      });
    });
  }

  uploadSmallImageURL(){
    $(".image_url").empty();
    this.cropper.getCroppedCanvas().toBlob(function (blob){
      var formData = new FormData();
      formData.append('imageupload', blob);
  
      $.ajax({
          type: 'POST',
          url: 'http://localhost:3003/Image-Upload-Service/small',      
          data: formData,
          crossDomain: true,
          cache: false,
          contentType: false,
          processData: false,
          success: function(resp){
            $(".image_url").html(resp);
          }
      });
    });
  }

  render() {
    return (
      <div>
        <div>
          <h1>圖片上傳系統 Image Upload System</h1>
        </div>
        <div className="box" style={{ width: '50%', float: 'left' }}>
          <h2><span>Step 1. 選擇圖片進行裁剪</span></h2>
          <div>
            <input type="file" onChange={this.onChange} style={{float: 'left' }}/>
          </div>
          <div>
            <button onClick={this.cropImage} style={{ float: 'left' }}>圖片裁剪 (crop)</button>
          </div>
          <br/>
          <br/>
          <Cropper
            style={{ height: 400, width: '100%' }}
            aspectRatio={1 / 1}
            preview=".img-preview"
            guides={false}
            src={this.state.src}
            ref={cropper => { this.cropper = cropper; }}
          />
        </div>

        <div>
          <div className="box" style={{ width: '50%', float: 'right' }}>
            <h2><span>圖片剪裁結果</span></h2>
            <br/>
            <br/>
            <img style={{ height: 400, width: '100%' }} src={this.state.cropResult} />
          </div>
        </div>

        <div>
          <div className="box" style={{ width: '100%', float: 'right' }}>
            <h2><span>Step 2. 上傳圖片並取得圖片縮址</span></h2>
            <button onClick={this.uploadLargeImageURL} style={{ float: 'left' }}>大圖示 (large)</button>
            <button onClick={this.uploadMediumImageURL} style={{ float: 'left' }}>中圖示 (medium)</button>
            <button onClick={this.uploadSmallImageURL} style={{ float: 'left' }}>小圖示 (small)</button>
            <br/>
            <br/>
            <div className="image_url"></div>
          </div>
        </div>

      </div>
    );
  }
}
