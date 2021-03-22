<template>
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="user">
              <nuxt-link class="nav-link" 
              :class="{active : tab==='your_feed'}"
              :to="{
                name:'home',
                query:{
                  tab: 'your_feed'
                }
              }">Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link"
                :class="{active: tab==='global_feed'}"
               :to="{
                name: 'home',
                query:{
                  tab:'global_feed'
                }
                }">Global Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link class="nav-link"
                :class="{active: tab==='tag'}"
               :to="{
                name: 'home',
                query:{
                  tab:'tag'
                }
                }">{{ $route.query.tag }}</nuxt-link>
            </li>
          </ul>
        </div>

        <div class="article-preview"  v-for="(article,index) in articles" :key="index">
            <div class="article-meta">
              <nuxt-link to="profile.html"><img :src="article.author.image" /></nuxt-link>
              <div class="info">
                <nuxt-link :to="{
                  name:'profile',
                  params:{
                    username:article.author.username
                  }
                }" class="author">{{article.author.username}}</nuxt-link>
                <span class="date">{{article.updatedAt}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" 
              :class="{
                  active: article.favorited
                }"
              @click="onFavorite(article)">
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{
                name:'article',
                params:{
                  slug:article.slug
                }
              }" 
              class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          
        </div>
        <!-- 分页 -->
        <nav>
          <ul class="pagination">
            <!-- 绑定动态样式 active -->
              <li class="page-item" :class="{ active: item === pageNo}"  
                v-for="item in totalPage" :key="item"
              >
              <!-- <nuxt-link class="page-link" to="/" > {{ item }} </nuxt-link> -->
              <nuxt-link class="page-link" :to="{
                name:'home',
                query:{
                  pageNo:item,
                  tag:$route.query.tag
                }
              }" 
              > {{ item }} </nuxt-link>
              </li>
            
          </ul>
        </nav>

      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link v-for="item in tags" :key="item" :to="{
              name:'home',
              query:{
                tag:item,
                tab:'tag'
              }
            }" class="tag-pill tag-default">{{ item }}</nuxt-link>
            
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import { mapState } from 'vuex'
import { getArticles, getYourFeedArticles, addFavorite, deleteFavorite  } from '@/api/article.js'
import { getTags } from '@/api/tag'
export default {
  name:'homeIndex',
  computed:{
    totalPage(){
      return Math.ceil(this.articlesCount/this.limit)
    },
    ...mapState(['user'])
  },
  
  async asyncData({query}){
    console.log(query)
    let pageNo = Number.parseInt(query.pageNo) || 1
    console.log(pageNo)
    let tab = query.tab || 'global_feed'
    let tag = query.tag
    let limit = 10
    let params = {
      limit,
      offset: (pageNo-1)*limit,
      tag
    }
    // const { data:articles } = await getArticles(params)
    const { data:articles } = (tab==='global_feed')
    ? await getArticles(params)
    : await getYourFeedArticles(params)

    const {data:tagList} = await getTags()
    // console.log(tagList)
    
    console.log(articles)
    return {
      articlesCount: articles.articlesCount,
      articles: articles.articles,
      pageNo,// 页码
      limit, // 每页最多显示条数
      tab,// 选项卡
      tags:tagList.tags, //数据标签列表
      tag //数据标签
    }
  },
  watchQuery:['pageNo','tab','tag'],
  methods:{
    async onFavorite(article){
      if(article.favorited){
        // 取消点赞
        await deleteFavorite(article.slug)
        article.favorited = false
        article.favoritesCount += -1
      }else{
        // 添加点赞
        await addFavorite(article.slug)
        article.favorited = true
        article.favoritesCount += 1
      }
    }
  }
}
</script>

<style>

</style>