const searchData = [
  {
    clipped: false,
    headline_main: "Ed Sheeran and Sam Smith, British Pop Im...",
    id: "nyt://audio/0d63764a-b5d9-5d10-9172-490bdaa045c6",
    photo:
      "https://images.unsplash.com/photo-1523995462485-3d171b5c8fa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80",
    pub_date: "2014-06-20",
    web_url:
      "https://www.nytimes.com/audio/2014/06/20/arts/music/20popcast_pod.html",
  },
  {
    clipped: false,
    headline_main: "Ed Sheeran Raises Money for Liberia — an...",
    id: "nyt://article/a65dbefd-8e6e-55b6-b64f-fd58249475a5",
    photo:
      "https://www.nytimes.com/images/2017/12/13/opinion/12mzezewa/12mzezewa-articleLarge.jpg",
    pub_date: "2017-12-12",
    web_url:
      "https://www.nytimes.com/2017/12/12/opinion/sheeran-radiaid-volunteer-africa.html",
  },
  {
    clipped: false,
    headline_main: "The Surprise Stars of Olympic Skating: E...",
    id: "nyt://article/fdc494e6-6dc8-5e60-871a-f3766a4b85bb",
    photo:
      "https://www.nytimes.com/images/2018/02/10/arts/10olympics-skatesongs/merlin_133484114_2822d58b-051b-4661-9483-1cf48f7215a0-articleLarge.jpg",
    pub_date: "2018-02-09",
    web_url:
      "https://www.nytimes.com/2018/02/09/arts/music/olympics-figure-skating-songs.html",
  },
  {
    clipped: false,
    headline_main: "Popcast: Ed Sheeran and Sam Smith, Briti...",
    id: "nyt://article/22d7fce6-d001-5833-867b-c189e1738349",
    photo:
      "https://www.nytimes.com/images/2014/06/19/arts/19SAMSMITH/19SAMSMITH-thumbWide-v2.jpg",
    pub_date: "2014-06-20",
    web_url:
      "https://artsbeat.blogs.nytimes.com/2014/06/20/popcast-ed-sheeran-and-sam-smith-british-pop-imports/",
  },
  {
    clipped: false,
    headline_main: "The Playlist: Ed Sheeran Returns With a ...",
    id: "nyt://article/a94b1ae3-86e0-596b-876f-365bb0242e10",
    photo:
      "https://www.nytimes.com/images/2017/01/07/arts/07PLAYLIST/07PLAYLIST-videoSmall.jpg",
    pub_date: "2017-01-06",
    web_url:
      "https://www.nytimes.com/2017/01/06/arts/music/playlist-ed-sheeran-dirty-projectors-brian-eno.html",
  },
  {
    clipped: false,
    headline_main: "The Playlist: Ed Sheeran’s Tender Duet, ...",
    id: "nyt://article/83918cd6-bdfc-583d-83b5-3aac73b2bee9",
    photo:
      "https://www.nytimes.com/images/2019/07/05/arts/05playlist2/merlin_156108501_231bb443-3044-4957-8a06-18afb5ecddc7-articleLarge.jpg",
    pub_date: "2019-07-05",
    web_url:
      "https://www.nytimes.com/2019/07/05/arts/music/playlist-miley-cyrus-post-malone-ed-sheeran.html",
  },
  {
    clipped: false,
    headline_main: "The Greatest Trick Ed Sheeran Ever Pulle...",
    id: "nyt://article/b13cd4a3-52e5-53f7-bfb3-deca7091717a",
    photo:
      "https://www.nytimes.com/images/2017/03/11/arts/11POPCAST/11POPCAST-hpLarge-v2.jpg",
    pub_date: "2017-03-10",
    web_url:
      "https://www.nytimes.com/2017/03/10/arts/music/popcast-ed-sheeran-divide.html",
  },
];

const clippedData = searchData.map((news) => ({
  ...news,
  clipped: !news.clipped,
}));

const dummyData = {
  searchData,
  clippedData,
};

export default dummyData;
