class Helpers {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  searchBooks = () => {
    const keyword = this.queryStr.keyword
      ? {
          title: {
            $regex: `\\b${this.queryStr.keyword}\\b`,
            $options: "i",
          },
        }
      : {};
    this.query = this.query.find({ ...keyword });
    // console.log(this.query);
    return this;
  };
}

module.exports = Helpers;
