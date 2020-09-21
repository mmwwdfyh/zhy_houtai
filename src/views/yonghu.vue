<template>
  <div class="wrap">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="formInline.user" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加用户</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="120"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="120"></el-table-column>
      <el-table-column prop="role_name" label="角色" width="120"></el-table-column>
      <el-table-column prop="address" width="180" label="注册时间"></el-table-column>
      <el-table-column prop="mg_state" width="120" label="状态"></el-table-column>
      <el-table-column width="180" label="操作">
        <el-row slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle @click="xiu(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle @click="remove(scope.$index)"></el-button>
          <el-button type="warning" icon="el-icon-star-off" circle></el-button>
        </el-row>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[1,2,3]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 添加 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" :modal="false">
      <el-form :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.you" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="form.model" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="que">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改 -->
    <el-dialog title="修改用户" :visible.sync="fdialogFormVisible" :modal="false">
      <el-form :model="from">
        <el-form-item label="用户名">
          <el-input v-model="from.name" autocomplete="off" disabled="false"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="from.you" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="from.model" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="fdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="yes">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      list: [],
      total: "",
      currentPage4: 4,
      dialogFormVisible: false,
      fdialogFormVisible: false,
      form: {
        name: "",
        you: "",
        model: ""
      },
      from: {
        id: 0,
        name: "",
        you: "",
        model: ""
      }
    };
  },
  created() {
    this.$axios.get("/userlist.json").then(res => {
      console.log(res);
      this.list = res.data.users;
      this.total = res.data.total;
    });
  },
  mounted() {},
  methods: {
    //   添加
    onSubmit() {
      this.dialogFormVisible = true;
    },
    que() {
      this.list.push({
        username: this.form.name,
        email: this.form.you,
        mobile: this.form.model
      });
      this.dialogFormVisible = false;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // remove(id) {
    //   console.log(id);
    // },
    remove(index) {
      // console.log(index)
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // const arr = [];
          // this.list.forEach(item => {
          //   arr.push(item.id);
          // });
          // const i = arr.indexOf(index);

          // console.log(i);
          this.list.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    xiu(index) {
      const arr = [];
      this.list.forEach(item => {
        arr.push(item.id);
      });
      const i = arr.indexOf(index);
      this.from.id = i;
      console.log(i);
      this.from.you = this.list[i].email;
      this.from.name = this.list[i].username;
      this.from.model = this.list[i].mobile;

      this.fdialogFormVisible = true;

      //   console.log(item);
    },
    yes() {
      //   this.list[this.from.id].name = this.from.name;
      this.list[this.from.id].email = this.from.you;
      this.list[this.from.id].mobile = this.from.model;

      this.fdialogFormVisible = false;
    }
  }
};
</script>

<style scoped lang="scss">
.wrap {
  position: fixed;
  top: 0;
  left: 20%;
}
</style>
