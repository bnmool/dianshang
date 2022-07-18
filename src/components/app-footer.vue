<template>
  <footer class="app-footer">
    <!-- 联系我们 -->
    <div class="contact">
      <div class="container">
        <dl>
          <dt>客户服务</dt>
          <dd><i class="iconfont icon-kefu"></i> 在线客服</dd>
          <dd><i class="iconfont icon-question"></i> 问题反馈</dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd><i class="iconfont icon-weixin"></i> 公众号</dd>
          <dd><i class="iconfont icon-weibo"></i> 微博</dd>
        </dl>
        <dl>
          <dt>下载APP</dt>
          <dd class="qrcode"><img src="../assets/images/qrcode.jpg" /></dd>
          <dd class="download">
            <span>扫描二维码</span>
            <span>立马下载APP</span>
            <a href="javascript:;">下载页面</a>
          </dd>
        </dl>
        <dl>
          <dt>服务热线</dt>
          <dd class="hotline">
            400-0000-000 <small>周一至周日 8:00-18:00</small>
          </dd>
        </dl>
      </div>
    </div>
    <!-- 其它 -->
    <div class="extra">
      <div class="container">
        <div class="slogan">
          <a href="javascript:;">
            <i class="iconfont icon-footer01"></i>
            <span>价格亲民</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer02"></i>
            <span>物流快捷</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer03"></i>
            <span>品质新鲜</span>
          </a>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">
          <p>
            <a href="javascript:;">关于我们</a>
            <a href="javascript:;">帮助中心</a>
            <a href="javascript:;">售后服务</a>
            <a href="javascript:;">配送与验收</a>
            <a href="javascript:;">商务合作</a>
            <a href="javascript:;">搜索推荐</a>
            <a href="javascript:;">友情链接</a>
          </p>
          <p>CopyRight © 小兔鲜儿</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
};
</script>

<style scoped lang='less'>
.app-footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 1.25rem;
  .contact {
    background: #fff;
    .container {
      padding: 3.75rem 0 2.5rem 1.5625rem;
      display: flex;
    }
    dl {
      height: 11.875rem;
      text-align: center;
      padding: 0 4.5rem;
      border-right: 0.0625rem solid #f2f2f2;
      color: #999;
      &:first-child {
        padding-left: 0;
      }
      &:last-child {
        border-right: none;
        padding-right: 0;
      }
    }
    dt {
      line-height: 1;
      font-size: 1.125rem;
    }
    dd {
      margin: 2.25rem 0.75rem 0 0;
      float: left;
      width: 5.75rem;
      height: 5.75rem;
      padding-top: 0.0625rem;
      border: 0.0625rem solid #ededed;
      .iconfont {
        font-size: 2.25rem;
        display: block;
        color: #666;
      }
      &:hover {
        .iconfont {
          color: @blueColor;
        }
      }
      &:last-child {
        margin-right: 0;
      }
      &:hover {
        color: @blueColor;
      }
    }
    .qrcode {
      width: 5.75rem;
      height: 5.75rem;
      padding: 0.4375rem;
      border: 0.0625rem solid #ededed;
    }
    .download {
      padding-top: 0.3125rem;
      font-size: 0.875rem;
      width: auto;
      height: auto;
      border: none;
      span {
        display: block;
      }
      a {
        display: block;
        line-height: 1;
        padding: 0.625rem 1.5625rem;
        margin-top: 0.3125rem;
        color: #fff;
        border-radius: 0.125rem;
        background-color: @blueColor;
      }
    }
    .hotline {
      padding-top: 1.25rem;
      font-size: 1.375rem;
      color: #666;
      width: auto;
      height: auto;
      border: none;
      small {
        display: block;
        font-size: 0.9375rem;
        color: #999;
      }
    }
  }
  .extra {
    background-color: #333;
  }
  .slogan {
    height: 11.125rem;
    line-height: 3.625rem;
    padding: 3.75rem 6.25rem;
    border-bottom: 0.0625rem solid #434343;
    display: flex;
    justify-content: space-between;
    a {
      height: 3.625rem;
      line-height: 3.625rem;
      color: #fff;
      font-size: 1.75rem;
      i {
        font-size: 3.125rem;
        vertical-align: middle;
        margin-right: 0.625rem;
        font-weight: 100;
      }
      span {
        vertical-align: middle;
        text-shadow: 0 0 0.0625rem #333;
      }
    }
  }
  .copyright {
    height: 10.625rem;
    padding-top: 2.5rem;
    text-align: center;
    color: #999;
    font-size: 0.9375rem;
    p {
      line-height: 1;
      margin-bottom: 1.25rem;
    }
    a {
      display: inline-block;
      color: #999;
      line-height: 1;
      padding: 0 0.625rem;
      border-right: 0.0625rem solid #999;
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
