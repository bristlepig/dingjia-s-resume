<template>
<div id="app">
  <div class="resume">
    <div class="left">
      <Brief :selfMsg="selfMsg"></Brief>
      <ContextList title="CONTACT" :icon="require('@/assets/title-contact.png')">
        <ListItemInfo :title="selfMsg.contact.phone" :image="require('@/assets/contact-phone.png')" slot="listItem">
        </ListItemInfo>
        <ListItemInfo :title="selfMsg.contact.email" :image="require('@/assets/contact-mail.png')" slot="listItem">
        </ListItemInfo>
        <ListItemInfo :title="selfMsg.contact.wechat" :image="require('@/assets/social-wechat.png')" slot="listItem">
        </ListItemInfo>
        <ListItemInfo :title="selfMsg.contact.qq" :image="require('@/assets/social-qq.png')" slot="listItem">
        </ListItemInfo>
      </ContextList>
      <ContextList title="SOCIAL" :icon="require('@/assets/title-contact.png')">
        <ListItemInfo :title="selfMsg.social.github" :image="require('@/assets/social-github.png')" slot="listItem">
        </ListItemInfo>
        <ListItemInfo :title="selfMsg.social.website" :image="require('@/assets/social-dribbble.png')" slot="listItem">
        </ListItemInfo>
        <ListItemInfo :title="selfMsg.social.iconfont" :image="require('@/assets/social-behance.png')" slot="listItem">
        </ListItemInfo>
        <!-- <ListItemInfo :title="" :image="require('@/assets/social-uicn.png')" slot="listItem">
        </ListItemInfo> -->
      </ContextList>
    </div>
    <div class="right">
      <ContextList title="About me">
        <ListItemAbout slot="listItem" :aboutContent="aboutContent"></ListItemAbout>
      </ContextList>
      <ContextList :title="'Skill'">
        <template v-for="(item,index) in detail.skill">
            <ListItemSkill slot="listItem" :title="item.key" :percent="item.val"></ListItemSkill>
        </template>
      </ContextList>
      <ContextList title="Education">
        <ListItemEducation slot="listItem" :school="detail.education.school" :major="detail.education.major" :date="detail.education.time"></ListItemEducation>
      </ContextList>
      <ContextList title="Working Experience">
        <ListItemExperience slot="listItem" :company="detail.workingExperience.company"
                                            :job="detail.workingExperience.position"
                                            :date="detail.workingExperience.date"
                                            :content="detail.workingExperience.content">
        </ListItemExperience>
      </ContextList>
      <ContextList title="Projects">
        <template v-for="(item,index) in detail.porject">
          <ListItemExperience slot="listItem" :company="item.name"
                                              :date="item.date"
                                              :content="item.content">
          </ListItemExperience>
        </template>
      </ContextList>
    </div>
  </div>
  <div class="guide">
    <ul>
      <li>
        <img src="./assets/guide_click_left.png" height="60" width="60" alt="">
        <div class="desc">
          <h3>Click On Content</h3>
          <p>To edit text or image</p>
        </div>
      </li>
      <li>
        <img src="./assets/guide_click_right.png" height="60" width="60" alt="">
        <div class="desc">
          <h3>Right Click On Item</h3>
          <p>To delete item</p>
        </div>
      </li>
      <li>
        <img src="./assets/guide_add.png" height="60" width="60" alt="">
        <div class="desc">
          <h3>Click Add Button</h3>
          <p>To add item</p>
        </div>
      </li>
      <li>
        <img src="./assets/guide_sai.png" alt="">
        <div class="desc">
          <h3>Click Save Button</h3>
          <p>To download resume as image</p>
        </div>
      </li>
    </ul>
  </div>
  <button class="sap" @click="saveAsImage">Save as Image</button>
  <div class="footer">
    <a href="https://github.com/luosijie/vue-resume" target="_blank">
        <img src="./assets/social-github.png" height="36" width="36" alt="">
      </a> vue-resume designed by <a href="https://github.com/luosijie">Jesse Luo</a>
  </div>
</div>
</template>

<script>
import ContextList from '@/components/context-list'
import ListItemAbout from '@/components/list-item-about'
import ListItemSkill from '@/components/list-item-skill'
import ListItemEducation from '@/components/list-item-education'
import ListItemExperience from '@/components/list-item-experience'
import ListItemInfo from '@/components/list-item-info'
import html2canvas from '@/assets/js/html2canvas.js'
import FileSaver from 'file-saver'
import Brief from '@/components/brief'

