<template lang="pug">
.design-task--webcam
  p.design-task--description(v-if="task && task.description") {{ task.description }}

  splash-messages(v-if="!isAuthenticated" v-bind:messages="[{type:'success',text:'Please login to participate!'}]")
  
  .responses
    ul
      li(v-for="(response, index) in responses" v-bind:key="index")
        .response-preview
          video(class="video-js" controls preload="auto")
            source(v-bind:src="getLocation(response.response.location, 'mp4')" type="video/mp4")
            source(v-bind:src="getLocation(response.response.location, 'fmp4')" type="video/fmp4")
            source(v-bind:src="getLocation(response.response.location, 'webm')" type="video/webm")
          .response-meta
            h5 {{ response.response.text || 'No caption' }}
            p Uploaded by {{ response._user.profile.name }}
  
  splash-messages(v-bind:messages="splashmessages")
  
  .btn.btn-primary.full-width(v-if="isAuthenticated && !camera && (splashmessages.length === 0)" @click="loadCameraStream") Record from webcam

  .response-composer(v-show="camera && splashmessages.length === 0")
    .webcam-wrapper(v-if="isAuthenticated && !newResponse.location")
      video#video(ref="video" showcontrols="false" autoplay muted)
    
    .webcam-controls(v-if="isAuthenticated && !newResponse.location")
      //- p {{ recorder ? recorder.state : 'unknown' }}
      .btn.btn-danger(v-if="isRecording" @click="stopRecording") Stop Recording
      .btn.btn-success(v-if="isReady" @click="startRecording") Start Recording
    
    div(v-show="isAuthenticated && newResponse.location")
      .response-preview
        .webcam-wrapper
          video#video-preview(ref="videopreview" controls="true" autoplay="true" loop="true" v-bind:src="newResponse.location")
        textarea-autosize(name="composer-textarea" ref="textarea" rows="1" @keydown.native.enter.prevent.stop="submitResponse" placeholder="Caption video..." v-model="newResponseText" v-bind:min-height="49" v-bind:max-height="200")
        .clearfix

      .response-controls
        .btn.btn-danger.pull-left(@click="clearResponse") Delete
        //- .btn.btn-primary(@click="saveToDisk") Download
        .btn.btn-success.pull-right(@click="submitResponse") Submit video
        .clearfix

</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import { mapGetters } from 'vuex'
import API from '@/api'
import _get from 'lodash/get'
import MobileDetect from 'mobile-detect'

import VideoMixin from '@/mixins/VideoMixin'
import DesignTask from '@/mixins/DesignTask'

import VueTextareaAutosize from 'vue-textarea-autosize'

const RecordRTC = require('recordrtc')

