<template>
  <div id="news">
    <div id="news-row">
      <div id="img-news">
        <img src="../../assets/images/news.jpg" alt="news" />
      </div>
      <div id="txt-news">
        <div class="news_txt_title">
          <h1 style="margin-top:0;">Maintenance Date Modification</h1>
        </div>
        <div class="news_description">
          Our November last maintenance will be held on next Monday 18th, from 15:00 - 19:00 PST instead of regular date.
          <br />11/11
        </div>
      </div>
    </div>
    <hr style="clear:both;" />
    <div id="news-row">
      <div id="img-news">
        <img src="../../assets/images/news.jpg" alt="news" />
      </div>
      <div id="txt-news">
        <div class="news_txt_title">
          <h1 style="margin-top:0;">Ranael Update</h1>
        </div>
        <div class="news_description">
          We would like to introduce you a new NPC that is arriving to Shiltz. Maybe you already know her beautiful sisters, but at this time, you are gonna love Valentine Craydeneh!
          <br />11/18
        </div>
      </div>
    </div>
    <hr style="clear:both;" />
    <div id="news-row">
      <div id="img-news">
        <img src="../../assets/images/news.jpg" alt="news" />
      </div>
      <div id="txt-news">
        <div class="news_txt_title">
          <h1 style="margin-top:0;">[Update] Golden Chest Novemb..</h1>
        </div>
        <div class="news_description">
          Golden Chest has been updated for november and its filled with new items!
          <br />11/18
        </div>
      </div>
    </div>
    <hr style="clear:both;" />
    <div id="news-row">
      <div id="img-news">
        <img src="../../assets/images/news.jpg" alt="news" />
      </div>
      <div id="txt-news">
        <div class="news_txt_title">
          <h1 style="margin-top:0;">[END]Maintenance 11/18/2019</h1>
        </div>
        <div class="news_description">
          Our 11/18/2019 maintenance has finished and servers are once again live!
          <br />11/18
        </div>
      </div>
    </div>
    <hr style="clear:both;" />
    <div id="news-row">
      <div id="img-news">
        <img src="../../assets/images/news.jpg" alt="news" />
      </div>
      <div id="txt-news">
        <div class="news_txt_title">
          <h1 style="margin-top:0;">Vulcanus Brother</h1>
        </div>
        <div class="news_description">
          We introduce you to a new NPC that is here to help you obtain armor.
          Vulcanus' brother has arrived to Elim to help you get Jikael/Tipareth Armor for each class!
          At the same time as we introduce NPC Vulcanus Brother, we would like you to know that Sage Tower bosses and monsters difficulty has decreased in a certain way to let all classes be part of a team and smash the evilness in there!
          <br />11/05
        </div>
      </div>
    </div>
    <hr style="clear:both;" />
  </div>
</template>

<script>
export default {
  name: "news"
};
</script>

<style scoped>
#news-row {
  display: flex;
  justify-content: space-between;
  padding: 20px 20px;
}
.news_description {
  font-size: 12px;
  color: rgb(143, 141, 137);
}
#txt-news {
  margin-left: 12px;
}
.news_txt_title {
  margin-bottom: 20px;
}
h1 {
  font-size: 25px;
  color: green;
}
</style>
