<template>
  <div class="article-page">

  <div class="banner">
    <div class="container">

      <h1>{{ article.title }}</h1>

      <article-meta :article="article" />
    </div>
  </div>

  <div class="container page">

    <div class="row article-content">
      <div class="col-md-12" v-html="article.body">
        <!-- <p>
        Web development technologies have evolved at an incredible clip over the past few years.
        </p>
        <h2 id="introducing-ionic">Introducing RealWorld.</h2>
        <p>It's a great solution for learning how other frameworks work.</p> -->
      </div>
    </div>

    <hr />

    <div class="article-actions">
      <article-meta :article="article" />
    </div>

    <div class="row">

      <div class="col-xs-12 col-md-8 offset-md-2">

        <article-comments :article="article" />
       
      </div>

    </div>

  </div>

</div>
</template>

<script>
import MarkdownIt from 'markdown-it'
import { getArticle } from '@/api/article'
import ArticleMeta from './components/article-meta'
import ArticleComments from './components/article-comments'
export default {
  name:'articleIndex',
  async asyncData({params}){
    const { data:article } = await getArticle(params.slug)
    console.log(article)
    return {
      article:article.article
    } 
  },
  components:{
    ArticleMeta,
    ArticleComments
  }
}
</script>

<style>

</style>