<template>
  <div class="productList">
    <!-- <vue-element-loading :active="loadingIsActive" spinner="bar-fade-scale" color="#4063D5" /> -->
    <div :style="{'height':'1px'}"></div>
    <hire-shop-list
      ref="hireShop"
      v-if="hireShopList.length"
      :shopList="hireShopList"
      @clickMyCoinBuyAction="clickMyCoinBuyAction"
      @selectShopAction="selectShopAction"
    ></hire-shop-list>

    <div class="scroll" v-show="flag">
      <!-- :style="{'height':hireShopList.length>0?'calc(100% - 60px)':'100%'}" -->
      <scrollContent
        :hasheader="true"
        class="scrollContent"
        ref="scroller"
        @refreshData="refreshData"
        @infiniteData="infiniteData"
        @onScroll="watchScroll"
      >
        <template v-slot="itemsList" name="content">
          <div class="banner" v-if="imgList.length">
            <bannerList :imgList="imgList" :hasPagination="true">
              <template name="slideList" v-slot="item">
                <div class="imgListItem" @click="selectbannberAction(item.item)">
                  <img :src="item.item.img" />
                </div>
              </template>
            </bannerList>
          </div>

          <div class="dataList" ref="ListScrollBox">
            <itemList class="productList" :productsList="itemsList.itemsList" :isShop="false"></itemList>
          </div>

          <div class="noData" v-if="!itemsList.itemsList.length && loadingFinish">
            <noData :tishiText="tishiText" :icon="noDataIcon"></noData>
          </div>
        </template>
      </scrollContent>
    </div>
      <p class="up" v-show="upShow" @click="pageUp">
          <img src="@/assets/go-up@3x.png" />
      </p>
      <!-- 骨架屏 -->
    <div class="skeletonScreen" v-show="!flag">
      <div class="skeletonScreen-banner"></div>
      <div class="skeletonScreen-list">
        <div class="skeletonScreen-list-item" v-for="(item, index) in 3" :key="index">
          <div class="skeletonScreen-list-item-top">
            <div class="top-img"></div>
            <div class="right">
              <p class="product-title"></p>
              <p class="sold"></p>
              <p class="price"></p>
            </div>
          </div>
          <p class="line"></p>
          <div class="bottom">
            <span class="p_icon"></span>
            <span class="name"></span>
          </div>
        </div>
      </div>
    </div>
    <brandTab :isHome="true" :tabOneText="$t('baiUrguivPqdOOVty')" :role="'buyer'"></brandTab>
  </div>
</template>
<script>
import VueElementLoading from "vue-element-loading";
import scrollContent from "@/components/scroller/index";
import itemList from "./product/productList";
import bannerList from "@/components/swiper/swiper";
import brandTab from "@/components/brandTab/brandTab.vue";
import BXAPI from "@/bxapi/api";
import mainApi from "./api/";
import TrackAPI from "@/utils/track";
import HireShopList from "../components/hire-shop/";
import SellerAPI from "../seller/api";
import noData from "@/components/noData/index";
import shareInfo from '@/config/share_info'

