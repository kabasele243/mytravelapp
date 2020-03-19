const Tour = require('./../models/tourModel')

exports.aliasTopTours = (req, res, next) => {

};

exports.getAllTours = async (req, res) => {
try {

    //BUILD QUERY
    //1a. Filtering

    const queryObj = { ...req.query}
    const excludedFields = ['page', 'sort', 'limit', 'fields']
    excludedFields.forEach(el => delete queryObj[el])

    //1b. Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    

    let query = Tour.find(JSON.parse(queryStr));

    //2. Sorting
    if(req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy)
    } else {
        query = query.sort('-createdAt');
    }

    //3. Field limiting
    if(req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        query = query.select(fields);
    } else {
        query = query.select('-__v');
    }


    //4. Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if(req.query.page) {
        const numTours = await Tour.countDocuments();

        if(skip >= numTours) throw new Error ('This page does not exist');
    }

    //EXECUTE QUERY
    const tours = await query;

    res.status(200).json({
          status: "success",
          results: tours.length,
          data: {
              tours
          }
      })
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: "what???"
        })
    }
}

exports.getTour = async (req, res) => {
    
  try {
    const tour = Tour.findById(req.params.id);
    
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
  } catch(err) {
      res.status(404).json({
        status: 'fail',
        message: err
      })
      
  }


    // res.status(200).json({
    //       status: "success",
    //       data: {
    //           tour
    //       }
    //   })
}

exports.createTour = async (req, res) => {
try {
 const newTour = await Tour.create(req.body);

 res.status(201).json({
     status: 'success',
     data: {
         tour: newTour
     }

 });
    } catch(err) {
     res.status(400).json({
         status: 'fail',
         message: err
     });
   }
};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
                
        res.status(200).json({
            status: 'Success',
            data: {
                tour
            }
        })
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }

    
}

exports.deleteTour =  async (req, res) => {
     try {

        const tour = await Tour.findOneAndDelete(req.params.id);

        res.status(204).json({
            status: 'success',
            data: null
        })
         
     } catch (err) {
         
     }
    

    
}


