class QueryFeatures {
  constructor(databaseQuery, requestQuery) {
    this.databaseQuery = databaseQuery;
    this.requestQuery = requestQuery;
  }

  filtering() {
    const queryObject = { ...this.requestQuery };
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObject[el]);

    if (queryObject["category"])
      queryObject["category"]["in"] = queryObject["category"]["in"].split(",");

    if (queryObject["size"])
      queryObject["size"]["in"] = queryObject["size"]["in"].split(",");
    if (queryObject["sleeve"])
      queryObject["sleeve"]["in"] = queryObject["sleeve"]["in"].split(",");
    if (queryObject["color"])
      queryObject["color"]["in"] = queryObject["color"]["in"].split(",");
    if (queryObject["title"]) {
      queryObject["title"]["$options"] = "i";
      queryObject["title"]["regex"] = queryObject["title"]["regex"].replace(
        /[.\"\'\`!*-+={}?^$()|[\]\\]/g,
        ""
      );
    }
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|in|regex)\b/g,
      (match) => "$" + match
    );
    this.databaseQuery.find(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    if (this.requestQuery.sort) {
      if (this.requestQuery.sort === "createdAt:1") {
        this.databaseQuery = this.databaseQuery.sort({ createdAt: 1 });
      } else {
        const sortBy = this.requestQuery.sort.split(":");
        let sortField = sortBy[0];
        let sortValue = sortBy[1] * 1;

        this.databaseQuery = this.databaseQuery.sort({
          [sortField]: sortValue,
          createdAt: -1,
        });
      }
    } else {
      this.databaseQuery = this.databaseQuery.sort({
        createdAt: -1,
        views: -1,
      });
    }
    return this;
  }

  paginating() {
    const page = this.requestQuery.page * 1 || 1;
    const limit = this.requestQuery.limit * 1 || 12;
    const skip = (page - 1) * limit;
    this.databaseQuery = this.databaseQuery.skip(skip).limit(limit);

    return this;
  }
}

module.exports = QueryFeatures;
