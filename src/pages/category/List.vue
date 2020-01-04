<template>
    <div>
        <b>栏目管理</b>
       
        <el-button size="small" type="success" @click="toAddHandler">添加</el-button>
        <el-button size="small" type="danger">批量删除</el-button>
        <el-table  :data="categories" :row-class-name="tableRowClassName">
            <el-table-column prop="id" label="编号"></el-table-column>
            <el-table-column prop="name" label="栏目名称"></el-table-column>
            <el-table-column prop="num" label="序号"></el-table-column>
            <el-table-column prop="parentId" label="父栏目"></el-table-column>
            <el-table-column fixed="right" label="操作">
                <!-- v-slot用于获取当前行数据 -->
                <template v-slot="slot">
                    <a href=""  @click.prevent="toDeleteHandler(slot.row.id)">删除</a>
                    <a href="" @click.prevent="toUpdateHandler(slot.row)">修改</a>
                </template>
            </el-table-column>
        </el-table>
        <!-- 模态框    冒号表示引用脚本-->
         <el-dialog :title="title" :visible.sync="visible" width="50%" >
         <el-form :model="form" label-width="80px">
             <el-form-item label="栏目名称">
                 <el-input v-model="form.name"/>
             </el-form-item>
             <el-form-item label="序号">
                 <el-input v-model="form.num"/>
             </el-form-item>
         </el-form>
         <span slot="footer" class="dialog-footer">
         <el-button @click="visible = false">取 消</el-button>
         <!-- @click=onclick -->
         <el-button type="primary" @click="submitHandler">确 定</el-button>
         </span>
        </el-dialog>
        <!-- /模态框 -->

    </div>
</template>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
    
  }
 
</style>
<script>

import request from '@/utils/request'
import querystring from 'querystring'
export default {
     created(){
        //在页面加载出来的时候加载数据
        this.loadData()
    },
    data() {
        return {
            title:"添加栏目信息",
            visible:false,
            categories:[],
            form:{
                type:"category"
            }
        }
    },
    methods:{
        tableRowClassName({row,rowIndex}){
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
        loadData(){
            //this指向vue实例。
            let url = "http://localhost:6677/category/findAll";
            request.get(url).then((response)=>{
                //箭头函数中的this指向外部函数中的this
                this.categories = response.data;
            })
        },
        closeMethodHandler(){
            this.visible = false;
        },
        submitHandler(){
            let url = "http://localhost:6677/category/saveOrUpdate";
            //前端向后台发送请求，完成数据的保存操作
            request({
                url,
                method:"POST",
                headers:{
                    "Content-Type":"application/x-www-form-urlencoded"
                },
                data:querystring.stringify(this.form)
            }).then((response)=>{
                this.closeMethodHandler();
                this.loadData();
                this.$message({type:"success",message:response.message});
            })
        },
        toAddHandler(){
      this.form = {
        type:"category"
      }
      this.visible = true;
    },
       toDeleteHandler(id){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //调用后台接口，完成删除操作
        alert(id);
        let url = "http://localhost:6677/category/deleteById?id="+id;
        request.get(url).then((response)=>{
          //刷新数据
          this.loadData();
          //提示结果
           this.$message({
          type: 'success',
          message: response.message
        });
      })
    })
    },

      toUpdateHandler(row){
      this.form = row;
      this.visible = true;
    }
    }
}
</script>

<style scoped>

</style>