export default {
  name: 'webcam',
  mixins: [
    VideoMixin,
    DesignTask
  ],
  components: {
    VueTextareaAutosize
  },
  data () {
    return {
      splashmessages: [],
      bitrate: 200000,
      newResponseText: '',
      recorder: undefined,
      camera: undefined,
      responses: [],
      newResponse: {
        location: undefined,
        text: undefined
      }
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated']),
    showControls () {
      const readyStates = ['stopped']
      return readyStates.indexOf(_get(this.recorder, 'state', 'unknown')) !== -1
    },
    isRecording () {
      return _get(this.recorder, 'state', 'unknown') === 'recording'
    },
    isReady () {
      const readyStates = ['inactive', 'stopped']
      return readyStates.indexOf(_get(this.recorder, 'state', 'unknown')) !== -1
    },
    isMobile () {
      const md = new MobileDetect(window.navigator.userAgent)
      return md.mobile()
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.recorder) this.recorder.stopRecording()
    if (this.camera) this.camera.stop()
    next()
  },
  beforeDestroy () {
    if (this.recorder) this.recorder.stopRecording()
    if (this.camera) this.camera.stop()
  },
  mounted () {
    this.fetchResponses()

    if (this.isMobile) {
      this.splashmessages = [{ text: 'Mobile device recording not yet supported!', type: 'error' }]
    }
  },
  methods: {
    fetchResponses () {
      API.task.fetchResponses(
        'webcam',
        this.$route.params.task_id,
        (response) => {
          this.$log(response)
          this.responses = response.data
        },
        (error) => {
          this.$log(error)
        }
      )
    },
    submitResponse () {
      this.newResponse.text = this.newResponseText
      API.task.submitResponse(
        'webcam',
        this.$route.params.task_id,
        { response: this.newResponse },
        (response) => {
          this.$log(response)
          this.responses.push(response.data)
          this.newResponse.text = undefined
          this.newResponse.location = undefined
          this.fetchResponses()
          this.loadCameraStream()
        },
        (error) => {
          this.$log(error)
        }
      )
    },
    clearResponse () {
      this.newResponse.text = undefined
      this.newResponse.location = undefined
      
      this.loadCameraStream()
    },
    saveToDisk () {
      this.recorder.save()      
    },
    uploadVideo (video) {
      var formData = new FormData()
      formData.append('upload', video)

      API.upload.upload(formData,
        (response) => {
          this.newResponse.location = response.data.upload.location
        },
        (error) => {
          this.$log(error)
        }
      )
    },
    stopRecordingCallback () {
      const video = this.recorder.getBlob()
      this.uploadVideo(video)
    },
    stopRecording () {
      if (this.camera) this.camera.stop()
      if (this.recorder) this.recorder.stopRecording(this.stopRecordingCallback)
    },
    startRecording () {
      this.recorder.startRecording()
    },
    captureCamera (callback) {
      if (this.isMobile) return
      if (this.camera) callback(this.camera)
      
      navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((camera) => {
        callback(camera)
      }).catch(function (error) {
        this.$log('Unable to capture your camera. Please check console logs.')
        this.$error(error)
      })
    },
    loadCameraStream () {
      if (this.isMobile) return

      navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((camera) => {
        this.camera = camera
        this.$refs.video.srcObject = this.camera
        this.$refs.video.play()
        this.$refs.video.muted = true
        this.recorder = RecordRTC(camera, {
          type: 'video',
          mimeType: 'video/webm\;codecs=vp9',
          bitsPerSecond: this.bitrate
        })
        this.recorder.camera = camera
        this.splashmessages = []
      }).catch((error) => {
        this.splashmessages = [{ text: 'Could not access your camera, please check the connection', type: 'error' }]
        this.$log('Camera unavailable!')
        this.$error(error)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

@import '~stylus/shared'

.design-task--webcam
  background-color white
  padding 25px
  .response-composer
    padding-top 20px
    position relative  
  .webcam-wrapper
    height 0
    margin-bottom 20px
    padding-bottom 75%
    position relative
    width 100%
    video
      background-color $color-lightest-grey
      border none
      position absolute
      width 100%
      height 100%
      left 0
      top 0
  .webcam-controls
    margin 0px -10px -20px -10px
    .btn
      display block
      margin 0 10px 20px 10px
      max-width 100%
  .response-preview
    overflow hidden
    position relative
    .webcam-wrapper
      height 0
      margin-bottom 0
      padding-bottom 75%
      position relative
      width 100%
      video
        background-color $color-lightest-grey
        border none
        position absolute
        width 100%
        height 100%
        left 0
        top 0
    textarea
      border-box()
      border $color-border 1px solid
      font-size 1em
      outline 0
      margin-top 10px
      padding 15px
      resize none
      width 100%
  .response-controls
    .btn
      float left
      margin 20px 10px 0 0

.responses
  margin 20px 0
  ul
    cleanlist()
    li
      cleanlist()
      &:not(:first-child)
        border-top $color-border 1px solid
        margin-top 20px
        padding 20px 0
      .response-preview
        height 160px
        overflow hidden
        padding-left 210px
        position relative
        .response-meta
          border-box()
          background-color transparent
          border none
          font-size 1em
          min-height 150px
          outline 0
          padding 5px 10px
          width 100%
          h5
            reset()
            color $color-text-darkest-grey
            font-size 1.1em
            margin-top 10px
          p
            reset()
            color $color-text-grey
            font-size 1em
            margin-top 10px
        video
          height 160px
          position absolute
          left 0
          top 0
          width 200px
        @media(max-width: 458px)
          height auto
          padding-left 0
          .response-meta
            min-height 0
          video
            position relative
            width 100%
</style>

