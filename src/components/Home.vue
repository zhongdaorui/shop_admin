<template>
  <el-container>
    <el-header>
      <div class="left">
        <img src="../assets/heima.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <div class="right">
        <el-button class="button" type="info">退出</el-button>
      </div>

    </el-header>
    <el-container>
      <el-aside :width="isCollapse? '64px':'200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu router active-text-color="#409EFF" :default-active="activePath" :collapse="isCollapse" unique-opened
          :collapse-transition="false" background-color="#333744" text-color="#fff">
          <el-submenu v-for="item in menuList" :index="item.id+''" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span class="icon">{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id"
              @click="saveactive('/' + subItem.path)">
              <i class="el-icon-menu"></i>
              <span>{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        menuList: [],
        iconsObj: {
          '125': 'iconfont icon-user',
          '103': 'iconfont icon-tijikongjian',
          '101': 'iconfont icon-shangpin',
          '102': 'iconfont icon-danju',
          '145': 'iconfont icon-baobiao'
        },
        isCollapse: true,
        activePath: ''


      };
    },
    async mounted() {
      const { data: res } = await this.$http.get('menus')
      this.menuList = res.data

    },
    created() {
      this.activePath = window.sessionStorage.getItem('activePath')
    },

    methods: {
      toggleCollapse() {
        this.isCollapse = !this.isCollapse
      },
      saveactive(activePath) {
        window.sessionStorage.setItem('activePath', activePath)
        this.activePath = activePath
      }
    }
  }
</script>


<style lang="stylus" scoped>
  .el-container >>> .iconfont 
    margin-right 10px
  .el-container >>> .el-menu 
    border-right 0 
    margin-right 0 
  .el-container 
    height 100%
    .el-header 
      background-color #373d41
      display flex 
      align-items center 
      padding-left 0 
      justify-content space-between 
      .left 
        display flex
        align-items center
        >span 
          font-size 20px 
          margin-left 15px 
    .el-aside 
      background-color: #333744;
      .toggle-button 
        height 32px
        width 100% 
        background-color #4a5064 
        text-align center 
        line-height 32px 
        font-size 15px 
        color #fff 
    .el-main 
      background-color: #eaedf1;
</style>