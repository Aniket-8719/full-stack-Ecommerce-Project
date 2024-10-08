class apifeatures{
    constructor(query, querystr){
        this.query = query;
        this.querystr = querystr;
    }

    search(){
        const keyword = this.querystr.keyword
        ?{
            name:{
                $regex: this.querystr.keyword,
                $options:"i",
            },
        }:{};

        console.log(keyword);

        this.query = this.query.find({...keyword});
        return this;

    }

    fillter(){
        const queryCopy = {...this.querystr}
        // Removing some fields for category
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key)=> delete queryCopy[key]);

        // Fillter For Price and Rating
        let querystr = JSON.stringify(queryCopy);;
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`);

        this.query = this.query.find(JSON.parse(querystr));
        return this;
    }
    pagingnation(resultPerPage){
        const currentPage = Number(this.querystr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = apifeatures;