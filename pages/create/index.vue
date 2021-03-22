<template>
  <div class="editor-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-10 offset-md-1 col-xs-12">
        <form>
          <fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control form-control-lg" v-model="title" placeholder="Article Title">
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" v-model="description" placeholder="What's this article about?">
            </fieldset>
            <fieldset class="form-group">
                <textarea class="form-control" rows="8" v-model="body" placeholder="Write your article (in markdown)"></textarea>
            </fieldset>
            <fieldset class="form-group">
                <input type="text" class="form-control" placeholder="Enter tags"><div class="tag-list"></div>
            </fieldset>
            <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="submitArticle">
                Publish Article
            </button>
          </fieldset>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { createArticle } from '@/api/article'
export default {
  name:'create',
  data(){
    return{
      title:'',
      description:'',
      body:'',
      tagList:[]//标签列表
    }
  },
  methods:{
    async submitArticle(){
      let params = {
        title:this.title,
        description:this.description,
        body:this.description,
        tagList:[]//标签列表
      }
      console.log(params)
      await createArticle(params)
    }
  }
}
</script>

<style>

</style>