const ERR_OK = 0
export default {
  name: 'app',
  components: {
    ContextList,
    ListItemAbout,
    ListItemSkill,
    ListItemEducation,
    ListItemExperience,
    ListItemInfo,
    Brief
  },
  data () {
    return {
      selfMsg: {

      },
      detail: {

      }
    }
  },
  computed: {
    aboutContent () {
      return this.detail.about
    }
    // selfMsg () {
    //   return this.selfMsg
    // }
  },
  methods: {
    saveAsImage: function () {
      let resume = document.querySelector('.resume')
      html2canvas(resume).then(function (canvas) {
        canvas.toBlob(function (blob) {
          FileSaver.saveAs(blob, 'Resume.png')
        })
      })
    }
  },
  created () {
    this.$http.get('/api/detail').then((res) => {
      let detailData = res.body
      if (detailData.errno === ERR_OK) {
        this.detail = detailData.data
        console.log(this.detail)
      }
    })
    this.$http.get('/api/selfMsg').then((res) => {
      let selfMsgData = res.body
      if (selfMsgData.errno === ERR_OK) {
        this.selfMsg = selfMsgData.data
        console.log(this.selfMsg)
      }
    })
  }
}
</script>

<style lang="less">
body {
    padding: 0;
    margin: 0;
}
ul {
    padding: 0;
    margin: 0;
    li {
        list-style: none;
    }
}
p {
    margin: 0 0 12px;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 0;
    .resume {
        width: 1247px;
        border: 1px solid #dad8d7;
        background-color: white;
        overflow: hidden;
        .left {
            width: 380px;
            height: 100%;
            box-sizing: border-box;
            float: left;
            background-color: #fdfefe;
            .brief {
                height: 630px;
                background-color: #f6f7f7;
                .avatar {
                    height: 500px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    & > .img {
                        margin-bottom: 45px;
                    }
                    .name {
                        font-size: 32px;
                        margin-bottom: 14px;
                    }
                    .job {
                        font-size: 24px;
                        color: #555;
                        margin-bottom: 16px;
                    }
                    .location {
                        display: flex;
                        align-itmes: center;
                        .location-name {
                            font-size: 20px;
                            font-weight: bold;
                            margin-left: 10px;
                        }
                    }
                }
                .info {
                    height: 128px;
                    ul {
                        height: 100%;
                        display: flex;
                        border-top: 1px solid #dad8d7;
                        border-bottom: 1px solid #dad8d7;
                        li:not(:last-child) {
                            border-right: 1px solid #dad8d7;
                        }
                        li {
                            width: 33.3333333%;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            text-align: center;
                            .value {
                                margin-bottom: 10px;
                                font-size: 24px;
                                font-weight: bold;
                            }
                            .key {
                                font-size: 16px;
                                font-weight: bold;
                                color: #555;
                            }
                        }
                    }
                }
            }
        }
        .right {
            box-sizing: border-box;
            width: 867px;
            float: left;
            padding: 50px 40px;
            p {
                font-size: 20px;
                line-height: 32px;
                color: #555;
                text-align: justify;
                margin-bottom:30px;
                word-break: break-all;
            }
        }

    }
    button.sap {
        position: absolute;
        top: 65px;
        left: 50%;
        margin-left: 478px;
        background-color: white;
        border: 1px solid #dad8d7;
        cursor: pointer;
        padding: 5px 8px;
        border-radius: 4px;
        &:hover {
            background-color: #f8f8f8;
        }
    }
    .guide {
        border: 1px solid #dad8d7;
        width: 1247px;
        margin-top: 15px;
        height: 120px;
        ul {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            li {
                display: flex;
                align-items: center;
                img {
                    margin: 0 10px;
                }
                h3 {
                    margin: 0 0 6px;
                }
                p {
                    margin: 0;
                    font-size: 16px;
                }
            }
        }
    }
    .footer {
        line-height: 50px;
        a {
            text-decoration: none;
            color: #4aa74f;
            &:first-child {
                display: block;
                text-align: center;
                line-height: 0;
                margin-top: 15px;
            }
        }
    }
}
</style>
