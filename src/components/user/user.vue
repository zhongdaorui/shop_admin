<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="queryinfo.query" clearable @clear="getUserlist">
            <el-button slot="append" icon="el-icon-search" @click="getUserlist"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 列表区域 -->
      <el-table :data="userslist" stripe border size="small">
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column prop="role_name" label="角色" width="180">
        </el-table-column>
        <el-table-column prop="mg_state" label="状态" width="180">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改 -->
            <el-button type="primary" icon="el-icon-edit" size='mini' @click="showEditdata(scope.row.id)"></el-button>
            <!-- 删除 -->
            <el-button type="danger" icon="el-icon-delete" size='mini' @click="deleteuser(scope.row.id)"></el-button>
            <!-- 分配角色 -->
            <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size='mini'></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum" :page-sizes="[1, 2, 3, 4]" :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <!-- 添加用户 -->
      <el-dialog title="添加用户" :visible.sync="dialogVisible" width="50%"  @close="addDialogClosed">
          <el-form ref="addformref" :rules="addFormrules" :model="addForm" label-width="100px">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="addForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="addForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="addForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="mobile">
              <el-input v-model="addForm.mobile"></el-input>
            </el-form-item>
          </el-form>  
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible=false" >取 消</el-button>
            <el-button  type="primary" @click="addUser">确 定</el-button>
          </span>
      </el-dialog>
      <!-- 修改用户 -->
      <el-dialog title="修改用户" :visible.sync="dialogVisiblegai" width="50%"  @close="editDialogClosed">
        <el-form ref="updateformref" :rules="editFormrules" :model="editForm" label-width="100px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>  
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisiblegai=false" >取 消</el-button>
          <el-button  type="primary" @click="updateUser">确 定</el-button>
        </span>
    </el-dialog>
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }

    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }

      return {
        //输入框的值
        input: "",
        userslist: [],
        queryinfo: {
          query: '',
          pagenum: 1,
          pagesize: 1
        },
        total: 1,
        //增加组件
        dialogVisible: false,
        //修改组件
        dialogVisiblegai:false,
        addForm: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        editForm:{},
        editFormrules:{
          email:[
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' }
          ],
          mobile:[
              {required: true, message: '请输入用户邮箱', trigger: 'blur' },
              {validator:  checkMobile, trigger: 'blur'}
          ]


        },
        addFormrules:{
          username:[
            { required: true, message: '请输入用户名称', trigger: 'blur' },
            { min: 3, max: 8, message: '长度在 3 到 8个字符', trigger: 'blur' }
          ],
          password:[
              { required: true, message: '请输入用户密码', trigger: 'blur' },
              { min: 3, max: 8, message: '长度在 3 到 8个字符', trigger: 'blur' }
          ],
          email:[
              { required: true, message: '请输入用户邮箱', trigger: 'blur' },
              { validator: checkEmail, trigger: 'blur' }
          ],
          mobile:[
              {required: true, message: '请输入用户邮箱', trigger: 'blur' },
              {validator:  checkMobile, trigger: 'blur'}
          ]
        }
       

      };
    },
    mounted() {
      this.getUserlist()
    },
    methods: {
      // 更改每页数量
      handleSizeChange(newpagesize) {
        this.queryinfo.pagesize = newpagesize;
        this.getUserlist()
      },
      // 更改当前页
      handleCurrentChange(newpagenum) {
        this.queryinfo.pagenum = newpagenum
        this.getUserlist()
      },
      // 获取用户列表
      async getUserlist() {
        const { data: res } = await this.$http.get('users', { params: this.queryinfo });

        if (res.meta.status !== 200) {
          return this.$message.error('获取用户列表失败！')
        }
        this.userslist = res.data.users
        this.total = res.data.total

      },
      //更改状态
      async userStateChanged(status) {
        const { data: res } = await this.$http.put(`users/${status.id}/state/${status.mg_status}`)
        if (res.meta.status !== 200) {
          // 这一步没有改变数据库，只是让页面中按钮的状态保持同步
          status.mg_state = !status.mg_state
          return this.$message.error('更新用户状态失败！')
        }
        this.$message.success('更新用户状态成功！')
      },
      //增加用户的表单重置
      addDialogClosed(){
        this.$refs.addDialogClosed.resetFields()
      },
      //增加用户
     
      addUser(){
        //点击确定按钮，添加新用户
      //调用validate进行表单验证
      this.$refs.addformref.validate( async valid => {
          if(!valid) return this.$message.error("请填写完整用户信息");
          //发送请求完成添加用户的操作
          const {data:res} = await this.$http.post("users",this.addForm)
          //判断如果添加失败，就做提示
          if (res.meta.status !== 201)
              return this.$message.error('添加用户失败')
          //添加成功的提示
          this.$message.success("添加用户成功")
          //关闭对话框
          this.dialogVisible = false
          //重新请求最新的数据
          this.getUserlist()
      }) 
    },
       //重置修改用户表单
      editDialogClosed(){
          console.log('.')
          this.$refs.updateformref.resetFields()
        },
        //展示未修改过的列表
       async showEditdata(id){
          const {data:res} =await this.$http.get('users/'+id)
          console.log(res)
          if(res.meta.status !== 200 ) return this.$message.error('查询用户信息失败')
          this.editForm = res.data
          this.dialogVisiblegai = true
        },
        // 提交已经更改的表单
        async updateUser() {
          this.$refs.updateformref.validate( async valid => {
          if(!valid) return this.$message.error("请填写完整用户信息");
          //发送请求完成添加用户的操作
          const {data:res} = await this.$http.put('users/'+this.editForm.id,
          {
            email: this.editForm.email,
            mobile: this.editForm.mobile
          })
          //判断如果添加失败，就做提示
          if (res.meta.status !== 200)
              return this.$message.error('添加用户失败')
          //添加成功的提示
      
          //关闭对话框
          this.dialogVisiblegai = false
          //重新请求最新的数据
          this.getUserlist()
          this.$message.success("添加用户成功")
      }) 
        },
        async deleteuser(id){
          const {data:res} = await this.$http.delete('users/'+id)
          if(res.meta.status !== 200) return this.$message.error('删除用户失败')
          this.$message.success('删除用户成功')
          this.getUserlist()
        }
  }
     
      
}

</script>

<style lang="stylus" scoped>
  .container>>>.el-breadcrumb 
    font-size: 12px;
  

  .container>>>.el-card 
    margin-top: 20px;
    box-shadow: 0 0 2px #ccc;
  

  .container>>>.el-table 
    margin-top 22px 
    margin-bottom 15px
</style>