export default {
  data() {
    return {
      // 定义监听物理返回函数
      NewFUN: undefined,
      tishiText: this.$t("zYFFWtKMbnxnPjKFV"),
      noDataIcon: require('@/assets/no-product@3x.png'),
      hireShopList: [],
      productsList: [],
      loadingFinish: false,
      imgList: [],
      loadingIsActive: false,
      productlistParams: {
        cursor: "",
        limit: 20
      },
      upShow: false,
      shareInfo: {},  
      flag: false, //骨架屏展示

    };
  },
  components: {
    "hire-shop-list": HireShopList,
    brandTab,
    scrollContent,
    itemList,
    bannerList,
    "vue-element-loading": VueElementLoading,
    noData
  },
  activated() {
    
    // 注册监听物理返回事件函数
    // this.goback()
    // this.setNativeTitle()
    this.hireShopList = window.userinfo.hire_list;
    this.addTrade();
    
    // 
    // setTimeout(() => {
    //   this.observerScroller();
    // }, 500);
    if (this.$refs.hireShop) {
      this.$refs.hireShop.reSetShop(0);
    }
  },
  mounted(){
    this.loadingIsActive = true;
    this.loadingFinish = false;
    this.getBannerList();
    this.getProductsList();
  },
  deactivated() {
    console.log("走到了这里销毁了事件")
    this.destroyedGoBack();
  },
  methods: {
    //设置标题 2020-7.23
    setNativeTitle() {

        BXAPI.setNativeNavigationItems(
              {title: this.$t("aokqsngetfmAUNuV"),  show_home: false, show_back: false, color: "#ffffff",  style: "light"},
              (code, data) => {}
        );
    },
    // 返回事件相关，关闭小程序相关
    goback() {
      this.NewFUN = function a(e) {
        BXAPI.BixinCloseMapp();
      };
      history.pushState(null, null, document.URL);
      let that = this;
      window.addEventListener("popstate", that.NewFUN, false);
    },
    destroyedGoBack() {
      let that = this;
      window.removeEventListener("popstate", that.NewFUN, false);
    },
    selectbannberAction(imageObj) {
      // if (imageObj.href) {
      //   BXAPI.openWebPage({ url: imageObj.href }, (code, data) => {});
      // }
    },
    clickMyCoinBuyAction() {
      //---不做处理----
      // BXJSSDKAPI.BXLocalStorageSetItem("is_waiter", "0", (code, data) => {});
    },
    selectShopAction(shop) {
      //--以店小二身份跳转店铺管理首页---
      //----需要查询店铺信息成功才切换-----
      this.loadingIsActive = true;
      SellerAPI.fetchStoreInfo({ shop_id: shop.id }, data => {
        this.loadingIsActive = false;
        if (!data.code) {
          BXAPI.BXLocalStorageSetItem(
            "is_waiter",
            "true_" + shop.id,
            (code, data) => {}
          );
          window.userinfo.is_waiter = true
          this.$router.replace({
            name: "store",
            params: { from: "buyer", shop: shop }
          });
        } else {
          if (data.code == 11001) {
            this.$toast.center(this.$t("YQNjXAfrtYgnxhBfh"));
          } else {
            this.$toast.center(this.$t("操作异常"));
          }
        }
      });
    },
    getProductsList() {
      this.setNativeTitle()
      // 获取数据
      // this.loadingIsActive = true;
      mainApi.getProductsList(this.productlistParams, data => {
        this.loadingIsActive = false;
        this.loadingFinish = true;
        if (data.code != 0) {
          this.$toast(data.message);
        } else {
          this.productsList = data.data;
          if (this.productlistParams.cursor === "") {
            this.$refs.scroller.loadDatas(this.productsList);
          } else {
            this.$refs.scroller.loadMoreData(this.productsList);
          }
          
        }
        this.flag = true

      });
    },
    getBannerList() {
      // 获取顶部广告列表
      // this.loadingIsActive = true;
      mainApi.getBannerList(data => {
        // this.loadingIsActive = false;
        console.log("getBannerList", data);
        if (!data.code) {
          this.imgList = data.data;
        }
      });
    },
    refreshData() {
      this.productlistParams.cursor = "";
      this.getProductsList();
      this.getBannerList();
    },
    infiniteData() {
      this.productlistParams.cursor = this.productsList[
        this.productsList.length - 1
      ].id;

      this.getProductsList();
    },
    // 进入首页添加埋点
    addTrade() {
      let type = "";
      if (window.save_role === "seller") {
        type = "seller";
      } else {
        type = "buyer";
      }

      let params = {
        type: type,
        ybayuser_ID: window.userinfo.uid
      };
      TrackAPI.track("page_coinbay_home", params, null);
      if(window.scene=='chat_private'||window.scene=='chat_group') {
        TrackAPI.track("page_coinbay_im", {buyer_ID: window.userinfo.uid}, null);
      }
    },

    //滚动置顶向上
    watchScroll(scrollBox) {
      let parentTop = scrollBox.scrollTop; //最上面元素距离页面顶部的位置
      
      if (parentTop <= 10) {
        this.upShow = false;
      } else {
        this.upShow = true;
      }
    },

    pageUp() {
      this.$refs.scroller.scrollTo(0, 0, true);
      setTimeout(() => {
        this.upShow = false;
      }, 1000);
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!sessionStorage.askPositon || from.path == "/") {
      //当前页面刷新不需要切换位置
      sessionStorage.askPositon = "";
      next();
    } else {
      next(vm => {
        if (vm && vm.$refs.scroller) {
          //通过vm实例访问this
          setTimeout(function() {
            vm.$refs.scroller.scrollTo(0, sessionStorage.askPositon, false);
          }, 0); //同步转异步操作
        }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    //记录离开时的位置
    sessionStorage.askPositon = this.$refs.scroller.getPosition();
    next();
  },
};
</script>
<style lang="less" scoped>
.productList {
  background: #f6f7f8;
  width: 100%;
  height: 100%;
  .banner {
    margin: 16px auto;
    margin-left: 10px;
    margin-right: 12px;
    margin-bottom: 16px;
    height: 130px;
    border-radius: 8px;
    overflow: hidden;
    // background: #f6f7f8;
    box-shadow: 0px 2px 8px 0 rgba(38, 38, 38, 0.15);
    .imgListItem {
      list-style: none;
      display: inline-block;
      width: 100%;
      height: 130px;
      border-radius: 8px;
      overflow: hidden;
      img {
        margin: 0 auto;
        width: 100%;
        // width: calc(100% - 2px);
        height: 130px;
      }
    }
  }
  .scroll {
    position: relative;
    height: 100%;
    // background-color: aqua;
  }
  .scrollContent {
    height: 100%;

    .dataList {
      margin-left: 12px;
      margin-right: 12px;
    }
  }
  .up {
    position: fixed;
    z-index: 1;
    bottom: 80px;
    right: 16px;
    img {
      height: 40px;
      width: 40px;
    }
  }
  .skeletonScreen {
    background: #f6f7f8;
    padding: 16px 10px;
    .skeletonScreen-banner {
      width: 100%;
      height: 130px;
      background: #ffffff;
      border-radius: 8px;
      box-shadow: 0px 2px 8px 0 rgba(38, 38, 38, 0.15);
      margin-bottom: 16px;
    }
    .skeletonScreen-list {
      width: 100%; 
      height: 100vh;
      .skeletonScreen-list-item {
        width: 100%;
        height: 170px;
        border-radius: 6px;
        background: #ffffff;
        margin-bottom: 10px;
        padding: 17px 20px 0;
        .skeletonScreen-list-item-top {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
          .top-img {
            margin-right: 10px;
            position: relative;
            width: 100px;
            height: 100px;
            background: #f6f7f8;
          }
          .right {
            flex: 1;
            .product-title {
              width: 193px;
              height: 42px;
              margin-bottom: 8px;
              background: #f6f7f8;
            }
            .sold {
              width: 64px;
              height: 17px;
              background: #f6f7f8;
            }
          }
        }
        .line {
          width: 100%;
          height: 1px;
          border-bottom: 0.5px solid #ebebeb;
          margin-bottom: 10px;
        }
        .bottom {
          display: flex;
          align-items: center;
          .p_icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 6px;
            border-radius: 50%;
            background: #f6f7f8;
          }
          .name {
            width: 121px;
            height: 17px;
            background: #f6f7f8;
          }
        }
      }
    }
  }
}
</style>